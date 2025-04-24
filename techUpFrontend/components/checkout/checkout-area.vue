<template>
  <section class="tp-checkout-area pb-120" style="background-color: #EFF1F5;">
    <div class="container">
      <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
        <h3 class="py-2">장바구니에 담긴 상품이 없습니다</h3>
        <nuxt-link href="/shop" class="tp-checkout-btn">
          쇼핑 계속하기
        </nuxt-link>
      </div>
      <div v-else class="row">
        <!-- 전체를 <form> 으로 감싸고 @submit.prevent 로 처리 -->
        <form @submit.prevent="submitOrder" class="row w-100">
          <div class="col-xl-7 col-lg-7">
            <!-- 쿠폰 사용 검증 컴포넌트 -->
            <checkout-verify @update:coupon="onCouponUpdate" />
          </div>

          <div class="col-lg-7">
            <h3 class="tp-checkout-bill-title">결제자 정보</h3>
            <!-- emit :update:billing => onBillingUpdate -->
            <checkout-billing @update:billing="onBillingUpdate" />
          </div>

          <div class="col-lg-5">
            <h3 class="tp-checkout-place-title">주문 내역</h3>
            <!-- emit :update:shipping => onShippingUpdate -->
            <checkout-order :coupon-info="couponInfo" @update:shipping="onShippingUpdate" @update:agree="agree = $event" @update:payment="paymentMethod = $event"/>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { useCartStore } from '@/pinia/useCartStore';
import { toast } from 'vue3-toastify';

const cartStore = useCartStore();

const couponInfo = ref({
  couponIdx: null,
  couponDiscountRate: 0,
  couponValidDate: '',
  productIdx: null,
  couponeUsed: false
})

const billingData = ref({
  recipientName: '',
  address: '',
  postalCode: '',
  addressDetail: '',
  phone: '',
  email: '',
  memo: ''
});
const agree = ref(false);
const shippingMethodSelected = ref('flat_rate');
const paymentMethod = ref('');

function onCouponUpdate(payload) {
  couponInfo.value = payload;
}

function onBillingUpdate(payload) {
  billingData.value = payload;
}

function onShippingUpdate(method) {
  shippingMethodSelected.value = method;
  let cost = 0;
  if (method === 'flat_rate') cost = 3000;
  else if (method === 'local_pickup') cost = 1500;
  cartStore.shipCost = cost;
}

async function submitOrder() {
  if (!billingData.value.recipientName || !billingData.value.phone || !billingData.value.address) {
    toast.error('주문자 정보를 모두 입력해주세요.');
    return;
  }
  if (!shippingMethodSelected.value) {
    toast.error('배송 방법을 선택해주세요.');
    return;
  }
  if (!paymentMethod.value) {
    toast.error('결제 방법을 선택해주세요.');
    return;
  }
  if (!agree.value) {
    toast.error('사이트 이용 약관에 동의해주세요.');
    return;
  }
  await cartStore.order(billingData.value, couponInfo.value, shippingMethodSelected.value, paymentMethod.value);
}
</script>
