<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb-4 title="Wishlist" subtitle="Wishlist" />
    <!-- breadcrumb end -->

    <!-- wishlist area start -->
    <wishlist-area />
    <!-- wishlist area end -->
  </div>
</template>

<script setup>
import { useUserStore } from '@/pinia/useUserStore';
useSeoMeta({ title: "Wishlist Page" });

const userStore = useUserStore();

onMounted(async () => {
  await userStore.checkAuth();
  if(!userStore.isLoggedIn) {
    alert('로그인 후 이용해주세요.');
    window.location.href = '/login';
  } else {
    console.log('로그인 상태:', userStore.isLoggedIn);
  }
});
</script>