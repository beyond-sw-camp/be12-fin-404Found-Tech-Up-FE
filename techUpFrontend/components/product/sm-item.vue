<template>
  <div class="tp-product-sm-item d-flex align-items-center">
    <div class="tp-product-thumb mr-25 fix">
      <nuxt-link :href="`/product-details/${props.item.id}`">
        <img :src="props.item.img" alt="product-img" width="140" height="140" />
      </nuxt-link>
    </div>
    <div class="tp-product-sm-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${props.item.id}`">{{ props.item.category.name }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${props.item.id}`">
          {{ props.item.title }}
        </nuxt-link>
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
    const formatPrice = (price, withCurrency = true) => {
      return withCurrency ? "$" + Number(price).toFixed(2) : Number(price).toFixed(2);
    };

    return { props, formatPrice };
  },
};
</script>
