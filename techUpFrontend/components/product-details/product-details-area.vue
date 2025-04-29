<template>
  <section class="tp-product-details-area">
    <div class="tp-product-details-top pb-115">
      <div class="container">
        <div class="row">
          <div class="col-xl-7 col-lg-6">
            <!-- product details thumb start -->
            <product-details-thumb :product="product" />
            <!-- product details thumb end -->
          </div>
          <div class="col-xl-5 col-lg-6">
            <!-- product details wrapper -->
            <product-details-wrapper :product="product" />
            <!-- product details wrapper -->
          </div>
        </div>
      </div>
    </div>

    <div class="tp-product-details-bottom pb-140">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <!-- product details tab nav -->
            <product-details-tab-nav :product="product" :reviews="reviews"
              @review-submitted="handleReviewSubmitted" />
            <!-- product details tab nav -->
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- video modal start -->
  <modal-video />
  <!-- video modal end -->
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  product: { type: Object, required: true },
  reviews: { type: Array, default: () => [] },
})

const emit = defineEmits(['review-submitted'])

function handleReviewSubmitted(dto) {
  emit('review-submitted', dto)
}
</script>