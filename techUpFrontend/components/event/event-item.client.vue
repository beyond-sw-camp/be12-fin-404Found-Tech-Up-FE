<template>
  <div class="tp-coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
    <span class="tp-coupon-border"></span>
    <div class="tp-coupon-item-left d-sm-flex align-items-center">
      <div class="tp-coupon-content">
        <h3 class="tp-coupon-title">{{ title }}</h3>
        <p class="tp-coupon-offer mb-15">
          <span>{{ discountPercentage }}%</span> 할인
        </p>
        <div>
          * 남은 쿠폰: {{ quantity }}<br>
          * 발급한 쿠폰은
          <span class="text-capitalize">{{ productName }}</span> 제품에 적용됩니다.

        </div>
      </div>
    </div>
    <div class="tp-coupon-item-right pl-20">
      <div class="tp-coupon-status mb-10 d-flex align-items-center">
        <h4>
          주의 사항:
        </h4>
        <div class="tp-coupon-info-details">
          <span>
            <svg-info-icon />
          </span>
          <div class="tp-coupon-info-tooltip transition-3">
            <p>
              * 만료일: {{ expiration }}
            </p>
          </div>
        </div>
      </div>
      <div class="tp-coupon-date">
        <button @click="issueMyCoupon" v-if="quantity > 0">
          <span>발급하기</span>
        </button>
        <div v-else>발급이 종료되었습니다.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCouponStore } from '../../pinia/useCouponStore.js';

const couponStore = useCouponStore();

const props = defineProps({ event: Object });

const productName = ref(props.event.productName);

const idx = ref(props.event.couponIdx);
const title = ref(props.event.couponName);
const discountPercentage = ref(props.event.couponDiscountRate);

const expiration = ref(props.event.couponValidDate);

const quantity = ref(props.event.couponStock);

const issueMyCoupon = async () => {
  try {
    await couponStore.issueMyCoupon(idx.value);
  } catch (e) {
    console.error(e);
  }
};
</script>
