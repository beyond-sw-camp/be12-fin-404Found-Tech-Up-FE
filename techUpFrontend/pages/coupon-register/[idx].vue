<script setup>
import { useSeoMeta } from 'nuxt/app';
import { ref } from 'vue';
useSeoMeta({ title: 'Admin dashboard - Tech Up' })

</script>

<template>
  <admin-area-coupon-register />
</template>
