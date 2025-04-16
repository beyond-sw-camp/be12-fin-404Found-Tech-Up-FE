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

definePageMeta({
  middleware(to, from) {
    const userStore = useUserStore();
    if (!userStore.isLoggedIn) {
      return navigateTo('/login');
    }
  }
});
</script>