<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="`/product-details/${item.idx}`" style="background-color: #F2F3F5;display: block;">
        <img :src="item.images" alt="image" />
      </nuxt-link>
    </td>
    <!-- title -->
    <td class="tp-cart-title">
      <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
    </td>
    <!-- category -->
    <td class="tp-cart-category"><span>{{ item.category }}</span></td>
    <!-- category -->
    <td class="tp-cart-category"><span>{{ item.description }}</span></td>
    <!-- action -->
    <td class="tp-cart-add-to-cart">
      <button class="device-register tp-btn" v-if="!registered" @click="deviceStore.addDeviceToList(item.idx)">
        <span>등록하기</span>
      </button>
      <button class="device-register tp-btn" v-else @click="deviceStore.removeDeviceFromList(item.idx)">
        <span>등록 해제</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useDeviceStore } from '../../pinia/useDeviceStore';

const deviceStore = useDeviceStore();

const props = defineProps({ item: Object, registered: Boolean });

</script>

<style scoped>
.device-register {
  color: aliceblue;
}
.tp-btn {
  background-color: var(--tp-theme-primary);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.tp-btn:hover {
  background-color: #2762af;
}
</style>
