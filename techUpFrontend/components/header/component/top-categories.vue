<template>
  <div class="tp-header-category tp-category-menu tp-header-category-toggle" ref="actionButtonRef">
    <button @click="handleActive" class="tp-category-menu-btn tp-category-menu-toggle">
      <span>
        <SvgDropdown />
      </span>
      전체 카테고리 
    </button>
    <Transition>
      <nav v-if="isActive" class="tp-category-menu-content" :class="{ active: isActive }">
        <ul>
          <li v-for="(item, i) in category_items" class="has-dropdown" :key="i">
            <a class="cursor-pointer" @click="handleParentCategory(item.parent)">
              <span v-if="item.img">
                <img
                  :src="item.img"
                  alt="cate img"
                  style="width: 50px; height: 50px; object-fit: contain"
                />
              </span>
              {{ item.parent }}
            </a>
            <ul v-if="item.children" class="tp-submenu">
              <li v-for="(child, j) in item.children" :key="j">
                <a class="cursor-pointer" @click="handleSubCategory(child)">{{ child }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </Transition>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import category_data from "@/data/category-data";
import useClickOutside from '@/composables/useClickOutside.js';

export default {
  setup() {
    const router = useRouter();
    const category_items = category_data.filter(
      (c) => c.productType === "electronics"
    );
    const isActive = ref(false);

    // 토글 처리
    const handleActive = () => {
      isActive.value = !isActive.value;
    };

    // 상위 카테고리 클릭 처리
    const handleParentCategory = (value) => {
      const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
      router.push(`/shop?category=${newCategory}`);
    };

    // 서브 카테고리 클릭 처리
    const handleSubCategory = (value) => {
      const newCategory = value.toLowerCase().replace("&", "").split(" ").join("-");
      router.push(`/shop?subCategory=${newCategory}`);
    };

    const closeAction = () => {
      isActive.value = false;
    };

    const actionButtonRef = useClickOutside(closeAction);

    return {
      category_items,
      isActive,
      handleActive,
      handleParentCategory,
      handleSubCategory,
      actionButtonRef,
    };
  }
};

</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
