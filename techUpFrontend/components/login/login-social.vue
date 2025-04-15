<script setup>
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가

const userStore = useUserStore();
const router = useRouter();

// 카카오 로그인 처리 함수
const kakaoLogin = async () => {
  try {
    const Auth_url = '/api/oauth2/authorization/kakao';
    window.location.href = Auth_url;
    console.log("Login success:", response);
    alert('로그인이 완료되었습니다.');
    router.push('/'); // 로그인 성공 시 메인 페이지 경로로 이동

    // const response = await userStore.social();
  } catch (error) {
    console.error('카카오 로그인 에러:', error);
  }
};
</script>

<template>
  <div class="tp-login-social mb-10 d-flex flex-wrap align-items-center justify-content-center">
    <div class="tp-login-option-item has-kakao">
      <a href="#" @click="kakaoLogin" style="border: none;">
        <img src="/img/login/kakao_login_medium_narrow.png" alt="카카오 로그인" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.has-kakao > a {
  width: 12rem;
}
</style>