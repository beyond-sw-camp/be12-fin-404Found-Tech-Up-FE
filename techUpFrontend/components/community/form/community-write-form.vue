<template>
    <div class="form-container">
      <h2 class="form-title">게시글 작성</h2>
      <form @submit.prevent="submitForm" class="space-y-6">
        <div class="form-group">
          <label class="form-label">게시글 제목</label>
          <input v-model="board.boardTitle" type="text" class="form-input" required />
        </div>
  
        <div class="form-group">
          <label class="form-label">게시글 내용</label>
          <ClientOnly>
            <div ref="editorContainer" class="form-editor"></div>
            <div class="mt-2 text-xs text-gray-500">
              <strong>콘텐츠 미리보기:</strong>
              <div v-html="board.boardContent.substring(0, 100) + (board.boardContent.length > 100 ? '...' : '')"></div>
            </div>
          </ClientOnly>
        </div>
  
        <div class="form-group">
          <label class="form-label">게시글 카테고리</label>
          <select v-model="board.boardCategory" class="form-select" required>
            <option disabled value="">선택하세요</option>
            <option value="Q&A">Q&amp;A</option>
            <option value="자유">자유</option>
            <option value="후기">후기</option>
            <option value="추천">추천</option>
          </select>
        </div>
  
        <div class="form-group">
          <label class="form-label">첨부파일 업로드 (최대 5개)</label>
          <input type="file" accept=".txt,.pdf,.doc,.docx" multiple @change="handleAttachmentUpload" class="form-input" />
          <div class="preview-container" v-if="attachedFileNames.length">
            <div v-for="(file, index) in attachedFileNames" :key="index" class="preview-file">
              {{ file }}
            </div>
          </div>
        </div>
  
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          {{ isSubmitting ? '처리 중...' : '게시글 작성' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="js">
import { reactive, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useBoardStore } from '@/pinia/useBoardStore';

const boardStore = useBoardStore();
const router = useRouter();
const editorContainer = ref(null);
let quill = null;
const s3BaseUrl = 'https://ogh-spring-prac.s3.ap-northeast-2.amazonaws.com/';


const board = reactive({
  boardTitle: '',
  boardContent: '',
  boardCategory: ''
});

const isSubmitting = ref(false);
const attachedFiles = ref([]);
const attachedFileNames = ref([]);

const handleAttachmentUpload = (event) => {
  const files = event.target.files;
  attachedFiles.value = Array.from(files).slice(0, 5);
  attachedFileNames.value = attachedFiles.value.map(file => file.name);
};

const submitForm = async () => {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    const payload = {
      boardTitle: board.boardTitle,
      boardContent: board.boardContent,
      boardCategory: board.boardCategory,
      attachments: attachedFiles.value
    };
    const result = await boardStore.createBoard(payload);
    console.log('게시글 생성 완료:', result);
    router.push('/community');
  } catch (e) {
    console.error('폼 제출 오류:', e);
  } finally {
    isSubmitting.value = false;
  }
};

onMounted(async () => {
  const Quill = await import('quill').then(m => m.default);
  await import('quill/dist/quill.snow.css');

  const ImageHandler = () => {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');
  input.click();

  input.onchange = async () => {
    const file = input.files[0];
    if (file) {
      try {
        const imageKey = await boardStore.uploadTempImage(file); // ✅ imageKey만 반환됨
        const fullUrl = s3BaseUrl + imageKey; // ✅ 도메인 붙이기
        const range = quill.getSelection(true);
        quill.insertEmbed(range.index, 'image', fullUrl);
        quill.setSelection(range.index + 1);
      } catch (e) {
        alert('이미지 업로드 실패');
        console.error(e);
      }
    }
  };
};

  if (editorContainer.value) {
    quill = new Quill(editorContainer.value, {
      theme: 'snow',
      placeholder: '여기에 게시글 내용을 작성하세요...',
      modules: {
        toolbar: {
          container: [['bold', 'italic', 'underline', 'strike'], ['link', 'image']],
          handlers: { image: ImageHandler }
        }
      }
    });

    // 🔁 에디터의 내용이 바뀔 때마다 boardContent에 저장
    quill.on('text-change', () => {
      board.boardContent = quill.root.innerHTML;
    });
  }
});
</script>


  
  <style scoped>
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
  
  .form-input,
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  .form-editor {
    min-height: 200px;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }
  
  :deep(.ql-toolbar) {
    border-top-left-radius: 0.375rem;
    border-top-right-radius: 0.375rem;
    border-color: #d1d5db;
  }
  
  :deep(.ql-container) {
    border-bottom-left-radius: 0.375rem;
    border-bottom-right-radius: 0.375rem;
    border-color: #d1d5db;
    min-height: 150px;
  }
  
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
  
  .btn-submit:hover:not(:disabled) {
    background-color: #333;
  }
  
  .btn-submit:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
  </style>
  