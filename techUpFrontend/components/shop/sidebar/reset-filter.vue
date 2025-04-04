<template>
  <div class="tp-shop-widget mb-50">
    <h3 class="tp-shop-widget-title">Reset Filter</h3>
    <button @click="handleReset" class="tp-btn">
      Reset Filter
    </button>
  </div>
</template>

<script setup>
import { useProductFilterStore } from '@/pinia/useProductFilterStore';

const store = useProductFilterStore();
const router = useRouter();

// 필요하다면 아래 props 로직도 JS 형태로 사용할 수 있어요
// const props = defineProps({
//   filter_dropdown: Boolean,
//   filter_offcanvas: Boolean,
//   load_more: Boolean,
//   right_side: Boolean,
//   shop_full: Boolean,
//   shop_1600: Boolean
// });

// const handleFilterReset = () => {
//   store.handleResetFilter();
//   if (props.filter_dropdown) router.push('/shop-filter-dropdown');
//   else if (props.filter_offcanvas) router.push('/shop-filter-offcanvas');
//   else if (props.load_more) router.push('/shop-load-more');
//   else if (props.right_side) router.push('/shop-right-sidebar');
//   else if (props.shop_full) router.push('/shop-full-width');
//   else if (props.shop_1600) router.push('/shop-1600');
//   else router.push('/shop');
// }

function handleReset() {
  store.handleResetFilter();
  router.push({
    path: router.currentRoute.value.path,
    query: {}
  });
}
</script>
