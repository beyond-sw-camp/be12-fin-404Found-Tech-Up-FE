<template>
  <div>
    <!-- event area start -->
    <event-area />
    <!-- event area end -->
  </div>
</template>

<script setup>
useSeoMeta({ title: "이벤트 - Tech Up" });

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
