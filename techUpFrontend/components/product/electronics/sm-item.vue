<template>
  <div class="tp-product-sm-item d-flex align-items-center">
    <div class="tp-product-thumb mr-25 fix">
      <nuxt-link :href="`/product-details/${item.idx}`">
        <img :src="item.img" alt="product-img" width="140" height="140" />
      </nuxt-link>
    </div>
    <div class="tp-product-sm-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${item.idx}`">{{item.category}}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${item.idx}`">{{item.name}}</nuxt-link>
      </h3>
      <div class="tp-product-rating d-sm-flex align-items-center">
        <div class="tp-product-rating-icon">
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
        </div>
        <div class="tp-product-rating-text">
          <span>({{item.reviews?.length}} Review)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <span v-if="item.discount > 0" class="tp-product-price">
          {{formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100))}}
        </span>
        <span v-else class="tp-product-price">{{formatPrice(item.price)}}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IProduct } from '@/types/product-type';

const props = defineProps<{ item: IProduct;}>();
</script>
