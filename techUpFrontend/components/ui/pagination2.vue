<!-- ui-pagination2 컴포넌트 -->
<template>
    <nav>
      <ul>
        <li @click="setPage(currentPage - 1)" :class="{ disable: currentPage === 1 }">
          <a class="tp-pagination-prev prev page-numbers cursor-pointer">
            <svg-paginate-prev />
          </a>
        </li>
  
        <li v-for="n in totalPages" :key="n" @click="setPage(n)">
          <a :class="`cursor-pointer ${currentPage === n ? 'current' : ''}`">{{ n }}</a>
        </li>
  
        <li @click="setPage(currentPage + 1)" :class="{ disable: currentPage === totalPages }">
          <a class="next page-numbers cursor-pointer">
            <svg-paginate-next />
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { computed, ref, onMounted, watch } from 'vue';
  import { useRoute } from 'vue-router';
  
  const emit = defineEmits(['handlePaginate']);
  
  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    },
    totalItems: {
      type: Number,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    },
    initialPage: {
    type: Number,
    default: 1
  }
  });
  
  // 1-based 페이지 번호 사용
  const currentPage = ref(1);
  
  const totalPages = computed(() => {
    const pages = Math.ceil(props.totalItems / props.itemsPerPage);
    console.log(`총 아이템: ${props.totalItems}, 페이지당 아이템: ${props.itemsPerPage}, 총 페이지: ${pages}`);
    return Math.max(1, pages); // 최소 1페이지
  });
  
  const setPage = (idx) => {
    if (idx <= 0 || idx > totalPages.value) return;
    window.scrollTo(0, 0);
    currentPage.value = idx;
    console.log(`페이지 변경: ${idx} / 총 페이지: ${totalPages.value}`);
    emit('handlePaginate', currentPage.value);
  };
  
  onMounted(() => {
  currentPage.value = props.initialPage;
  emit('handlePaginate', currentPage.value);
});  
  const route = useRoute();
  watch(() => route.query || route.params, () => {
    currentPage.value = 1;
  });
  </script>