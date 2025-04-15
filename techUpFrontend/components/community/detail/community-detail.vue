<template>
    <div v-if="board && board.idx" class="post-detail-container">
      <div class="post-section">
        <h3 class="post-label">제목</h3>
        <p class="post-title">{{ board.boardTitle }}</p>
      </div>
  
      <div class="post-section-row">
        <div class="post-meta-block">
          <h4 class="post-label">작성자</h4>
          <p class="post-meta-value">{{ board.writer || '탈퇴한 사용자' }}</p>
        </div>
        <div class="post-meta-block">
          <h4 class="post-label">작성일</h4>
          <p class="post-meta-value">{{ formattedDate }}</p>
        </div>
      </div>
  
      <div class="post-section" v-if="board.fileList && board.fileList.length">
        <h3 class="post-label">첨부파일</h3>
        <ul class="post-files">
          <li v-for="(file, i) in board.fileList" :key="i">
            <a :href="buildS3Url(file.filesUrl)" target="_blank">{{ file.filesName }}</a>
          </li>
        </ul>
      </div>
  
      <div class="post-section post-content" v-html="board.boardContent"></div>

      <!-- 좋아요 / 싫어요 영역 -->
<div class="post-section post-reactions">
  <button class="btn-like" @click="handleLike">👍 {{ board.boardLikes || 0 }}</button>
  <button class="btn-unlike" @click="handleUnlike">👎 {{ board.boardUnlikes || 0 }}</button>
</div>

  
      <div class="post-section post-actions">
        <button class="btn-edit" @click="goEdit">수정</button>
        <button class="btn-delete" @click="confirmDelete">삭제</button>
      </div>
    </div>
  
    <div v-else class="text-center text-gray-500">게시글을 불러오는 중입니다...</div>
  </template>
  
  <script setup>
  import { onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useBoardStore } from '@/pinia/useBoardStore';
  import { buildS3Url } from '@/utils/useS3';
  import { format } from 'date-fns';
  
  const route = useRoute();
  const router = useRouter();
  const boardStore = useBoardStore();
  const board = computed(() => boardStore.currentBoard || {});
  
  const formattedDate = computed(() => {
    try {
      return format(new Date(board.value.boardCreated), 'yyyy-MM-dd HH:mm');
    } catch {
      return board.value.boardCreated;
    }
  });

  
  const fetchBoardDetail = async () => {
    const idx = route.params.idx;
    if (!idx) return;
    await boardStore.fetchBoardDetail(idx);
  };
  
  const goEdit = () => {
    router.push(`/community/edit/${board.value.idx}`);
  };
  
  const confirmDelete = async () => {
    if (!confirm('정말로 이 게시글을 삭제하시겠습니까?')) return;
    try {
      await fetch(`/api/board/${board.value.idx}`, { method: 'DELETE' });
      alert('게시글이 삭제되었습니다.');
      router.push('/community');
    } catch (err) {
      console.error('삭제 실패:', err);
      alert('삭제 중 문제가 발생했습니다.');
    }
  };

  const handleLike = async () => {
  try {
    console.log('좋아요 클릭됨');
    // TODO: 백엔드 호출 (예: await axios.post(`/api/board/${board.value.idx}/like`))
    // 좋아요 수 증가 처리 (임시)
    board.value.boardLikes = (board.value.boardLikes || 0) + 1;
  } catch (error) {
    console.error('좋아요 처리 오류:', error);
  }
};

const handleUnlike = async () => {
  try {
    console.log('싫어요 클릭됨');
    // TODO: 백엔드 호출 (예: await axios.post(`/api/board/${board.value.idx}/unlike`))
    // 싫어요 수 증가 처리 (임시)
    board.value.boardUnlikes = (board.value.boardUnlikes || 0) + 1;
  } catch (error) {
    console.error('싫어요 처리 오류:', error);
  }
};
  
  onMounted(fetchBoardDetail);
  </script>
  
  <style scoped>
.post-detail-container {
  max-width: 64rem;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  border: 1px solid #ccc; /* 전체 컨테이너 외곽선 진하게 */
}

.post-section {
  width: 100%;
  padding-bottom: 1.2rem;
  border-bottom: 2px solid #ccc; /* 각 구역 구분선 더 진하게 */
}

.post-label {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.4rem;
}

.post-title {
  font-size: 1.6rem;
  font-weight: bold;
  color: #111;
  margin-top: 0.4rem;
}

.post-section-row {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  padding-bottom: 1rem;
  border-bottom: 2px solid #ccc;
}

.post-meta-block {
  flex: 1;
  min-width: 200px;
  max-width: 300px;
}

.post-meta-value {
  font-size: 0.95rem;
  color: #555;
}

.post-content {
  line-height: 1.7;
  padding-top: 1rem;
  min-height: 400px;
  white-space: pre-wrap;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1.5rem;
  background-color: #fafafa;
}

.post-files ul {
  margin: 0;
  padding-left: 0; /* ✅ 패딩 제거 */
  list-style: none; /* ✅ 기본 점 제거 */
}

.post-files ul {
  margin: 0;
  padding-left: 1.2rem; /* 기본 들여쓰기 유지 */
  list-style-type: disc; /* 점 스타일 명시 */
}

.post-files li {
  margin-bottom: 0.5rem;
  line-height: 1.5;
  word-break: break-word; /* 긴 파일명 줄바꿈 */
}

.post-files li a {
  text-decoration: underline;
  color: #4a90e2;
  font-size: 0.95rem;
}



.post-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  border-top: 2px solid #ccc;
  padding-top: 1rem;
}

.btn-edit,
.btn-delete {
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  width: 100px;
}

.btn-edit {
  background-color: #4a90e2;
  color: white;
}

.btn-delete {
  background-color: #d9534f;
  color: white;
}

.post-reactions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding: 1rem 0;
  border-top: 1px solid #eee;
  border: 2px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
}

.btn-like,
.btn-unlike {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  cursor: pointer;
  transition: background-color 0.2s ease;
  min-width: 100px;
}

.btn-like:hover {
  background-color: #e6f4ff;
}

.btn-unlike:hover {
  background-color: #ffe6e6;
}


  </style>
  