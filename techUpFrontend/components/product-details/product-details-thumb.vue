<template>
  <div class="tp-product-details-thumb-wrapper tp-tab d-sm-flex">
    <nav>
      <div class="nav nav-tabs flex-sm-column" id="productDetailsNavThumb" role="tablist">
        <button
          v-for="(image, i) in product.images"
          :key="i"
          @click="productStore.handleImageActive(image)"
          :class="`nav-link ${image === productBackStore.activeImg ? 'active' : ''}`"
        >
          <img :src="image" alt="nav-img" />
        </button>
      </div>
    </nav>
    <div class="tab-content m-img" id="productDetailsNavContent">
      <div>
        <div class="tp-product-details-nav-main-thumb" style="background-color: #f5f6f8">
          <img :src="productBackStore.activeImg" alt="prd-image" />
          <div v-if="product.videoId" class="tp-product-details-thumb-video">
            <a @click="utilsStore.playVideo(product.videoId)" class="tp-product-details-thumb-video-btn cursor-pointer popup-video">
              <i class="fas fa-play"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- modal video component -->
  <modal-video v-if="product.videoId" />
  <!-- modal video component -->
</template>

<script setup>
import { useProductBackStore } from "@/pinia/useProductBackStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";

const props = defineProps({
  product: Object
});

const productBackStore = useProductBackStore();
const utilsStore = useUtilityStore();
</script>
