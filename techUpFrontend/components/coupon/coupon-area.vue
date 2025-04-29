<template>
  <!-- breadcrumb area start -->
  <section class="breadcrumb__area include-bg pt-95 pb-50">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
            <h2 class="breadcrumb__title">내 쿠폰</h2>
            <h4>최고의 혜택을 받으세요!</h4>
            <div class="breadcrumb__list">
              <span><nuxt-link href="/">Home</nuxt-link></span>
              <span><nuxt-link href="/events">진행 중인 이벤트 보기</nuxt-link></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- breadcrumb area end -->

  <!-- coupon area start -->
  <div class="tp-coupon-area pb-120">
    <div class="container">
      <div class="row">
        <div v-for="item in storeRef.myCoupons.value" :key="item.couponIdx" class="col-xl-6">
          <coupon-item :coupon="item" />
        </div>
      </div>
    </div>
  </div>
  <!-- coupon area end -->

</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useCouponStore } from '../../pinia/useCouponStore.js';
import { useUserStore } from '../../pinia/useUserStore.js';
import { onMounted } from 'vue';

const couponStore = useCouponStore();
const storeRef = storeToRefs(couponStore);
const userStore = useUserStore();
const userStoreRef = storeToRefs(userStore);

onMounted(async () => {
  // await userStore.myinfo();
  await couponStore.loadMyCouponList();
})

</script>
