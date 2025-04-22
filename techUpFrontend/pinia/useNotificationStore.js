// /pinia/useNotificationStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotificationStore = defineStore('notificationStore', {
  state: () => ({
    notifications: [],
    size: 10,
    totalElements: 0,
    totalPages: 0,
    unreadCount: 0
  }),
  actions: {
    async fetchNotifications(page = 0, size = 10) {
      try {
        const res = await axios.get(`/api/notification?page=${page}&size=${size}`)
        const d = res.data.data
        this.notifications   = d.notifications
        this.size            = d.size
        this.totalElements   = d.totalElements
        this.totalPages      = d.totalPages
      } catch (e) {
        console.error(e)
      }
    },
    async fetchUnreadCount() {
      try {
        const res = await axios.get('/api/notification/unread')
        this.unreadCount = res.data.length
      } catch {
        this.unreadCount = 0
      }
    }
  }
})
