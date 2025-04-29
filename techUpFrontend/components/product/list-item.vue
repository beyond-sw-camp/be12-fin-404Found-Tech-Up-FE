<template>
  <div class="tp-product-list-item d-md-flex">
    <div class="tp-product-list-thumb p-relative fix">
      <nuxt-link :href="`/product-details/${item.idx}`" style="height: 310px;background-color: #f2f3f5;">
        <img :src="item.images[0]" alt="product-img" />
        <div class="tp-product-badge">
          <span v-if="item.stock <= 0" class="product-hot">out-of-stock</span>
        </div>
      </nuxt-link>

      <!-- product action -->
      <div class="tp-product-action-2 tp-product-action-blackStyle">
        <div class="tp-product-action-item-2 d-flex flex-column">
          <button type="button" class="tp-product-action-btn-2 tp-product-quick-view-btn" data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.idx}`, item)">
            <svg-quick-view />
            <span class="tp-product-tooltip tp-product-tooltip-right">Quick View</span>
          </button>

          <button @click="wishlistStore.toggleWishlist(item.idx)" type="button"
            :class="`tp-product-action-btn-2 tp-product-add-to-wishlist-btn ${isItemInWishlist(item) ? 'active' : ''}`">
            <svg-wishlist />
            <span class="tp-product-tooltip tp-product-tooltip-right">
              {{ isItemInWishlist(item) ? 'Remove From Wishlist' : 'Add To Wishlist' }}
            </span>
          </button>
          <button @click="compareStore.add_compare_product(item)" type="button"
            :class="`tp-product-action-btn-2 tp-product-add-to-compare-btn ${compareStore.compare_items.some((prd) => prd.idx === item.idx) ? 'active' : ''}`">
            <svg-compare-2 />
            <span class="tp-product-tooltip tp-product-tooltip-right">
              {{ isItemInCompare(item) ? 'Remove From Compare' : 'Add To Compare' }}
            </span>
          </button>
        </div>
      </div>
    </div>
    <div class="tp-product-list-content">
      <div class="tp-product-content-2 pt-15">
        <div class="tp-product-tag-2">
          <a href="#">{{ item.category }}</a>
        </div>
        <h3 class="tp-product-title-2">
          <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
        </h3>
        <div class="tp-product-rating-icon tp-product-rating-icon-2">
          <div class="star-rating">
            <div class="star-rating__back">
              <i class="fa-regular fa-star" v-for="n in 5" :key="n" />
            </div>
            <div class="star-rating__front" :style="{ width: `${(item.rating / 5) * 100}%` }">
              <i class="fa-solid fa-star" v-for="n in 5" :key="n" />
            </div>
          </div>
        </div>

        <div class="tp-product-price-wrapper-2">
          <div v-if="item.discount > 0">
            <span class="tp-product-price-2 new-price">
              {{ formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100)) }} {{ " " }}
            </span>
            <span class="tp-product-price-2 old-price">
              {{ formatPrice(item.price, false) }}
            </span>
          </div>
          <span v-else class="tp-product-price-2 new-price">{{ formatPrice(item.price) }}</span>
        </div>

        <p>{{ item.description?.slice(0, 100) || '' }}</p>
        <div class="tp-product-list-add-to-cart">
          <button v-if="!isItemInCart(item)" @click="cartStore.addCartProduct(item, item.idx)" type="button"
            class="tp-product-list-add-to-cart-btn text-white">장바구니에 추가</button>
          <nuxt-link to="/cart" v-if="isItemInCart(item)" class="tp-product-list-add-to-cart-btn">
            장바구니 보기
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IProduct } from "@/types/product-type";
import { useUtilityStore } from "@/pinia/useUtilityStore";
import { useCompareStore } from "@/pinia/useCompareStore";
import { useCartStore } from "@/pinia/useCartStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";

defineProps<{ item: IProduct }>();

const compareStore = useCompareStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();

function isItemInWishlist(product) {
  return wishlistStore.wishlists.some(
    (wishlistItem) => Number(wishlistItem.product.productIdx) === Number(product.idx)
  );
}
function isItemInCompare(product: IProduct) {
  return compareStore.compare_items.some((prd) => prd.idx === product.idx);
}
function isItemInCart(product: IProduct) {
  return cartStore.cart_products.some((prd: IProduct) => prd.idx === product.idx);
}
</script>

<style scoped>
.star-rating {
  position: relative;
  display: inline-block;
  font-size: 1em; 
  line-height: 1;  
}
.star-rating__back,
.star-rating__front {
  display: flex;
  pointer-events: none; 
}
.star-rating__back {
  color: #ccc;
}
.star-rating__front {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #ffc107; 
}
</style>
