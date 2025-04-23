<template>
  <section class="tp-product-sm-area">
    <div class="container">
      <div class="row">
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                신규 등록 상품
                <SvgSectionLineSm />
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
              <ProductSmItem v-for="item in storeRef.newProducts.value" :key="item.id" :item="item" />
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                위시리스트 등록 상위 제품
                <SvgSectionLineSm />
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
              <ProductSmItem v-for="item in storeRef.topWishlistProduct.value" :key="item.id" :item="item" />
            </div>
          </div>
        </div>
        <div class="col-xl-4 col-md-6">
          <div class="tp-product-sm-list mb-50">
            <div class="tp-section-title-wrapper mb-40">
              <h3 class="tp-section-title tp-section-title-sm">
                판매량 상위 제품
                <SvgSectionLineSm />
              </h3>
            </div>

            <div class="tp-product-sm-wrapper mr-20">
              <ProductSmItem v-for="item in storeRef.topSalesProduct.value" :key="item.id" :item="item" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import product_data from "@/data/product-data";
import { useMainStore } from "../../pinia/useMainStore";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const storeRef = storeToRefs(mainStore);

</script>
