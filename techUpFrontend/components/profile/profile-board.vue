<template>
  <div class="profile__ticket table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">게시글 번호</th>
          <th scope="col">게시글 제목</th>
          <th scope="col">수정</th>
          <th scope="col">삭제</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="board in boardStore.myPosts"
          :key="board.idx"
        >
          <th scope="row">#{{ board.idx }}</th>
          <td>{{ board.boardTitle }}</td>
          <td>
            <a
              href="#"
              class="tp-logout-btn"
              @click.prevent="onEdit(board.idx)"
            >수정</a>
          </td>
          <td>
            <a
              href="#"
              class="tp-logout-btn"
              @click.prevent="onDelete(board.idx)"
            >삭제</a>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이징 -->
    <div class="tp-blog-pagination">
      <div class="tp-pagination">
        <ui-pagination2
          :totalItems="boardStore.myTotalElements"
          :itemsPerPage="pageSize"
          :initialPage="boardStore.myCurrentPage + 1"
          @handlePaginate="onPageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useBoardStore } from '@/pinia/useBoardStore'
import UiPagination2 from '@/components/ui/pagination2.vue'

const boardStore = useBoardStore()
const pageSize   = ref(10)

onMounted(async () => {
  // 0-based 페이지 인자
  await boardStore.fetchMyPosts({ page: 0, size: pageSize.value })
})

function onPageChange(newPage) {
  // newPage 는 1-based 이므로 -1
  boardStore.fetchMyPosts({ page: newPage - 1, size: pageSize.value })
}

// 수정/삭제 핸들러 (필요한 로직으로 채워주세요)
function onEdit(boardIdx) {
  console.log('수정:', boardIdx)
}
function onDelete(boardIdx) {
  console.log('삭제:', boardIdx)
}
</script>

<style scoped>
.profile__ticket {
  margin-top: 2rem;
}
.tp-blog-pagination {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}
.tp-blog-pagination .tp-pagination ul {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
