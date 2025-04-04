<template>
  <div>
    <!-- header sticky start -->
    <div id="header-sticky-2" :class="`tp-header-sticky-area ${isSticky ? 'header-sticky-2' : ''}`">
      <div class="container">
        <div class="tp-mega-menu-wrapper p-relative">
          <div class="row align-items-center">
            <div class="col-xl-3 col-lg-3 col-md-3 col-6">
              <div class="logo">
                <nuxt-link href="/">
                  <img src="/img/logo/logo.svg" alt="logo">
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
                  </nuxt-link>
                </div>
                <div class="tp-header-action-item">
                  <svg-cart-bag />
                </div>
                <div class="tp-header-action-item d-lg-none">
                  <svg-menu-icon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useSticky } from '../../composables/useSticky';
let sticky = useSticky();
let isSticky = ref(false);
isSticky.value = sticky.isSticky;

</script>