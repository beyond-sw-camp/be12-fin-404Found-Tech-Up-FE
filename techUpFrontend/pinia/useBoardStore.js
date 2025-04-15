import { defineStore } from 'pinia';
import axios from 'axios';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    boardList: [],
    boardFiles: [],
    totalElements: 0,
    currentPage: 0,
    currentBoard: null,
    identifier: crypto.randomUUID(), // 작성 세션마다 고정된 identifier 생성
  }),

  actions: {
    // 전체 게시글 데이터를 받아오는 방식으로 변경 (서버에서 전체 데이터를 반환하는 API)
    // useBoardStore.js
async fetchBoardList({ page = 0, size = 10 } = {}) {
    try {
        console.log('Fetching board list with page:', page, 'size:', size);
        const response = await axios.get('/api/board/list', {
          params: { page, size } 
        });
      console.log('원본 응답:', response.data);
  
      if (response.data && response.data.data) {
        this.boardList = response.data.data.boardList;
  this.totalElements = response.data.data.totalElements;
        
        console.log('게시글 목록 조회 성공:', this.boardList);
        console.log('게시글 총 갯수:', this.totalElements);
        console.log('총 페이지 수:', Math.ceil(this.totalElements / 10));
      } else {
        console.error('응답 형식 오류:', response.data);
        this.boardList = [];
        this.totalElements = 0;
      }
    } catch (error) {
      console.error('게시글 목록 조회 오류:', error);
      this.boardList = [];
      this.totalElements = 0;
    }
  },

  async fetchBoardDetail(boardIdx) {
    try {
    console.log('함수 실행은 한거지? ');
      const boardRes = await axios.get(`/api/board/read/${boardIdx}`);
      console.log('머가맞아? ' + boardRes.data);
      console.log('이건가 : '+boardRes.data.data);
      if (boardRes.data && boardRes.data.isSuccess && boardRes.data.data) {
        this.currentBoard = boardRes.data.data; // ✅ 바로 data로 저장
        console.log('게시글 상세 조회 성공:', this.currentBoard);
      } else {
        console.error('게시글 상세 조회 실패: 응답 형식 오류', boardRes.data);
        this.currentBoard = null;
      }
    } catch (error) {
      console.error('게시글 상세 조회 오류:', error);
      this.currentBoard = null;
    }
  },
  

    async uploadTempImage(file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/api/board/files/temp-image', formData, {
          params: { identifier: this.identifier },
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const s3Key = response.data.data.imageUrl;
        console.log('✅ image url test:', s3Key);
        return s3Key;
      } catch (error) {
        console.error('임시 이미지 업로드 오류:', error);
        throw error;
      }
    },

    async createBoard({ boardTitle, boardContent, boardCategory, userIdx, attachments = [] }) {
      try {
        const boardPayload = { boardTitle, boardContent, boardCategory, userIdx };
        const boardRes = await axios.post('/api/board/create', boardPayload);
        const createdBoard = boardRes.data;
        const boardIdx = createdBoard.data.idx;

        console.log('게시글 생성 완료:', createdBoard);

        // 임시 이미지 연결 요청 (identifier 포함)
        await axios.post(`/api/board/files/${boardIdx}/link-temp-images`, null, {
          params: { identifier: this.identifier }
        });

        if (attachments.length > 0) {
          for (const file of attachments) {
            console.log('첨부파일 확인:', file);

            const fileType = file.type.includes('image') ? 'image' : 'file';
            const presignedRes = await axios.get('/api/board/files/presignedUrl', {
              params: {
                board_idx: boardIdx,
                files_type: fileType,
                files_name: file.name
              }
            });

            const { presignedUrl, finalUrl } = presignedRes.data;

            if (!presignedUrl || !finalUrl) {
              console.error('프리사인드 URL 누락:', presignedRes.data);
              continue;
            }

            await axios.put(presignedUrl, file, {
              headers: { 'Content-Type': file.type }
            });

            const filesPayload = {
              boardIdx: boardIdx,
              filesUrl: finalUrl,
              filesType: fileType,
              filesName: file.name
            };

            await axios.post('/api/board/files', filesPayload);
            console.log('첨부파일 업로드 및 DB 저장 완료:', finalUrl);
          }
        }

        return createdBoard;
      } catch (error) {
        console.error('게시글 생성 오류:', error);
        throw error;
      }
    },

    async deleteBoardFile(filesIdx) {
      try {
        const response = await axios.delete(`/api/board/files/${filesIdx}`);
        console.log('파일 삭제 성공:', response.data);
        this.boardFiles = this.boardFiles.filter(file => file.files_idx !== filesIdx);
      } catch (error) {
        console.error('파일 삭제 오류:', error);
      }
    }
  }
});
