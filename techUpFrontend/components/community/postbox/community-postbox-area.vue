<template>
  <section class="tp-postbox-area pt-120 pb-120">
    <div class="container">
      <div class="row">
        <!-- 게시글 리스트 -->
        <div class="col-xl-9 col-lg-8">
          <div class="tp-postbox-wrapper pr-50">
            <!-- 데이터가 없을 경우 메시지 표시 -->
            <div v-if="paginatedItems.length === 0" class="alert alert-warning">
              표시할 게시글이 없습니다.
            </div>
            
            <!-- 각 아이템 렌더링 -->
            <community-postbox-item
              v-for="(post, i) in paginatedItems"
              :key="post.idx || i"
              :item="post"
            />
            
            <!-- 페이지네이션 -->
            <div class="tp-blog-pagination mt-50" v-if="totalElements > 0">
              <div class="tp-pagination">
                <ui-pagination2
  :data="boardStore.boardList" 
  :totalItems="totalElements"
  :itemsPerPage="size"
  :initialPage="currentPage"  
  @handlePaginate="onPageChange"
/>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 사이드바 -->
        <div class="col-xl-3 col-lg-4">
          <community-sidebar />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useBoardStore } from '@/pinia/useBoardStore';

const boardStore = useBoardStore();

const currentPage = ref(1);
const size = ref(10);

// 전체 게시글 수 - API 응답에서 가져옴
const totalElements = computed(() => {
  // API 응답에 있는 totalElements 사용
  const total = boardStore.totalElements;
  console.log('계산된 totalElements:', total);
  
  // 안전 장치: 값이 없거나 유효하지 않으면 boardList 길이 사용
  if (!total || total <= 0) {
    return boardStore.boardList.length;
  }
  
  return total;
});

// 현재 페이지의 게시글 목록
// 현재 페이지의 게시글 목록
const paginatedItems = computed(() => {
  if (!Array.isArray(boardStore.boardList) || boardStore.boardList.length === 0) {
    return [];
  }
  
  console.log(`현재 페이지: ${currentPage.value}, 전체 데이터: ${boardStore.boardList.length}개`);
  
  // 페이지 계산 (0 인덱스가 아닌 1 인덱스 기준)
  const startIndex = (currentPage.value - 1) * size.value;
  const endIndex = Math.min(startIndex + size.value, boardStore.boardList.length);
  
  console.log(`계산된 인덱스 범위: ${startIndex} ~ ${endIndex}`);
  const items = boardStore.boardList.slice(startIndex, endIndex);
  console.log(`현재 페이지 아이템 수: ${items.length}개`);
  
  return items;
});

// 페이지 변경 처리
const onPageChange = async (newPage) => {
  const pageParam = newPage - 1; // 1-based → 0-based
  await boardStore.fetchBoardList({ page: pageParam, size: size.value });
  window.scroll(0, 0);
};


onMounted(async () => {
  console.log('컴포넌트 마운트됨');
  await boardStore.fetchBoardList();
  console.log(`초기 데이터 로드 완료: ${boardStore.boardList.length}개`);
  console.log(`totalElements: ${boardStore.totalElements}, totalPages: ${Math.ceil(boardStore.totalElements / size.value)}`);
});
</script>

<style scoped>
.tp-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>