<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-brand-list d-flex align-items-center justify-content-between flex-wrap">
      <div v-for="item in brands_data.slice(0, 8)" :key="item.id" class="tp-shop-widget-brand-item">
        <a @click.prevent="handleBrand(item.name)" v-if="item.logo" class="cursor-pointer">
          <img :src="item.logo" alt="logo" />
        </a>
        <a @click.prevent="handleBrand(item.name)" v-else class="cursor-pointer">
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { formatString } from '@/utils/index';
import brands_data from '@/data/brand-data';

const router = useRouter();

function handleBrand(brand) {
  const currentQuery = router.currentRoute.value.query;
  const existing = currentQuery.brand || '';

  let newBrand;

  if (existing.includes(brand)) {
    // Remove brand
    newBrand = existing
      .split(',')
      .filter((item) => item !== brand)
      .join(',');
  } else {
    newBrand = formatString(brand);
  }

  router.push({
    query: {
      ...currentQuery,
      brand: newBrand
    }
  });
}
</script>
