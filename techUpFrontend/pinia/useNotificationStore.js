// /pinia/useNotificationStore.js
import { defineStore } from 'pinia'
import { useUserStore } from './useUserStore'
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
        console.error('fetchNotifications 실패:', e)
      }
    },

    async fetchUnreadCount() {
      try {
        const userStore = useUserStore()
    
        if (!userStore.isLoggedIn) {
          this.unreadCount = 0
          return
        }
    
        const res = await axios.get('/api/notification/unread/count')
    
        console.log('안읽은 알림 갯수', res.data)
        this.unreadCount = res.data.data
      } catch (e) {
        console.error('알림 조회 실패', e)
        this.unreadCount = 0
      }
    },

    async markAsRead(id) {
      try {
        await axios.patch(`/api/notification/${id}/read`)
        const target = this.notifications.find(n => n.id === id)
        if (target) {
          target.read = true
        }
      } catch (e) {
        console.error('markAsRead 실패:', e)
      }
    },

    async deleteNotification(id) {
      try {
        await axios.delete(`/api/notification/${id}`)
        this.notifications = this.notifications.filter(n => n.id !== id)
        this.totalElements--
      } catch (e) {
        console.error('deleteNotification 실패:', e)
      }
    }
  }
})
