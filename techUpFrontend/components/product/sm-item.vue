<template>
  <div class="tp-product-sm-item d-flex align-items-center">
    <div class="tp-product-thumb mr-10 fix tp-cart-img">
      <nuxt-link :href="`/product-details/${props.item.idx}`">
        <img :src="props.item.img" alt="product-img" width="64" height="64" />
      </nuxt-link>
    </div>
    <div class="tp-product-sm-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${props.item.idx}`">{{ props.item.category }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${props.item.idx}`">
          {{ props.item.name }}
        </nuxt-link>
      </h3>
      <div class="tp-product-rating d-sm-flex align-items-center">
        <div class="tp-product-rating-icon">
          <span v-for="item in new Array(props.item.reviewAverage)" :key="item"><i class="fa-solid fa-star"></i></span>
          <span v-if="props.item.reviewHalf"><i class="fa-solid fa-star-half-stroke"></i></span>
        </div>
        <div class="tp-product-rating-text">
          <span>({{ props.item.reviews && props.item.reviews.length }} Review)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <span v-if="props.item.discount > 0" class="tp-product-price">
          {{ formatPrice((Number(props.item.price) - (Number(props.item.price) * Number(props.item.discount)) / 100)) }}
        </span>
        <span v-else class="tp-product-price">{{ formatPrice(props.item.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    function formatPrice(price, withCurrency = true) {
      const formatted = Number(price).toLocaleString('ko-KR', {
        maximumFractionDigits: 0
      });
      return withCurrency ? `${formatted}원` : formatted;
    }

    return { props, formatPrice };
  },
}; 
</script>
