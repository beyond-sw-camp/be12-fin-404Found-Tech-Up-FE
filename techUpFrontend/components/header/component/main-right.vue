<template>
  <div class="tp-header-main-right d-flex align-items-center justify-content-end">
    <!-- 로그인 -->
    <div class="tp-header-login d-none d-lg-block">
      <nuxt-link to="/profile" class="d-flex align-items-center">
        <div class="tp-header-login-icon">
          <span>
            <SvgUser />
          </span>
        </div>
        <div class="tp-header-login-content d-none d-xl-block">
          <span>Hello, Sign In</span>
          <h5 class="tp-header-login-title">Your Account</h5>
        </div>
      </nuxt-link>
    </div>

    <!-- 기타 액션들 -->
    <div class="tp-header-action d-flex align-items-center ml-50">
      <!-- 비교 -->
      <div class="tp-header-action-item d-none d-lg-block">
        <nuxt-link to="/compare" class="tp-header-action-btn">
          <SvgCompare />
        </nuxt-link>
      </div>

      <!-- 위시리스트 -->
      <div class="tp-header-action-item d-none d-lg-block">
        <nuxt-link to="/wishlist" class="tp-header-action-btn">
          <SvgWishlist />
          <span class="tp-header-action-badge">
            {{ wishlistStore.wishlists.length }}
          </span>
        </nuxt-link>
      </div>

      <!-- 장바구니 -->
      <div class="tp-header-action-item">
        <button @click="cartStore.handleCartOffcanvas" type="button" class="tp-header-action-btn cartmini-open-btn">
          <svg-cart-bag />
          <span class="tp-header-action-badge">{{ cartStore.totalPriceQuantity.quantity }}</span>
        </button>
      </div>

      <!-- 알림 아이콘 -->
      <div class="tp-header-action-item d-none d-lg-block">
        <nuxt-link to="/profile" class="tp-header-action-btn">
          <SvgEmail />
          <span
            class="tp-header-action-badge"
          >
            {{ notificationStore.unreadCount }}
          </span>
        </nuxt-link>
      </div>

      <!-- 모바일 메뉴 버튼 -->
      <div class="tp-header-action-item d-lg-none">
        <button
          @click="utilsStore.handleOpenMobileMenu"
          type="button"
          class="tp-header-action-btn tp-offcanvas-open-btn"
        >
          <SvgMenuIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '@/pinia/useCartStore'
import { useWishlistStore } from '@/pinia/useWishlistStore'
import { useUtilityStore } from '@/pinia/useUtilityStore'
import { useNotificationStore } from '@/pinia/useNotificationStore'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const utilsStore = useUtilityStore()
const notificationStore = useNotificationStore()

onMounted(() => {
  notificationStore.fetchUnreadCount()
})
</script>

<style scoped>
.tp-header-action-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  background: #ff3d3d;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border-radius: 50%;
  padding: 2px 6px;
  line-height: 1;
}
</style>
