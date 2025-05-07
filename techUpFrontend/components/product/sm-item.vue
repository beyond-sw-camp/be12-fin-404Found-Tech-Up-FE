<template>
  <div class="tp-product-sm-item d-flex align-items-center">
    <div class="tp-product-thumb mr-10 fix tp-cart-img">
      <nuxt-link :to="`/product-details/${item.idx}`">
        <img :src="item.img" alt="product-img" width="64" height="64" />
      </nuxt-link>
    </div>
    <div class="tp-product-sm-content">
      <div class="tp-product-category">
        <nuxt-link :to="`/product-details/${item.idx}`">{{ item.category }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :to="`/product-details/${item.idx}`">
          {{ item.name }}
        </nuxt-link>
      </h3>
      <div class="tp-product-rating d-sm-flex align-items-center">
        <div class="tp-product-rating-icon">
          <div class="star-rating star-rating--sm">
            <div class="star-rating__back">
              <i class="fa-regular fa-star" v-for="n in 5" :key="'b'+n" />
            </div>
            <div
              class="star-rating__front"
              :style="{ width: (averageRating / 5 * 100) + '%' }"
            >
              <i class="fa-solid fa-star" v-for="n in 5" :key="'f'+n" />
            </div>
          </div>
        </div>
        <div class="tp-product-rating-text">
          <span>({{ item.reviews.length }} 개)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <span v-if="item.discount > 0" class="tp-product-price">
          {{ formatPrice(item.price * (1 - item.discount/100)) }}
        </span>
        <span v-else class="tp-product-price">
          {{ formatPrice(item.price) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // compute average of the numeric ratings in the array
    const averageRating = computed(() => {
      const r = props.item.reviews;
      if (!r || r.length === 0) return 0;
      return r.reduce((sum, x) => sum + x, 0) / r.length;
    });

    function formatPrice(price) {
      return Number(price)
        .toLocaleString('ko-KR', { maximumFractionDigits: 0 })
        + '원';
    }

    return {
      item: props.item,
      averageRating,
      formatPrice,
    };
  },
};
</script>

<style scoped>
.star-rating {
  position: relative;
  display: inline-block;
  font-size: 1em;
  line-height: 1;
}
.star-rating--sm {
  font-size: 0.8em;
}
.star-rating__back,
.star-rating__front {
  display: flex;
  pointer-events: none;
}
.star-rating__back {
  color: #ccc;
}
.star-rating__front {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #ffc107;
}
</style>
