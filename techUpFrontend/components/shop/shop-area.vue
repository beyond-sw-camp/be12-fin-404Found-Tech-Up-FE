<template>
  <section :class="`tp-shop-area pb-120 ${full_width ? 'tp-shop-full-width-padding' : ''}`">
    <div :class="`${full_width ? 'container-fluid' : shop_1600 ? 'container-shop' : 'container'}`">
      <div class="row">
        <div v-if="!shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">
          <!-- shop sidebar start -->
          <shop-sidebar />
          <!-- shop sidebar end -->
        </div>
        <div :class="`${shop_no_side ? 'col-xl-12' : 'col-xl-9 col-lg-8'}`">
          <div class="tp-shop-main-wrapper">
            <div class="tp-shop-top mb-45">
              <div class="row">
                <div class="col-xl-6">
                  <div class="tp-shop-top-left d-flex align-items-center">
                    <div class="tp-shop-top-tab tp-tab">
                      <ul class="nav nav-tabs" id="productTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <button :class="`nav-link ${active_tab === 'list' ? 'active' : ''}`"
                            @click="handleActiveTab('list')">
                            <svg-list />
                          </button>
                        </li>
                        <li class="nav-item" role="presentation">
                          <button :class="`nav-link ${active_tab === 'grid' ? 'active' : ''}`"
                            @click="handleActiveTab('grid')">
                            <svg-grid />
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div class="tp-shop-top-result">
                      <p v-if="store.filteredProducts?.length">
                        Showing 1–{{ store.filteredProducts.slice(startIndex, endIndex).length }}
                        of {{ store.filteredProducts.length }} results
                      </p>

                    </div>
                  </div>
                </div>
                <div class="col-xl-6">
                  <shop-sidebar-filter-select @handle-select-filter="store.handleSelectFilter" />
                </div>
              </div>
            </div>
            <div class="tp-shop-items-wrapper tp-shop-item-primary">
              <div v-if="active_tab === 'grid'">
                <div class="row infinite-container">
                  <div v-for="item in store.filteredProducts?.slice(startIndex, endIndex)" :key="item.idx"
                    class="col-xl-4 col-md-6 col-sm-6 infinite-item">
                    <product-fashion-product-item :item="item" :spacing="true" />
                  </div>
                </div>
              </div>

              <div v-if="active_tab === 'list'">
                <div class="row">
                  <div class="col-xl-12">
                    <product-list-item v-for="item in store.filteredProducts?.slice(startIndex, endIndex)"
                      :key="item.idx" :item="item" />
                  </div>
                </div>
              </div>
            </div>

            <div class="tp-shop-pagination mt-20">
              <div v-if="store.filteredProducts && store.filteredProducts.length > 9" class="tp-pagination">
                <ui-pagination :items-per-page="9" :data="store.filteredProducts || []"
                  @handle-paginate="handlePagination" />
              </div>
            </div>
          </div>
        </div>

        <div v-if="shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">
          <!-- shop sidebar start -->
          <shop-sidebar />
          <!-- shop sidebar end -->
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useProductFilterBackStore } from '@/pinia/useProductFilterBackStore';
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute();

const props = defineProps({
  list_style: Boolean,
  full_width: Boolean,
  shop_1600: Boolean,
  shop_right_side: Boolean,
  shop_no_side: Boolean
});

const active_tab = ref(props.list_style ? 'grid' : 'list');
const store = useProductFilterBackStore();

let startIndex = ref(0)
let endIndex = ref(0)

const productStore = useProductFilterBackStore();

// 페이지가 처음 로드될 때 products를 가져오고 인덱스를 초기화
onMounted(async () => {
  await store.fetchProducts()
  // products가 채워진 후, 표시할 아이템 개수(예제에서는 9개)를 기준으로 인덱스 초기화
  const total = store.filteredProducts.length
  startIndex.value = 0
  endIndex.value = total > 9 ? 9 : total
})

// store.filteredProducts가 바뀔 때마다 startIndex, endIndex 업데이트 (예: 검색 조건 등)
watch(
  () => store.filteredProducts,
  (newProducts) => {
    const total = newProducts.length
    startIndex.value = 0
    endIndex.value = total > 9 ? 9 : total
  },
  { immediate: true }
)

const handlePagination = (data, start, end) => {
  // Pagination 컴포넌트에서 emit한 값으로 인덱스 갱신
  startIndex.value = start
  endIndex.value = end
}

function handleActiveTab(tab) {
  active_tab.value = tab
}

watch(
  () => route.query || route.params,
  () => {
    // route의 변화가 있을 경우 인덱스 리셋
    const total = store.filteredProducts.length
    startIndex.value = 0
    endIndex.value = total > 9 ? 9 : total
  }
)
</script>