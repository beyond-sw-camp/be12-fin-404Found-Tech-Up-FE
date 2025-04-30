<template>
  <div :class="`cartmini__area tp-all-font-roboto ${adminStore.orderDetailOffcanvas ? 'cartmini-opened' : ''}`">
    <div class="cartmini__wrapper d-flex justify-content-between flex-column">
      <div class="cartmini__top-wrapper">
        <div class="cartmini__top p-relative">
          <div class="cartmini__top-title">
            <h4>주문 상세 내역</h4>
          </div>
          <div class="cartmini__close">
            <button @click="adminStore.handleOrderDetailOffcanvas" type="button"
              class="cartmini__close-btn cartmini-close-btn">
              <i class="fal fa-times"></i>
            </button>
          </div>
        </div>
        <div v-for="item in storeRef.orderDetailList.value" :key="item.orderIdx" class="cartmini__widget-item">
          <div class="cartmini__content">
            <h5 class="cartmini__title">
              <nuxt-link :href="`/product-details/${item.productIdx}`">
                {{ item.orderDetailName }}
              </nuxt-link>

              <span class="cartmini__price ml-2">
                {{ formatPrice(item.orderDetailPrice) }}
              </span>
              <span class="cartmini__quantity ml-2"> x{{ item.orderDetailQuantity }}</span>

            </h5>
          </div>
        </div>

      </div>
      <!--
      <div class="cartmini__checkout-title mb-30">
        <h4>소계:</h4>
        <span>{{ formatPrice(adminStore.totalPrice) }}</span>
      </div>
      -->
    </div>
  </div>
  <!-- overlay start  -->
  <div @click="adminStore.handleOrderDetailOffcanvas"
    :class="`body-overlay ${adminStore.orderDetailOffcanvas ? 'opened' : ''}`"></div>
  <!-- overlay end  -->
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '../../pinia/useAdminStore';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);


function formatPrice(price, withCurrency = true) {
  const formatted = Number(price).toLocaleString('ko-KR', {
    maximumFractionDigits: 0
  });
  return withCurrency ? `${formatted}원` : formatted;
}

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
