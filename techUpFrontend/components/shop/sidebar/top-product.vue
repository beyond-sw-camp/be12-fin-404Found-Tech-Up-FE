<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-product">
      <div
        v-for="item in topRatedProducts"
        :key="item.product.id"
        class="tp-shop-widget-product-item d-flex align-items-center"
      >
        <div class="tp-shop-widget-product-thumb">
          <nuxt-link :href="`/product-details/${item.product.id}`">
            <img :src="item.product.img" alt="product-img" />
          </nuxt-link>
        </div>
        <div class="tp-shop-widget-product-content">
          <div class="tp-shop-widget-product-rating-wrapper d-flex align-items-center">
            <div class="tp-shop-widget-product-rating">
              <span><svg-rating /></span>
              <span><svg-rating /></span>
              <span><svg-rating /></span>
              <span><svg-rating /></span>
              <span><svg-rating /></span>
            </div>
            <div class="tp-shop-widget-product-rating-number">
              <span>({{ item.rating }})</span>
            </div>
          </div>
          <h4 class="tp-shop-widget-product-title">
            <nuxt-link :href="`/product-details/${item.product.id}`">
              {{ item.product.title }}
            </nuxt-link>
          </h4>
          <div class="tp-shop-widget-product-price-wrapper">
            <span class="tp-shop-widget-product-price">
              {{ formatPrice(item.product.price) }}
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

let topRatedProducts = product_data
  .map((product) => {
    if (product.reviews && product.reviews.length > 0) {
      const totalRating = product.reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating = totalRating / product.reviews.length;

      return {
        product,
        rating: parseFloat(averageRating.toFixed(1))
      };
    }
    return null;
  })
  .filter((product) => product !== null);

if (topRatedProducts.length > 0) {
  topRatedProducts = topRatedProducts
    .slice()
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);
}
</script>
