<template>
  <nav class="tp-main-menu-content" style="background-color: white;">
    <ul v-for="(menu, i) in mobile_menu" :key="i">
      <li :key="i">
        <nuxt-link :to="menu.link">{{ menu.title }}</nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { mobile_menu } from "@/data/menu-data.js";
</script>
