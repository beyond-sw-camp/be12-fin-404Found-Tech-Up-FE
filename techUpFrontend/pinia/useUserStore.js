import { defineStore } from 'pinia';
import axios from 'axios';
import { useNuxtApp } from '#app'; // ✅ Nuxt 플러그인 접근을 위한 import

export const useUserStore = defineStore('user', {
  state: () => ({
    isLoggedIn: null,
    userInfo: [],
    user: null,
    alarmEnabled: false,
  }),
  actions: {
    async checkAuth() {
      try {
        const response = await axios.get('/api/user/check-auth', { withCredentials: true });
        this.isLoggedIn = response.data.data.isAuthenticated || false;
        return this.isLoggedIn;
      } catch (error) {
        console.error('인증 상태 확인 실패:', error);
        this.isLoggedIn = false;
        return false;
      }
    },

    async verifyNickname(nickname) {
      try {
        const response = await axios.post('/api/user/verify/nickname', { userNickname: nickname });
        return response.data;
      } catch (error) {
        console.error('verifyNickname 오류:', error);
        throw error;
      }
    },

    async sendEmail(email, issign) {
      try {
        const response = await axios.post('/api/user/email', { userEmail: email, isSignup: issign });
        return response.data;
      } catch (error) {
        console.error('sendEmail 오류:', error);
        throw error;
      }
    },

    async verifyEmail(email, code) {
      try {
        const response = await axios.post('/api/user/verify/email', { userEmail: email, inputCode: code });
        return response.data;
      } catch (error) {
        console.error('verifyEmail 오류:', error);
        throw error;
      }
    },

    async editPwd(user) {
      try {
        const response = await axios.post(`/api/user/edit/password`, user);
        return response.data;
      } catch (error) {
        console.error("editPwd 오류:", error);
        throw error;
      }
    },

    async updatePwd(userInfo) {
      try {
        const response = await axios.post(`/api/user/update/password`, userInfo);
        return response.data;
      } catch (error) {
        console.error("updatePwd 오류:", error);
        throw error;
      }
    },

    async signup(user) {
      try {
        const response = await axios.post(`/api/user/signup`, user);
        return response.data;
      } catch (error) {
        console.error("signup 오류:", error);
        throw error;
      }
    },

    async login(user) {
      try {
        const response = await axios.post(`/api/login`, user);
        const success = await this.fetchUserInfo();
        if (!success) throw new Error('유저 정보 가져오기 실패');

       //const { $connectWebSocket } = useNuxtApp(); // ✅ Nuxt 플러그인으로부터 가져옴
       //$connectWebSocket(this.user.userIdx);

        return response.data;
      } catch (error) {
        console.error("login 오류:", error);
        throw error;
      }
    },

    async fetchUserInfo() {
      try {
        const response = await axios.get('/api/user/auth/me');
        this.user = response.data.data;
        console.log('유저정보 : ', this.user);
        return true;
      } catch (error) {
        console.error("fetchUserInfo 오류:", error);
        this.user = null;
        return false;
      }
    },

    async logout() {
      try {
        const response = await axios.post(`/api/user/logout`);
        this.isLoggedIn = false;
        return response.data;
      } catch (error) {
        console.error("logout 오류:", error);
        throw error;
      }
    },

    async myinfo() {
      try {
        const response = await axios.get('/api/user/mypage');
        this.userInfo = response.data.data;
      } catch (error) {
        console.error('myinfo 오류:', error);
        throw error;
      }
    },

    async updateProfile(userInfo) {
      try {
        const response = await axios.post(`/api/user/updateprofile`, userInfo);
        return response.data;
      } catch (error) {
        console.error("updateProfile 오류:", error);
        throw error;
      }
    },

    async issueEventCoupon(eventIdx) {
      try {
        await axios.get(`/api/coupon/events/${eventIdx}`);
      } catch (e) {
        alert("쿠폰 발급에 실패했습니다");
      }
    },

    async deleteAccount() {
      try {
        const response = await axios.delete('/api/user/delete');
        return response.data;
      } catch (error) {
        console.error("deleteAccount 오류:", error);
        throw error;
      }
    },

    async fetchAlarmEnabled() {
      try {
        const resp = await axios.get('/api/user/alarm', { withCredentials: true })
        // BaseResponse<data> 구조를 풀어줍니다
        const alarm = resp.data?.data?.alarmEnabled
        if (typeof alarm === 'boolean') {
          this.alarmEnabled = alarm
          return alarm
        }
        console.warn('알람 설정 데이터가 없습니다', resp.data)
        return null
      } catch (e) {
        console.error('fetchAlarmEnabled 오류:', e)
        return null
      }
    },

    // ——————————————
    // 서버에 알림 설정(on/off) 반영
    async setAlarmEnabled(enabled) {
      try {
        console.log('알림 설정 클릭');
        await axios.patch(
          '/api/user/alarm',
          { alarmEnabled: enabled },
          { withCredentials: true }
        )
        this.alarmEnabled = enabled
        return true
      } catch (e) {
        console.error('setAlarmEnabled 오류:', e)
        return false
      }
    },

  },
});
