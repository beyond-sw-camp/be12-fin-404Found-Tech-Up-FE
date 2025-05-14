<template>
  <div class="tp-shop-widget-categories">
    <ul>
      <li>
        <a @click.prevent="selectCategory('')" :class="{ active: !route.query.category }">
          <button>전체 카테고리</button>
          <!-- <span>{{ products.length }}</span> -->
        </a>
      </li>
      <li v-for="cat in categories" :key="cat.id">
        <a @click.prevent="selectCategory(cat.slug)" :class="{ active: route.query.category === cat.slug }">
          <button>{{ cat.parent }}</button>
          <!-- <span>{{ cat.products.length }}</span> -->
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductFilterBackStore } from "@/pinia/useProductFilterBackStore";
import { navigateTo } from 'nuxt/app';

const route = useRoute();
const router = useRouter();
const store = useProductFilterBackStore();

const categories = computed(() => store.categories);
const products = computed(() => store.products);

async function selectCategory(slug) {
  const q = { ...router.currentRoute.value.query };
  if (slug) q.category = slug;
  else delete q.category;
  store.productFilter.category = slug.toUpperCase();
  await store.filterProducts(0, 10);
  navigateTo(`/shop?category=${slug}`);
}
</script>
