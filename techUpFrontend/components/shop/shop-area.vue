<template>
  <section :class="`tp-shop-area pb-120 ${full_width ? 'tp-shop-full-width-padding' : ''}`">
    <div :class="`${full_width ? 'container-fluid' : shop_1600 ? 'container-shop' : 'container'}`">
      <div class="row">
        <div v-if="!shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">
          <shop-sidebar />
        </div>
        <div :class="`${shop_no_side ? 'col-xl-12' : 'col-xl-9 col-lg-8'}`">
          <div class="tp-shop-main-wrapper">
            <div v-if="store.isLoading">로딩 중...</div>
            <div v-else></div>
            <!-- result count -->
            <div class="tp-shop-top-result mb-3">
              <p v-if="store.totalProducts">
                Showing
                {{ (currentPage - 1) * ITEMS_PER_PAGE + 1 }}
                –
                {{ Math.min(currentPage * ITEMS_PER_PAGE, store.totalProducts) }}
                of {{ store.totalProducts }} results
              </p>
            </div>

            <!-- GRID -->
            <div v-if="active_tab === 'grid'" key="grid" class="row infinite-container">
              <div v-for="item in store.products" :key="item.productIdx"
                class="col-xl-4 col-md-6 col-sm-6 infinite-item">
                <product-fashion-product-item :item="item" :spacing="true" />
              </div>
            </div>

            <!-- LIST -->
            <div v-else key="list" class="row">
              <div class="col-xl-12">
                <product-list-item v-for="item in store.products" :key="item.productIdx" :item="item" />
              </div>
            </div>

            <!-- custom pagination -->
            <nav v-if="pageCount > 1" class="tp-shop-pagination mt-20" aria-label="Page navigation">
              <ul class="pagination">
                <li v-if="blockStart > 1" class="page-item">
                  <a href="#" class="page-link" @click.prevent="changePage(blockStart - 1)">«</a>
                </li>

                <li v-for="page in pagesInBlock" :key="page" :class="['page-item', { active: page === currentPage }]">
                  <a href="#" class="page-link" @click.prevent="changePage(page)">{{ page }}</a>
                </li>

                <li v-if="blockEnd < pageCount" class="page-item">
                  <a href="#" class="page-link" @click.prevent="changePage(blockEnd + 1)">»</a>
                </li>
              </ul>
            </nav>

          </div>
        </div>
        <div v-if="shop_right_side && !shop_no_side" class="col-xl-3 col-lg-4">
          <shop-sidebar />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useProductFilterBackStore } from '@/pinia/useProductFilterBackStore'
import { nextTick } from 'vue'
import { useRoute } from 'vue-router';

const route = useRoute();
let category = ref(route.query.category);

const props = defineProps({
  list_style: Boolean,
  full_width: Boolean,
  shop_1600: Boolean,
  shop_right_side: Boolean,
  shop_no_side: Boolean,
})

const active_tab = ref(props.list_style ? 'grid' : 'list')
function handleActiveTab(tab) {
  active_tab.value = tab
}

const ITEMS_PER_PAGE = 10
const BLOCK_SIZE = 10
const currentPage = ref(1)
const store = useProductFilterBackStore()

const pageCount = computed(() =>
  Math.ceil(store.totalProducts / ITEMS_PER_PAGE)
)

const blockStart = computed(() =>
  Math.floor((currentPage.value - 1) / BLOCK_SIZE) * BLOCK_SIZE + 1
)
const blockEnd = computed(() =>
  Math.min(blockStart.value + BLOCK_SIZE - 1, pageCount.value)
)

const pagesInBlock = computed(() => {
  const pages = []
  for (let p = blockStart.value; p <= blockEnd.value; p++) {
    pages.push(p)
  }
  return pages;
})

watch(() => category.value, () => { });

// fetch the first page on mount
onMounted(async () => {
  await store.fetchProducts(route.query.category ? route.query.category : ' ', 0, 10);
})

async function changePage(page) {
  if (page === currentPage.value) return
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  await store.fetchProducts(route.query.category, page - 1, ITEMS_PER_PAGE)
  await nextTick()
}
</script>
