<template>
  <div class="profile__ticket table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th>주문 번호</th>
          <th>주문 제품</th>
          <th>상태</th>
          <th>상세 정보</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="order in paginatedOrders"
          :key="order.orderIdx"
        >
          <td>{{ order.orderIdx }}</td>
          <td>
            <ul class="mb-0 ps-3">
              <li
                v-for="detail in order.orderDetails"
                :key="detail.orderDetailIdx"
              >
                {{ detail.orderDetailName }} × {{ detail.orderDetailQuantity }}
              </li>
            </ul>
          </td>
          <td>{{ formatStatus(order.orderStatus) }}</td>
          <td>
            <button class="btn btn-link p-0" @click="goDetail(order.orderIdx)">
              보기
            </button>
          </td>
        </tr>

        <tr v-if="filteredOrders.length === 0">
          <td colspan="4" class="text-center py-4">
            결제된 주문이 없습니다.
          </td>
        </tr>
      </tbody>
    </table>

    <!-- pagination -->
    <nav v-if="totalPages > 1" class="mt-3">
      <ul class="pagination justify-content-center mb-0">
        <li
          class="page-item"
          :class="{ disabled: page === 1 }"
          @click="page > 1 && page--"
        >
          <a class="page-link">Previous</a>
        </li>
        <li
          v-for="n in totalPages"
          :key="n"
          class="page-item"
          :class="{ active: page === n }"
          @click="page = n"
        >
          <a class="page-link">{{ n }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: page === totalPages }"
          @click="page < totalPages && page++"
        >
          <a class="page-link">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useUserOrderStore } from '@/pinia/useUserOrderStore'
import { useRouter } from 'vue-router'

const router = useRouter()
const store  = useUserOrderStore()

const page     = ref(1)
const pageSize = 5

onMounted(() => {
  store.fetchMyOrderList()
})

const filteredOrders = computed(() =>
  store.orderList.filter(o => o.orderStatus === 'PAID' || o.orderStatus === 'CANCELLED' || o.orderStatus === 'REFUND_REQUESTED')
)

const totalPages = computed(() =>
  Math.ceil(filteredOrders.value.length / pageSize)
)

const paginatedOrders = computed(() => {
  const start = (page.value - 1) * pageSize
  return filteredOrders.value.slice(start, start + pageSize)
})

const statusMap = {
  PAID:              '배송 준비 중',
  REFUND_REQUESTED:  '환불 요청됨',
  PLACED:            '주문 중',
  UNPAID:            '결제 실패',
  CANCELED:          '환불됨',
}

function formatStatus(status) {
  return statusMap[status] || status
}

function goDetail(orderIdx) {
  router.push(`/order/${orderIdx}`)
}
</script>
