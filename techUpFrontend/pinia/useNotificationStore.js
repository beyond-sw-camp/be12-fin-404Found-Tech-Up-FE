// /pinia/useNotificationStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    unreadCount: 0,
  }),
  actions: {
    async fetchUnreadCount() {
      try {
        const res = await axios.get('/api/notification/unread')
        this.unreadCount = res.data.length
      } catch (e) {
        // 로그인 안되어 있을 경우에도 에러 출력 없이 0으로 설정
        this.unreadCount = 0
      }
    }
  }
})
