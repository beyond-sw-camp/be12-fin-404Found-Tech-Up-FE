<template>
  <NuxtLayout>
    <NuxtPage />
    <modal-product />
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/pinia/useUserStore'
import { useNuxtApp } from '#app'

const userStore = useUserStore()
const { $connectWebSocket } = useNuxtApp()

onMounted(() => {
  if (userStore.user?.userIdx) {
    $connectWebSocket(userStore.user.userIdx)
  }
})
/*
import { useProductFilterStore } from './pinia/useProductFilterStore';
import { useUtilityStore } from './pinia/useUtilityStore';

const route = useRoute();
const prdFilterStore = useProductFilterStore();
const utilsStore = useUtilityStore();

watch(() => route.path, () => {
  prdFilterStore.$reset
  prdFilterStore.handleResetFilter();
  utilsStore.removeBackdrop();
})
*/

</script>
