<template>
  <div class="tp-checkout-verify">
    <div class="tp-checkout-verify-item">
      <p class="tp-checkout-verify-reveal">
        쿠폰을 가지고 계신가요?
        <button
          type="button"
          @click="openCoupon = !openCoupon"
          class="tp-checkout-coupon-form-reveal-btn"
        >
          {{ openCoupon ? '숨기기' : '쿠폰 선택하기' }}
        </button>
      </p>

      <div v-if="openCoupon" class="tp-return-customer mt-3">
        <div v-if="availableCoupons.length">
          <ul class="list-group">
            <li
              v-for="c in availableCoupons"
              :key="c.couponIdx"
              class="list-group-item d-flex align-items-center"
            >
              <input
                type="radio"
                name="selectedCoupon"
                :value="c.couponIdx"
                v-model="selectedCoupon"
                class="me-2"
              />
              <div>
                <strong>{{ c.couponInfo.couponName }}</strong>
                <span>
                  ({{ c.couponInfo.productName }}:
                  {{ c.couponInfo.couponDiscountRate }}% 할인)
                </span>
                <small class="text-muted">
                  — 만료: {{ formatDate(c.couponInfo.couponValidDate) }}
                </small>
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
import { ref, onMounted, watch, computed } from 'vue'
import { useCouponStore } from '@/pinia/useCouponStore'

const emit = defineEmits(['update:coupon'])
const couponStore = useCouponStore()
const openCoupon = ref(false)
const selectedCoupon = ref(null)

onMounted(() => couponStore.loadMyCouponList())

const availableCoupons = computed(() => {
  const today = new Date().setHours(0,0,0,0)
  return couponStore.myCoupons.filter(c => {
    if (c.couponUsed) return false
    const validDate = new Date(c.couponInfo.couponValidDate).setHours(0,0,0,0)
    return validDate >= today
  })
})

watch(selectedCoupon, idx => {
  if (!idx) {
    emit('update:coupon', {
      couponIdx: null,
      couponDiscountRate: 0,
      couponValidDate: '',
      productIdx: null,
      couponUsed: false
    })
    return
  }
  const c = couponStore.myCoupons.find(x => x.couponIdx === idx)
  if (!c) return
  emit('update:coupon', {
    couponIdx: c.couponIdx,
    couponDiscountRate: c.couponInfo.couponDiscountRate,
    couponValidDate: c.couponInfo.couponValidDate,
    productIdx: c.couponInfo.productIdx,
    couponUsed: c.couponUsed
  })
})

function formatDate(iso) {
  return iso.split('T')[0]
}
</script>
