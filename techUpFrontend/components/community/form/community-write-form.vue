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
            <div ref="editorContainer" class="form-editor"></div>
            <!-- 콘텐츠 디버깅용 (실제 사용 시 제거) -->
            <div class="mt-2 text-xs text-gray-500">
              <strong>콘텐츠 미리보기:</strong>
              <div v-html="board.content.substring(0, 100) + (board.content.length > 100 ? '...' : '')"></div>
            </div>
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
  
        <button type="submit" class="btn-submit" :disabled="isSubmitting">
          {{ isSubmitting ? '처리 중...' : '게시글 작성' }}
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="js">
  import { reactive, ref, onMounted, watch } from 'vue';
  import { useBoardStore } from '@/pinia/useBoardStore';
  import axios from 'axios';
  
  // Pinia 스토어 초기화
  const boardStore = useBoardStore();
  
  // 에디터 컨테이너 참조
  const editorContainer = ref(null);
  let quill = null;
  
  // 게시글 정보를 담을 reactive 객체
  const board = reactive({
    title: '',
    content: '',
    category: ''
  });
  
  // 제출 상태 관리
  const isSubmitting = ref(false);
  
  // 첨부파일 처리
  const attachedFiles = ref([]);
  const attachedFileNames = ref([]);
  
  // 이미지 처리를 위한 추가 변수
  const base64Images = ref([]);
  
  const handleAttachmentUpload = (event) => {
    const files = event.target.files;
    console.log("첨부파일 선택됨, 파일 개수:", files.length);
    attachedFiles.value = Array.from(files).slice(0, 5);
    attachedFileNames.value = attachedFiles.value.map(file => file.name);
    console.log("선택된 파일들:", attachedFileNames.value);
  };
  
  // Base64 이미지에서 업로드할 이미지 추출
  const extractImagesFromContent = () => {
    const regex = /<img[^>]+src="(data:image\/[^"]+)"[^>]*>/g;
    const content = board.content;
    let match;
    const images = [];
    
    while ((match = regex.exec(content)) !== null) {
      const base64 = match[1];
      // 이미지 정보 저장 (Base64 문자열과 컨텐츠 내 위치)
      images.push({
        base64: base64,
        index: match.index,
        fullMatch: match[0]
      });
    }
    
    return images;
  };
  
  // Base64 문자열을 Blob으로 변환
  const base64ToBlob = (base64) => {
    const parts = base64.split(';base64,');
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(raw.length);
    
    for (let i = 0; i < raw.length; i++) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
    
    return new Blob([uInt8Array], { type: contentType });
  };
  
  // 이미지를 S3에 업로드하고 URL 반환
  const uploadImageToS3 = async (blob, fileName) => {
    try {
      // 이 부분은 boardStore나 별도 서비스를 통해 S3 업로드 로직 구현 필요
      const formData = new FormData();
      formData.append('file', blob, fileName);
      
      // boardStore에 추가할 uploadImage 메소드 사용
      const result = await boardStore.uploadImage(formData);
      return result.imageUrl; // S3 URL 반환
    } catch (error) {
      console.error("이미지 업로드 중 오류:", error);
      throw error;
    }
  };
  
  // 컨텐츠 내 Base64 이미지를 S3 URL로 변환
  const processContentImages = async () => {
    // 컨텐츠에서 Base64 이미지 추출
    const images = extractImagesFromContent();
    console.log(`컨텐츠에서 ${images.length}개의 이미지 발견`);
    
    if (images.length === 0) return board.content;
    
    let processedContent = board.content;
    let offset = 0; // 문자열 길이 변화에 따른 오프셋 조정
    
    // 각 이미지를 S3에 업로드하고 URL 교체
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const blob = base64ToBlob(image.base64);
      const fileName = `image_${Date.now()}_${i}.png`;
      
      try {
        // 이미지 업로드 및 URL 획득
        const imageUrl = await uploadImageToS3(blob, fileName);
        
        // 원본 img 태그와 새 URL을 사용한 img 태그 생성
        const originalTag = image.fullMatch;
        const newTag = originalTag.replace(image.base64, imageUrl);
        
        // 컨텐츠 내 이미지 태그 교체
        const index = image.index + offset;
        processedContent = 
          processedContent.substring(0, index) + 
          newTag + 
          processedContent.substring(index + originalTag.length);
        
        // 다음 교체를 위한 오프셋 조정
        offset += (newTag.length - originalTag.length);
      } catch (error) {
        console.error(`이미지 ${i+1} 업로드 실패:`, error);
      }
    }
    
    return processedContent;
  };
  
  // watch로 board.content 변경 감지 (디버깅용)
  watch(
    () => board.content,
    (newContent) => {
      console.log("watch: board.content changed");
    }
  );
  
  // 폼 제출 처리
  const submitForm = async () => {
    if (isSubmitting.value) return;
    
    try {
      console.log("폼 제출 시도");
      isSubmitting.value = true;
      
      // 1. 컨텐츠 내 Base64 이미지를 S3에 업로드하고 URL로 교체
      console.log("이미지 처리 중...");
      const processedContent = await processContentImages();
      
      // 2. 첨부파일 업로드 
      console.log("첨부파일 처리 중...");
      // (기존 로직 유지)
      
      // 3. 게시글 등록
      const payload = {
        board_title: board.title,
        board_content: processedContent, // 처리된 컨텐츠로 교체
        board_category: board.category,
        attachments: attachedFiles.value
      };
      
      console.log("게시글 등록 데이터 준비 완료");
      const createdBoard = await boardStore.createBoard(payload);
      console.log("게시글 생성 성공:", createdBoard);
      // 추가 후속 처리: 예를 들어 페이지 이동, 성공 알림 등
      
    } catch (error) {
      console.error("게시글 생성 중 오류 발생:", error);
    } finally {
      isSubmitting.value = false;
    }
  };
  
  // Quill 에디터 초기화 (클라이언트 사이드에서만)
  onMounted(async () => {
    console.log("Component mounted");
    
    try {
      // 동적으로 Quill 임포트
      const Quill = await import('quill').then(module => module.default || module);
      console.log("Quill 로딩 완료");
      
      // CSS도 동적으로 임포트 (필요시)
      await import('quill/dist/quill.snow.css');
      
      // 이미지 업로드 핸들러 모듈 (이미지를 Base64로 변환)
      const ImageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        
        input.onchange = async () => {
          const file = input.files[0];
          if (file) {
            // 파일을 Base64로 변환
            const reader = new FileReader();
            reader.onload = (e) => {
              const base64 = e.target.result;
              
              // 에디터에 이미지 삽입
              const range = quill.getSelection(true);
              quill.insertEmbed(range.index, 'image', base64);
              quill.setSelection(range.index + 1);
              
              // 이미지 데이터 저장 (필요시)
              base64Images.value.push({
                base64: base64,
                originalName: file.name
              });
            };
            reader.readAsDataURL(file);
          }
        };
      };
      
      // 에디터 초기화
      if (editorContainer.value) {
        console.log("에디터 컨테이너 발견, Quill 초기화 중");
        
        quill = new Quill(editorContainer.value, {
          theme: 'snow',
          placeholder: '여기에 게시글 내용을 작성하세요...',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                ['link', 'image']
              ],
              handlers: {
                image: ImageHandler // 커스텀 이미지 핸들러 등록
              }
            }
          }
        });
        
        // 텍스트 변경 감지 및 board.content 업데이트
        quill.on('text-change', function() {
          board.content = quill.root.innerHTML;
          console.log("에디터 내용 업데이트");
        });
        
        console.log("Quill 에디터 초기화 완료");
      } else {
        console.error("에디터 컨테이너를 찾을 수 없음");
      }
    } catch (error) {
      console.error("Quill 초기화 중 오류 발생:", error);
    }
  });
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
  .form-textarea,
  .form-select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  }
  
  /* Quill 에디터 컨테이너에 대한 스타일 */
  .form-editor {
    min-height: 200px;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }
  
  /* Quill의 기본 스타일 오버라이드 */
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
  .btn-submit:hover:not(:disabled) {
    background-color: #333;
  }
  .btn-submit:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
  </style>