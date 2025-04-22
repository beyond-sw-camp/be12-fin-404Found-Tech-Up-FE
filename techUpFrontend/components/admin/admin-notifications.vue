<template>
  <div class="admin__address">
    <span>
      <div class="tp-header-search-box"
        style="width:50%;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
        <input type="text" placeholder="Search for Notification..." v-model="searchText"
          style="color:black;background-color:inherit; padding-right: inherit;" />
        <button type="submit" style="width:1rem;" @click="searchNotification">
          <SvgSearch />
        </button>
      </div>
      <div class="ml-50" style="text-align:right;display:inline-flex;justify-content: right;">
        <button class="tp-btn-2" style="color:white;">
          <nuxt-link href="/notification-register">전체 알림 등록</nuxt-link>
        </button>
      </div>
    </span>
    <div class="row">
      <div class="col-xl-12">
        <div class="tp-cart-list mt-10">
          <table style="text-align:center; width:95%;">
            <thead>
              <tr>
                <th style="width:5%">번호</th>
                <th style="width:20%">알림 제목</th>
                <th style="width:20%">알림 내용</th>
                <th style="width:10%">알림 시각</th>
                <th style="width:10%">이 알림을...</th>
              </tr>
            </thead>
            <tbody>
              <!-- notification item start -->
              <admin-notification-item v-for="item in storeRef.notificationList.value" :key="item.notiTitle"
                :item="item" />
              <!-- notification item end -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="tp-pagination mt-30">
      <ui-pagination :items-per-page="adminStore.PAGENATION_SIZE" :data="storeRef.notificationStorageList.value"
        @handle-paginate="handlePagination" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '../../pinia/useAdminStore';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

let searchText = ref("");

let startIndex = ref(0);
let endIndex = ref(adminStore.PAGENATION_SIZE);

const searchNotification = async () => {
  await adminStore.findNotification(searchText.value);
}

const handlePagination = (data, start, end) => {
  // console.log("data", data, "start", start, "end", end);
  adminStore.sliceNotificationList(start, end);
  startIndex.value = start;
  endIndex.value = end;
};
</script>