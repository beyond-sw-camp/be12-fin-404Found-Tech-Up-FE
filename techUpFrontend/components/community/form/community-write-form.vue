<template>
    <div class="form-container">
      <h2 class="form-title">게시글 작성</h2>
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- 게시글 기본 정보 -->
        <div class="form-group">
          <label class="form-label">게시글 제목</label>
          <input v-model="board.boardTitle" type="text" class="form-input" required />
        </div>
  
        <div class="form-group">
          <label class="form-label">게시글 내용</label>
          <!-- Quill Editor로 대체 -->
          <quill-editor
            v-model="board.boardContent"
            class="form-editor"
            :options="editorOptions"
          />
        </div>
  
        <!-- 첨부파일 업로드 (이미지 제외, ex. txt, pdf, doc 등) -->
        <div class="form-group">
          <label class="form-label">첨부파일 업로드 (최대 5장)</label>
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            multiple
            @change="handleAttachmentUpload"
            class="form-input"
          />
          <!-- 첨부파일 미리보기 (파일명만 출력) -->
          <div class="preview-container" v-if="attachedFileNames.length">
            <div
              v-for="(file, index) in attachedFileNames"
              :key="index"
              class="preview-file"
            >
              {{ file }}
            </div>
          </div>
        </div>
  
        <button type="submit" class="btn-submit">게시글 작성</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  // Quill Editor 컴포넌트와 Quill CSS 임포트
  import { QuillEditor } from 'vue3-quill';
  import 'quill/dist/quill.snow.css';
  
  const board = ref({
    boardTitle: '',
    boardContent: ''
  });
  
  // Quill Editor 옵션 예시 (필요에 따라 추가/수정)
  const editorOptions = {
    theme: 'snow',
    placeholder: '여기에 게시글 내용을 작성하세요...'
  };
  
  // 첨부파일 처리 (일반 파일)
  const attachedFiles = ref([]);
  const attachedFileNames = ref([]);
  
  const handleAttachmentUpload = (event) => {
    const files = event.target.files;
    // 최대 5개까지만 선택 (초과되면 앞의 5개만 사용)
    attachedFiles.value = Array.from(files).slice(0, 5);
    // 각 파일의 이름만 미리보기용 배열에 저장
    attachedFileNames.value = attachedFiles.value.map(file => file.name);
  };
  
  const submitForm = () => {
    // 게시글 등록에 필요한 데이터를 payload로 구성
    const payload = {
      ...board.value,
      attachments: attachedFiles.value
    };
    console.log('게시글 등록 데이터:', payload);
    // 실제 전송은 axios.post('/api/board', payload) 등으로 구현
  };
  </script>
  
  <style scoped>
  /* 전체 폼 컨테이너 */
  .form-container {
    max-width: 64rem;
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
  
  /* 인풋, 에디터, 셀렉트 */
  .form-input,
  .form-editor,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .form-editor {
    min-height: 6rem;
  }
  
  /* 미리보기 영역: 첨부파일 이름만 출력 */
  .preview-container {
    margin-top: 0.5rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .preview-file {
    padding: 5px 10px;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    background-color: #f9f9f9;
    font-size: 0.85rem;
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
  