<template>
  <div class="form-container">
    <h2 class="form-title">제품 등록</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <!-- 기본 상품 정보 -->
      <div class="form-group">
        <label class="form-label">제품명</label>
        <input v-model="product.name" type="text" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">제품 가격</label>
        <input v-model="product.price" type="number" step="0.01" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">브랜드</label>
        <input v-model="product.brand" type="text" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">재고</label>
        <input v-model="product.stock" type="number" class="form-input" required />
      </div>

      <div class="form-group">
        <label class="form-label">제품 설명</label>
        <textarea v-model="product.description" class="form-textarea" required></textarea>
      </div>

      <!-- 카테고리 선택 -->
      <div class="form-group">
        <label class="form-label">카테고리</label>
        <select v-model="product.category" class="form-select" required>
          <option disabled value="">선택하세요</option>
          <option value="SSD">SSD</option>
          <option value="RAM">RAM</option>
          <option value="HDD">HDD</option>
          <option value="CPU">CPU</option>
          <option value="GPU">GPU</option>
        </select>
      </div>

      <!-- SSD 스펙 -->
      <div v-if="product.category === 'SSD'" class="spec-box">
        <h3 class="spec-title">SSD 스펙</h3>
        <div class="form-group">
          <label class="form-label">SSD 용량 (GB)</label>
          <input v-model="ssd.ssdCapacity" type="number" class="form-input" placeholder="ex) 256, 512, 1024" required />
        </div>
        <div class="form-group">
          <label class="form-label">읽기 속도</label>
          <input v-model="ssd.ssdRead" type="number" class="form-input" placeholder="ex) 3500" required />
        </div>
        <div class="form-group">
          <label class="form-label">쓰기 속도</label>
          <input v-model="ssd.ssdWrite" type="number" class="form-input" placeholder="ex) 3000" required />
        </div>
      </div>

      <!-- RAM 스펙 -->
      <div v-if="product.category === 'RAM'" class="spec-box">
        <h3 class="spec-title">RAM 스펙</h3>
        <div class="form-group">
          <label class="form-label">RAM 타입</label>
          <input v-model="ram.ramType" type="text" class="form-input" placeholder="ex) DDR4" required />
        </div>
        <div class="form-group">
          <label class="form-label">RAM 개수</label>
          <input v-model="ram.ramNum" type="number" class="form-input" placeholder="ex) 2" required />
        </div>
        <div class="form-group">
          <label class="form-label">RAM 용량</label>
          <input v-model="ram.ramSize" type="number" class="form-input" placeholder="ex) 2" required />
        </div>
        <div class="form-group">
          <label class="form-label">사용 장치</label>
          <input v-model="ram.ramUsage" type="text" class="form-input" placeholder="ex) 데스크탑용" required />
        </div>
      </div>

      <!-- HDD 스펙 -->
      <div v-if="product.category === 'HDD'" class="spec-box">
        <h3 class="spec-title">HDD 스펙</h3>
        <div class="form-group">
          <label class="form-label">HDD 용량 (GB)</label>
          <input v-model="hdd.hddCapacity" type="number" class="form-input" placeholder="ex) 256, 512, 1024" required />
        </div>
        <div class="form-group">
          <label class="form-label">HDD 회전 속도 (RPM)</label>
          <input v-model="hdd.hddRpm" type="number" class="form-input" placeholder="ex) 5400, 7200, 15000" required />
        </div>
        <div class="form-group">
          <label class="form-label">HDD 버퍼 (MB)</label>
          <input v-model="hdd.hddBuffer" type="number" class="form-input" placeholder="ex) 32, 64, 512" required />
        </div>
      </div>

      <!-- CPU 스펙 -->
      <div v-if="product.category === 'CPU'" class="spec-box">
        <h3 class="spec-title">CPU 스펙</h3>
        <div class="form-group">
          <label class="form-label">CPU 종류</label>
          <input v-model="cpu.cpuType" type="text" class="form-input" placeholder="ex) 코어i7, 라이젠5" required />
        </div>
        <div class="form-group">
          <label class="form-label">코어 수</label>
          <input v-model="cpu.cpuCore" type="number" class="form-input" placeholder="ex) 2, 4, 6, 24" required />
        </div>
        <div class="form-group">
          <label class="form-label">스레드 수</label>
          <input v-model="cpu.cpuThreads" type="number" class="form-input" placeholder="ex) 8, 16, 32" required />
        </div>
      </div>

      <!-- GPU 스펙 -->
      <div v-if="product.category === 'GPU'" class="spec-box">
        <h3 class="spec-title">GPU 스펙</h3>
        <div class="form-group">
          <label class="form-label">메모리 (GB)</label>
          <input v-model="gpu.gpuMemory" type="number" class="form-input" placeholder="ex) 6, 8, 12, 16" required />
        </div>
        <div class="form-group">
          <label class="form-label">칩셋</label>
          <input v-model="gpu.gpuChip" type="text" class="form-input" placeholder="ex) RTX 5090, RTX 5070" required />
        </div>
        <div class="form-group">
          <label class="form-label">길이 (mm)</label>
          <input v-model="gpu.gpuLength" type="number" class="form-input" placeholder="ex) 320, 330, 360" required />
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

      <button type="submit" class="btn-submit">제품 등록</button>
    </form>
  </div>
</template>

<script setup>
import { navigateTo, useRuntimeConfig } from 'nuxt/app'
import { ref } from 'vue'
import { useAdminStore } from '../../pinia/useAdminStore'


const props = defineProps({
  modding: Boolean,
  productInfo: Object
})

let product = ref(props.modding ? props.productInfo : {
  name: '',
  price: '',
  brand: '',
  stock: '',
  description: '',
  category: '',
})

// 기존 SSD, RAM + 새로 추가된 HDD, CPU, GPU
const ssd = ref(props.productInfo && props.productInfo.ssdSpec ? props.productInfo.ssdSpec : { ssdCapacity: '', ssdRead: '', ssdWrite: '' })
const ram = ref(props.productInfo && props.productInfo.ramSpec ? props.productInfo.ramSpec : { ramType: '', ramNum: '', ramSize: '', ramUsage: '' })
const hdd = ref(props.productInfo && props.productInfo.hddSpec ? props.productInfo.hddSpec : { hddCapacity: '', hddRpm: '', hddBuffer: '' })
const cpu = ref(props.productInfo && props.productInfo.cpuSpec ? props.productInfo.cpuSpec : { cpuType: '', cpuCore: '', cpuThreads: '' })
const gpu = ref(props.productInfo && props.productInfo.gpuSpec ? props.productInfo.gpuSpec : { gpuMemory: '', gpuChip: '', gpuLength: '' })

// 이미지 파일들 및 미리보기 URL 배열
const previewImages = ref([])
const selectedFiles = ref([])

const handleImageUpload = (event) => {
  const files = event.target.files
  // 최대 5장까지만 선택 (초과 시 앞의 5개만 사용)
  selectedFiles.value = Array.from(files).slice(0, 5)
  previewImages.value = selectedFiles.value.map(file => URL.createObjectURL(file))
  console.log(selectedFiles.value);
}

const config = useRuntimeConfig();

// 폼 제출
const submitForm = async () => {
  // 카테고리에 맞는 스펙 데이터를 합쳐서 payload 구성
  // 파일 업로드 요청
  let imageUrls = [];
  for await (let file of selectedFiles.value) {
    let formdata = new FormData();
    formdata.append("file", file);
    const resultUrl = await $fetch('/productimage/upload', {
      baseURL: config.public.apiBaseUrl,
      method: 'PUT',
      body: formdata
    });
    imageUrls.push(resultUrl.data);
  }

  const payload = {
    ...product.value,
    ssdSpec: (product.value.category === 'SSD' ? ssd.value : {}),
    ramSpec: (product.value.category === 'RAM' ? ram.value : {}),
    hddSpec: (product.value.category === 'HDD' ? hdd.value : {}),
    cpuSpec: (product.value.category === 'CPU' ? cpu.value : {}),
    gpuSpec: (product.value.category === 'GPU' ? gpu.value : {}),
  }
  console.log('등록 데이터:', payload)

  // axios.post('/api/products', payload) 등으로 서버 전송 처리
  $fetch('/product/register', {
    baseURL: config.public.apiBaseUrl,
    method: 'POST',
    body: payload
  }).then(async (result) => {
    console.log(result);
    const saveResult = await $fetch('/productimage', {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      body: {
        productIdx: result.data.idx,
        imagePath: imageUrls
      }
    });
    alert("등록되었습니다!");
    navigateTo('/dashboard');
  }).catch((e) => {
    console.log(e);
  });

}
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