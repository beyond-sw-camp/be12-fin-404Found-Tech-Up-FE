<template>
  <section class="tp-postbox-area pt-120 pb-120">
    <div class="container">
      <div class="row">
        <!-- 게시글 리스트 -->
        <div class="col-xl-9 col-lg-8">
          <div class="tp-postbox-wrapper pr-50">
            <community-postbox-item
              v-for="(post, i) in paginatedItems"
              :key="post.idx"
              :item="post"
            />

            <!-- 페이지네이션 -->
            <div class="tp-blog-pagination mt-50" v-if="totalElements > 0">
              <div class="tp-pagination">
                <ui-pagination
                  :items-per-page="size"
                  :total-items="totalElements"
                  :data="fakePaginationArray"
                  :current-page="page + 1"
                  @handle-paginate="onPageChange"
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

  <!-- 비디오 모달 -->
  <modal-video />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useBoardStore } from '@/pinia/useBoardStore';

const boardStore = useBoardStore();

// computed 대신 ref로 변경하고 초기값은 빈 배열로 설정
const paginatedItems = ref([]);
const page = ref(0);
const size = ref(10);
const totalElements = ref(0);

const fakePaginationArray = computed(() =>
  Array.from({ length: totalElements.value })
);

const fetchList = async () => {
  await boardStore.fetchBoardList({ page: page.value, size: size.value });
  
  // 데이터 할당
  paginatedItems.value = [...boardStore.boardList];
  totalElements.value = boardStore.totalElements;
  console.log('페이지네이션 업데이트 후 데이터:', paginatedItems.value);
};

const onPageChange = async (newPage) => {
  console.log('요청된 페이지:', newPage, '타입:', typeof newPage);
  
  // newPage가 유효한 숫자인지 확인
  const pageNum = parseInt(newPage, 10);
  if (isNaN(pageNum) || pageNum < 1) {
    console.warn('잘못된 페이지 요청 감지, 기본 페이지로 이동');
    page.value = 0;
  } else {
    page.value = pageNum - 1; // 0-based 인덱싱으로 변환
  }
  
  // 페이지 변경 후 데이터 다시 불러오기
  await fetchList();
};

// watch는 유지하되 paginatedItems가 ref이므로 적용 가능
watch(
  () => boardStore.boardList,
  (newList) => {
    console.log('게시글 목록 변경 감지:', newList);
    if (newList && newList.length > 0) {
      paginatedItems.value = [...newList];
    }
  },
  { deep: true }
);

onMounted(() => {
  fetchList();
});
</script>