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
          <label class="form-label">상세 카테고리</label>
          <input v-model="ssd.productCategory" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">폼팩터</label>
          <input v-model="ssd.formFactor" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">인터페이스 </label>
          <input v-model="ssd.interfaceType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">프로토콜</label>
          <input v-model="ssd.protocol" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">SSD 용량 (GB)</label>
          <input v-model="ssd.ssdCapacity" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">메모리 타입</label>
          <input v-model="ssd.memoryType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">낸드 구조</label>
          <input v-model="ssd.nandStructure" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">SSD 컨트롤러</label>
          <input v-model="ssd.controller" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">읽기 속도(MB/s)</label>
          <input v-model="ssd.ssdRead" type="number" class="form-input" placeholder="ex) 3500" required />
        </div>
        <div class="form-group">
          <label class="form-label">쓰기 속도(MB/s)</label>
          <input v-model="ssd.ssdWrite" type="number" class="form-input" placeholder="ex) 3000" required />
        </div>
        <div class="form-group">
          <label class="form-label">MTBF</label>
          <input v-model="ssd.mtbf" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">TBW</label>
          <input v-model="ssd.tbw" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">히트싱크</label>
          <input v-model="ssd.nvmeHeatsink" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">너비</label>
          <input v-model="ssd.width" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">높이</label>
          <input v-model="ssd.height" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">두께</label>
          <input v-model="ssd.thickness" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">무게</label>
          <input v-model="ssd.weight" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록년</label>
          <input v-model="ssd.registYear" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록월</label>
          <input v-model="ssd.registMonth" type="text" class="form-input" placeholder="" required />
        </div>
      </div>

      <!-- RAM 스펙 -->
      <div v-if="product.category === 'RAM'" class="spec-box">
        <h3 class="spec-title">RAM 스펙</h3>
        <div class="form-group">
          <label class="form-label">사용 장치</label>
          <input v-model="ram.usageDevice" type="text" class="form-input" placeholder="ex) 데스크탑용" required />
        </div>
        <div class="form-group">
          <label class="form-label">상세 카테고리</label>
          <input v-model="ram.productCategory" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">메모리 스펙 </label>
          <input v-model="ram.memorySpec" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">RAM 용량</label>
          <input v-model="ram.ramSize" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">유효 작동 클럭(MHz)</label>
          <input v-model="ram.operatingClock" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">RAM 타이밍</label>
          <input v-model="ram.ramTiming" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">작동 전압</label>
          <input v-model="ram.operatingVoltage" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">RAM 개수</label>
          <input v-model="ram.ramNum" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">히트싱크 유무</label>
          <input v-model="ram.heatsink" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">모듈 높이(mm)</label>
          <input v-model="ram.height" type="text" class="form-input" placeholder="" required />
        </div>

        <div class="form-group">
          <label class="form-label">등록년</label>
          <input v-model="ram.registYear" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록월</label>
          <input v-model="ram.registMonth" type="text" class="form-input" placeholder="" required />
        </div>
      </div>

      <!-- HDD 스펙 -->
      <div v-if="product.category === 'HDD'" class="spec-box">
        <h3 class="spec-title">HDD 스펙</h3>
        <div class="form-group">
          <label class="form-label">상세 분류</label>
          <input v-model="hdd.productCategory" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">크기 규격(인치)</label>
          <input v-model="hdd.diskSize" type="text" class="form-input" placeholder="" required />
        </div>

        <div class="form-group">
          <label class="form-label">HDD 용량 (GB)</label>
          <input v-model="hdd.hddCapacity" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">인터페이스</label>
          <input v-model="ram.interfaceType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">HDD 회전 속도 (RPM)</label>
          <input v-model="hdd.hddRpm" type="number" class="form-input" placeholder="ex) 5400, 7200, 15000" required />
        </div>
        <div class="form-group">
          <label class="form-label">HDD 버퍼 (MB)</label>
          <input v-model="hdd.hddBuffer" type="number" class="form-input" placeholder="ex) 32, 64, 512" required />
        </div>
        <div class="form-group">
          <label class="form-label">전송 속도</label>
          <input v-model="hdd.transferSpeed" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">기록 방법</label>
          <input v-model="hdd.recordingMethod" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">두께 </label>
          <input v-model="hdd.thickness" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">워크로드</label>
          <input v-model="hdd.workload" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">소음(dB)</label>
          <input v-model="hdd.noise" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록년</label>
          <input v-model="hdd.registYear" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록월</label>
          <input v-model="hdd.registMonth" type="text" class="form-input" placeholder="" required />
        </div>
      </div>

      <!-- CPU 스펙 -->
      <div v-if="product.category === 'CPU'" class="spec-box">
        <h3 class="spec-title">CPU 스펙</h3>
        <div class="form-group">
          <label class="form-label">(AMD의 경우) CPU 종류, 인텔은 공란</label>
          <input v-model="cpu.amdCpuType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">소켓</label>
          <input v-model="cpu.socketType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">코어 수</label>
          <input v-model="cpu.coreCount" type="number" class="form-input" placeholder=", 4, 6, 24" required />
        </div>
        <div class="form-group">
          <label class="form-label">스레드 수</label>
          <input v-model="cpu.threadCount" type="number" class="form-input" placeholder="ex) 8, 16, 32" required />
        </div>
        <div class="form-group">
          <label class="form-label">내장 그래픽</label>
          <input v-model="cpu.builtInGraphic" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">제조 공정 </label>
          <input v-model="cpu.manufactoringProcess" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">기본 클럭(GHz) </label>
          <input v-model="cpu.baseClock" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">최대 클럭(GHz)</label>
          <input v-model="cpu.maxClock" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">L2 캐시 크기(KB)</label>
          <input v-model="cpu.l2Cache" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">L3 캐시 크기 (MB)</label>
          <input v-model="cpu.l3Cache" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">호환 운영체제 </label>
          <input v-model="cpu.operateSystem" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">TDP(W)</label>
          <input v-model="cpu.tdp" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">PPT(W)</label>
          <input v-model="cpu.ppt" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">PCIe 버전 </label>
          <input v-model="cpu.pcieVer" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">최대 PCIe 레인 수 </label>
          <input v-model="cpu.maxPcie" type="numbers" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">최대 지원 램 용량(GB)</label>
          <input v-model="cpu.maxMemorySize" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">최대 지원 메모리 클럭(MHz)</label>
          <input v-model="cpu.memoryClock" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">메모리 채널 수 </label>
          <input v-model="cpu.memoryChannel" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">포장 형태 </label>
          <input v-model="cpu.pakageType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">동봉 쿨러</label>
          <input v-model="cpu.cooler" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록년</label>
          <input v-model="cpu.registYear" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록월 </label>
          <input v-model="cpu.registMonth" type="text" class="form-input" placeholder="" required />
        </div>
      </div>

      <!-- GPU 스펙 -->
      <div v-if="product.category === 'GPU'" class="spec-box">
        <h3 class="spec-title">GPU 스펙</h3>
        <div class="form-group">
          <label class="form-label">칩셋 제조사</label>
          <input v-model="gpu.chipsetManufacturer" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">시리즈</label>
          <input v-model="gpu.productSeries" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">제조 공정</label>
          <input v-model="gpu.gpuManufacturingProcess" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">인터페이스</label>
          <input v-model="gpu.interfaceType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">권장파워용량(W)</label>
          <input v-model="gpu.recommendedPowerCapacity" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">파워 커넥터</label>
          <input v-model="gpu.powerPort" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">길이 (mm)</label>
          <input v-model="gpu.gpuLength" type="number" class="form-input" placeholder="ex) 320, 330, 360" required />
        </div>
        <div class="form-group">
          <label class="form-label">부스트 클럭(MHz)</label>
          <input v-model="gpu.boostClock" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">streamProcessor 수</label>
          <input v-model="gpu.streamProcessor" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">메모리 타입 </label>
          <input v-model="gpu.memoryType" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">메모리 클럭 </label>
          <input v-model="gpu.memoryClock" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">메모리 용량 (GB)</label>
          <input v-model="gpu.gpuMemory" type="number" class="form-input" placeholder="ex) 6, 8, 12, 16" required />
        </div>
        <div class="form-group">
          <label class="form-label">메모리 버스 </label>
          <input v-model="gpu.memoryBus" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">HDMI 버전 </label>
          <input v-model="gpu.hdmi" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">DisplayPort 버전 </label>
          <input v-model="gpu.displayPort" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">모니터 수 지원 </label>
          <input v-model="gpu.monitorSupport" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">팬 수</label>
          <input v-model="gpu.fanCount" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">두께(mm)</label>
          <input v-model="gpu.thickness" type="number" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록년</label>
          <input v-model="gpu.registYear" type="text" class="form-input" placeholder="" required />
        </div>
        <div class="form-group">
          <label class="form-label">등록월</label>
          <input v-model="gpu.registMonth" type="text" class="form-input" placeholder="" required />
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
import { ref } from 'vue'
import { useAdminStore } from '../../pinia/useAdminStore';

const adminStore = useAdminStore();

let product = ref({
  name: '',
  price: '',
  brand: '',
  stock: '',
  description: '',
  category: '',
});

// 기존 SSD, RAM + 새로 추가된 HDD, CPU, GPU
const ssd = ref({ productCategory: '', formFactor: '', interfaceType: '', protocol: '', ssdCapacity: '', memoryType: '', nandStructure: '', controller: '', ssdRead: '', ssdWrite: '', mtbf: '', tbw: '', nvmeHeatsink: '', width: '', height: '', thickness: '', weight: '', registYear: '', registMonth: '' })
const ram = ref({ usageDevice: '', productCategory: '', memorySpec: '', ramSize: '', operatingClock: '', ramTiming: '', operatingVoltage: '', ramNum: '', heatsink: '', height: '', registYear: '', registMonth: '' })
const hdd = ref({ productCategory: '', diskSize: '', hddCapacity: '', interfaceType: '', hddRpm: '', hddBuffer: '', transferSpeed: '', recordingMethod: '', thickness: '', workload: '', noise: '', registYear: '', registMonth: '' })
const cpu = ref({ amdCpuType: '', socketType: '', coreCount: '', threadCount: '', memorySpec: '', builtInGraphic: '', manufactoringProcess: '', baseClock: '', maxClock: '', l2Cache: '', l3Cache: '', operateSystem: '', tdp: '', ppt: '', pcieVer: '', maxPcie: '', maxMemorySize: '', memoryClock: '', memoryChannel: '', pakageType: '', cooler: '', registYear: '', registMonth: '' })
const gpu = ref({ chipsetManufacturer: '', productSeries: '', gpuManufacturingProcess: '', interfaceType: '', recommendedPowerCapacity: '', powerPort: '', gpuLength: '', boostClock: '', streamProcessor: '', memoryType: '', memoryClock: '', gpuMemory: '', memoryBus: '', hdmi: '', displayPort: '', monitorSupport: '', fanCount: '', thickness: '', registYear: '', registMonth: '' })

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

// const config = useRuntimeConfig();

// 폼 제출
const submitForm = async () => {
  await adminStore.submitProductRegisterForm(product.value, selectedFiles.value, ssd.value, ram.value, hdd.value, cpu.value, gpu.value)
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