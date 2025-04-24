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

    // 기타
    boardFiles: [],
    currentBoard: null,
    identifier: crypto.randomUUID(),
  }),

  actions: {
    async fetchBoardList({
      page = 0,
      size = 10,
      sort = 'boardCreated',
      direction = 'desc',
      category = null,
      search = null,
      type = null
    } = {}) {
      try {
        const params = { page, size, sort, direction }
        if (category) params.category = category
        if (search)   params.search   = search
        if (type)     params.type     = type

        const { data } = await axios.get('/api/board/list', { params })
        if (data?.data) {
          this.boardList     = data.data.boardList
          this.totalElements = data.data.totalElements
        } else {
          this.boardList     = []
          this.totalElements = 0
        }
      } catch (e) {
        console.error('게시글 목록 조회 오류:', e)
        this.boardList     = []
        this.totalElements = 0
      }
    },

    async fetchLatest(params = {}) {
      return this.fetchBoardList({ ...params, sort: 'boardCreated', direction: 'desc' })
    },
    async fetchPopular(params = {}) {
      return this.fetchBoardList({ ...params, sort: 'boardLikes', direction: 'desc' })
    },
    async fetchByComments(params = {}) {
      return this.fetchBoardList({ ...params, sort: 'boardComments', direction: 'desc' })
    },

    async fetchBoardDetail(boardIdx) {
      try {
        const boardRes = await axios.get(`/api/board/read/${boardIdx}`)
        if (boardRes.data && boardRes.data.isSuccess && boardRes.data.data) {
          this.currentBoard = boardRes.data.data
          console.log('게시글 상세 조회 성공:', this.currentBoard)
        } else {
          console.error('게시글 상세 조회 실패: 응답 형식 오류', boardRes.data)
          this.currentBoard = null
        }
      } catch (error) {
        console.error('게시글 상세 조회 오류:', error)
        this.currentBoard = null
      }
    },

    async uploadTempImage(file) {
      try {
        const formData = new FormData()
        formData.append('file', file)
        const response = await axios.post('/api/board/files/temp-image', formData, {
          params: { identifier: this.identifier },
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        return response.data.data.imageUrl
      } catch (error) {
        console.error('임시 이미지 업로드 오류:', error)
        throw error
      }
    },

    async createBoard({ boardTitle, boardContent, boardCategory, userIdx, attachments = [] }) {
      try {
        const boardPayload = { boardTitle, boardContent, boardCategory, userIdx }
        const boardRes = await axios.post('/api/board/create', boardPayload)
        const boardIdx = boardRes.data.data.idx

        await axios.post(`/api/board/files/${boardIdx}/link-temp-images`, null, {
          params: { identifier: this.identifier }
        })

        for (const file of attachments) {
          const fileType = file.type.includes('image') ? 'image' : 'file'
          const presignedRes = await axios.get('/api/board/files/presignedUrl', {
            params: {
              board_idx: boardIdx,
              files_type: fileType,
              files_name: file.name
            }
          })

          const { presignedUrl, finalUrl } = presignedRes.data
          if (!presignedUrl || !finalUrl) continue

          await axios.put(presignedUrl, file, {
            headers: { 'Content-Type': file.type }
          })

          const filesPayload = {
            boardIdx,
            filesUrl: finalUrl,
            filesType: fileType,
            filesName: file.name
          }

          await axios.post('/api/board/files', filesPayload)
        }

        return boardRes.data
      } catch (error) {
        console.error('게시글 생성 오류:', error)
        throw error
      }
    },

    async updateBoard(boardIdx, { boardTitle, boardContent, boardCategory, attachments = [] }) {
      try {
        const payload = { boardTitle, boardContent, boardCategory }
        await axios.patch(`/api/board/update/${boardIdx}`, payload)

        for (const file of attachments) {
          const fileType = file.type.includes('image') ? 'image' : 'file'
          const presignedRes = await axios.get('/api/board/files/presignedUrl', {
            params: {
              board_idx: boardIdx,
              files_type: fileType,
              files_name: file.name
            }
          })

          const { presignedUrl, finalUrl } = presignedRes.data
          if (!presignedUrl || !finalUrl) continue

          await axios.put(presignedUrl, file, {
            headers: { 'Content-Type': file.type }
          })

          const filesPayload = {
            boardIdx,
            filesUrl: finalUrl,
            filesType: fileType,
            filesName: file.name
          }

          await axios.post('/api/board/files', filesPayload)
        }
      } catch (error) {
        console.error('게시글 수정 오류:', error)
        throw error
      }
    },

    async deleteBoard(boardIdx) {
      try {
        await axios.delete(`/api/board/delete/${boardIdx}`)
        this.currentBoard = null
      } catch (error) {
        console.error('게시글 삭제 오류:', error)
        throw error
      }
    },

    async deleteBoardFile(filesIdx) {
      try {
        await axios.delete(`/api/board/files/${filesIdx}`)
        this.boardFiles = this.boardFiles.filter(file => file.files_idx !== filesIdx)
      } catch (error) {
        console.error('파일 삭제 오류:', error)
      }
    },

    async toggleLike(boardIdx, likesType) {
      try {
        const payload = { likesType }
        await axios.post(`/api/likes/toggle/${boardIdx}`, payload)
        await this.fetchBoardDetail(boardIdx)
        console.log(`토글 완료: ${likesType ? '👍 좋아요' : '👎 싫어요'}`)
      } catch (error) {
        console.error('좋아요/싫어요 토글 오류:', error)
      }
    },

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
  }
})
