<template>
  <admin-area-event-modify :idx="idx" />
</template>
<script setup>
import { useRoute } from 'vue-router';
const route = useRoute(); // route.params.idx
const idx = ref(parseInt(route.params.idx));
</script>