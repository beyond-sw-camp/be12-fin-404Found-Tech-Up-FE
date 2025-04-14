<template>
  <div v-if="productBackStore.product">
    <!-- breadcrumb start -->
    <product-details-breadcrumb :product="productBackStore.product" />
    <!-- breadcrumb end -->

    <!-- product details area start -->
    <product-details-area :product="productBackStore.product" />
    <!-- product details area end -->

    <!-- related products start -->
    <product-related 
      :product-id="String(productBackStore.product.idx)" 
      :category="productBackStore.product.category" 
    />
    <!-- related products end -->
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductBackStore } from '@/pinia/useProductBackStore'

const route = useRoute()
const productBackStore = useProductBackStore()

onMounted(() => {
  // URL 파라미터에 있는 id 값을 이용하여 백엔드 API 호출로 제품 상세 정보를 가져옵니다.
  productBackStore.fetchProductDetail(route.params.idx)
})
</script>
