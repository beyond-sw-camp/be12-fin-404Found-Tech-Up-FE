<template>
  <div v-if="board && board.idx" class="post-detail-container">
    <!-- 제목 -->
    <div class="post-section">
      <h3 class="post-label">제목</h3>
      <p class="post-title">{{ board.boardTitle }}</p>
    </div>

    <!-- 작성 정보 -->
    <div class="post-section-row">
      <div class="post-meta-block">
        <h4 class="post-label">카테고리</h4>
        <p class="post-meta-value">{{ board.boardCategory }}</p>
      </div>
      <div class="post-meta-block">
        <h4 class="post-label">작성자</h4>
        <p class="post-meta-value">{{ board.writer || '탈퇴한 사용자' }}</p>
      </div>
      <div class="post-meta-block">
        <h4 class="post-label">작성일</h4>
        <p class="post-meta-value">{{ formattedDate }}</p>
      </div>
    </div>

    <!-- 첨부파일 -->
    <div class="post-section" v-if="board.fileList?.length">
      <h3 class="post-label">첨부파일</h3>
      <ul class="post-files">
        <li v-for="(file, i) in board.fileList" :key="i">
          <a :href="buildS3Url(file.filesUrl)" target="_blank">{{ file.filesName }}</a>
        </li>
      </ul>
    </div>

    <!-- 게시글 본문 -->
    <div class="post-section post-content" v-html="board.boardContent"></div>

    <!-- 좋아요 / 싫어요 -->
    <div class="post-section post-reactions">
      <button class="btn-like" @click="handleLike">👍 {{ board.boardLikes || 0 }}</button>
      <button class="btn-unlike" @click="handleUnlike">👎 {{ board.boardUnlikes || 0 }}</button>
    </div>

    <!-- 수정 / 삭제 (작성자 본인만) -->
    <div class="post-section post-actions" v-if="userStore.user?.userIdx === board.userIdx">
      <button class="btn-edit" @click="goEdit">수정</button>
      <button class="btn-delete" @click="confirmDelete">삭제</button>
    </div>

    <!-- 댓글 -->
    <div class="comment-section">
      <h4 class="comment-label">댓글</h4>

      <textarea
        v-model="newComment"
        placeholder="댓글을 입력하세요..."
        class="comment-input"
      />

      <div class="comment-submit-row">
        <button
          class="btn-submit-comment"
          @click="submitComment"
          :disabled="!newComment.trim() || isSubmittingComment"
        >
          등록
        </button>
      </div>

      <ul class="comment-list" v-if="commentList.length">
        <li class="comment-item" v-for="comment in commentList" :key="comment.commentIdx">
          <div class="comment-meta">
            <span class="comment-writer">{{ comment.writer || '익명' }}</span>
            <span class="comment-date">{{ formatDate(comment.createdAt) }}</span>
          </div>

          <template v-if="editingCommentIdx === comment.commentIdx">
            <textarea
              v-model="editedContent"
              class="comment-input"
              rows="3"
              style="margin-top: 0.5rem;"
            ></textarea>

            <div class="comment-action-buttons">
              <button class="btn-comment-edit" @click="submitEditedComment">저장</button>
              <button class="btn-comment-delete" @click="cancelEdit">취소</button>
            </div>
          </template>

          <template v-else>
            <p class="comment-content">{{ comment.content }}</p>
            <div class="comment-action-buttons" v-if="comment.userIdx === userStore.user?.userIdx">
              <button class="btn-comment-edit" @click="editComment(comment)">수정</button>
              <button class="btn-comment-delete" @click="deleteComment(comment.commentIdx)">삭제</button>
            </div>
          </template>
        </li>
      </ul>

      <p v-else class="text-gray-500 text-sm mt-2">아직 댓글이 없습니다.</p>
    </div>
  </div>

  <div v-else class="text-center text-gray-500">게시글을 불러오는 중입니다...</div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useBoardStore } from '@/pinia/useBoardStore';
import { useCommentStore } from '@/pinia/useCommentStore';
import { useUserStore } from '@/pinia/useUserStore';
import { buildS3Url } from '@/utils/useS3';
import { format } from 'date-fns';

const route = useRoute();
const router = useRouter();

const boardStore = useBoardStore();
const commentStore = useCommentStore();
const userStore = useUserStore();

const board = computed(() => boardStore.currentBoard || {});
const commentList = computed(() => commentStore.commentList);
const newComment = ref('');
const isSubmittingComment = ref(false);
const editingCommentIdx = ref(null);
const editedContent = ref('');

const formattedDate = computed(() => {
  try {
    return format(new Date(board.value.boardCreated), 'yyyy-MM-dd HH:mm');
  } catch {
    return board.value.boardCreated;
  }
});

const formatDate = (dateStr) => {
  try {
    return format(new Date(dateStr), 'yyyy-MM-dd HH:mm');
  } catch {
    return dateStr;
  }
};

const fetchBoardDetail = async () => {
  const idx = route.params.idx;
  if (!idx) return;
  await boardStore.fetchBoardDetail(idx);
};

const fetchComments = async () => {
  await commentStore.fetchComments(board.value.idx);
};

const submitComment = async () => {
  try {
    await commentStore.createComment(board.value.idx, newComment.value);
    newComment.value = '';
  } catch (err) {
    alert('댓글 작성 실패');
  }
};

const deleteComment = async (commentIdx) => {
  if (!confirm('댓글을 삭제하시겠습니까?')) return;
  try {
    await commentStore.deleteComment(commentIdx, board.value.idx);
  } catch (err) {
    alert('댓글 삭제 실패');
  }
};

const editComment = (comment) => {
  editingCommentIdx.value = comment.commentIdx;
  editedContent.value = comment.content;
};

const submitEditedComment = async () => {
  try {
    await commentStore.updateComment(editingCommentIdx.value, board.value.idx, editedContent.value);
    editingCommentIdx.value = null;
    editedContent.value = '';
  } catch (err) {
    alert('댓글 수정 실패');
  }
};

const cancelEdit = () => {
  editingCommentIdx.value = null;
  editedContent.value = '';
};

const handleLike = async () => {
  await boardStore.toggleLike(board.value.idx, true);
};

const handleUnlike = async () => {
  await boardStore.toggleLike(board.value.idx, false);
};

const goEdit = () => {
  router.push(`/community/edit/${board.value.idx}`);
};

const confirmDelete = async () => {
  if (!confirm('정말 이 게시글을 삭제하시겠습니까?')) return;
  try {
    await boardStore.deleteBoard(board.value.idx);
    alert('게시글이 삭제되었습니다.');
    router.push('/community');
  } catch (err) {
    console.error('삭제 실패:', err);
    alert('삭제 중 문제가 발생했습니다.');
  }
};

onMounted(async () => {
  await fetchBoardDetail();
  await fetchComments();
});

</script>


<style scoped>
.post-detail-container {
  max-width: 64rem;
  margin: 4rem auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.post-section {
  padding-bottom: 1.2rem;
  border-bottom: 2px solid #ccc;
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
  min-height: 400px;
  white-space: pre-wrap;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 1.5rem;
  background-color: #fafafa;
}

.post-files ul {
  padding-left: 1.2rem;
  list-style-type: disc;
}

.post-files li {
  margin-bottom: 0.5rem;
  word-break: break-word;
}

.post-files a {
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

.comment-section {
  margin-top: 2rem;
}

.comment-input {
  width: 100%;
  min-height: 80px;
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 0.75rem;
  font-size: 0.95rem;
  resize: vertical;
}

.comment-submit-row {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.btn-submit-comment {
  background-color: #4a90e2;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.btn-submit-comment:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

.comment-list {
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-item {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f7f7f7;
}

.comment-meta {
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 0.4rem;
  display: flex;
  justify-content: space-between;
}

.comment-writer {
  font-weight: 600;
}

.comment-content {
  font-size: 0.95rem;
  color: #333;
  line-height: 1.5;
}
.comment-action-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.btn-comment-edit,
.btn-comment-delete {
  font-size: 0.8rem;
  padding: 0.3rem 0.7rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-comment-edit {
  background-color: #eee;
  color: #333;
}

.btn-comment-delete {
  background-color: #d9534f;
  color: white;
}

</style>
