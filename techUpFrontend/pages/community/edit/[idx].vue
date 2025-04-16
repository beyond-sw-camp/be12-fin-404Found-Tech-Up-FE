<template>
    <community-write-form :is-edit="true" :post-id="postId" />
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import CommunityWriteForm from '@/components/community/form/community-write-form.vue'
  
  const route = useRoute()
  const postId = route.params.idx
  </script>
  