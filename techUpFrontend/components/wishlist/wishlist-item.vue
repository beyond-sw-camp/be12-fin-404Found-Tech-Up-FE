<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="`/product-details/${item.idx}`" style="background-color: #F2F3F5;display: block;">
        <img :src="item.img" alt="image" />
      </nuxt-link>
    </td>
    <!-- title -->
    <td class="tp-cart-title">
      <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
    </td>
    <!-- price -->
    <td class="tp-cart-price"><span>{{ formatPrice(item.price) }}</span></td>

    <td class="tp-cart-add-to-cart">
      <button @click="cartStore.addCartProduct(item)" type="button" class="tp-btn tp-btn-2 tp-btn-blue">
        장바구니에 추가
      </button>
    </td>

    <!-- action -->
    <td class="tp-cart-action">
      <button class="tp-cart-action-btn" @click="wishlistStore.removeWishlist(item)">
        <svg-remove />
        <span>삭제하기</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useCartStore } from "@/pinia/useCartStore";
const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const props = defineProps({ item: Object });
</script>
