<template>
  <nav>
    <div class="nav nav-tabs tp-tab-menu flex-column" id="admin-tab" role="tablist">
      <button class="nav-link active" id="nav-dashboard-tab" data-bs-toggle="tab" data-bs-target="#nav-dashboard"
        type="button" role="tab" aria-controls="nav-dashboard" aria-selected="false">
        <span><i class="fa-regular fa-user-pen"></i></span>대시보드
      </button>
      <nuxt-link href="/users"><button class="nav-link" id="nav-users-tab" aria-selected="false">
          <span><i class="fa-regular fa-circle-info"></i></span> 사용자 관리
        </button></nuxt-link>
      <!--
        <button class="nav-link" id="nav-devregister-tab" data-bs-toggle="tab" data-bs-target="#nav-devregister"
          type="button" role="tab" aria-controls="nav-devregister" aria-selected="false">
          <span><i class="fa-light fa-location-dot"></i></span> 제품 등록
        </button>
      -->
      <button class="nav-link" id="nav-devlist-tab" data-bs-toggle="tab" data-bs-target="#nav-devlist" type="button"
        role="tab" aria-controls="nav-devlist" aria-selected="false" @click="adminStore.loadProductList(0)">
        <span><i class="fa-light fa-clipboard-list-check"></i></span> 제품 목록
      </button>
      <button class="nav-link" id="nav-notifications-tab" data-bs-toggle="tab" data-bs-target="#nav-notifications"
        type="button" role="tab" aria-controls="nav-notifications" aria-selected="false">
        <span><i class="fa-light fa-clipboard-list-check"></i></span> 알림
      </button>
      <!--
      <button class="nav-link" id="nav-coupon-create-tab" data-bs-toggle="tab" data-bs-target="#nav-coupon-create"
        type="button" role="tab" aria-controls="nav-coupon-create" aria-selected="false">
        <span><i class="fa-light fa-location-dot"></i></span> 쿠폰 등록
      </button>
      -->
      <button class="nav-link" id="nav-coupons-tab" data-bs-toggle="tab" data-bs-target="#nav-coupons" type="button"
        role="tab" aria-controls="nav-coupons" aria-selected="false" @click="adminStore.loadCouponList">
        <span><i class="fa-regular fa-bell"></i></span> 쿠폰 목록
      </button>
      <button class="nav-link" id="nav-alert-tab" data-bs-toggle="tab" data-bs-target="#nav-alert" type="button"
        role="tab" aria-controls="nav-alert" aria-selected="false">
        <span><i class="fa-regular fa-lock"></i></span> 관리자 알림
      </button>
    </div>
  </nav>
</template>

<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';

const adminStore = useAdminStore();

</script>
