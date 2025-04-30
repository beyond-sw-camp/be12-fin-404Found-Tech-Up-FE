<template>
  <div
    :class="`tp-product-item-3 ${primary_style ? 'tp-product-style-primary' : ''} mb-50 ${isCenter ? 'text-center' : ''}`">
    <div class="tp-product-thumb-3 mb-15 fix p-relative z-index-1"
      :style="`background-color: ${style_2 ? '#f6f6f6' : '#fff'};`">
      <nuxt-link :href="`/product-details/${item.id}`">
        <img :src="item.img" alt="product-img" />
      </nuxt-link>

      <!-- product action -->
      <div class="tp-product-action-3 tp-product-action-blackStyle">
        <div class="tp-product-action-item-3 d-flex flex-column">

          <button v-if="!isItemInCart(item)" @click="cartStore.addCartProduct(item)" type="button"
            :class="`tp-product-action-btn-3 tp-product-add-cart-btn ${isItemInCart(item) ? 'active' : ''}`">
            <svg-cart-bag-2 />
            <span class="tp-product-tooltip">Add to Cart</span>
          </button>
          <nuxt-link v-else href="/cart" :class="`tp-product-action-btn-3 tp-product-add-cart-btn text-center active`">
            <svg-cart-bag-2 />
            <span class="tp-product-tooltip">View Cart</span>
          </nuxt-link>

          <button type="button" class="tp-product-action-btn-3 tp-product-quick-view-btn" data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.id}`, item)">
            <svg-quick-view />
            <span class="tp-product-tooltip">Quick View</span>
          </button>
          <button @click="wishlistStore.toggleWishlist(item.id)" type="button"
            :class="`tp-product-action-btn-3 tp-product-add-to-wishlist-btn ${isItemInWishlist(item) ? 'active' : ''}`">
            <svg-wishlist />
            <span class="tp-product-tooltip">
              {{ isItemInWishlist(item) ? "Remove From Wishlist" : "Add To Wishlist" }}
            </span>
          </button>
        </div>
      </div>

      <div class="tp-product-add-cart-btn-large-wrapper">
        <button v-if="!isItemInCart(item)" @click="cartStore.addCartProduct(item)" type="button"
          class="tp-product-add-cart-btn-large">
          Add To Cart
        </button>
        <nuxt-link v-else href="/cart" class="tp-product-add-cart-btn-large text-center">
          View Cart
        </nuxt-link>
      </div>
    </div>
    <div class="tp-product-content-3">
      <div class="tp-product-tag-3">
        <span>{{ item.category }}</span>
      </div>
      <h3 class="tp-product-title-3">
        <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
      </h3>
      <div class="tp-product-price-wrapper-3">
        <span v-if="item.discount > 0" class="tp-product-price-3">
          <span class="old-price">{{ formatPrice(item.price, false) }}</span>
          {{ formatPrice(item.price * (100 - item.discount) / 100) }}
        </span>
        <span v-else class="tp-product-price-3">
          {{ formatPrice(item.price) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";

const props = defineProps({
  item: Object,
  style_2: Boolean,
  isCenter: Boolean,
  primary_style: Boolean,
});

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();

// 화면 렌더링 직후 위시리스트/카트 상태 동기화
onMounted(() => {
  wishlistStore.fetchWishlist();
  cartStore.fetchCartProducts();
});

// 포맷터
function formatPrice(value) {
  return Number(value).toFixed(0) + "원";
}

// 해당 상품이 위시리스트에 있는지
function isItemInWishlist(product) {
  return wishlistStore.wishlists.some(
    (wishlistItem) => Number(wishlistItem.product.productIdx) === Number(product.idx)
  );
}

// 해당 상품이 카트에 있는지
function isItemInCart(product) {
  return cartStore.cart_products.some((prd) => prd.idx === product.idx);
}
</script>
