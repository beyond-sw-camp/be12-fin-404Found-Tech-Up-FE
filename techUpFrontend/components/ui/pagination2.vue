<template>
  <nav>
    <ul>
      <!-- 이전 페이지 버튼 -->
      <li @click="setPage(currentPage - 1)" :class="{ disable: currentPage === 1 }">
        <a class="tp-pagination-prev prev page-numbers cursor-pointer">
          <svg-paginate-prev />
        </a>
      </li>

      <!-- 페이지 번호들 (가변 범위) -->
      <li
        v-for="n in visiblePages"
        :key="n"
        @click="setPage(n)"
      >
        <a :class="`cursor-pointer ${currentPage === n ? 'current' : ''}`">{{ n }}</a>
      </li>

      <!-- 다음 페이지 버튼 -->
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

// 현재 페이지
const currentPage = ref(1);

// 총 페이지 수 계산
const totalPages = computed(() => {
  const pages = Math.ceil(props.totalItems / props.itemsPerPage);
  return Math.max(1, pages); // 최소 1페이지
});

// 현재 페이지 기준 앞뒤로 몇 개 보여줄지 설정
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const delta = 5;

  let start = Math.max(1, current - delta);
  let end = Math.min(total, current + delta);

  if (end - start < delta * 2) {
    if (start === 1) {
      end = Math.min(total, start + delta * 2);
    }
    if (end === total) {
      start = Math.max(1, end - delta * 2);
    }
  }

  const result = [];
  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
});

// 페이지 변경
const setPage = (idx) => {
  if (idx <= 0 || idx > totalPages.value) return;
  window.scrollTo(0, 0);
  currentPage.value = idx;
  emit('handlePaginate', currentPage.value);
};

// 초기 페이지 설정 및 URL 변경 대응
onMounted(() => {
  currentPage.value = props.initialPage;
  emit('handlePaginate', currentPage.value);
});

const route = useRoute();
watch(() => route.query || route.params, () => {
  currentPage.value = 1;
});
</script>

<style scoped>
.disable {
  pointer-events: none;
  opacity: 0.5;
}
</style>
