import { defineStore } from 'pinia'
import axios from 'axios'

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    // 전체 글
    boardList: [],
    totalElements: 0,
    currentPage: 0,

    // 내 글 전용
    myPosts: [],
    myTotalElements: 0,
    myCurrentPage: 0,

    // 기타…
    boardFiles: [],
    currentBoard: null,
    identifier: crypto.randomUUID(),
  }),

  actions: {
    // …기존 fetchBoardList, fetchBoardDetail, create/update/delete 등 액션…

    /**
     * 로그인 유저 본인이 쓴 글만 가져오기
     * @param {Object} opts
     * @param {number} opts.page 서버 0-based page
     * @param {number} opts.size 페이지당 건수
     */
    async fetchMyPosts({ page = 0, size = 10 } = {}) {
      try {
        const { data } = await axios.get('/api/board/my-list', {
          params: { page, size },
          withCredentials: true
        })
        if (data?.data) {
          this.myPosts         = data.data.boardList
          this.myTotalElements = data.data.totalElements
          this.myCurrentPage   = data.data.page
        } else {
          this.myPosts         = []
          this.myTotalElements = 0
          this.myCurrentPage   = 0
        }
      } catch (e) {
        console.error('내 글 목록 조회 오류:', e)
        this.myPosts         = []
        this.myTotalElements = 0
        this.myCurrentPage   = 0
      }
    },
  },
})
