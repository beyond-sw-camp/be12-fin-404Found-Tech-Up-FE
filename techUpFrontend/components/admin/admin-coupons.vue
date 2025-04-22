<template>
  <div class="admin__address">
    <div class="tp-header-search-box"
      style="width:95%;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
      <input type="text" placeholder="Search for Coupon..." v-model="storeRef.findCouponKeyword.value"
        style="color:black;background-color:inherit; padding-right: inherit;" />
      <button type="submit" style="width:1rem;" @click="searchCoupon">
        <SvgSearch />
      </button>
    </div>
    <div style="text-align:right;">
      <button class="tp-btn-2 mr-10" style="color:white;">
        <nuxt-link href="/coupon-register">쿠폰 등록</nuxt-link>
      </button>
      <button class="tp-btn-2 mr-50" style="color:white;">
        <nuxt-link href="/event-register">쿠폰 이벤트 등록</nuxt-link>
      </button>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="tp-cart-list mt-10">
          <table style="text-align:center;width:95%;">
            <thead>
              <tr style="width:50%">
                <th style="width:6%">번호</th>
                <th style="width:20%">쿠폰 이름</th>
                <th style="width:4%">할인율</th>
                <th style="width:15%">만료일</th>
                <th style="width:5%">발급 가능 횟수</th>
                <th colspan="2" style="width:10%">이 쿠폰을...</th>
              </tr>
            </thead>
            <tbody>
              <!-- wishlist item start -->
              <coupon-item-admin v-for="item in storeRef.couponList.value" :key="item.couponName" :item="item" />
              <!-- wishlist item end -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="tp-pagination mt-30">
      <ui-pagination :items-per-page="adminStore.PAGENATION_SIZE" :data="storeRef.couponStorageList.value"
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

const searchCoupon = async () => {
  await adminStore.findCoupon();
}


const handlePagination = (data, start, end) => {
  //console.log("data", data, "start", start, "end", end);
  adminStore.sliceCouponList(start, end);
  startIndex.value = start;
  endIndex.value = end;
};
</script>