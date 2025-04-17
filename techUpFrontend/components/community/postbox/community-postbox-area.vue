<template>
  <section class="tp-postbox-area pt-120 pb-120">
    <div class="container">
      <!-- 정렬 버튼 -->
      <div class="row mb-20">
        <div class="col-12 sort-buttons">
          <button
            @click="sortLatest"
            :class="{ active: currentSort === 'boardCreated' }"
          >
            최신순
          </button>
          <button
            @click="sortPopular"
            :class="{ active: currentSort === 'boardLikes' }"
          >
            인기순
          </button>
          <button
            @click="sortComments"
            :class="{ active: currentSort === 'boardComments' }"
          >
            댓글순
          </button>
        </div>
      </div>

      <div class="row">
        <!-- 게시글 리스트 -->
        <div class="col-xl-9 col-lg-8">
          <div class="tp-postbox-wrapper pr-50">
            <div v-if="paginatedItems.length === 0" class="alert alert-warning">
              표시할 게시글이 없습니다.
            </div>

            <community-postbox-item
              v-for="(post, i) in paginatedItems"
              :key="post.idx || i"
              :item="post"
            />

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
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useBoardStore } from '@/pinia/useBoardStore';

const route      = useRoute();
const boardStore = useBoardStore();

// 페이징 상태 (1-based)
const currentPage = ref(1);
const size        = ref(10);

// 현재 선택된 정렬 키
const currentSort = ref('boardCreated');

// 전체 게시글 수
const totalElements  = computed(() => boardStore.totalElements || 0);
// 현재 페이지 아이템
const paginatedItems = computed(() => boardStore.boardList);

// 공통: 쿼리 기반으로, 그리고 currentSort에 따라 불러오기
const loadBoardList = async () => {
  const page     = route.query.page   ? Number(route.query.page)   : 0;
  const category = route.query.category?.toString() || null;
  const search   = route.query.search  ?.toString() || null;
  const type     = route.query.type    ?.toString() || null;

  await boardStore.fetchBoardList({
    page,
    size:      size.value,
    sort:      currentSort.value,
    direction: 'desc',
    category,
    search,
    type
  });

  currentPage.value = page + 1;
};

// 초기 로드 및 URL 쿼리 변경 감지
onMounted(loadBoardList);
watch(() => [route.query.page, route.query.search, route.query.type], loadBoardList);

// 페이지 버튼 클릭 시
const onPageChange = async (newPage) => {
  const page     = newPage - 1;
  const category = route.query.category?.toString() || null;
  const search   = route.query.search  ?.toString() || null;
  const type     = route.query.type    ?.toString() || null;

  await boardStore.fetchBoardList({
    page,
    size:      size.value,
    sort:      currentSort.value,
    direction: 'desc',
    category,
    search,
    type
  });

  currentPage.value = newPage;
  window.scrollTo(0, 0);
};

// 정렬 버튼 핸들러
const sortLatest = () => {
  currentSort.value = 'boardCreated';
  loadBoardList();
};
const sortPopular = () => {
  currentSort.value = 'boardLikes';
  loadBoardList();
};
const sortComments = () => {
  currentSort.value = 'boardComments';
  loadBoardList();
};
</script>

<style scoped>
.sort-buttons {
  display: flex;
  gap: 8px;
}
.sort-buttons button {
  padding: 6px 12px;
  border: 1px solid #aaa;
  background: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 0.9rem;
}
.sort-buttons button.active {
  background: #007bff;
  color: #fff;
  border-color: #007bff;
}
.tp-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
