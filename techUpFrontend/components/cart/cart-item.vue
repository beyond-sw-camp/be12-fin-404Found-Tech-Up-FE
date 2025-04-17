<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="`/product-details/${item.product.productIdx}`"
        style="background-color: #F2F3F5;display: block;">
        <img :src="item.product.imageUrl" alt="" />
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
    <!-- quantity -->
    <td class="tp-cart-quantity">
      <div class="tp-product-quantity mt-10 mb-10">
        <span class="tp-cart-minus" @click="cartStore.quantityDecrement(item.product)">
          <svg-minus />
        </span>
        <input class="tp-cart-input" type="text" v-model="item.cartItemQuantity" />
        <span class="tp-cart-plus" @click="cartStore.addCartProduct(item.product, item.product.productIdx)">
          <svg-plus-sm />
        </span>
      </div>
    </td>
    <!-- action -->
    <td class="tp-cart-action">
      <button class="tp-cart-action-btn" @click="cartStore.removeCartProduct(item, item.cartItemIdx)">
        <svg-remove />
        <span> 삭제하기</span>
      </button>
    </td>
  </tr>
</template>

<script setup>
import { useCartStore } from "@/pinia/useCartStore";
import { formatPrice } from "@/utils/index";
import { onMounted } from "vue";

const cartStore = useCartStore();
const props = defineProps({
  item: Object
});

onMounted(() => {
  console.log("cart item", props.item);
});
</script>
