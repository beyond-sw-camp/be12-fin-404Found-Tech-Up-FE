<template>
  <section class="tp-product-sm-area">
    <div class="container">
      <div class="row">

        <!-- 신규 등록 상품 -->
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                신규 등록 상품
                <SvgSectionLineSm />
              </h3>
            </div>
            <div class="tp-product-sm-wrapper mr-20">
              <ProductSmItem v-for="item in newProducts" :key="item.idx" :item="item" />
            </div>
          </div>
        </div>

        <!-- 위시리스트 등록 상위 제품 -->
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                위시리스트 등록 상위 제품
                <SvgSectionLineSm />
              </h3>
            </div>
            <div class="tp-product-sm-wrapper mr-20">
              <ProductSmItem v-for="item in topWishlistProduct" :key="item.idx" :item="item" />
            </div>
          </div>
        </div>

        <!-- 판매량 상위 제품 -->
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                판매량 상위 제품
                <SvgSectionLineSm />
              </h3>
            </div>
            <div class="tp-product-sm-wrapper mr-20">
              <ProductSmItem v-for="item in topSalesProduct" :key="item.idx" :item="item" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted } from 'vue'
import { useMainStore } from '@/pinia/useMainStore'
import { storeToRefs } from 'pinia'

const mainStore = useMainStore();
let { newProducts, topWishlistProduct, topSalesProduct } = storeToRefs(mainStore)

/*
onMounted(async () => {
  await Promise.all([
    mainStore.loadNewProduct(),
    mainStore.loadTopWishlist(),
    mainStore.loadTopSales()
  ])
})*/
</script>
