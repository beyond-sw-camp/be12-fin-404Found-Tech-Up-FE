<template>
  <div class="tp-checkout-place white-bg">
    <h3 class="tp-checkout-place-title">주문 내역</h3>
    <div class="tp-order-info-list">
      <ul>
        <!-- header -->
        <li class="tp-order-info-list-header">
          <h4>상품명</h4>
          <h4>총합</h4>
        </li>

        <!-- item list -->
        <li
          v-for="item in cartStore.cart_products"
          :key="item.id"
          class="tp-order-info-list-desc"
        >
          <p>{{ item.title }} <span> x {{ item.orderQuantity }}</span></p>
          <span>{{ formatPrice(item.price) }}</span>
        </li>

        <!-- subtotal -->
        <li class="tp-order-info-list-subtotal">
          <span>소계</span>
          <span>{{ formatPrice(cartStore.totalPriceQuantity.total) }}</span>
        </li>

        <!-- shipping -->
        <li class="tp-order-info-list-shipping">
          <span>배송비</span>
          <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
            <span>
              <input id="flat_rate" type="radio" name="shipping" />
              <label @click="handleShippingCost(20)" for="flat_rate">
                일반 배송: <span>{{ formatPrice(20) }}</span>
              </label>
            </span>
            <span>
              <input id="local_pickup" type="radio" name="shipping" />
              <label @click="handleShippingCost(25)" for="local_pickup">
                매장 수령: <span>{{ formatPrice(25) }}</span>
              </label>
            </span>
            <span>
              <input id="free_shipping" type="radio" name="shipping" />
              <label @click="handleShippingCost('free')" for="free_shipping">
                무료 배송
              </label>
            </span>
          </div>
        </li>

        <!-- total -->
        <li class="tp-order-info-list-total">
          <span>총 주문 금액</span>
          <span>{{ formatPrice(cartStore.totalPriceQuantity.total + shipCost) }}</span>
        </li>
      </ul>
    </div>

    <div class="tp-checkout-payment">
      <div class="tp-checkout-payment-item">
        <input type="radio" id="back_transfer" name="payment" />
        <label @click="handlePayment('bank')" for="back_transfer" data-bs-toggle="direct-bank-transfer">
          무통장 입금
        </label>
        <div v-if="payment_name === 'bank'" class="tp-checkout-payment-desc direct-bank-transfer">
          <p>
            아래 계좌로 직접 입금해 주세요. 입금 시 주문 번호를 입금자명에 기재해 주시기 바랍니다.
            입금 확인 후 배송이 진행됩니다.
          </p>
        </div>
      </div>

      <div class="tp-checkout-payment-item">
        <input type="radio" id="cheque_payment" name="payment" />
        <label @click="handlePayment('cheque_payment')" for="cheque_payment">
          수표 결제
        </label>
        <div v-if="payment_name === 'cheque_payment'" class="tp-checkout-payment-desc cheque-payment">
          <p>
            수표를 아래 계좌로 보내주세요. 수표 확인 후 배송이 진행됩니다.
          </p>
        </div>
      </div>
    </div>

    <div class="tp-checkout-agree">
      <div class="tp-checkout-option">
        <input id="read_all" type="checkbox" />
        <label for="read_all">사이트 이용 약관에 동의합니다.</label>
      </div>
    </div>

    <div class="tp-checkout-btn-wrapper">
      <button type="submit" class="tp-checkout-btn w-100">주문하기</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/pinia/useCartStore';
import { ref } from 'vue';

const cartStore = useCartStore();

const shipCost = ref(0);
const payment_name = ref('');

// 배송비 처리
const handleShippingCost = (value) => {
  if (value === 'free') {
    shipCost.value = 0;
  } else {
    shipCost.value = value;
  }
};

// 결제 수단 선택
const handlePayment = (value) => {
  payment_name.value = value;
};
</script>
