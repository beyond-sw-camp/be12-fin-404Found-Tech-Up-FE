<template>
    <div class="tp-blog-item-2 mb-40">
      <div class="tp-blog-thumb-2 p-relative fix">
        <nuxt-link :href="`/blog-details/${props.item.id}`">
          <img :src="props.item.img" alt="blog-img" />
        </nuxt-link>
        <div class="tp-blog-meta-date-2">
          <span>{{ props.item.date }}</span>
        </div>
      </div>
      <div class="tp-blog-content-2 has-thumbnail">
        <div class="tp-blog-meta-2">
          <span>
            <svg-tag-icon />{" "}
          </span>
          <a v-for="(t, i) in props.item.tags" :key="i" href="#">
            {{ t }}
            {{ i < props.item.tags.length - 1 && "," }}
          </a>
        </div>
        <h3 class="tp-blog-title-2">
          <nuxt-link :href="`/blog-details/${props.item.id}`">{{ props.item.title }}</nuxt-link>
        </h3>
      </div>
    </div>
  </template>
  
  <script setup lang="js">
  const props = defineProps({
    item: Object
  });
  </script>
  