import { navigateTo, useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';

export const useAdminStore = defineStore( 'admin',() => {
  // 요청-응답을 위한 config
  const config = useRuntimeConfig();

  const route = useRoute();
  let URLPath = route.path.split("/");

  let modifyingProduct = ref(false);
  if (URLPath[1] === 'product-modify') modifyingProduct.value = true;

  let modifyingCoupon = ref(false);
  if (URLPath[1] === 'coupon-modify') modifyingCoupon.value = true;

  // 통계 관련 데이터
  let topWishList = ref([]);
  
  let newComers = ref(2);
  let totalSales = ref(0);
  let totalOrders = ref(0);
  let totalRefunds = ref(0);
  
  let topSales = ref([]);

  // 제품 목록 및 검색
  let productList = ref([]);
  let findProductKeyword = ref([]);
  // 쿠폰 목록
  let couponList = ref([]);
  // 사용자 목록
  let userList = ref([]);
  // 특정 제품 정보(수정 전용)
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
  let targetPreviewImages = ref([]);
  let targetSelectedFiles = ref([]);

  // 특정 쿠폰 정보(수정 전용)
  let targetCoupon = ref({
    couponName: '',
    discount: '',
    expiryDate: '',
    productIdx: '',
  })
  // ------------------------------------------------
  // ---------------- actions -----------------------
  // ------------------------------------------------

  const loadProductList = async () => {
    const result = await axios.get('/api/product/list', {
      baseURL: config.public.apiBaseUrl,
    });
    productList.value = result.data.data;
    console.log(result.data.data);
    return result;
  };

  const submitProductRegisterForm = async (product, selectedFiles, ssd, ram, hdd,cpu, gpu) => {
    // 카테고리에 맞는 스펙 데이터를 합쳐서 payload 구성
    // 파일 업로드 요청
    let imageUrls = [];
    for await (let file of selectedFiles) {
      let formdata = new FormData();
      formdata.append("file", file);
      const resultUrl = await axios.put('/api/productimage/upload', formdata);
      imageUrls.push(resultUrl.data.data);
      
    }
    console.log(imageUrls);
    const payload = {
      ...product,
      ssdSpec: (product.category === 'SSD' ? ssd : {}),
      ramSpec: (product.category === 'RAM' ? ram : {}),
      hddSpec: (product.category === 'HDD' ? hdd : {}),
      cpuSpec: (product.category === 'CPU' ? cpu : {}),
      gpuSpec: (product.category === 'GPU' ? gpu : {}),
    }

    // axios.post('/api/products', payload) 등으로 서버 전송 처리
    axios.post('/api/product/register', payload
    ).then(async (result) => {
      const imagePayload = {
        productIdx: result.data.data.idx,
        imagePath: imageUrls
      };
      console.log(await axios.post('/api/productimage', imagePayload));
      alert("등록되었습니다!");
      navigateTo('/dashboard');
    }).catch((e) => {
      console.log(e);
    });
  
  };

  const submitProductModifyForm = async () => {
    // 카테고리에 맞는 스펙 데이터를 합쳐서 payload 구성
    // 파일 업로드 요청
    let imageUrls = [];
    for await (let file of targetSelectedFiles.value) {
      let formdata = new FormData();
      formdata.append("file", file);
      const resultUrl = await axios.put('/api/productimage/upload', formdata);
      imageUrls.push(resultUrl.data.data);
    }
    const payload = {
      ...targetProduct.value
    }
    console.log(payload);
    // axios.post('/api/products', payload) 등으로 서버 전송 처리
    axios.put(`/api/product/update/${route.params.idx}`, payload
    ).then(async (result) => {
      const imagePayload = {
        productIdx: result.data.data.idx,
        imagePath: imageUrls
      };
      await axios.post('/api/productimage', imagePayload);
      await loadProductList();
      alert("수정되었습니다!");
      navigateTo('/dashboard');
    }).catch((e) => {
      console.log(e);
    });
  
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

    targetPreviewImages.value = result.data.data.images;
    console.log(targetProduct.value);
  };

  const loadStatistics = async () => {
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

  const deleteProduct = async (idx) => {
    if (confirm(`정말 제품 번호 ${idx}를 삭제할 것입니까? 구매 기록이 있거나 쿠폰이 발급된 제품은 삭제되지 않습니다.`)){
      try{
        await axios.delete(`/api/product/${idx}`);
        productList.value = productList.value.filter((value) => value.idx !== idx);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const findProduct = async () => {
    try {
      const result = await axios.get(`/api/product/search?keyword=${findProductKeyword.value}`);
      productList.value = [];
      productList.value = result.data.data;
      console.log(productList.value);
    } catch (e) {
      console.log(e);
    }
  };
  // --------------- 쿠폰 관련 액션 -------------------

  const loadCouponList = async () => {
    const result = await axios.get('/api/coupon', {
      baseURL: config.public.apiBaseUrl,
    });
    couponList.value = result.data.data.couponList;
    return result.data.couponList;
  };

  const loadCouponInfo = async (idx) => {
    try {
      const result = await axios.get(`/api/coupon/details/${idx}`);
      targetCoupon.value.couponName = result.data.data.couponName;
      targetCoupon.value.discount=result.data.data.couponDiscountRate;
      targetCoupon.value.productIdx=result.data.data.productIdx;
      const resultDate = result.data.data.couponValidDate.toString().split('T')[0].split('-');
      targetCoupon.value.expiryDate= `${resultDate[0]}-${resultDate[1]}-${resultDate[2]}`;
    } catch (e) {
      console.log(e);
    }
  }

  const submitCouponRegisterForm = async (coupon) => {
    // 실제 서버로 전송할 payload
    const payload = {
      ...coupon,
    };
    console.log('등록 데이터:', payload)
    // 여기서 axios.post('/api/coupons', payload).then(...)
    $fetch('/api/coupon/issueall', {
      baseURL: config.public.apiBaseUrl,
      method: 'POST',
      body: payload,
    }).then(async (result) => {
      console.log(result.data);
      alert("등록되었습니다!");
      navigateTo('/dashboard');
    }).catch((e) => {
      alert("등록 실패: " + e);
    });
  };

  const submitCouponModifyForm = async () => {
    // 실제 서버로 전송할 payload
    const payload = {
      ...targetCoupon.value,
    }
    console.log('수정할 쿠폰 데이터:', payload);
    // 여기서 axios.post('/api/coupons', payload).then(...)
    const result = await axios.put(`/api/coupon/update/${route.params.idx}`, payload, {
      baseURL: config.public.apiBaseUrl,
    });
    console.log(result.data.data);
    alert("쿠폰이 수정되었습니다!");
    await loadCouponList();
    navigateTo('/dashboard');
  };

  const deleteCoupon = async (idx) => {
    if (confirm(`정말 쿠폰 ${idx}을 삭제할 것입니까? 사용한 사용자가 있는 쿠폰은 삭제되지 않습니다.`)){
      try{
        await axios.delete(`/api/coupon/delete?idx=${idx}`);
        couponList.value = couponList.value.filter((value) => value.couponIdx !== idx);
      } catch (e) {
        console.log(e);
      }
    }
  };


  // ---------------------------------
  // ====== 초기화할 것은 여기로 ======
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
    loadCouponInfo,

    // CREATE 
    submitProductRegisterForm,
    submitCouponRegisterForm,
    // UPDATE
    submitProductModifyForm,
    submitCouponModifyForm,
    // DELETE
    deleteProduct,
    deleteCoupon,
    // 메타데이터
    modifyingProduct,
    modifyingCoupon,

    // 검색
    findProduct,
    findProductKeyword,
    // 제품 목록, 쿠폰 목록, 사용자 목록, 알림 목록
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
    // 쿠폰 수정용 데이터
    targetCoupon,
  };
});