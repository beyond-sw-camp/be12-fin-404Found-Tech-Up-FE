<template>
  <div class="tp-checkout-verify">
    <!-- 쿠폰 입력 안내 -->
    <div class="tp-checkout-verify-item">
      <p class="tp-checkout-verify-reveal">
        쿠폰을 가지고 계신가요?
        <button type="button" @click="openCoupon = !openCoupon" class="tp-checkout-coupon-form-reveal-btn">
          {{ openCoupon ? '숨기기' : '쿠폰 선택하기' }}
        </button>
      </p>

      <div v-if="openCoupon" class="tp-return-customer mt-3">
        <div v-if="couponStore.myCoupons.length">
          <ul class="list-group">
            <li v-for="c in couponStore.myCoupons" :key="c.couponIdx" class="list-group-item d-flex align-items-center">
              <input type="radio" name="selectedCoupon" :value="c.couponIdx" v-model="selectedCoupon" class="me-2" />
              <div>
                <strong>{{ c.couponInfo.couponName }}</strong>
                <span>({{ c.couponInfo.productName }} {{ c.couponInfo.couponDiscountRate }}% 할인)</span>
                <small class="text-muted">— 만료: {{ formatDate(c.couponInfo.couponValidDate) }}</small>
              </div>
            </li>
          </ul>
        </div>
        <div v-else class="text-muted">사용 가능한 쿠폰이 없습니다.</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCouponStore } from '@/pinia/useCouponStore'

const emit = defineEmits(['update:coupon'])
const couponStore = useCouponStore()
const openCoupon     = ref(false)
const selectedCoupon = ref(null)

onMounted(couponStore.loadMyCouponList)

watch(selectedCoupon, idx => {
  emit('update:coupon', idx)
})

function formatDate(iso) {
  return iso?.split?.('T')?.[0] ?? ''
}
</script>
