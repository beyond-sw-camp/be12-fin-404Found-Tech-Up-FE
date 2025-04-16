<template>
  <div class="form-container">
    <h2 class="form-title">제품 수정</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- 기본 상품 정보 -->
      <div class="form-group">
        <label class="form-label">제품명</label>
        <input v-model="storeRef.targetProduct.value.name" type="text" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">제품 가격</label>
        <input v-model="storeRef.targetProduct.value.price" type="number" step="0.01" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">브랜드</label>
        <input v-model="storeRef.targetProduct.value.brand" type="text" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">재고</label>
        <input v-model="storeRef.targetProduct.value.stock" type="number" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">제품 설명</label>
        <textarea v-model="storeRef.targetProduct.value.description" class="form-textarea" required></textarea>
      </div>

      <!-- 카테고리 선택 -->
      <div class="form-group">
        <label class="form-label">카테고리</label>
        <select v-model="storeRef.targetProduct.value.category" class="form-select" required>
          <option disabled value="">선택하세요</option>
          <option value="SSD">SSD</option>
          <option value="RAM">RAM</option>
          <option value="HDD">HDD</option>
          <option value="CPU">CPU</option>
          <option value="GPU">GPU</option>
        </select>
      </div>

      <!-- SSD 스펙 -->
      <div v-if="storeRef.targetProduct.value.category === 'SSD'" class="spec-box">
        <h3 class="spec-title">SSD 스펙</h3>
        <div class="form-group">
          <label class="form-label">SSD 용량 (GB)</label>
          <input v-model="storeRef.targetProduct.value.ssdSpec.ssdCapacity" type="number" class="form-input"
            placeholder="ex) 256, 512, 1024" required />
        </div>
        <div class="form-group">
          <label class="form-label">읽기 속도</label>
          <input v-model="storeRef.targetProduct.value.ssdSpec.ssdRead" type="number" class="form-input"
            placeholder="ex) 3500" required />
        </div>
        <div class="form-group">
          <label class="form-label">쓰기 속도</label>
          <input v-model="storeRef.targetProduct.value.ssdSpec.ssdWrite" type="number" class="form-input"
            placeholder="ex) 3000" required />
        </div>
      </div>

      <!-- RAM 스펙 -->
      <div v-if="storeRef.targetProduct.value.category === 'RAM'" class="spec-box">
        <h3 class="spec-title">RAM 스펙</h3>
        <div class="form-group">
          <label class="form-label">RAM 타입</label>
          <input v-model="storeRef.targetProduct.value.ramSpec.ramType" type="text" class="form-input"
            placeholder="ex) DDR4" required />
        </div>
        <div class="form-group">
          <label class="form-label">RAM 개수</label>
          <input v-model="storeRef.targetProduct.value.ramSpec.ramNum" type="number" class="form-input"
            placeholder="ex) 2" required />
        </div>
        <div class="form-group">
          <label class="form-label">RAM 용량</label>
          <input v-model="storeRef.targetProduct.value.ramSpec.ramSize" type="number" class="form-input"
            placeholder="ex) 2" required />
        </div>
        <div class="form-group">
          <label class="form-label">사용 장치</label>
          <input v-model="storeRef.targetProduct.value.ramSpec.ramUsage" type="text" class="form-input"
            placeholder="ex) 데스크탑용" required />
        </div>
      </div>

      <!-- HDD 스펙 -->
      <div v-if="storeRef.targetProduct.value.category === 'HDD'" class="spec-box">
        <h3 class="spec-title">HDD 스펙</h3>
        <div class="form-group">
          <label class="form-label">HDD 용량 (GB)</label>
          <input v-model="storeRef.targetProduct.value.hddSpec.hddCapacity" type="number" class="form-input"
            placeholder="ex) 256, 512, 1024" required />
        </div>
        <div class="form-group">
          <label class="form-label">HDD 회전 속도 (RPM)</label>
          <input v-model="storeRef.targetProduct.value.hddSpec.hddRpm" type="number" class="form-input"
            placeholder="ex) 5400, 7200, 15000" required />
        </div>
        <div class="form-group">
          <label class="form-label">HDD 버퍼 (MB)</label>
          <input v-model="storeRef.targetProduct.value.hddSpec.hddBuffer" type="number" class="form-input"
            placeholder="ex) 32, 64, 512" required />
        </div>
      </div>

      <!-- CPU 스펙 -->
      <div v-if="storeRef.targetProduct.value.category === 'CPU'" class="spec-box">
        <h3 class="spec-title">CPU 스펙</h3>
        <div class="form-group">
          <label class="form-label">CPU 종류</label>
          <input v-model="storeRef.targetProduct.value.cpuSpec.cpuType" type="text" class="form-input"
            placeholder="ex) 코어i7, 라이젠5" required />
        </div>
        <div class="form-group">
          <label class="form-label">코어 수</label>
          <input v-model="storeRef.targetProduct.value.cpuSpec.cpuCore" type="number" class="form-input"
            placeholder="ex) 2, 4, 6, 24" required />
        </div>
        <div class="form-group">
          <label class="form-label">스레드 수</label>
          <input v-model="storeRef.targetProduct.value.cpuSpec.cpuThreads" type="number" class="form-input"
            placeholder="ex) 8, 16, 32" required />
        </div>
      </div>

      <!-- GPU 스펙 -->
      <div v-if="storeRef.targetProduct.value.category === 'GPU'" class="spec-box">
        <h3 class="spec-title">GPU 스펙</h3>
        <div class="form-group">
          <label class="form-label">메모리 (GB)</label>
          <input v-model="storeRef.targetProduct.value.gpuSpec.gpuMemory" type="number" class="form-input"
            placeholder="ex) 6, 8, 12, 16" required />
        </div>
        <div class="form-group">
          <label class="form-label">칩셋</label>
          <input v-model="storeRef.targetProduct.value.gpuSpec.gpuChip" type="text" class="form-input"
            placeholder="ex) RTX 5090, RTX 5070" required />
        </div>
        <div class="form-group">
          <label class="form-label">길이 (mm)</label>
          <input v-model="storeRef.targetProduct.value.gpuSpec.gpuLength" type="number" class="form-input"
            placeholder="ex) 320, 330, 360" required />
        </div>
      </div>

      <!-- 이미지 업로드 + 미리보기 (최대 5장) -->
      <div class="form-group">
        <label class="form-label">이미지 업로드 (최대 5장)</label>
        <input type="file" accept="image/*" multiple @change="handleImageUpload" class="form-input" />
        <!-- 미리보기 영역 -->
        <div class="preview-container" v-if="previewImages.length">
          <img v-for="(img, index) in previewImages" :key="index" :src="img" alt="이미지 미리보기" class="preview-image" />
        </div>
      </div>

      <button type="submit" class="btn-submit">제품 수정</button>
    </form>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app'
import { ref, onMounted } from 'vue'
import { useAdminStore } from '../../pinia/useAdminStore'
import { storeToRefs } from 'pinia';


const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

const previewImages = ref([]);

const props = defineProps({
  idx: Number
})
const idx = ref(props.idx);

// 이미지 파일들 및 미리보기 URL 배열

const handleImageUpload = (event) => {
  const files = event.target.files;
  // 최대 5장까지만 선택 (초과 시 앞의 5개만 사용)
  storeRef.targetSelectedFiles.value = Array.from(files.concat(storeRef.targetSelectedFiles.value)).slice(0, 5);
  previewImages.value = storeRef.targetSelectedFiles.value.map(file => URL.createObjectURL(file))
}

const config = useRuntimeConfig();

// 폼 제출
const submitForm = async () => {
  await adminStore.submitProductModifyForm();
}
onMounted(async () => {
  await adminStore.loadProductInfo(idx.value);
});
</script>

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
.form-input,
.form-textarea,
.form-select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.form-textarea {
  min-height: 6rem;
  resize: vertical;
}

/* 카테고리별 스펙 박스 */
.spec-box {
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 0.375rem;
  background-color: #fafafa;
  margin-top: 1rem;
}

.spec-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

/* 미리보기 영역 */
.preview-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.preview-image {
  width: 4rem;
  height: 4rem;
  object-fit: cover;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
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