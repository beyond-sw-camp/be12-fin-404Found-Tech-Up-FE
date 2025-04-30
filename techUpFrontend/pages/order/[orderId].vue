<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb-4 title="주문 내역 확인" subtitle="주문 내역 확인" />
    <!-- breadcrumb end -->

    <!-- order area start -->
    <OrderArea v-if="order" :order="order" @refund="onRefund"/>
    <!-- order area end -->
    <div v-else class="text-center py-10">
      주문 정보를 불러오는 중…
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute }       from 'vue-router'
import axios               from 'axios'
import { useRuntimeConfig } from '#imports'
import OrderArea           from '@/components/order/order-area.vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const route   = useRoute()
const orderId = route.params.orderId
const order   = ref(null)
const config  = useRuntimeConfig()

onMounted(async () => {
  try {
    const res = await axios.get(
      `/api/order/${orderId}`,
      { baseURL: config.public.apiBaseUrl }
    )
    if (res.data?.data) {
      order.value = res.data.data
      console.log('주문 상세 조회 성공', order.value)
    }
  } catch (e) {
    console.error('주문 상세 조회 실패', e)
  }
})

async function onRefund(orderIdx) {
  try {
    const res = await axios.post(
      `/api/order/refund/${orderIdx}`,
      {},
      { baseURL: config.public.apiBaseUrl }
    )
    if (res.data?.data) {
      // update local status
      order.value.orderStatus = res.data.data.orderStatus
      toast.success('환불 요청이 성공적으로 접수되었습니다.')
    } else {
      toast.error('환불 요청에 실패했습니다.')
    }
  } catch (err) {
    console.error('환불 요청 실패', err)
    toast.error('환불 요청 중 오류가 발생했습니다.')
  }
}
</script>
