import { useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';

export const useAdminStore = defineStore( 'admin',() => {
  // 요청-응답을 위한 config
  const config = useRuntimeConfig();

  const route = useRoute();
  let URLPath = route.path.split("/");

  let modifyingProduct = ref(false);
  if (URLPath[1] === 'product-modify') modifyingProduct.value = true;

  // 통계 관련 데이터
  let topWishList = ref([]);
  
  let newComers = ref(2);
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

  let targetProduct = ref({
    name: '',
    price: '',
    brand: '',
    stock: '',
    description: '',
    category: '',
    cpuSpec: { cpuType: '', cpuCore: '', cpuThreads: '' },
    gpuSpec: { gpuMemory: '', gpuChip: '', gpuLength: '' },
    hddSpec: { hddCapacity: '', hddRpm: '', hddBuffer: '' },
    ssdSpec: { ssdCapacity: '', ssdRead: '', ssdWrite: '' },
    ramSpec: { ramType: '', ramNum: '', ramSize: '', ramUsage: '' }
  });

  const loadProductList = async () => {
    const result = await axios.get('/api/product/list', {
      baseURL: config.public.apiBaseUrl,
    });
    productList.value = result.data.data;
    return result;
  };

  const loadProductInfo = async (idx) => {
    // 기존 정보를 가져온다.
    const result = await axios.get(`/api/product/${idx}`, {
      baseURL: config.public.apiBaseUrl,
    });

    targetProduct.value = {
      name: result.data.data.name,
      price: result.data.data.price.toString(),
      brand: result.data.data.brand,
      stock: result.data.data.stock.toString(),
      description: result.data.data.description,
      category: result.data.data.category,
      cpuSpec: result.data.data.cpuSpec ? result.data.data.cpuSpec : null,
      gpuSpec: result.data.data.gpuSpec ? result.data.data.gpuSpec : null,
      hddSpec: result.data.data.hddSpec ? result.data.data.hddSpec : null,
      ssdSpec: result.data.data.ssdSpec ? result.data.data.ssdSpec : null,
      ramSpec: result.data.data.ramSpec ? result.data.data.ramSpec : null
    };
    console.log(targetProduct.value);
  };

  const loadCouponList = async () => {
    const result = await axios.get('/api/coupon', {
      baseURL: config.public.apiBaseUrl,
    });
    couponList.value = result.data.data.couponList;
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
    await loadCouponList();
    await loadProductList();
  });
  
  return {
    loadCouponList,
    loadProductList,
    loadStatistics,
    loadProductInfo,
    // 메타데이터
    modifyingProduct,
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