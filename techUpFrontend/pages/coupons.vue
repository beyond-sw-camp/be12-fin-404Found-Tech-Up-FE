<template>
  <div>
    <!-- coupon area start -->
    <coupon-area />
    <!-- coupon area end -->
  </div>
</template>

<script setup>
import { useSeoMeta } from 'nuxt/app';
useSeoMeta({ title: "Coupon Page" });

import { navigateTo } from 'nuxt/app';
import { useUserStore } from '../pinia/useUserStore.js';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUserInfo();
  if (!userStore.$state.user) {
    alert("로그인이 필요합니다!");
    navigateTo("/login");
  }

});

</script>
