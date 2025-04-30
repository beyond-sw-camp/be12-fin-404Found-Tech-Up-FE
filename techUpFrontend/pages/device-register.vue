<script setup>
import { useSeoMeta } from 'nuxt/app';
useSeoMeta({ title: 'Admin dashboard - Tech Up' })

import { navigateTo } from 'nuxt/app';
import { useUserStore } from '../pinia/useUserStore.js';

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUserInfo();
  if (!userStore.$state.user || !userStore.$state.user.isAdmin) {
    alert("관리자만 이 페이지를 볼 수 있습니다!");
    navigateTo("/login");
  }

});
</script>

<template>
  <admin-area-device-register />
</template>
