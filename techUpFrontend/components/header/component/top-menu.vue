<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/pinia/useUserStore'; // Pinia 스토어 가져오기
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from '@/pinia/useWishlistStore';

const userStore = useUserStore(); // 스토어 초기화
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const router = useRouter();

let isActive = ref<string>('')
// handle active
const handleActive = (type: string) => {
  if (type === isActive.value) {
    isActive.value = ''
  }
  else {
    isActive.value = type
  }
}

// 로그아웃 처리
const handleLogout = async () => {
  try {
    const response = await userStore.logout();
    cartStore.fetchCartProducts();
    wishlistStore.fetchWishlist();
    console.log("Logout success:", response);
    alert('로그아웃이 완료되었습니다.');
    router.push('/login');
  } catch (error) {
    console.error('Logout error:', error);
    alert('로그아웃 중 오류가 발생했습니다.');
  }
};

// 컴포넌트가 마운트될 때 사용자 정보 가져오기
onMounted(async () => {
  await userStore.checkAuth();
  console.log('App.vue에서 확인한 로그인 상태:', userStore.isLoggedIn);
});
</script>

<template>
  <div class="tp-header-top-menu d-flex align-items-center justify-content-end">
    <div class="tp-header-top-menu-item tp-header-lang">
      <span @click="handleActive('lang')" class="tp-header-lang-toggle" id="tp-header-lang-toggle">Korean</span>
      <ul :class="`${isActive === 'lang' ? 'tp-lang-list-open' : ''}`">
        <li>
          <a href="#">English</a>
        </li>
        <li>
          <a href="#">Korean</a>
        </li>
      </ul>
    </div>
    <div class="tp-header-top-menu-item tp-header-currency">
      <span @click="handleActive('currency')" class="tp-header-currency-toggle"
        id="tp-header-currency-toggle">KRW</span>
      <ul :class="`${isActive === 'currency' ? 'tp-currency-list-open' : ''}`">
        <li>
          <a href="#">KRW</a>
        </li>
        <li>
          <a href="#">USD</a>
        </li>
      </ul>
    </div>
    <div class="tp-header-top-menu-item tp-header-setting">
      <span @click="handleActive('setting')" class="tp-header-setting-toggle" id="tp-header-setting-toggle">설정</span>
      <ul :class="`${isActive === 'setting' ? 'tp-setting-list-open' : ''}`">
        <li>
          <nuxt-link href="/profile">내 프로파일</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/wishlist">위시리스트</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/cart">장바구니</nuxt-link>
        </li>
        <li v-if="!userStore.isLoggedIn">
          <nuxt-link href="/login">로그인</nuxt-link>
        </li>
        <li v-else>
          <nuxt-link class="tp-logout" @click="handleLogout">로그아웃</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tp-logout {
  font-size: 14px;
  color: var(--tp-common-black);
}
</style>