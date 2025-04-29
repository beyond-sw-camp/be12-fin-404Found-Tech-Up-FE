<template>
  <div class="profile__ticket table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">게시글 번호</th>
          <th scope="col">게시글 제목</th>
          <th scope="col">작성일</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="board in boardStore.myPosts"
          :key="board.idx"
          @click="goToDetail(board.idx)"
          class="clickable-row"
        >
          <th scope="row">#{{ board.idx }}</th>
          <td>{{ board.boardTitle }}</td>
          <td>{{ formatDate(board.boardCreated) }}</td>
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
import { useRouter } from 'vue-router'
import { useBoardStore } from '@/pinia/useBoardStore'
import UiPagination2 from '@/components/ui/pagination2.vue'

const boardStore = useBoardStore()
const pageSize   = ref(10)
const router     = useRouter()

onMounted(async () => {
  await boardStore.fetchMyPosts({ page: 0, size: pageSize.value })
})

function onPageChange(newPage) {
  boardStore.fetchMyPosts({ page: newPage - 1, size: pageSize.value })
}

function goToDetail(boardIdx) {
  window.location.href = `/community-details/${boardIdx}`
}


function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString()
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
.clickable-row {
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.clickable-row:hover {
  background-color: #f8f9fa;
}
</style>
