<template>
  <form @submit.prevent="submitReview">
    <!-- star‐rating control bound to form.reviewRating -->
    <select v-model="form.reviewRating">
      <option v-for="n in 5" :key="n" :value="n">{{n}}★</option>
    </select>

    <textarea
      v-model="form.reviewContent"
      placeholder="Write your review here…"
      required
    />

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
