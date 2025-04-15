<template>
  <section class="tp-cart-area pb-120">
    <div class="container">
      <div v-if="wishlistStore.wishlists.length === 0" className='text-center pt-50'>
        <h3>품목이 없습니다</h3>
        <nuxt-link href="/shop" className="tp-cart-checkout-btn mt-20">계속 쇼핑하기</nuxt-link>
      </div>
      <div v-else class="row">
        <div class="col-xl-12">
          <div class="tp-cart-list mb-45 mr-30">
            <table>
              <thead>
                <tr>
                  <th colspan="2" class="tp-cart-header-product">제품</th>
                  <th class="tp-cart-header-price">가격</th>
                  <th>장바구니에 추가</th>
                  <th>이것을...</th>
                </tr>
              </thead>
              <tbody>
                <!-- wishlist item start -->
                <wishlist-item v-for="item in wishlistStore.wishlists" :key="item.idx" :item="item" />
                <!-- wishlist item end -->
              </tbody>
            </table>
          </div>
          <div class="tp-cart-bottom">
            <div class="row align-items-end">
              <div class="col-xl-6 col-md-4">
                <div class="tp-cart-update">
                  <nuxt-link href="/cart" class="tp-cart-update-btn">장바구니 가기</nuxt-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue';
import { useWishlistStore } from '@/pinia/useWishlistStore';

const wishlistStore = useWishlistStore();

onMounted(() => {
  wishlistStore.fetchWishlist();
});
</script>
