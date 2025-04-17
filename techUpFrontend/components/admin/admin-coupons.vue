<template>
  <div class="admin__address">
    <div class="tp-header-search-box"
      style="width:100%;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
      <input type="text" placeholder="Search for Products..." v-model="searchText"
        style="color:black;background-color:inherit; padding-right: inherit;" />
      <button type="submit" style="width:1rem;">
        <SvgSearch />
      </button>
    </div>
    <div style="text-align:right;">
      <button class="tp-btn-2" style="color:white;">
        <nuxt-link href="/coupon-register">쿠폰 등록</nuxt-link>
      </button>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="tp-cart-list mt-10">
          <table style="text-align:center;">
            <thead>
              <tr style="width:50%">
                <th style="width:6%">번호</th>
                <th style="width:20%">쿠폰 이름</th>
                <th style="width:4%">할인율</th>
                <th style="width:20%">만료일</th>
                <th colspan="2" style="width:20%">이 쿠폰을...</th>
              </tr>
            </thead>
            <tbody>
              <!-- wishlist item start -->
              <coupon-item-admin v-for="item in filteredItems" :key="item.id" :item="item" />
              <!-- wishlist item end -->
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
let filteredItems = ref(storeRef.couponStorageList);
let startIndex = ref(0);
let endIndex = ref(filteredItems.length);


const handlePagination = (data, start, end) => {
  console.log("data", data, "start", start, "end", end);
  adminStore.sliceCouponList(start, end);
  startIndex.value = start;
  endIndex.value = end;
};
</script>