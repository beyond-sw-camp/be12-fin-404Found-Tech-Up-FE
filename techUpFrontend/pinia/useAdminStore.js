import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { onBeforeMount, onMounted, watch } from "vue";
import axios from 'axios';

export const useAdminStore = defineStore( 'admin',() => {
  // 요청-응답을 위한 config
  const config = useRuntimeConfig();

  // 통계 관련 데이터
  let topWishList = ref([]);
  
  let newComers = ref(0);
  let totalSales = ref(0);
  let totalOrders = ref(0);
  let totalRefunds = ref(0);
  
  let topSales = ref([]);

  // 제품 목록
  let productList = ref([]);
  // 쿠폰 목록
  let couponList = ref([]);
  // 사용자 목록
  let userList = ref([]);

  let targetProduct = ref({})

  const loadProductList = async () => {
    const result = await axios.get('/api/product/list', {
      baseURL: config.public.apiBaseUrl,
    });
    console.log(result);
    productList.value = result;
    return result;
  };

  const loadProductInfo = async (idx) => {

  };

  const loadCouponList = async () => {
    const result = await axios.get('/api/coupon', {
      baseURL: config.public.apiBaseUrl,
    });
    console.log(result);
    couponList.value = result.data.couponList;
    return result.data.couponList;
  };

  let loadStatistics = async () => {
    try{
      const result = await axios.get("/api/statistics", {
      });
      if (result.data.data.topWishList.length !== 0) {
        topWishList.value = result.data.data.topWishList.map((value) => {
          let result = {};
          result.abbr = value.brand;
          result.amount = value.cw;
        });
      } else {
        topWishList.value = [];
      }
      newComers.value = result.data.data.newCustomers;
      totalSales.value = result.data.data.totalSales;
      totalOrders.value = result.data.data.totalOrders;
      totalRefunds.value = result.data.data.totalRefunds;
      topSales.value = result.data.data.topSales;
    } catch (e) {
      console.log(e);
    }
    
  };

  // 초기화할 것은 여기로
  onMounted(async () => {
    await loadStatistics();
    //await loadCouponList();
    //await loadProductList();
  });
  
  return {
    loadCouponList,
    loadProductList,
    loadStatistics,
    loadProductInfo,
    // 제품 목록, 쿠폰 목록, 사용자 목록, 알림 목록록
    productList,
    couponList,
    userList,
    // 제품 수정용 데이터
    targetProduct,
    // 통계
    topWishList,
    newComers,
    totalSales,
    totalOrders,
    totalRefunds,
    topSales,
  };
});