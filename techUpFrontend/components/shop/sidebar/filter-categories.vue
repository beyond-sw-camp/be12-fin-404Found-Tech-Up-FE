<template>
  <div class="tp-shop-widget-categories">
    <ul>
      <li>
        <a @click.prevent="selectCategory('')" :class="{ active: !route.query.category }">
          전체 카테고리
          <!-- <span>{{ products.length }}</span> -->
        </a>
      </li>
      <li v-for="cat in categories" :key="cat.id">
        <a @click.prevent="selectCategory(cat.slug)" :class="{ active: route.query.category === cat.slug }">
          {{ cat.parent }}
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

const route = useRoute();
const router = useRouter();
const store = useProductFilterBackStore();

onMounted(async () => {
  console.log(route.query);
  let category = route.query.category;

  let [onSale, inStock] = route.query.status ? route.query.status.split(",") : [null, null];

  let queryBody = {
    category: category
  }
  if (route.query.category) await store.findProducts(queryBody);
  else await store.fetchProducts();
});

const categories = computed(() => store.categories);
const products = computed(() => store.products);

function selectCategory(slug) {
  const q = { ...router.currentRoute.value.query };
  if (slug) q.category = slug;
  else delete q.category;
  router.push({ query: q });
}
</script>
