<template>
  <NuxtLayout>
    <NuxtPage />
    <modal-product />
  </NuxtLayout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/pinia/useUserStore'
import { useNuxtApp } from '#app'

const userStore = useUserStore()
const { $connectWebSocket } = useNuxtApp()

// ✅ 웹소켓 재연결 방지 플래그
const isWebSocketConnected = ref(false)

onMounted(() => {
  const userIdx = userStore.user?.userIdx

  if (userIdx && !isWebSocketConnected.value) {
    $connectWebSocket(userIdx)
    isWebSocketConnected.value = true
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
