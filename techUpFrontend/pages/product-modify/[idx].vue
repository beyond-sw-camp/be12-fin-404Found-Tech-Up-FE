<template>
  <admin-area-device-register :modify="true" :idx="route.params.idx" />
</template>
<script setup>
import { useRoute } from 'vue-router';

const route = useRoute(); // route.params.idx

</script>