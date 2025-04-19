<template>
  <div style="margin: 1rem 0;">
    <h4>기기 검색</h4>
  </div>
  <div class="tp-header-search-box"
    style="width:50vw;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
    <input type="text" placeholder="Search for Products..." v-model="searchText"
      style="color:black;background-color:inherit; padding-right: inherit;" />
    <button type="submit" style="width:1rem;">
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
        </div>
      </div>
    </div>
  </div>
  <div style="width:50vw;background-color:#d5d5d5;height:5px;">
  </div>
  <div style="margin: 1rem 0;">
    <h4>내 기기 목록</h4>
  </div>
  <div class="profile__address">
    <div class="row">
      <div v-if="!hasDevices" class='text-center pt-50'>
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
</template>

<script setup>
import { useDeviceStore } from '../../pinia/useDeviceStore';
import { ref, watch, onMounted } from 'vue';

let searchText = ref('');
let foundResult = ref(false);
let hasDevices = ref(false);

const deviceStore = useDeviceStore();

// 검색어 변경 시 검색 실행
watch(searchText, async (newValue) => {
  await deviceStore.fetchDeviceList(newValue);
});

onMounted(async () => {
  // 페이지 로드 시 데이터 가져오기
  await deviceStore.fetchMyDevices();
  await deviceStore.fetchDeviceList();

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
</style>
