<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-product">
      <div v-for="item in store.suggestion" :key="item.id"
        class="tp-shop-widget-product-item d-flex align-items-center">
        <div class="tp-shop-widget-product-thumb">
          <nuxt-link :href="`/product-details/${item.id}`">
            <img :src="item.images" alt="product-img" />
          </nuxt-link>
        </div>
        <div class="tp-shop-widget-product-content">
          <div class="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
            <div class="tp-shop-widget-product-rating">
            </div>
            <div class="tp-shop-widget-product-rating-number">
              <span>별점: ({{ item.reviewAverage }})</span>
            </div>
          </div>
          <h4 class="tp-shop-widget-product-title">
            <nuxt-link :href="`/product-details/${item.id}`">
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
import { formatPrice } from '@/utils/index';
import { useProductFilterBackStore } from '../../../pinia/useProductFilterBackStore';
import { onMounted } from 'vue';

const store = useProductFilterBackStore();
onMounted(async () => {
  await store.loadSuggestionProducts();
})

</script>
