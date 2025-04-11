<template>
    <div class="form-container">
      <h2 class="form-title">게시글 작성</h2>
      <form @submit.prevent="submitForm" class="space-y-6">
        <!-- 게시글 기본 정보 -->
        <div class="form-group">
          <label class="form-label">게시글 제목</label>
          <input v-model="board.title" type="text" class="form-input" required />
        </div>
        <div class="form-group">
          <label class="form-label">게시글 내용</label>
          <!-- 클라이언트 사이드 전용 Quill Editor -->
          <ClientOnly>
            <QuillEditor
              v-model="board.content"
              class="form-editor"
              :options="editorOptions"
            />
          </ClientOnly>
        </div>
        <!-- 게시글 카테고리 선택 -->
        <div class="form-group">
          <label class="form-label">게시글 카테고리</label>
          <select v-model="board.category" class="form-select" required>
            <option disabled value="">선택하세요</option>
            <option value="Q&A">Q&amp;A</option>
            <option value="자유">자유</option>
            <option value="후기">후기</option>
            <option value="추천">추천</option>
            <!-- 필요에 따라 추가 -->
          </select>
        </div>
        <!-- 첨부파일 업로드 (이미지 제외, ex. txt, pdf, doc 등) -->
        <div class="form-group">
          <label class="form-label">첨부파일 업로드 (최대 5개)</label>
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            multiple
            @change="handleAttachmentUpload"
            class="form-input"
          />
          <!-- 첨부파일 미리보기: 파일명만 출력 -->
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
  
  <script setup lang="js">
  import { ref, defineAsyncComponent } from 'vue';
  import { useBoardStore } from '@/stores/useBoardStore';
  
  // 동적 import: vue3-quill 모듈에서 quillEditor(named export)를 불러옴
  const QuillEditor = defineAsyncComponent({
    loader: () =>
      import('vue3-quill').then(module => {
        console.log("vue3-quill module keys:", Object.keys(module));
        return module.quillEditor;
      }),
    loadingComponent: { template: '<p>Loading editor...</p>' },
    errorComponent: { template: '<p>Error loading editor</p>' },
    delay: 200,
    timeout: 3000
  });
  
  // Quill CSS 임포트
  import 'quill/dist/quill.snow.css';
  
  // Pinia 스토어 초기화
  const boardStore = useBoardStore();
  
  console.log("페이지 로드됨?");
  
  // 게시글 정보를 담을 ref
  const board = ref({
    // 프론트엔드에서는 간단하게 title, content, category로 관리하고,
  // 백엔드에서 DTO 매핑 시 필드명 변환(예: board_title, board_content, board_category) 처리
    title: '',
    content: '',
    category: ''
  });
  
  // Quill Editor 옵션
  const editorOptions = {
    theme: 'snow',
    placeholder: '여기에 게시글 내용을 작성하세요...'
  };
  
  // 첨부파일 처리
  const attachedFiles = ref([]);
  const attachedFileNames = ref([]);
  
  const handleAttachmentUpload = (event) => {
    const files = event.target.files;
    console.log("첨부파일 선택됨, 파일 개수:", files.length);
    attachedFiles.value = Array.from(files).slice(0, 5);
    attachedFileNames.value = attachedFiles.value.map(file => file.name);
    console.log("선택된 파일들:", attachedFileNames.value);
  };
  
  const submitForm = async () => {
    console.log("폼 제출 시도");
    const payload = {
      board_title: board.value.title,
      board_content: board.value.content,
      board_category: board.value.category,
      // user_idx는 로그인한 사용자의 정보를 백엔드에서 처리하도록 넘김
      attachments: attachedFiles.value
    };
  
    console.log("게시글 등록 데이터:", payload);
  
    try {
      const createdBoard = await boardStore.createBoard(payload);
      console.log("게시글 생성 성공:", createdBoard);
      // 생성 후 추가 작업(예: 페이지 이동, 성공 메시지 등)
    } catch (error) {
      console.error("게시글 생성 중 오류 발생:", error);
    }
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
  /* 인풋, 에디터, 텍스트에리어, 셀렉트 */
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
  