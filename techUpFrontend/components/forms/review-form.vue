<template>
  <form @submit.prevent="submitReview">
    <!-- star‐rating control bound to form.reviewRating -->
    <div class="star‑rating mb-3">
      <span
        v-for="n in 5"
        :key="n"
        class="me-1"
        :class="{
          'text-warning': form.reviewRating >= n,
          'text-muted':   form.reviewRating <  n
        }"
        style="cursor: pointer;"
        @click="form.reviewRating = n"
      >
        <i class="fa-solid fa-star fa-2x"></i>
      </span>
    </div>

    <textarea
      v-model="form.reviewContent"
      class="form-control mb-3"
      placeholder="Write your review here…"
      rows="6"
      required
    ></textarea>

    <button type="submit" class="tp-btn tp-btn-primary mt-3 white-bg">
      리뷰 작성
    </button>
  </form>
</template>

<script setup>
import { defineProps, defineEmits, reactive } from 'vue'
import { useReviewStore } from '@/pinia/useReviewStore'

const props = defineProps({
  productIdx: { type: Number, required: true }
})
const emit = defineEmits(['submitted'])

const reviewStore = useReviewStore()

const form = reactive({
  reviewRating: 5,
  reviewContent: '',
  reviewImg: ''
})

async function submitReview() {
  try {
    const dto = await reviewStore.createReview(props.productIdx, form)
    emit('submitted', dto)
    form.reviewRating  = 5
    form.reviewContent = ''
    form.reviewImg     = ''
  } catch {}
}
</script>

<style scoped>
.star‑rating .fa-star {
  transition: transform .1s ease;
}
.star‑rating .fa-star:hover {
  transform: scale(1.2);
}
</style>
