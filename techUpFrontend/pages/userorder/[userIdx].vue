<script setup>
import { useSeoMeta } from 'nuxt/app';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useAdminStore } from '../../pinia/useAdminStore';

const route = useRoute();
useSeoMeta({ title: 'User\'s order - Tech Up' });

const adminStore = useAdminStore();

onMounted(async () => {
  await adminStore.loadUserOrder(route.params.userIdx);
});

</script>

<template>
  <admin-area-userorder :idx="route.params.userIdx" />
</template>