import { defineStore } from 'pinia';
import axios from 'axios';
// import useUserStore from './useUserStore.js';
import { onMounted } from 'vue';

// const userStore = useUserStore();

export const useCouponStore = defineStore("coupon", () => {
  let myCoupons = ref([]);
  let eventsList = ref([]);
  let expiryTimeList = ref([]);
  
  const loadEventList = async () => {
    const result = await axios.get("/api/coupon/events");
    console.log(result.data);
    eventsList.value = result.data.data.couponList;
  };

  const loadMyCouponList = async () => {
    //const userInfo = await userStore.myinfo();
    //console.log(userStore.userInfo);
    // const userIdx = userStore.userInfo.userIdx;
  };

  const issueMyCoupon = async (eventIdx) => {
    
  };

  onMounted(async ()=> {
    await loadMyCouponList();
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