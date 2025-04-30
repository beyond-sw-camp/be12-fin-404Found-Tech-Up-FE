<template>
  <div class="tp-product-details-tab-nav tp-tab">
    <nav>
      <div class="nav nav-tabs justify-content-center p-relative tp-product-tab" id="navPresentationTab" role="tablist">
        <button @click="handleActiveMarker($event)" class="nav-link" id="nav-description-tab" data-bs-toggle="tab"
          data-bs-target="#nav-description" type="button" role="tab" aria-controls="nav-description"
          aria-selected="true">Description</button>

        <button @click="handleActiveMarker($event)" class="nav-link active" id="nav-addInfo-tab" data-bs-toggle="tab"
          data-bs-target="#nav-addInfo" type="button" role="tab" aria-controls="nav-addInfo"
          aria-selected="false">Additional information</button>

        <button @click="handleActiveMarker($event)" class="nav-link" id="nav-review-tab" data-bs-toggle="tab"
          data-bs-target="#nav-review" type="button" role="tab" aria-controls="nav-review" aria-selected="false">Reviews
          ({{ props.reviews?.length }})</button>
        <span id="productTabMarker" class="tp-product-details-tab-line"></span>
      </div>
    </nav>
    <div class="tab-content" id="navPresentationTabContent">
      <div class="tab-pane fade" id="nav-description" role="tabpanel" aria-labelledby="nav-description-tab"
        tabindex="0">
        <div class="tp-product-details-desc-wrapper pt-80">
          <div class="row justify-content-center">
            <div class="col-xl-10">
              <div class="tp-product-details-desc-item pb-105">
                <div class="row">
                  <div class="col-lg-12">
                    <div class="tp-product-details-desc-content pt-25">
                      <span>{{ product.category }}</span>
                      <h3 class="tp-product-details-desc-title">{{ product.name }}</h3>
                      <p>{{ product.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade show active" id="nav-addInfo" role="tabpanel" aria-labelledby="nav-addInfo-tab"
        tabindex="0">
        <div class="tp-product-details-additional-info ">
          <div class="row justify-content-center">
            <div class="col-xl-10">
              <table>
                <tbody>
                  <tr v-for="(info, i) in product.additionalInformation" :key="i">
                    <td>{{ info.key }}</td>
                    <td>{{ info.value }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade" id="nav-review" role="tabpanel" aria-labelledby="nav-review-tab" tabindex="0">
        <div class="tp-product-details-review-wrapper pt-60">
          <div class="row">
            <!-- left 8 columns: just the review list + pagination -->
            <div class="col-lg-8">
              <h3 class="tp-product-details-review-title mb-4">별점 & 리뷰</h3>
              <div class="tp-product-details-review-list pr-110">
                <div v-if="pagedReviews.length">
                  <div v-for="item in pagedReviews" :key="item.reviewIdx"
                    class="tp-product-details-review-avater d-flex align-items-start mb-3">
                    <div class="tp-product-details-review-avater-thumb me-3">
                      <img :src="item.user" alt="user" />
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <div class="d-flex align-items-center">
                          <div class="tp-product-details-review-avater-rating d-flex align-items-center me-3">
                            <span v-for="n in item.reviewRating" :key="`star-${item.reviewIdx}-${n}`" class="me-1">
                              <i class="fa-solid fa-star text-warning"></i>
                            </span>
                          </div>
                          <h3 class="tp-product-details-review-avater-title mb-0 me-3">
                            {{ item.userName }}
                          </h3>
                          <small class="text-muted">{{ formatDate(item.reviewDate) }}</small>
                        </div>
                        <button v-if="item.reviewUserId === userStore.user?.userIdx" class="btn btn-sm btn-outline-danger" @click="remove(item.reviewIdx)">
                          <i class="fa-solid fa-trash"></i> 삭제
                        </button>
                      </div>
                      <div class="tp-product-details-review-avater-comment">
                        <p>{{ item.reviewContent }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="text-center py-4">
                  <h5>No Reviews Found</h5>
                </div>

                <!-- pagination controls -->
                <div class="d-flex justify-content-between align-items-center mt-4">
                  <button class="btn btn-sm btn-outline-secondary" :disabled="currentPage === 1" @click="goPrev">
                    ←
                  </button>
                  <span>Page {{ currentPage }} of {{ totalPages }}</span>
                  <button class="btn btn-sm btn-outline-secondary" :disabled="currentPage === totalPages"
                    @click="goNext">
                    →
                  </button>
                </div>
              </div>
            </div>
            <!-- right 4 columns: summary up top, write‐form below -->
            <div class="col-lg-4">
              <div class="tp-product-details-review-statics mb-5">
                <h3 class="tp-product-details-review-number-title">Customer reviews</h3>
                <div class="tp-product-details-review-summery d-flex align-items-center mb-3">
                  <div class="tp-product-details-review-summery-value me-3">
                    <span class="h1">{{ averageRating }}</span>
                  </div>
                  <div class="tp-product-details-review-summery-rating d-flex align-items-center">
                    <span v-for="n in Math.round(averageRating)" :key="n" class="me-1">
                      <i class="fa-solid fa-star text-warning"></i>
                    </span>
                    <p class="mb-0">({{ totalReviews }} Reviews)</p>
                  </div>
                </div>
                <div class="tp-product-details-review-rating-list">
                  <product-details-rating-item v-for="s in [5, 4, 3, 2, 1]" :key="s" :star="s" :width="ratingPercent(s)" />
                </div>
              </div>

              <div class="tp-product-details-review-form">
                <h3 class="tp-product-details-review-form-title">리뷰 작성하기</h3>
                <forms-review-form :product-idx="props.product.idx" @submitted="$emit('review-submitted', $event)" />

              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRuntimeConfig } from '#imports'
import { useReviewStore } from '@/pinia/useReviewStore'
import { useUserStore }     from '@/pinia/useUserStore'

const userStore   = useUserStore()

const handleActiveMarker = (event) => {
  const marker = document.getElementById("productTabMarker");
  if (marker && event.target) {
    marker.style.left = event.target.offsetLeft + "px";
    marker.style.width = event.target.offsetWidth + "px";
  }
};

const props = defineProps({
  product: { type: Object, required: true },
  reviews: { type: Array, default: () => [] }
})

const product = props.product
const config = useRuntimeConfig()

onMounted(() => {
  const nav_active = document.getElementById("nav-addInfo-tab");
  const marker = document.getElementById("productTabMarker");
  if (nav_active && nav_active.classList.contains("active") && marker) {
    marker.style.left = nav_active.offsetLeft + "px";
    marker.style.width = nav_active.offsetWidth + "px";
  }
});

onMounted(async () => {
  if (userStore.user === null) {
    await userStore.fetchUserInfo()
    console.log('userStore.user:', userStore.user)
  }
})

function formatDate(iso) {
  return iso?.split?.('T')[0] || ''
}


// ---------------------페이지네이션 관련----------------------------------
const currentPage = ref(1)
// 페이지당 리뷰는 5개씩 보여준다.
const pageSize = ref(5)

const totalPages = computed(() =>
  Math.ceil(props.reviews.length / pageSize.value)
)

const pagedReviews = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  return props.reviews.slice(start, start + pageSize.value)
})

function goPrev() {
  if (currentPage.value > 1) currentPage.value--
}
function goNext() {
  if (currentPage.value < totalPages.value) currentPage.value++
}


// ---------------------별점 평균 관련----------------------------------
const totalReviews = computed(() => props.reviews.length)

const averageRating = computed(() => {
  if (totalReviews.value === 0) return '0.0'
  const sum = props.reviews.reduce((acc, r) => acc + r.reviewRating, 0)
  return (sum / totalReviews.value).toFixed(1)
})

function ratingPercent(star) {
  if (totalReviews.value === 0) return '0'
  const count = props.reviews.filter(r => r.reviewRating === star).length
  return ((count / totalReviews.value) * 100).toFixed(0)
}

// ---------------------리뷰 삭제 관련----------------------------------
const reviewStore = useReviewStore()

async function remove(reviewIdx) {
  if (!confirm('정말 이 리뷰를 삭제하시겠습니까?')) return
  try {
    await reviewStore.deleteReview(reviewIdx)
    if (pagedReviews.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  } catch { }
}

</script>
