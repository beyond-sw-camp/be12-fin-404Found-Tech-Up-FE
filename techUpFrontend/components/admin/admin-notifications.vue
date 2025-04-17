<template>
  <div class="admin__address">
    <div class="tp-header-search-box"
      style="width:100%;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
      <input type="text" placeholder="Search for Notification..." v-model="searchText"
        style="color:black;background-color:inherit; padding-right: inherit;" />
      <button type="submit" style="width:1rem;" @click="searchNotification">
        <SvgSearch />
      </button>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="tp-cart-list mt-10">
          <table style="text-align:center;">
            <thead>
              <tr>
                <th style="width:10%">번호</th>
                <th style="width:20%">알림 제목</th>
                <th style="width:30%">알림 내용</th>
                <th style="width:10%">알림 시각</th>
                <th colspan="2" style="width:10%">이 알림을...</th>
              </tr>
            </thead>
            <tbody>
              <!-- notification item start -->

              <!-- notification item end -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="tp-pagination mt-30">
      <ui-pagination :items-per-page="4" :data="filteredItems" @handle-paginate="handlePagination" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '../../pinia/useAdminStore';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

let filteredItems = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
let startIndex = ref(0);
let endIndex = ref(filteredItems.length);

const searchNotification = async () => {
  await adminStore.findNotification();
}

const handlePagination = (data, start, end) => {
  // console.log("data", data, "start", start, "end", end);
  filteredItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};
</script>