<template>
  <section :class="`tp-search-area tp-search-style-brown ${utilityStore.openSearchBar ? 'opened' : ''}`">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="tp-search-form">
            <div class="tp-search-close text-center mb-20">
              <button class="tp-search-close-btn tp-search-close-btn"></button>
            </div>
            <form @submit.prevent="handleSubmit">
              <div class="tp-search-input mb-10">
                <input type="text" placeholder="Search for product..." v-model="searchText" />
                <button type="submit"><i class="flaticon-search-1"></i></button>
              </div>
              <div class="tp-search-category">
                <span>Search by : </span>
                <a v-for="(c, i) in categories" :key="i" @click="productType = c"
                  class="cursor-pointer text-capitalize">
                  {{ c }}
                  <span v-if="i < categories.length - 1">, </span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div @click="utilityStore.handleOpenSearchBar()"
    :class="`body-overlay ${utilityStore.openSearchBar ? 'opened' : ''}`"></div>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUtilityStore } from '@/pinia/useUtilityStore';
import { navigateTo } from 'nuxt/app';

export default {
  setup() {
    const router = useRouter();
    const utilityStore = useUtilityStore();
    const searchText = ref("");
    const productType = ref("");
    const categories = ["electronics", "fashion", "beauty", "jewelry"];

    const handleSubmit = async () => {
      if (!searchText.value && !productType.value) {
        return;
      } else if (searchText.value && productType.value) {
        navigateTo(`/search?searchText=${searchText.value}&productType=${productType.value}`);
      } else if (searchText.value && !productType.value) {
        navigateTo(`/search?searchText=${searchText.value}`);
      } else if (!searchText.value && productType.value) {
        navigateTo(`/search?productType=${productType.value}`);
      } else {
        navigateTo(`/search`);
      }
    };

    return {
      utilityStore,
      searchText,
      productType,
      categories,
      handleSubmit,
    };
  }
};
</script>
