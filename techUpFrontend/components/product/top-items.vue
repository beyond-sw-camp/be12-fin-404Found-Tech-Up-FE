<template>
  <section class="tp-product-area pb-55">
    <div class="container">
      <div class="row align-items-end">
        <div class="col-xl-5 col-lg-6 col-md-5">
          <div class="tp-section-title-wrapper mb-40">
            <h3 class="tp-section-title">
              당신에게 추천하는 제품
              <SvgSectionLine />
            </h3>
          </div>
        </div>
        <div class="col-xl-7 col-lg-6 col-md-7">
          <div class="tp-product-tab tp-product-tab-border mb-45 tp-tab d-flex justify-content-md-end">
            <ul class="nav nav-tabs justify-content-sm-end" id="productTab">
              <li v-for="(tab, i) in tabs" :key="i" class="nav-item">
                <button @click="handleActiveTab(tab)" :class="`nav-link ${active_tab === tab ? 'active' : ''}`">
                  {{ tab }}
                  <span class="tp-product-tab-line">
                    <SvgActiveLine />
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="tp-product-tab-content">
            <div class="row">
              <div v-for="(item, i) in storeRef.suggestion.value" :key="i" class="col-xl-3 col-lg-3 col-sm-6">
                <ProductItem :item="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from 'vue';

import { useMainStore } from '../../pinia/useMainStore';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const active_tab = ref('New');
    const tabs = [];

    const handleActiveTab = (tab) => {
      active_tab.value = tab;
    };

    const mainStore = useMainStore();
    const storeRef = storeToRefs(mainStore);
    /*
    const electronic_prd = product_data.filter(
      (p) => p.productType === 'electronics'
    );
    const allProducts = electronic_prd;

    const filteredProducts = computed(() => {
      if (active_tab.value === 'New') {
        return allProducts.slice(0, 8);
      } else if (active_tab.value === 'Featured') {
        return allProducts.filter((product) => product.featured);
      } else {
        return [];
      }
    });
    */
    onMounted(() => {
      // 필요하다면 onMounted 로직 추가
    });

    return {
      active_tab,
      tabs,
      handleActiveTab,
      storeRef,
      // filteredProducts,
    };
  }
};
</script>
