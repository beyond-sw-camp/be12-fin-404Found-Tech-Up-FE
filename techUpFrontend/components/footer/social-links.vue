<template>
  <a v-for="item in social_data" :key="item.id" :href="item.link">
    <i :class="item.icon"></i>
  </a>
</template>

<script setup lang="ts">
const social_data: {
  id: number;
  link: string;
  icon: string;
  title: string;
}[] = [
    {
      id: 1,
      link: "https://github.com/beyond-sw-camp/be12-fin-404Found-Tech-Up-FE",
      icon: "fa-brands fa-github",
      title: "Frontend",
    },
    {
      id: 2,
      link: "https://github.com/beyond-sw-camp/be12-fin-404Found-Tech-Up-BE",
      icon: "fa-brands fa-github",
      title: "Backend",
    },
  ];
</script>
