import { defineStore } from 'pinia'
import axios from 'axios'

export const useCommentStore = defineStore('commentStore', {
  state: () => ({
    commentList: [],
    isSubmitting: false
  }),

  actions: {
    async fetchComments(boardIdx) {
      try {
        const res = await axios.get(`/api/comment/list/${boardIdx}`);
        console.log(res.data);
        console.log(res.data.data);
        this.commentList = res.data.data || [];
      } catch (err) {
        console.error('댓글 목록 조회 실패:', err);
        this.commentList = [];
      }
    },

    async createComment(boardIdx, content) {
      if (!content || !content.trim()) return;

      this.isSubmitting = true;
      try {
        await axios.post(`/api/comment/create/${boardIdx}`, {
          commentContent: content,
        });
        await this.fetchComments(boardIdx);
      } catch (err) {
        console.error('댓글 작성 실패:', err);
        throw err;
      } finally {
        this.isSubmitting = false;
      }
    },

    async deleteComment(commentIdx, boardIdx) {
      try {
        await axios.delete(`/api/comment/delete/${commentIdx}`);
        await this.fetchComments(boardIdx);
      } catch (error) {
        console.error('댓글 삭제 오류:', error);
      }
    },
    async updateComment(commentIdx, boardIdx, newContent) {
        if (!newContent || !newContent.trim()) return;
      
        this.isSubmitting = true;
        try {
          await axios.patch(`/api/comment/update/${commentIdx}`, {
            commentContent: newContent
          });
          await this.fetchComments(boardIdx);
        } catch (error) {
          console.error('댓글 수정 오류:', error);
          throw error;
        } finally {
          this.isSubmitting = false;
        }
      }
      
  }
});
