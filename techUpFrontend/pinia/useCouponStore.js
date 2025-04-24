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
    const result = await axios.get(`/api/coupon/events/${eventIdx}`);
    if (result.data.code === 8000) {
      alert("발급되었습니다!");
    } else {
      alert("발급에 실패했습니다!");
    }
  };

  async function useCoupon(couponIdx) {
    await axios.post(`/api/usercoupon/use/${couponIdx}`, null);
  }

  onMounted(async ()=> {
    await loadEventList();
    await loadMyCouponList();
  });

  return {
    loadEventList,
    loadMyCouponList,
    issueMyCoupon,
    useCoupon,
    // state
    myCoupons,
    eventsList,
    expiryTimeList,
  };

});