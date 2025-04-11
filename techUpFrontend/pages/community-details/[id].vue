<template>
    <div v-if="community">
      <!-- community details area start -->
      <community-details-area :blog="community" />
      <!-- community details area end -->
    </div>
  </template>
  
  <script setup lang="js">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import communityData from '@/data/community-data';
  
  const route = useRoute();
  const community = ref();
  
  useSeoMeta({ title: '커뮤니티 상세 페이지' });
  
  onMounted(() => {
    community.value = communityData.find(
      (b) => Number(b.id) === Number(route.params.id)
    );
  });
  </script>
  