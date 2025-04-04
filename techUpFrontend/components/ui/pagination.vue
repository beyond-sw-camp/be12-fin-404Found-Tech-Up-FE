<template>
    <nav>
      <ul>
        <li @click="setPage(currentPage - 1)" :class="currentPage === 1 ? 'disable' : ''">
          <a class="tp-pagination-prev prev page-numbers cursor-pointer">
            <svg-paginate-prev />
          </a>
        </li>
  
        <li v-for="n in totalPages" :key="n" @click="setPage(n)">
          <a :class="`cursor-pointer ${currentPage === n ? 'current' : ''}`">
            {{ n }}
          </a>
        </li>
  
        <li @click="setPage(currentPage + 1)" :class="currentPage === totalPages ? 'disable' : ''">
          <a class="next page-numbers cursor-pointer">
            <svg-paginate-next />
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script setup>
  import { computed, ref, onMounted, watch } from 'vue';
  
  const emit = defineEmits(['handlePaginate']);
  const route = useRoute();
  
  const props = defineProps({
    data: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      required: true
    }
  });
  
  const currentPage = ref(1);
  
  const totalPages = computed(() =>
    Math.ceil(props.data.length / props.itemsPerPage)
  );
  const startIndex = computed(() =>
    (currentPage.value - 1) * props.itemsPerPage
  );
  const endIndex = computed(() =>
    startIndex.value + props.itemsPerPage
  );
  
  const setPage = (idx) => {
    if (idx <= 0 || idx > totalPages.value) return;
    window.scrollTo(0, 0);
    currentPage.value = idx;
    emit('handlePaginate', props.data, startIndex.value, endIndex.value);
  };
  
  onMounted(() => {
    emit('handlePaginate', props.data, startIndex.value, endIndex.value);
  });
  
  watch(() => route.query || route.params, () => {
    currentPage.value = 1;
  });
  </script>
  