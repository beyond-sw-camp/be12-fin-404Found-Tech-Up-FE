<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="`/product-details/${item.id}`" style="background-color: #F2F3F5;display: block;">
        <img :src="item.img" alt="image" />
      </nuxt-link>
    </td>
    <!-- title -->
    <td class="tp-cart-title">
      <nuxt-link :href="`/product-details/${item.id}`">{{ item.title }}</nuxt-link>
    </td>
    <!-- price -->
    <td class="tp-cart-category"><span>{{ item.category.name }}</span></td>

    <!-- action -->
    <td class="tp-cart-add-to-cart">
      <button class="device-register tp-btn-2" v-if="!registered" @click="deviceStore.addDeviceToList(item)">
        <svg-next-arrow />
        <span>등록하기</span>
      </button>
      <button class="device-register tp-btn-2" v-else @click="deviceStore.removeDeviceFromList(item)">
        <svg-left-arrow />
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
</style>
