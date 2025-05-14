<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-product">
      <div v-for="item in topRatedProducts" :key="item.idx"
        class="tp-shop-widget-product-item d-flex align-items-center">
        <div class="tp-shop-widget-product-thumb">
          <nuxt-link :href="`/product-details/${item.idx}`">
            <img :src="item.img" alt="product-img" />
          </nuxt-link>
        </div>
        <div class="tp-shop-widget-product-content">
          <div class="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
            <div class="tp-shop-widget-product-rating">
              별점:
            </div>
            <div class="tp-shop-widget-product-rating-number">
              <span>({{ item.rating }})</span>
            </div>
          </div>
          <h4 class="tp-shop-widget-product-title">
            <nuxt-link :href="`/product-details/${item.idx}`">
              {{ item.name }}
            </nuxt-link>
          </h4>
          <div class="tp-shop-widget-product-price-wrapper">
            <span class="tp-shop-widget-product-price">
              {{ formatPrice(item.price) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import product_data from '@/data/product-data';
import { formatPrice } from '@/utils/index';
import { onMounted } from 'vue';
import { useMainStore } from '../../../pinia/useMainStore';

const mainStore = useMainStore();

let topRatedProducts = ref([]);

onMounted(async () => {
  await mainStore.loadSuggestionProducts();
  topRatedProducts.value = mainStore.suggestion
    .filter((product) => product !== null);

  if (topRatedProducts.value.length > 0) {
    topRatedProducts.value = topRatedProducts.value
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
  }
});
</script>
