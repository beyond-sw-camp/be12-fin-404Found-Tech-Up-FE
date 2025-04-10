import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({}),
  actions: {
    async verifyNickname(nickname) {
        try {
            const response = await axios.post('/api/user/verify/nickname', { nickname });
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
  },
});