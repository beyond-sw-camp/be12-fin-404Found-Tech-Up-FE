<template>
  <div class="tp-checkout-verify">
    <!-- 쿠폰 입력 안내 -->
    <div class="tp-checkout-verify-item">
      <p class="tp-checkout-verify-reveal">
        쿠폰을 가지고 계신가요?
        <button
          @click="openCoupon = !openCoupon"
          type="button"
          class="tp-checkout-coupon-form-reveal-btn"
        >
          쿠폰 코드 입력하기
        </button>
      </p>

      <div
        v-if="openCoupon"
        id="tpCheckoutCouponForm"
        class="tp-return-customer"
      >
        <form @submit.prevent="handleSubmit">
          <div class="tp-return-customer-input">
            <label>쿠폰 코드</label>
            <input type="text" placeholder="쿠폰 코드를 입력하세요" />
          </div>
          <button type="submit" class="tp-return-customer-btn tp-checkout-btn">
            적용하기
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const openLogin = ref(false);
const openCoupon = ref(false);

const handleSubmit = () => {
  console.log('쿠폰이 제출되었습니다.');
};
</script>
