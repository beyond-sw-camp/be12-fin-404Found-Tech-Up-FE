<template>
  <div>

    <!-- community postbox area start -->
    <community-postbox-area />
    <!-- community postbox area end -->
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { useBoardStore } from '@/pinia/useBoardStore';

const boardStore = useBoardStore();
const route = useRoute();

const fetchFilteredBoardList = () => {
  const category = route.query.category || null;
  const search = route.query.search || null;

  boardStore.fetchBoardList({
    page: 0,
    size: 10,
    sort: 'boardCreated',
    direction: 'desc',
    category,
    search
  });
};

onMounted(fetchFilteredBoardList);

// 쿼리 변경 시에도 다시 fetch
watch(() => route.query, fetchFilteredBoardList, { deep: true });
</script>
