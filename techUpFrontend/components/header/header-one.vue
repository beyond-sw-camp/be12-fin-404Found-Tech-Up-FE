<template>
  <header>
    <div class="tp-header-area p-relative z-index-11">
      <!-- header top start  -->
      <div class="tp-header-top black-bg p-relative z-index-1 d-none d-md-block">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <div class="tp-header-welcome d-flex align-items-center">
                <span>
                  <svg-shipping-car />
                </span>
                <p>{{ formatPrice(64000) }} 이상 구매하면 배송비 무료!</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="tp-header-top-right d-flex align-items-center justify-content-end">
                <header-component-top-menu />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- header main start -->
      <div class="tp-header-main tp-header-sticky">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-2 col-lg-2 col-md-4 col-6">
              <div class="logo" style="object-fit: cover;">
                <nuxt-link href="/">
                  <img src="/img/logo/logo.svg" alt="logo" />
                </nuxt-link>
              </div>
            </div>
            <div class="col-xl-6 col-lg-7 d-none d-lg-block">
              <!-- search form start -->
              <header-component-search />
              <!-- search form end -->
            </div>
            <div class="col-xl-4 col-lg-3 col-md-8 col-6">
              <!-- header right start -->
              <header-component-main-right />
              <!-- header right end -->
            </div>
          </div>
        </div>
      </div>

      <!-- header bottom start -->
      <div class="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
        <div class="container">
          <div class="tp-mega-menu-wrapper p-relative">
            <div class="row align-items-center">
              <div class="col-xl-3 col-lg-3">
                <!-- categories start -->
                <header-component-top-categories />
                <!-- categories end -->
              </div>
              <div class="col-xl-6 col-lg-6">
                <div class="main-menu menu-style-1">
                  <nav class="tp-main-menu-content">
                    <!-- menus start -->
                    <header-component-menus />
                    <!-- menus end -->
                  </nav>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3">
                <div class="tp-header-contact d-flex align-items-center justify-content-end">
                  <div class="tp-header-contact-icon">
                    <span>
                      <svg-contact />
                    </span>
                  </div>
                  <div class="tp-header-contact-content">
                    <h5>Hotline:</h5>
                    <p>+82 010-1234-1234</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- header sticky start -->
    <div id="header-sticky-2" :class="`tp-header-sticky-area ${isSticky ? 'header-sticky-2' : ''}`">
      <div class="container">
        <div class="tp-mega-menu-wrapper p-relative">
          <div class="row align-items-center">
            <div class="col-xl-3 col-lg-3 col-md-3 col-6">
              <div class="logo">
                <nuxt-link href="/">
                  <img src="/img/logo/logo.svg" alt="logo" />
                </nuxt-link>
              </div>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 d-none d-lg-block">
              <div class="tp-header-sticky-menu main-menu menu-style-1">
                <nav id="mobile-menu">
                  <!-- menus start -->
                  <header-component-menus />
                  <!-- menus end -->
                </nav>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-6">
              <div class="tp-header-action d-flex align-items-center justify-content-end ml-50">
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
                  <button @click="cartStore.handleCartOffcanvas" type="button"
                    class="tp-header-action-btn cartmini-open-btn">
                    <svg-cart-bag />
                    <span class="tp-header-action-badge">{{ cartStore.totalPriceQuantity.quantity }}</span>
                  </button>
                </div>
                <div class="tp-header-action-item d-none d-lg-block">
                  <nuxt-link to="/profile" class="tp-header-action-btn">
                    <SvgEmail />
                    <span class="tp-header-action-badge">
                      {{ notificationStore.unreadCount }}
                    </span>
                  </nuxt-link>
                </div>
                <div class="tp-header-action-item d-lg-none">
                  <!-- <button @click="utilsStore.handleOpenMobileMenu()" type="button" class="tp-header-action-btn tp-offcanvas-open-btn">
                    <svg-menu-icon />
                  </button> -->

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- header sticky end -->
  </header>
  <!-- cart offcanvas start -->
  <offcanvas-cart-sidebar />
  <!-- cart offcanvas end -->

  <!-- mobile menu start -->
  <div v-if="utilsStore.openMobileMenus">
    <header-component-mobile-menus style="position:sticky;right:10%;z-index:164;float:right;background-color: white;" />
  </div>
  <div v-else></div>
  <!-- mobile men end -->
</template>

<script setup>
import { onMounted, watchEffect } from 'vue'
import { useCartStore } from '@/pinia/useCartStore'
import { useWishlistStore } from '@/pinia/useWishlistStore'
import { useUtilityStore } from '@/pinia/useUtilityStore'
import { useSticky } from '@/composables/useSticky.js'
import { useNotificationStore } from '@/pinia/useNotificationStore'
import { useUserStore } from '@/pinia/useUserStore'  // 추가됨

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const utilsStore = useUtilityStore()
const notificationStore = useNotificationStore()
const userStore = useUserStore()  // 추가됨

const { isSticky } = useSticky()

const formatPrice = (price, withCurrency = true) => {
  if (withCurrency) {
    return `${price.toFixed(0)}원`
  }
  return price.toFixed(0)
}

onMounted(() => {
  wishlistStore.fetchWishlist()
  cartStore.fetchCartProducts()
})

watchEffect(() => {
  if (userStore.isLoggedIn) {
    notificationStore.fetchUnreadCount()
  }
})
</script>
