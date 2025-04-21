<template>
  <div class="admin__user table-responsive">
    <table>
      <thead>
        <tr>
          <th scope="col" style="font-size:x-small;width:10%">번호</th>
          <th scope="col" style="font-size:x-small;width:25%">제품</th>
          <th scope="col" style="font-size:x-small;width:10%">주문 시각</th>
          <th scope="col" style="font-size:x-small;width:15%">총량</th>
          <th scope="col" style="font-size:x-small;width:15%">총 가격</th>
          <th scope="col" style="font-size:x-small;width:10%">현재 상태</th>
          <th scope="col" style="font-size:x-small;width:10%">상세</th>
          <th scope="col" style="font-size:x-small;width:10%">취소<br>/환불</th>
          <th scope="col" style="font-size:x-small;width:10%">처리 완료</th>
        </tr>
      </thead>
      <tbody>
        <admin-order-item v-for="item in storeRef.orderList.value" :key="item.orderDate" :item="item" />
      </tbody>
    </table>
    <div class="tp-pagination mt-30">
      <ui-pagination :items-per-page="adminStore.PAGENATION_SIZE" :data="storeRef.orderStorageList.value"
        @handle-paginate="handlePagination" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '../../pinia/useAdminStore';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

let startIndex = ref(0);
let endIndex = ref(adminStore.PAGENATION_SIZE);

const handlePagination = (data, start, end) => {
  // console.log("data", data, "start", start, "end", end);
  adminStore.sliceOrderList(start, end);
  startIndex.value = start;
  endIndex.value = end;
};


</script>
