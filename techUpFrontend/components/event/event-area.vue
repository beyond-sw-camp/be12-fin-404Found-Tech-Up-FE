<template>
  <!-- breadcrumb area start -->
  <section class="breadcrumb__area include-bg pt-95 pb-50">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
            <h3 class="breadcrumb__title">최고의 혜택을 받으세요!</h3>
            <div class="breadcrumb__list">
              <span><nuxt-link href="/">Home</nuxt-link></span>
              <span><nuxt-link href="/coupons">내 쿠폰 보기</nuxt-link></span>
              <span>진행 중인 선착순 쿠폰 이벤트</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- breadcrumb area end -->

  <!-- Event area start -->
  <div class="tp-coupon-area pb-120">
    <div class="container">
      <div class="row">
        <div v-for="item in storeRef.eventsList.value" :key="item.couponIdx" class="col-xl-6">
          <event-item :event="item" />
        </div>
      </div>
    </div>
  </div>
  <!-- Event area end -->
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCouponStore } from '../../pinia/useCouponStore.js';

const couponStore = useCouponStore();
const storeRef = storeToRefs(couponStore);

</script>
