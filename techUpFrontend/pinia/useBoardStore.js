import { defineStore } from 'pinia';
import axios from 'axios';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    boardList: [],
    boardFiles: [],
    currentBoard: null,
    identifier: crypto.randomUUID(), // ✅ 작성 세션마다 고정된 identifier 생성
  }),

  actions: {
    async fetchBoardList() {
      try {
        const response = await axios.get('/api/board');
        this.boardList = response.data;
        console.log('게시글 목록 조회 성공:', this.boardList);
      } catch (error) {
        console.error('게시글 목록 조회 오류:', error);
      }
    },

    async fetchBoardDetail(boardIdx) {
      try {
        const boardRes = await axios.get(`/api/board/${boardIdx}`);
        this.currentBoard = boardRes.data;
        console.log('게시글 상세 조회 성공:', this.currentBoard);

        const filesRes = await axios.get(`/api/board/${boardIdx}/files`);
        this.boardFiles = filesRes.data;
        console.log('게시글 파일 목록:', this.boardFiles);
      } catch (error) {
        console.error('게시글 상세 조회 오류:', error);
      }
    },

    async uploadTempImage(file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('/api/board/files/temp-image', formData, {
          params: { identifier: this.identifier }, // ✅ 임시 이미지 식별자 전달
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        const s3Key = response.data.data.imageUrl; // ✅ 이렇게 수정해야 함
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
      
          // ✅ 임시 이미지 연결 요청 (identifier 포함)
          await axios.post(`/api/board/files/${boardIdx}/link-temp-images`, null, {
            params: { identifier: this.identifier }
          });
      
          // ✅ 첨부파일 처리
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
      
              // ✅ 구조 바로 여기서 추출 (중첩 .data 아님)
              const { presignedUrl, finalUrl } = presignedRes.data;
      
              if (!presignedUrl || !finalUrl) {
                console.error('프리사인드 URL 누락:', presignedRes.data);
                continue;
              }
      
              // ✅ S3에 PUT 업로드
              await axios.put(presignedUrl, file, {
                headers: { 'Content-Type': file.type }
              });
      
              // ✅ 파일 DB 등록
              const filesPayload = {
                boardIdx: boardIdx,       // ✅ 변수명 통일
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
