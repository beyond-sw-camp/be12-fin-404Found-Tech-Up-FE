import { defineStore } from 'pinia';
import axios from 'axios';
import { connectWebSocket } from '../plugins/ws.client';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // 사용자 정보 저장
    token: null,
  }),
  actions: {
    async verifyNickname(nickname) {
        try {
            const response = await axios.post('/api/user/verify/nickname', { userNickname: nickname }, // JSON 데이터
                { headers: { 'Content-Type': 'application/json' } }); // 헤더 설정
            return response.data; // { success: true/false }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
            throw error;
        }
    },
    async signup(user) {
        try {
            const response = await axios.post(`/api/user/signup`, user);
            return response.data;
        } catch (error) {
            console.error("Signup error", error.response ? error.response.data : error.message);
            throw error;
        }
    },
    async login(user) {
        try {
            const response = await axios.post(`/api/login`, user);
            const success = await this.fetchUserInfo();
            if (!success) {
                throw new Error('유저 정보 가져오기 실패');
            }
            connectWebSocket(this.user.userIdx)
            return response.data;
        } catch (error) {
            console.error("Login error", error.response ? error.response.data : error.message);
            throw error;
        }
    },

    async fetchUserInfo() {
        try {
          const response = await axios.get('/api/user/auth/me');
          console.log('로그인 후 정보', response.data);
          console.log('셋되는 유저 정보', response.data.data);
          this.user = response.data.data; // 여기 고침
          return true;
        } catch (error) {
          console.error("Failed to fetch user info", error.response?.data || error.message);
          this.user = null;
          return false;
        }
      }
      

  },
});