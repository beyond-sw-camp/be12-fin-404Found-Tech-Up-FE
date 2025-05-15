<template>
  <nav class="tp-main-menu-content">
    <div v-for="(menu, i) in mobile_menu" :key="i" style="margin-bottom: 1em;">
      <nuxt-link :to="menu.link">{{ menu.title }}</nuxt-link>
    </div>
  </nav>
</template>

<script setup>
import { mobile_menu } from "@/data/menu-data.js";
</script>
