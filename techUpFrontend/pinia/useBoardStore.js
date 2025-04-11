import { defineStore } from 'pinia';
import axios from 'axios';

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    // 게시글 목록
    boardList: [],
    // 현재 게시글에 대한 첨부파일 목록
    boardFiles: [],
    // 단일 게시글 상세 정보 (선택)
    currentBoard: null
  }),

  actions: {
    /**
     * 게시글 목록 조회
     */
    async fetchBoardList() {
      try {
        const response = await axios.get('/api/board');
        this.boardList = response.data;
        console.log('게시글 목록 조회 성공:', this.boardList);
      } catch (error) {
        console.error('게시글 목록 조회 오류:', error);
      }
    },

    /**
     * 단일 게시글 상세 조회 (board_idx)
     * 조회 후 boardFiles도 함께 가져옴
     * @param {Number} boardIdx 
     */
    async fetchBoardDetail(boardIdx) {
      try {
        // 1) 게시글 상세정보
        const boardRes = await axios.get(`/api/board/${boardIdx}`);
        this.currentBoard = boardRes.data;
        console.log('게시글 상세 조회 성공:', this.currentBoard);

        // 2) 해당 게시글 파일목록
        const filesRes = await axios.get(`/api/board/${boardIdx}/files`);
        this.boardFiles = filesRes.data;
        console.log('게시글 파일 목록:', this.boardFiles);
      } catch (error) {
        console.error('게시글 상세 조회 오류:', error);
      }
    },

    /**
     * 게시글 작성 (board + board_files)
     * 1) board 등록
     * 2) attachments(첨부파일) 있을 경우, presigned URL -> S3 업로드 -> board_files 테이블에 INSERT
     * @param {Object} params
     * @param {String} params.board_title
     * @param {String} params.board_content
     * @param {String} params.board_category
     * @param {Number} params.user_idx
     * @param {Array} params.attachments (File[]) 업로드할 파일 목록
     */
    async createBoard({
      board_title,
      board_content,
      board_category,
      user_idx,
      attachments = []
    }) {
      try {
        // 1) board 테이블에 INSERT
        const boardPayload = {
          board_title,
          board_content,
          board_category,
          user_idx
          // board_joayo, board_unlikes는 필요한 경우 여기서 초기값 (ex: 0)
        };
        const boardRes = await axios.post('/api/board', boardPayload);
        const createdBoard = boardRes.data; 
        console.log('게시글 생성 완료:', createdBoard);

        // createdBoard.board_idx를 얻었다고 가정
        const boardIdx = createdBoard.board_idx;

        // 2) 첨부파일들 업로드 (if any)
        if (attachments.length > 0) {
          // 파일을 순회하며 각각 업로드
          for (const file of attachments) {
            // (1) presigned URL 요청
            const fileType = file.type.includes('image') ? 'image' : 'file'; // 간단 구분
            const presignedRes = await axios.get('/api/board/files/presignedUrl', {
              params: {
                board_idx: boardIdx,
                files_type: fileType,
                files_name: file.name
              }
            });
            const { presignedUrl, finalUrl } = presignedRes.data;
            console.log('presignedUrl 응답:', presignedUrl, finalUrl);

            // (2) S3 업로드
            await axios.put(presignedUrl, file, {
              headers: {
                'Content-Type': file.type
              }
            });
            console.log('S3 업로드 완료:', finalUrl);

            // (3) board_files 테이블에 INSERT
            const filesPayload = {
              board_idx: boardIdx,
              files_url: finalUrl,
              files_type: fileType,
              files_name: file.name
            };
            const filesRes = await axios.post('/api/board/files', filesPayload);
            console.log('파일 DB 저장 완료:', filesRes.data);
          }
        }

        // 옵션: 게시글 목록을 다시 로딩 or 페이지 이동
        // await this.fetchBoardList();

        return createdBoard;
      } catch (error) {
        console.error('게시글 생성 오류:', error);
        throw error;
      }
    },

    /**
     * 파일 삭제
     * @param {Number} filesIdx - board_files PK
     */
    async deleteBoardFile(filesIdx) {
      try {
        const response = await axios.delete(`/api/board/files/${filesIdx}`);
        console.log('파일 삭제 성공:', response.data);
        // 스토어에서도 제거
        this.boardFiles = this.boardFiles.filter(file => file.files_idx !== filesIdx);
      } catch (error) {
        console.error('파일 삭제 오류:', error);
      }
    }
  }
});
