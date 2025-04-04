<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-categories">
      <ul>
        <li v-for="category in category_data" :key="category.id">
          <a
            @click.prevent="handleCategory(category.parent)"
            :class="`cursor-pointer ${
              route.query.category === formatString(category.parent)
                ? 'active'
                : ''
            }`"
          >
            {{ category.parent }}
            <span>{{ category.products.length }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { formatString } from '@/utils/index';
import category_data from '@/data/category-data';

const router = useRouter();
const route = useRoute();

function handleCategory(category) {
  const currentQuery = router.currentRoute.value.query;
  const existing = currentQuery.category || '';

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
