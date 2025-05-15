<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb-1 title="Search Products" subtitle="Search Products" />
    <!-- breadcrumb end -->

    <!-- shop area start -->
    <section class="tp-shop-area pb-120">
      <div class="container">
        <div class="row">
          <div class="col-xl-12 col-lg-12">
            <div class="tp-shop-main-wrapper">
              <div class="tp-shop-top mb-45">
                <div class="row">
                  <div class="col-xl-6">
                    <div class="tp-shop-top-left d-flex align-items-center">
                      <div class="tp-shop-top-result">
                        <p>
                          Showing 1–{{
                            store.searchResult?.slice(0, perView).length
                          }}
                          of {{ store.totalProducts }} results
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6">
                    <shop-sidebar-filter-select @handle-select-filter="handleSelectFilter" />
                  </div>
                </div>
              </div>
              <div class="tp-shop-items-wrapper tp-shop-item-primary">
                <div>
                  <div class="row infinite-container">
                    <div v-for="item in storeRef.searchResult.value?.slice(0, perView)" :key="item.idx"
                      class="col-xl-4 col-md-6 col-sm-6 infinite-item">
                      <product-fashion-product-item :item="item" :spacing="true" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="text-center">
              <button v-if="
                store.searchResult &&
                perView < storeRef.totalProducts.value
              " @click="handlePerView" type="button" class="btn-loadmore tp-btn tp-btn-border tp-btn-border-primary">
                Load More Products
              </button>

              <p v-else class="btn-loadmore-text">End Of Products</p>
            </div>
            <div v-if="store.isLoading">검색 중...</div>
            <div v-else></div>
          </div>
        </div>
      </div>
    </section>
    <!-- shop area end -->
  </div>
</template>

<script setup>
useSeoMeta({ title: "Search Page" });

import { ref } from "vue";
import { useProductFilterBackStore } from "@/pinia/useProductFilterBackStore";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

let perView = ref(9);
const store = useProductFilterBackStore();
const storeRef = storeToRefs(store);
const route = useRoute();

async function handlePerView() {
  perView.value = perView.value + 3;
  await store.searchProducts(route.query.searchText, route.query.productType, 0, perView.value);
}

const handleSelectFilter = async (e) => {
  store.handleSelectFilter(e)
  await store.searchProducts(route.query.searchText, route.query.productType, 0, 9);
}

onMounted(async () => {
  await store.searchProducts(route.query.searchText, route.query.productType, 0, 9);
})
</script>
