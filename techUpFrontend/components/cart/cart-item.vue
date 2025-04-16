<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="`/product-details/${item.idx}`" style="background-color: #F2F3F5;display: block;">
        <img :src="item.img" alt=""/>
      </nuxt-link>
    </td>
    <!-- title -->
    <td class="tp-cart-title">
      <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
    </td>
    <!-- price -->
    <td class="tp-cart-price">
      <span>{{ formatPrice(item.price) }}</span>
    </td>
    <!-- quantity -->
    <td class="tp-cart-quantity">
      <div class="tp-product-quantity mt-10 mb-10">
        <span class="tp-cart-minus" @click="cartStore.quantityDecrement(item)">
          <svg-minus />
        </span>
        <input class="tp-cart-input" type="text" v-model="item.orderQuantity" />
        <span class="tp-cart-plus" @click="cartStore.addCartProduct(item)">
          <svg-plus-sm />
        </span>
      </div>
    </td>
    <!-- action -->
    <td class="tp-cart-action">
      <button class="tp-cart-action-btn" @click="cartStore.removeCartProduct(item)">
        <svg-remove />
        <span>Remove</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useCartStore } from "@/pinia/useCartStore";
import { formatPrice } from "@/utils/index";

const cartStore = useCartStore();
const props = defineProps({
  item: Object
});
</script>
