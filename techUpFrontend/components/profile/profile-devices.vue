<template>
    <div style="margin: 1rem 0;">
    <h4>내 기기 목록</h4>
  </div>
  <div class="profile__address">
    <div class="row">
      <div v-if="!deviceStore.registerList.length > 0" class='text-center pt-50'>
        <h5>품목이 없습니다</h5>
      </div>
      <div v-else class="row">
        <div class="col-xl-12">
          <div class="tp-cart-list mb-10 mr-10">
            <table style="text-align:center;">
              <thead>
                <tr>
                  <th colspan="2" class="tp-cart-header-product" style="width:35%;">제품</th>
                  <th style="width:15%;">카테고리</th>
                  <th style="width:30%;">제품 설명</th>
                  <th style="width:20%;">등록</th>                </tr>
              </thead>
              <tbody>
                <!-- wishlist item start -->
                <device-item v-for="item in deviceStore.registerList" :key="item.idx" :item="item" :registered="true" />
                <!-- wishlist item end -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="width:50vw;background-color:#d5d5d5;height:5px;">
  </div>
  <div style="margin: 1rem 0;">
    <h4>기기 검색</h4>
  </div>
  <div class="tp-header-search-box"
    style="width:50vw;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
    <input type="text" placeholder="Search for Products..." v-model="searchText"
      style="color:black;background-color:inherit; padding-right: inherit;" />
    <button type="submit" style="width:1rem;" @click="handleSearch">
      <SvgSearch />
    </button>
  </div>
  <div class="profile__address" style="padding-top:2rem;">
    <div class="row">
      <div v-if="!foundResult" class='text-center pt-50'>
        <h5>품목이 없습니다</h5>
      </div>
      <div v-else class="row">
        <div class="col-xl-12">
          <div class="tp-cart-list mb-10 mr-10">
            <table style="text-align:center;">
              <thead>
                <tr>
                  <th colspan="2" class="tp-cart-header-product" style="width:30%;">제품</th>
                  <th style="width:20%;">카테고리</th>
                  <th style="width:30%;">제품 설명</th>
                  <th style="width:20%;">등록</th>
                </tr>
              </thead>
              <tbody>
                <!-- wishlist item start -->
                <device-item v-for="item in deviceStore.deviceList" :key="item.idx" :item="item" :registered="false" />
                <!-- wishlist item end -->
              </tbody>
            </table>
          </div>

          <!-- 페이지네이션 추가 -->
          <div class="pagination-container" v-if="deviceStore.totalPages > 0">
            <div class="pagination">
              <button 
                class="page-btn prev" 
                :disabled="currentPage <= 0"
                @click="changePage(currentPage - 1)">
                이전
              </button>
              
              <template v-for="pageNum in displayedPages" :key="pageNum">
                <button 
                  class="page-btn"
                  :class="{ active: pageNum === currentPage }"
                  @click="changePage(pageNum)">
                  {{ pageNum + 1 }}
                </button>
              </template>
              
              <button 
                class="page-btn next" 
                :disabled="currentPage >= deviceStore.totalPages - 1"
                @click="changePage(currentPage + 1)">
                다음
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDeviceStore } from '../../pinia/useDeviceStore';
import { ref, watch, onMounted, computed } from 'vue';

let searchText = ref('');
let foundResult = ref(false);
let hasDevices = ref(false);
let pageCount = ref(0);
let isSearchMode = ref(false); // 검색 모드인지 여부
let currentPage = ref(0);
const pageSize = 5; // 페이지당 항목 수

const deviceStore = useDeviceStore();

// 표시할 페이지 번호 계산 (최대 5개)
const displayedPages = computed(() => {
  const totalPages = deviceStore.totalPages;
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i);
  }
  
  let startPage = Math.max(0, currentPage.value - 2);
  let endPage = Math.min(totalPages - 1, startPage + 4);
  
  // 표시할 페이지가 5개가 안될 경우, 시작 페이지 조정
  if (endPage - startPage < 4) {
    startPage = Math.max(0, endPage - 4);
  }
  
  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

// 검색 버튼 클릭 시 실행
const handleSearch = async () => {
  currentPage.value = 0; // 검색 시 첫 페이지로 이동
  isSearchMode.value = searchText.value.trim() !== ''; // 검색어가 있으면 검색 모드로 전환
  await fetchData();
};

// 페이지 변경 함수
const changePage = async (newPage) => {
  if (newPage < 0 || newPage >= deviceStore.totalPages) return;
  currentPage.value = newPage;
  await fetchData();
};

// 데이터 가져오기
const fetchData = async () => {
  // 검색 모드일 때만 검색어 전달, 아니면 빈 문자열 전달
  const searchQuery = isSearchMode.value ? searchText.value : '';
  const result = await deviceStore.fetchDeviceList(searchQuery, currentPage.value, pageSize);
  foundResult.value = deviceStore.deviceList.length > 0;
};

// 검색어 변경 시 검색 실행
// watch(searchText, async (newValue) => {
//   await deviceStore.fetchDeviceList(newValue, pageCount.value, page.value);
// });

onMounted(async () => {
  // 페이지 로드 시 데이터 가져오기
  await deviceStore.fetchMyDevices();
  await fetchData();

  // 데이터 가져온 후 상태 업데이트
  hasDevices.value = deviceStore.registerList.length > 0;
  foundResult.value = deviceStore.deviceList.length > 0;

  console.log('onMounted - hasDevices:', hasDevices.value);
  console.log('onMounted - foundResult:', foundResult.value);
})
</script>

<style scoped>
.tp-header-search-box {
  width: 100%;
}
.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  align-items: center;
  gap: 5px;
}

.page-btn {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #fff;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
}

.page-btn:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.page-btn.active {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.page-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.prev, .next {
  font-weight: bold;
}
</style>
