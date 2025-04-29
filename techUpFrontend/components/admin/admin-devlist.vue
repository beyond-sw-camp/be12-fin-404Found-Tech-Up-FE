<template>
  <div class="admin__address">
    <div class="tp-header-search-box"
      style="width:100%;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
      <input type="text" placeholder="Search for Products..." v-model="storeRef.findProductKeyword.value"
        style="color:black;background-color:inherit; padding-right: inherit;" />
      <button type="submit" style="width:1rem;" @click="searchProduct">
        <SvgSearch />
      </button>
    </div>
    <div style="text-align:right;">
      <button class="tp-btn-2" style="color:white;">
        <nuxt-link href="/device-register">제품 등록</nuxt-link>
      </button>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="tp-cart-list mt-10">
          <table style="text-align:center;">
            <thead>
              <tr>
                <th style="width:10%">번호</th>
                <th style="width:30%">제품</th>
                <th style="width:10%">카테고리</th>
                <th style="width:10%">재고</th>
                <th style="width:10%">가격</th>
                <th style="width:10%">쿠폰 발급</th>
                <th style="width:10%">삭제</th>
                <th style="width:10%">편집</th>
              </tr>
            </thead>
            <tbody>
              <!-- registered item start -->
              <admin-device-item v-for="item in storeRef.productList.value" :key="item.name" :item="item"
                :registered="true" />
              <!-- registered item end -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="tp-pagination mt-30">
      <ui-pagination2 :itemsPerPage="adminStore.PAGENATION_SIZE" :data="storeRef.productStorageList.value"
        :totalItems="storeRef.totalElements.value" :initialPage="initialPage" @handle-paginate="handlePagination" />
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useAdminStore } from '../../pinia/useAdminStore';


const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

const searchProduct = async () => {
  await adminStore.findProduct(0);
}

const initialPage = ref(1);

const handlePagination = async (pagenum) => {
  // console.log("data", data, "start", start, "end", end);
  initialPage.value = pagenum;
  if (storeRef.findProductKeyword.value === "") await adminStore.loadProductList(pagenum - 1);
  else await adminStore.findProduct(pagenum);
};
</script>