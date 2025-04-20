<script setup>
import { onMounted, ref } from 'vue'
import { useAdminStore } from '../../pinia/useAdminStore';

const adminStore = useAdminStore();

let title = ref("");
let content = ref("");

const submitForm = async () => {
  let notification = {
    notiTitle: title.value,
    notiContent: content.value
  };
  await adminStore.submitNotificationRegisterForm(notification);
}

onMounted(() => {
  //notification.value.productIdx = storeRef.notification.value;
})


</script>
<template>
  <div class="form-container">
    <h2 class="form-title">전체 사용자 대상 알림 등록</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- 쿠폰 이름 -->
      <div class="form-group">
        <label class="form-label">알림 제목</label>
        <input v-model="title" type="text" class="form-input" placeholder="예) 관리자 공지사항 : 사이트 오류 알림" required />
      </div>
      <div class="form-group">
        <label class="form-label">알림 설명</label>
        <textarea v-model="content" class="form-textarea" required />
      </div>
      <button type="submit" class="btn-submit">알림 등록</button>
    </form>
  </div>
</template>
<style scoped>
/* 전체 폼 컨테이너 */
.form-container {
  max-width: 64rem;
  /* 예: max-w-4xl */
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
}

/* 폼 그룹 */
.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

/* 인풋, 텍스트에리어, 셀렉트 */
.form-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-textarea {
  height: 300px;
  border: 1px solid #d1d5db;
}

/* 제출 버튼 */
.btn-submit {
  display: block;
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #333;
}
</style>
