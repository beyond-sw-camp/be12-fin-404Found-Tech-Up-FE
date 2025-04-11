import { defineStore } from 'pinia';
import axios from 'axios';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    boardList: [],
    boardFiles: [],
    currentBoard: null
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

    async uploadImageToS3(file, boardIdx) {
      try {
        const presignedRes = await axios.get('/api/board/files/presignedUrl', {
          params: {
            board_idx: boardIdx,
            files_type: 'image',
            files_name: file.name
          }
        });

        const { presignedUrl, finalUrl } = presignedRes.data;

        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type
          }
        });

        const filesPayload = {
          board_idx: boardIdx,
          files_url: finalUrl,
          files_type: 'image',
          files_name: file.name
        };

        await axios.post('/api/board/files', filesPayload);
        console.log('Quill 이미지 업로드 및 DB 등록 완료:', finalUrl);

        return finalUrl;
      } catch (error) {
        console.error('Quill 이미지 업로드 실패:', error);
        throw error;
      }
    },

    // 새로 추가: Base64 이미지를 S3에 업로드하는 메서드
    async uploadImage(formData) {
      try {
        // 임시 boardIdx 없이 이미지만 업로드 (임시 보관용)
        const response = await axios.post('/api/board/upload/temp-image', formData);

        // 업로드 결과에서 이미지 URL 반환
        return {
          success: true,
          imageUrl: response.data.imageUrl
        };
      } catch (error) {
        console.error('이미지 업로드 오류:', error);
        throw error;
      }
    },

    async createBoard({
      boardTitle,
      boardContent,
      boardCategory,
      userIdx,
      attachments = []
    }) {
      try {
        // 게시글 생성
        const boardPayload = {
          boardTitle,
          boardContent, // 이미 처리된 콘텐츠 (Base64 → S3 URL로 변환됨)
          boardCategory,
          userIdx
        };
        console.log('스토어 결과', boardPayload);
        const boardRes = await axios.post('/api/board/create', boardPayload);
        const createdBoard = boardRes.data;
        const boardIdx = createdBoard.board_idx;
        console.log('게시글 생성 완료:', createdBoard);

        // 게시글에 포함된 임시 이미지들을 해당 게시글과 연결
        await axios.post(`/api/board/${boardIdx}/link-temp-images`);

        // 첨부파일 처리 (이전과 동일)
        if (attachments.length > 0) {
          for (const file of attachments) {
            const fileType = file.type.includes('image') ? 'image' : 'file';
            const presignedRes = await axios.get('/api/board/files/presignedUrl', {
              params: {
                board_idx: boardIdx,
                files_type: fileType,
                files_name: file.name
              }
            });

            const { presignedUrl, finalUrl } = presignedRes.data;

            await axios.put(presignedUrl, file, {
              headers: {
                'Content-Type': file.type
              }
            });

            const filesPayload = {
              board_idx: boardIdx,
              files_url: finalUrl,
              files_type: fileType,
              files_name: file.name
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