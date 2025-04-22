import { defineStore } from 'pinia';
import axios from 'axios';
// import useUserStore from './useUserStore.js';
import { onMounted } from 'vue';

export const useCouponStore = defineStore("coupon", () => {
  let myCoupons = ref([]);
  let eventsList = ref([]);
  let expiryTimeList = ref([]);
  
  const loadEventList = async () => {
    const result = await axios.get("/api/coupon/events");
    // console.log(result.data);
    eventsList.value = result.data.data.couponList;
  };

  const loadMyCouponList = async () => {
    const result = await axios.get("/api/usercoupon/mycoupon");
    console.log(result.data);
    myCoupons.value = result.data.data;
  };

  const issueMyCoupon = async (eventIdx) => {
    
  };

  onMounted(async ()=> {
    await loadEventList();
  })

  return {
    loadEventList,
    loadMyCouponList,
    issueMyCoupon,
    // state
    myCoupons,
    eventsList,
    expiryTimeList,
  };

});