<template>
  <div class="admin__user table-responsive">
    <div class="tp-header-search-box"
      style="width:100%;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
      <input type="text" placeholder="Search for Users..." v-model="storeRef.findUserKeyword.value"
        style="color:black;background-color:inherit; padding-right: inherit;" />
      <button type="submit" style="width:1rem;" @click="searchUsers">
        <SvgSearch />
      </button>
    </div>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">닉네임</th>
          <th scope="col">이메일</th>
          <th scope="col">게시글 수</th>
          <th scope="col">리뷰 수</th>
          <th scope="col">주문 내역</th>
          <th scope="col">쿠폰</th>
          <th scope="col">회원 정보</th>
        </tr>
      </thead>
      <tbody>
        <admin-user-item v-for="item in storeRef.userList.value" :key="item.userNickname" :item="item" />
      </tbody>
    </table>
    <div class="tp-pagination mt-30">
      <ui-pagination :items-per-page="adminStore.PAGENATION_SIZE" :data="storeRef.userStorageList.value"
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

const searchUsers = async () => {
  await adminStore.findUsers();
}

const handlePagination = (data, start, end) => {
  //console.log("data", data, "start", start, "end", end);
  adminStore.sliceUserList(start, end);
  startIndex.value = start;
  endIndex.value = end;
};
</script>
