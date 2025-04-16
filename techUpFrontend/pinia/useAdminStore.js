import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { onMounted, watch } from "vue";
import axios from 'axios';

export const useAdminStore = defineStore( 'admin', () => {
  // 요청-응답을 위한 config
  const config = useRuntimeConfig();

  // 제품 목록
  let productList = ref([]);
  // 쿠폰 목록
  let couponList = ref([]);
  // 사용자 목록
  let userList = ref([]);

  const loadProductList = async () => {
    const result = await axios.get('/product/list', {
      baseURL: config.public.apiBaseUrl,
    });
    console.log(result);
    productList.value = result;
    return result;
  };

  const loadCouponList = async () => {
    const result = await axios.get('/coupon', {
      baseURL: config.public.apiBaseUrl,
    });
    console.log(result);
    couponList.value = result.data.couponList;
    return result.data.couponList;
  };


  // 초기화할 것은 여기로
  onMounted(() => {
  });
  
  return {
    loadCouponList,
    loadProductList,
    productList,
    couponList,
    userList
  };
});