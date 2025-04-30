<template>
  <div :class="`cartmini__area tp-all-font-roboto ${cartStore.cartOffcanvas ? 'cartmini-opened' : ''}`">
    <div class="cartmini__wrapper d-flex justify-content-between flex-column">
      <div class="cartmini__top-wrapper">
        <div class="cartmini__top p-relative">
          <div class="cartmini__top-title">
            <h4>장바구니</h4>
          </div>
          <div class="cartmini__close">
            <button @click="cartStore.handleCartOffcanvas" type="button" class="cartmini__close-btn cartmini-close-btn">
              <i class="fal fa-times"></i>
            </button>
          </div>
        </div>
        <div class="cartmini__shipping">
          <cart-progress />
        </div>
        <div v-if="cartStore.cart_products.length > 0" class="cartmini__widget">
          <div v-for="item in cartStore.cart_products" :key="item.product.productIdx" class="cartmini__widget-item">
            <div class="cartmini__thumb">
              <nuxt-link :href="`/product-details/${item.product.productIdx}`">
                <img :src="item.product.imageUrl" alt="cart-img" width="70" height="60" />
              </nuxt-link>
            </div>
            <div class="cartmini__content">
              <h5 class="cartmini__title">
                <nuxt-link :href="`/product-details/${item.product.productIdx}`">
                  {{ item.product.name }}
                </nuxt-link>
              </h5>
              <div class="cartmini__price-wrapper">
                <span v-if="item.product.discount > 0 && item.cartItemQuantity" class="cartmini__price">
                  {{ formatPrice((Number(item.product.price) - (Number(item.product.price) *
                    Number(item.product.discount)) / 100) * item.cartItemQuantity) }}
                </span>
                <span v-else class="cartmini__price">
                  {{ formatPrice(item.product.price * (item.cartItemQuantity || 0)) }}
                </span>
                <span class="cartmini__quantity"> x{{ item.cartItemQuantity }}</span>
              </div>
            </div>
            <a @click="cartStore.removeCartProduct(item, item.cartItemIdx)" class="cartmini__del cursor-pointer">
              <i class="fa-regular fa-xmark"></i>
            </a>
          </div>
        </div>
        <!-- if no item in cart  -->
        <div v-if="cartStore.cart_products.length === 0" class="cartmini__empty text-center">
          <img src="/img/product/cartmini/empty-cart.png" alt="empty-cart-img" />
          <p>Your Cart is empty</p>
          <nuxt-link href="/shop" class="tp-btn">Go to Shop</nuxt-link>
        </div>
      </div>
      <div v-if="cartStore.cart_products.length > 0" class="cartmini__checkout">
        <div class="cartmini__checkout-title mb-30">
          <h4>소계:</h4>
          <span>{{ formatPrice(cartStore.totalPriceQuantity.total) }}</span>
        </div>
        <div class="cartmini__checkout-btn">
          <nuxt-link href="/cart" @click="cartStore.handleCartOffcanvas" class="tp-btn mb-10 w-100">
            장바구니로 가기
          </nuxt-link>
          <nuxt-link href="/checkout" @click="cartStore.handleCartOffcanvas" class="tp-btn tp-btn-border w-100">
            주문하기
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
  <!-- overlay start  -->
  <div @click="cartStore.handleCartOffcanvas" :class="`body-overlay ${cartStore.cartOffcanvas ? 'opened' : ''}`"></div>
  <!-- overlay end  -->
</template>

<script setup>
import { useCartStore } from "@/pinia/useCartStore";

const cartStore = useCartStore();


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
