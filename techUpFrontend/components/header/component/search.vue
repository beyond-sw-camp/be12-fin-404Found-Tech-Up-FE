<template>
  <div class="tp-header-search pl-70">
    <form @submit.prevent="handleSubmit">
      <div class="tp-header-search-wrapper d-flex align-items-center">
        <div class="tp-header-search-box">
          <input type="text" placeholder="상품 검색" v-model="searchText" />
        </div>
        <div class="tp-header-search-category">
          <client-only>
            <ui-nice-select :options="[
              { value: '', text: '전체 카테고리         ' },
              { value: 'cpu', text: 'CPU                           ' },
              { value: 'gpu', text: 'GPU                           ' },
              { value: 'ram', text: 'RAM                           ' },
              { value: 'ssd', text: 'SSD                           ' },
              { value: 'hdd', text: 'HDD                           ' }
            ]" name="Select Category" v-model="productType" :default-current="0" @onChange="changeHandler" />
          </client-only>
        </div>
        <div class="tp-header-search-btn">
          <button type="submit">
            <SvgSearch />
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { navigateTo } from "nuxt/app";
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const searchText = ref("");
    // 초기값을 빈 문자열로 설정하여 기본 옵션("Select Category")이 표시되게 함
    const productType = ref("");

    const changeHandler = (e) => {
      productType.value = e.value;
    };

    const handleSubmit = () => {
      if (!searchText.value && !productType.value) {
        return;
      } else if (searchText.value && productType.value) {
        navigateTo(
          `/search?searchText=${searchText.value}&productType=${productType.value}`
        );
      } else if (searchText.value && !productType.value) {
        navigateTo(`/search?searchText=${searchText.value}`);
      } else if (!searchText.value && productType.value) {
        navigateTo(`/search?productType=${productType.value}`);
      } else {
        navigateTo(`/search`);
      }
    };

    return {
      searchText,
      productType,
      changeHandler,
      handleSubmit,
    };
  },
};
</script>
