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
      :related-products="related"
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

onMounted(async () => {
  // 상품 상세 정보+ 리뷰를 가져옵니다.
  await productBackStore.fetchProductDetail(productIdx)
  await reviewStore.fetchReviews(productIdx)

  // 관련 상품을 가져옵니다.
  await productBackStore.fetchAllProducts()
  await productBackStore.fetchRelatedProducts(productIdx)
})

const product = computed(() => productBackStore.product)
const reviews = computed(() => reviewStore.reviews)
const related = computed(() => productBackStore.related)

function onReviewSubmitted(newReview) {
  // 리뷰가 제출된 후, 리뷰 목록을 다시 가져옵니다.
  reviewStore.fetchReviews(productIdx)
}
</script>
