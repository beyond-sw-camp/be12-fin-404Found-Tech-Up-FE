<template>
  <div v-if="productBackStore.product">
    <!-- breadcrumb start -->
    <product-details-breadcrumb :product="productBackStore.product" />
    <!-- breadcrumb end -->

    <!-- product details area start -->
    <product-details-area :product="productBackStore.product" :reviews="reviews" @review-submitted="onReviewSubmitted" />
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
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useReviewStore } from '@/pinia/useReviewStore'
import { useProductBackStore } from '@/pinia/useProductBackStore'

const route = useRoute()
const productIdx = Number(route.params.idx)

const productBackStore = useProductBackStore()
const reviewStore = useReviewStore()

onMounted(() => {
  // URL 파라미터에 있는 id 값을 이용하여 백엔드 API 호출로 제품 상세 정보를 가져옵니다.
  productBackStore.fetchProductDetail(productIdx)
  reviewStore.fetchReviews(productIdx)
})

const product = computed(() => productBackStore.product)
const reviews = computed(() => reviewStore.reviews)

function onReviewSubmitted(newReview) {
  // 리뷰가 제출된 후, 리뷰 목록을 다시 가져옵니다.
  reviewStore.fetchReviews(productIdx)
}
</script>
