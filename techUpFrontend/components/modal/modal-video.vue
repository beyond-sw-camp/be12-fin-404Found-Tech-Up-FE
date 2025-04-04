<template>
  <div id="video-overlay" class="video-overlay" @click="utilsStore.closeVideo">
    <a class="video-overlay-close" @click.prevent="utilsStore.closeVideo">×</a>
  </div>
</template>

<script setup>
import { onBeforeUnmount } from 'vue';
import { useUtilityStore } from '@/pinia/useUtilityStore';

const utilsStore = useUtilityStore();

onBeforeUnmount(() => {
  utilsStore.closeVideo();
});
</script>
