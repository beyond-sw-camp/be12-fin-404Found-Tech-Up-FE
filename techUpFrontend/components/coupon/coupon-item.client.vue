<template>
  <div class="tp-coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
    <span class="tp-coupon-border"></span>
    <div class="tp-coupon-item-left d-sm-flex align-items-center">
      <div class="tp-coupon-thumb">
        <a href="#">
          <img alt="logo" :src="coupon.logo" style="background-color: #f2f3f5" />
        </a>
      </div>
      <div class="tp-coupon-content">
        <h3 class="tp-coupon-title">{{ coupon.title }}</h3>
        <p class="tp-coupon-offer mb-15">
          <span>{{ coupon.discountPercentage }}%</span> 할인
        </p>
        <div class="tp-coupon-countdown">
          <div class="tp-coupon-countdown-inner">
            <ul>
              <li>
                <span>{{ timer.days }}</span> 일
              </li>
              <li>
                <span>{{ timer.hours }}</span> 시
              </li>
              <li>
                <span>{{ timer.minutes }}</span> 분
              </li>
              <li>
                <span>{{ timer.seconds }}</span> 초
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="tp-coupon-item-right pl-20">
      <div class="tp-coupon-status mb-10 d-flex align-items-center">
        <h4>
          쿠폰
          <span :class="`${dayjs().isAfter(dayjs(coupon.endTime)) ? 'in-active' : 'active'}`">
            {{ dayjs().isAfter(dayjs(coupon.endTime)) ? "Inactive" : "Active" }}
          </span>
        </h4>
        <div class="tp-coupon-info-details">
          <span>
            <svg-info-icon />
          </span>
          <div class="tp-coupon-info-tooltip transition-3">
            <p>
              * 이 쿠폰은
              <span class="text-capitalize">{{ coupon.productType }}</span> 제품에 적용되며,
              <span>{{ formatPrice(coupon.minimumAmount, false) }}</span> 이상 구매해야 적용됩니다
            </p>
          </div>
        </div>
      </div>
      <div class="tp-coupon-date">
        <button @click="copy" ref="text">
          <span>{{ copiedMessage || coupon.couponCode }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTimer } from "vue-timer-hook";
import dayjs from "dayjs";
import useClipboard from 'vue-clipboard3/dist/esm'
const props = defineProps({ coupon: Object });
const { toClipboard } = useClipboard()
const text = ref('');
const copiedMessage = ref('');

let timer;
if (props.coupon.endTime) {
  const endTime = new Date(props.coupon.endTime);
  const endTimeMs = endTime.getTime();
  timer = useTimer(endTimeMs);
}

const copy = async () => {
  try {
    await toClipboard(text.value);
    copiedMessage.value = 'Copied';
    setTimeout(() => {
      copiedMessage.value = '';
    }, 6000);
  } catch (e) {
    console.error(e);
  }
}
</script>
