<template>
  <header>
    <div :class="`tp-header-area tp-header-style-${style_2 ? 'primary' : 'darkRed'} tp-header-height`">
      <!-- header top start  -->
      <div class="tp-header-top-2 p-relative z-index-11 tp-header-top-border d-none d-md-block">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="tp-header-info d-flex align-items-center">
                <div class="tp-header-info-item">
                  <a href="#">
                    <span>
                      <svg-facebook />
                    </span>
                    7500k Followers
                  </a>
                </div>
                <div class="tp-header-info-item">
                  <span>
                    <svg-phone />
                  </span>
                  080 0808 0808
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="tp-header-top-right tp-header-top-black d-flex align-items-center justify-content-end">
                <!-- header top menu start -->
                <header-component-top-menu />
                <!-- header top menu end -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- header bottom start -->
      <div id="header-sticky" :class="`tp-header-bottom-2 tp-header-sticky ${isSticky ? 'header-sticky' : ''}`">
        <div class="container">
          <div class="tp-mega-menu-wrapper p-relative">
            <div class="row align-items-center">
              <div class="col-xl-2 col-lg-5 col-md-5 col-sm-4 col-6">
                <div class="logo">
                  <nuxt-link href="/">
                    <img src="/img/logo/logo.svg" alt="logo">
                  </nuxt-link>
                </div>
              </div>
              <div class="col-xl-5 d-none d-xl-block">
                <div class="main-menu menu-style-2">
                  <nav class="tp-main-menu-content">
                    <header-component-menus />
                  </nav>
                </div>
              </div>
              <div class="col-xl-5 col-lg-7 col-md-7 col-sm-8 col-6">
                <div class="tp-header-bottom-right d-flex align-items-center justify-content-end pl-30">
                  <div class="tp-header-search-2 d-none d-sm-block">
                    <form @submit.prevent="handleSubmit">
                      <input type="text" placeholder="Search for Products..." v-model="searchText" />
                      <button type="submit">
                        <svg-search />
                      </button>
                    </form>
                  </div>
                  <div class="tp-header-action d-flex align-items-center ml-30">
                    <div class="tp-header-action-item d-none d-lg-block">
                      <nuxt-link href="/compare" class="tp-header-action-btn">
                        <svg-compare />
                      </nuxt-link>
                    </div>
                    <div class="tp-header-action-item d-none d-lg-block">
                      <nuxt-link href="/wishlist" class="tp-header-action-btn">
                        <svg-wishlist />
                        <span class="tp-header-action-badge">{{ wishlistStore.wishlists.length }}</span>
                      </nuxt-link>
                    </div>
                    <div class="tp-header-action-item">
                      <button @click="cartStore.handleCartOffcanvas" class="tp-header-action-btn cartmini-open-btn">
                        <svg-cart-bag />
                        <span class="tp-header-action-badge">{{ cartStore.totalPriceQuantity.quantity }}</span>
                      </button>
                    </div>
                    <div class="tp-header-action-item tp-header-hamburger mr-20 d-xl-none">
                      <button @click="utilsStore.handleOpenMobileMenu()" type="button" class="tp-offcanvas-open-btn">
                        <svg-menu-icon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <offcanvas-cart-sidebar />
  <offcanvas-mobile-sidebar product-type="fashion" />
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useCartStore } from '@/pinia/useCartStore';
import { useWishlistStore } from '@/pinia/useWishlistStore';
import { useUtilityStore } from '@/pinia/useUtilityStore';
import { useSticky } from '@/composables/useSticky'; // isSticky가 외부에서 오는 경우

const router = useRouter();
const { isSticky } = useSticky();

const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilsStore = useUtilityStore();

// props
const props = defineProps({
  style_2: Boolean
});

const searchText = ref('');

// 검색 제출 처리
const handleSubmit = () => {
  if (!searchText.value) return;
  router.push(`/search?searchText=${searchText.value}`);
};
</script>
