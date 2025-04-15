import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: false, // 로그인 상태 추가
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
            this.isLoggedIn = true;
            return response.data;
        } catch (error) {
            console.error("Login error", error.response ? error.response.data : error.message);
            throw error;
        }
    },
    async social() {
        try {
            const response = await axios.get(`/api/oauth2/authorization/kakao`, user);
            this.isLoggedIn = true;
            return response.data;
        } catch (error) {
            console.error("Login error", error.response ? error.response.data : error.message);
            throw error;
        }
    },
    async logout() {
        try {
            const response = await axios.post(`/api/user/logout`);
            this.isLoggedIn = false;
            return response.data;
        } catch (error) {
            console.error("logout error", error.response ? error.response.data : error.message);
            throw error;
        }
    },
  },
});