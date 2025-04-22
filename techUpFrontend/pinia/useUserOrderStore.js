import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserOrderStore = defineStore('userOrder', {
  state: () => ({
    orderList: []
  }),
  actions: {
    async fetchMyOrderList() {
      try {
        const res = await axios.get('/api/order/history')
        this.orderList = res.data.data
        console.log('내 주문 정보:', this.orderList)
      } catch (err) {
        console.error('내 주문 목록 조회 실패:', err)
      }
    }
  }
})
