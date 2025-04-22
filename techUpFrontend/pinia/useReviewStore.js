import { defineStore } from 'pinia'
import axios from 'axios'
import { useRuntimeConfig } from '#imports'

export const useReviewStore = defineStore('review', {
  state: () => ({
    reviews: [],
  }),
  actions: {
    async fetchReviews(productIdx) {
      try {
        const config = useRuntimeConfig()
        const res = await axios.get(
          `/api/review/product/${productIdx}`,
          { baseURL: config.public.apiBaseUrl }
        )
        this.reviews = res.data.data || []
      } catch (err) {
        console.error('리뷰 불러오기 실패', err)
      }
    },

    /**
     * Create a new review, then prepend it into `reviews`
     * @param {number} productIdx
     * @param {{ reviewRating: number, reviewContent: string, reviewImg?: string }} payload
     */
    async createReview(productIdx, payload) {
      try {
        const config = useRuntimeConfig()
        const res = await axios.post(
          `/api/review/create/${productIdx}`,
          payload,
          { baseURL: config.public.apiBaseUrl }
        )
        const dto = res.data.data
        if (dto) this.reviews.unshift(dto)
        return dto
      } catch (err) {
        console.error('리뷰 작성 실패', err)
        throw err
      }
    },

    async deleteReview(reviewIdx) {
      try {
        const config = useRuntimeConfig()
        await axios.delete(
          `/api/review/delete/${reviewIdx}`,
          { baseURL: config.public.apiBaseUrl }
        )
        this.reviews = this.reviews.filter(r => r.reviewIdx !== reviewIdx)
      } catch (err) {
        console.error('리뷰 삭제 실패', err)
        throw err
      }
    }
  }
})
