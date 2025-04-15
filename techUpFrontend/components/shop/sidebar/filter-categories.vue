<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-categories">
      <ul>
        <li>
          <a @click.prevent="handleCategory('전체 카테고리')"
            :class="`cursor-pointer ${!route.query.category ? 'active' : ''}`">
            전체 카테고리
            <span>{{ totalProductCount }}</span>
          </a>
        </li>
        <li v-for="category in category_data" :key="category.id">
          <a @click.prevent="handleCategory(category.parent)" :class="`cursor-pointer ${route.query.category === formatString(category.parent)
              ? 'active'
              : ''
            }`">
            {{ category.parent }}
            <span>{{ category.products.length }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { formatString } from '@/utils/index';
import category_data from '@/data/category-data';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const totalProductCount = computed(() => {
  return category_data.reduce((acc, cur) => acc + cur.products.length, 0);
});

function handleCategory(category) {
  if (category === '전체 카테고리') {
    router.push({
      query: {
        ...router.currentRoute.value.query,
        category: ''
      }
    });
    return;
  }

  const currentQuery = router.currentRoute.value.query;
  const existing = currentQuery.category || '';
  const formatted = formatString(category);

  let newCategory;

  if (existing.includes(category)) {
    // Remove category from query
    newCategory = existing
      .split(',')
      .filter((item) => item !== category)
      .join(',');
  } else {
    newCategory = formatString(category);
  }

  router.push({
    query: {
      ...currentQuery,
      category: newCategory
    }
  });
}
</script>
