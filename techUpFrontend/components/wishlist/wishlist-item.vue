<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="`/product-details/${item.product.productIdx}`"
        style="background-color: #F2F3F5;display: block;">
        <img :src="item.product.imageUrl" alt="image" />
      </nuxt-link>
    </td>
    <!-- title -->
    <td class="tp-cart-title">
      <nuxt-link :href="`/product-details/${item.product.productIdx}`">{{ item.product.name }}</nuxt-link>
    </td>
    <!-- price -->
    <td class="tp-cart-price">
      <span v-if="item.product.discount && Number(item.product.discount) > 0">
        <span class="tp-product-details-price old-price">{{ formatPrice(item.product.price, false) }}</span>
        <div class="new-price">
          {{ formatPrice(item.product.price - (item.product.price * Number(item.product.discount)) / 100) }}
        </div>
      </span>
      <span v-else>
        {{ formatPrice(item.product.price) }}
      </span>
    </td>

    <td class="tp-cart-add-to-cart">
      <button @click="cartStore.addCartProduct(item.product, item.product.productIdx)" type="button" class="tp-btn tp-btn-2 tp-btn-blue"
        style="color: white;">
        장바구니에 추가
      </button>
    </td>

    <!-- action -->
    <td class="tp-cart-action">
      <button class="tp-cart-action-btn" @click="wishlistStore.removeWishlist(item.product)">
        <svg-remove />
        <span> 삭제하기</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useCartStore } from "@/pinia/useCartStore";
import { formatPrice } from "@/utils/index";

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

const props = defineProps({ item: Object });
</script>
