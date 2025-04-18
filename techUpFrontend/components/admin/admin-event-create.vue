<template>
  <div class="form-container">
    <h2 class="form-title">전체 사용자 대상 쿠폰 등록</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- 쿠폰 이름 -->
      <div class="form-group">
        <label class="form-label">쿠폰 이름</label>
        <input v-model="event.couponName" type="text" class="form-input" placeholder="예) 봄맞이 할인 쿠폰" required />
      </div>

      <!-- 할인율 -->
      <div class="form-group">
        <label class="form-label">할인율(%)</label>
        <input v-model="event.discount" type="number" step="1" class="form-input" placeholder="예) 10" required />
      </div>

      <!-- 유효 기간 -->
      <div class="form-group">
        <label class="form-label">유효 기간</label>
        <input v-model="event.expiryDate" type="date" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">발급 수량</label>
        <input v-model="event.quantity" type="number" step="1" class="form-input" placeholder="예) 100" required />
      </div>

      <!-- 연관 상품 (product_idx) -->
      <div class="form-group">
        <label class="form-label">연관 상품 (product_idx)</label>
        <input v-model="event.productIdx" type="number" class="form-input" placeholder="예) 101" required />
      </div>

      <button type="submit" class="btn-submit">쿠폰 등록</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAdminStore } from '../../pinia/useAdminStore';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);
/**
 * coupon 테이블 구조:
 *  - coupon_idx (PK, AUTO_INCREMENT)
 *  - coupon_name (VARCHAR)
 *  - coupon_discount_rate (INT)
 *  - coupon_valid_date (DATETIME)
 *  - product_idx (INT, FK)
 */
let event = ref({
  productIdx: '',
  discount: '',
  couponName: '',
  expiryDate: '',
  quantity: '',
})

const submitForm = async () => {
  await adminStore.submitEventRegisterForm(event.value);
}

</script>

<style scoped>
/* 전체 폼 컨테이너 */
.form-container {
  max-width: 64rem;
  /* 예: max-w-4xl */
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* 폼 그룹 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

/* 인풋, 텍스트에리어, 셀렉트 */
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

/* 제출 버튼 */
.btn-submit {
  display: block;
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #333;
}
</style>
