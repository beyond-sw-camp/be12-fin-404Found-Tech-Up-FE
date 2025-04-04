<template>
  <div class="tp-header-search pl-70">
    <form @submit.prevent="handleSubmit">
      <div class="tp-header-search-wrapper d-flex align-items-center">
        <div class="tp-header-search-box">
          <input type="text" placeholder="Search for Products..." v-model="searchText" />
        </div>
        <div class="tp-header-search-category">
          <ui-nice-select
            :options="[
              { value: 'select-category', text: 'Select Category' },
              { value: 'electronics', text: 'Electronics' },
              { value: 'fashion', text: 'Fashion' },
              { value: 'beauty', text: 'Beauty' },
              { value: 'jewelry', text: 'Jewelry' }
            ]"
            name="Select Category"
            :default-current="0"
            @onChange="changeHandler"
          />
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
import { ref } from "vue";

export default {
  setup() {
    // useRouter는 Nuxt에서 자동으로 주입되거나, 필요하다면 import { useRouter } from 'vue-router' 로 추가합니다.
    const router = useRouter();
    const searchText = ref("");
    const productType = ref("");

    const changeHandler = (e) => {
      productType.value = e.value;
    };

    const handleSubmit = () => {
      if (!searchText.value && !productType.value) {
        return;
      } else if (searchText.value && productType.value) {
        router.push(
          `/search?searchText=${searchText.value}&productType=${productType.value}`
        );
      } else if (searchText.value && !productType.value) {
        router.push(`/search?searchText=${searchText.value}`);
      } else if (!searchText.value && productType.value) {
        router.push(`/search?productType=${productType.value}`);
      } else {
        router.push(`/search`);
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
