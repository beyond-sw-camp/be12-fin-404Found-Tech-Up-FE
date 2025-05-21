<template>
  <div>
    <!-- profile area start -->
    <profile-area />
    <!-- profile area end -->
  </div>
</template>

<script setup>
import { useUserStore } from '@/pinia/useUserStore';
useSeoMeta({ title: "Profile Page" });

const userStore = useUserStore();

onMounted(async () => {
  await userStore.fetchUserInfo();
  if (!userStore.$state.user) {
    alert("로그인이 필요합니다!");
    navigateTo("/login");
  }

});
</script>