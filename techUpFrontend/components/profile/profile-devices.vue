<template>
  <div style="margin: 1rem 0;">
    <h4>기기 검색</h4>
  </div>
  <div class="tp-header-search-box" style="display:inline-flex">
    <input type="text" placeholder="Search for Products..." v-model="searchText" />
    <button type="submit">
      <SvgSearch />
    </button>
  </div>
  <div class="profile__address">
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
                  <th colspan="2" class="tp-cart-header-product" style="width:50%;">제품</th>
                  <th style="width:25%;">카테고리</th>
                  <th style="width:25%;">등록</th>
                </tr>
              </thead>
              <tbody>
                <!-- wishlist item start -->
                <device-item v-for="item in deviceStore.deviceList" :key="item.id" :item="item" :registered="false" />
                <!-- wishlist item end -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div style="background-color:#d5d5d5;height:5px;">
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
                  <th colspan="2" class="tp-cart-header-product" style="width:50%;">제품</th>
                  <th style="width:25%;">카테고리</th>
                  <th style="width:25%;">등록 해제</th>
                </tr>
              </thead>
              <tbody>
                <!-- wishlist item start -->
                <device-item v-for="item in deviceStore.registerList" :key="item.id" :item="item" :registered="true" />
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
import product_data from '@/data/product-data';
import { useDeviceStore } from '../../pinia/useDeviceStore';
import { watch } from 'vue';

let searchText = ref('');
let foundResult = ref(false);
let hasDevices = ref(false);

const deviceStore = useDeviceStore();

watch(deviceStore.registerList, (value) => {
  if (value.length === 0) {
    hasDevices.value = false;
  } else {
    hasDevices.value = true;
  }
}, { deep: true });
watch(hasDevices);
watch(foundResult);

onMounted(() => {
  // GET 요청으로 내가 등록한 기기 목록 받아오기
  product_data.forEach((value) => deviceStore.registerList.push(value));
})

// 임시 

</script>

<style scoped>
.tp-header-search-box {
  width: 100%;
}
</style>
