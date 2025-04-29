<template>
  <div class="tp-shop-widget-content">
    <div class="tp-shop-widget-filter price__slider">
      <div id="slider-range" class="mb-10">
        <Slider :value="store.priceValues" :tooltips="false" @change="store.handlePriceChange"
          :max="store.maxProductPrice" />
      </div>
      <div class="tp-shop-widget-filter-info d-flex align-items-center justify-content-between">
        <span class="input-range" v-if="store.priceValues && store.priceValues.length >= 2">
          ${{ store.priceValues[0] }} - ${{ store.priceValues[1] }}
        </span>
        <span v-else>
          {{ '\u20A9' }} 0 - {{ '\u20A9' }}0
        </span>
        <button @click="handlePrice" class="tp-shop-widget-filter-btn" type="button">
          가격대 검색
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.css';
import { useProductFilterBackStore } from '@/pinia/useProductFilterBackStore';

const store = useProductFilterBackStore();
const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (route.query.minPrice && route.query.maxPrice) {
    store.priceValues = [
      parseFloat(route.query.minPrice),
      parseFloat(route.query.maxPrice)
    ];
  }
});

function handlePrice() {
  const price_query = {
    minPrice: store.priceValues[0],
    maxPrice: store.priceValues[1]
  };

  router.push({
    path: router.currentRoute.value.path,
    query: {
      ...router.currentRoute.value.query,
      ...price_query
    }
  });
}
</script>
