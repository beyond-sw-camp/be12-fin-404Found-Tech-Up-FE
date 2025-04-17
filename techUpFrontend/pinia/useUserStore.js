import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: null, // 로그인 상태 추가
    userInfo: [], // 사용자 정보 추가
  }),
  actions: {
    async checkAuth() {
        try {
            const response = await axios.get('/api/user/check-auth', {
                withCredentials: true, // HttpOnly 쿠키 포함
            });
            this.isLoggedIn = response.data.data.isAuthenticated || false;
            console.log('인증 상태:', this.isLoggedIn);
            return this.isLoggedIn;
        } catch (error) {
            console.error('인증 상태 확인 실패:', error);
            this.isLoggedIn = false;
            return false;
        }
    },
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
    async sendEmail(email, issign) {
        try {
            const response = await axios.post('/api/user/email', { userEmail: email, isSignup: issign }, // JSON 데이터
                { headers: { 'Content-Type': 'application/json' } }); // 헤더 설정
            return response.data; // { success: true/false }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
            throw error;
        }
    },
    async verifyEmail(email, code) {
        try {
            const response = await axios.post('/api/user/verify/email', { userEmail: email, inputCode: code }, // JSON 데이터
                { headers: { 'Content-Type': 'application/json' } }); // 헤더 설정
            return response.data; // { success: true/false }
        } catch (error) {
            console.error('API 요청 중 오류 발생:', error);
            throw error;
        }
    },
    async editPwd(user) {
        try {
            const response = await axios.post(`/api/user/edit/password`, user);
            return response.data;
        } catch (error) {
            console.error("Signup error", error.response ? error.response.data : error.message);
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
    async myinfo() {
        try {
          const response = await axios.get('/api/user/mypage'); // 사용자 정보 API 호출
          this.userInfo = response.data.data; // 상태 업데이트
          console.log('사용자 정보:', this.userInfo);
        } catch (error) {
          console.error('사용자 정보 가져오기 실패:', error);
          throw error; // 에러를 호출한 곳으로 전달
        }
    },
    async updateProfile(userInfo) {
        try {
            const response = await axios.post(`/api/user/updateprofile`, userInfo);
            return response.data;
        } catch (error) {
            console.error("updateProfile error", error.response ? error.response.data : error.message);
            throw error;
        }
    },
  },
});