<template>
  <div>
    <template v-if="cartStore.totalPriceQuantity.total < freeShippingThreshold">
      <p>{{ `${remainingAmount.toFixed(0)} 원 더 주문하고 무료 배송` }}</p>
    </template>
    <template v-else>
      <p>배달비 무료!</p>
    </template>

    <div class="progress">
      <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar"
        :data-width="`${progress}%`" :aria-valuenow="progress" aria-valuemin="0" aria-valuemax="100"
        :style="`width:${progress}%`"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCartStore } from '@/pinia/useCartStore';

const cartStore = useCartStore();
// 64000원 이상 무료 배송 하드 코딩
const freeShippingThreshold = ref(64000);
const progress = computed(() => (cartStore.totalPriceQuantity.total / freeShippingThreshold.value) * 100);
const remainingAmount = computed(() => freeShippingThreshold.value - cartStore.totalPriceQuantity.total);
</script>
