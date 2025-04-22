<template>
  <div class="tp-coupon-item mb-30 p-relative d-md-flex justify-content-between align-items-center">
    <div class="tp-coupon-item-left d-sm-flex align-items-center">
      <div class="tp-coupon-content">
        <h3 class="tp-coupon-title">{{ title }}</h3>

        <p class="tp-coupon-offer mb-15">
          <span>{{ discountPercentage }}%</span> 할인

        </p>
        <div class="tp-coupon-countdown">
          만료일: {{ coupon.couponInfo.couponValidDate }}
          <!--
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
          -->
        </div>
      </div>
    </div>
    <div class="tp-coupon-item-right pl-20">
      <div class="tp-coupon-status mb-5 d-flex align-items-center" style="font-weight:bold;">
        사용 여부:
        <div class="tp-coupon-info-details">
          <span>
            <svg-info-icon />
          </span>
          <div class="tp-coupon-info-tooltip transition-3">
            <p>
              * 이 쿠폰은
              <span class="text-capitalize">{{ coupon.couponInfo.productName }}</span> 제품에 적용됩니다.
            </p>
          </div>
        </div>
      </div>
      {{ coupon.couponUsed ? '사용 완료' : '사용하지 않음' }}
    </div>
  </div>
</template>

<script setup>
import dayjs from "dayjs";
import useClipboard from 'vue-clipboard3/dist/esm'
const props = defineProps({ coupon: Object });

// const idx = ref(props.event.couponIdx);
const title = ref(props.coupon.couponInfo.couponName);
const discountPercentage = ref(props.coupon.couponInfo.couponDiscountRate);

let coupon = ref(props.coupon);

/*
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
*/
</script>
