<template>
  <div :class="`${offer_style ? 'tp-product-offer-item' : 'mb-25'} tp-product-item transition-3`">
    <div class="tp-product-thumb p-relative fix m-img">
      <nuxt-link :to="`/product-details/${item.idx ?? item.id ?? item.slug}`" class="image-swapper">
        <img v-if="item.images && item.images.length" class="primary-img" :src="item.images[0]"
          :alt="item.name || item.title" />
        <img v-else class="primary-img" :src="item.img" :alt="item.name || item.title" />
      </nuxt-link>

      <!-- product badge -->
      <div class="tp-product-badge">
        <span v-if="item.stock <= 0" class="product-hot">out-of-stock</span>
      </div>

      <!-- product action -->
      <div class="tp-product-action">
        <div class="tp-product-action-item d-flex flex-column">
          <button v-if="!isItemInCart(item)" @click="cartStore.addCartProduct(item, item.idx)" type="button"
            :class="`tp-product-action-btn tp-product-add-cart-btn ${isItemInCart(item) ? 'active' : ''}`">
            <svg-add-cart />
            <span class="tp-product-tooltip">Add to Cart</span>
          </button>
          <nuxt-link v-if="isItemInCart(item)" :href="`/cart`"
            :class="`tp-product-action-btn tp-product-add-cart-btn ${isItemInCart(item) ? 'active' : ''}`">
            <svg-add-cart />
            <span class="tp-product-tooltip">View Cart</span>
          </nuxt-link>

          <button type="button" class="tp-product-action-btn tp-product-quick-view-btn" data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.idx}`, item)">
            <svg-quick-view />
            <span class="tp-product-tooltip">Quick View</span>
          </button>
          <button @click="wishlistStore.toggleWishlist(item.idx)" type="button"
            :class="`tp-product-action-btn tp-product-add-to-wishlist-btn ${isItemInWishlist(item) ? 'active' : ''}`">
            <svg-wishlist />
            <span class="tp-product-tooltip">
              {{ isItemInWishlist(item) ? 'Remove From Wishlist' : 'Add To Wishlist' }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <!-- product content -->
    <div class="tp-product-content">
      <div class="tp-product-category">
        <nuxt-link :href="`/product-details/${item.idx}`">{{ item.category }}</nuxt-link>
      </div>
      <h3 class="tp-product-title">
        <nuxt-link :href="`/product-details/${item.idx}`">
          {{ item.name }}
        </nuxt-link>
      </h3>
      <div class="tp-product-rating d-flex align-items-center">
        <div class="tp-product-rating-icon">
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star"></i></span>
          <span><i class="fa-solid fa-star-half-stroke"></i></span>
          <!--
          <span v-for="item in new Array(props.item.reviewAverage)" :key="item"><i class="fa-solid fa-star"></i></span>
          <span v-if="props.item.reviewHalf"><i class="fa-solid fa-star-half-stroke"></i></span>
          -->
        </div>
        <div class="tp-product-rating-text">
          <span>({{ item.reviews && item.reviews.length }} Review)</span>
        </div>
      </div>
      <div class="tp-product-price-wrapper">
        <div v-if="item.discount > 0">
          <span class="tp-product-price old-price">{{ formatPrice(item.price, false) }}</span>
          <span class="tp-product-price new-price">
            {{ formatPrice(Number(item.price) - (Number(item.price) * Number(item.discount)) / 100) }}
          </span>
        </div>
        <span v-else class="tp-product-price new-price">{{ formatPrice(item.price) }}</span>
      </div>
      <!--
      <div class="tp-product-countdown" v-if="offer_style">
        <div class="tp-product-countdown-inner">
          <ul>
            <li>
              <span>{{ timer.days }}</span> Day
            </li>
            <li>
              <span>{{ timer.hours }}</span> Hrs
            </li>
            <li>
              <span>{{ timer.minutes }}</span> Min
            </li>
            <li>
              <span>{{ timer.seconds }}</span> Sec
            </li>
          </ul>
        </div>
      </div>
      -->
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";
import { useTimer } from "vue-timer-hook";

const props = defineProps({
  item: Object,
  offer_style: Boolean,
});
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();

function isItemInWishlist(product) {
  return wishlistStore.wishlists.some(
    (wishlistItem) => Number(wishlistItem.product.productIdx) === Number(product.idx)
  );
}

function isItemInCart(product) {
  return cartStore.cart_products.some((prd) => prd.idx === product.idx);
}
/*
let timer;
if (props.item.offerDate) {
  const endTime = new Date(props.item.offerDate.endDate);
  const endTimeMs = endTime.getTime();
  timer = useTimer(endTimeMs);
}
*/
function formatPrice(price, withCurrency = true) {

  const formatted = Number(price).toLocaleString('ko-KR', {
    maximumFractionDigits: 0
  });
  return withCurrency ? `${formatted}원` : formatted;

}
</script>
