import { navigateTo, useRuntimeConfig } from "nuxt/app";
import { defineStore } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from 'axios';
import { useTheme } from "vuetify";
import { hexToRgb } from '@layouts/utils'

export const useAdminStore = defineStore( 'admin',() => {
  // 요청-응답을 위한 config
  const config = useRuntimeConfig();

  const route = useRoute();
  let URLPath = route.path.split("/");

  let modifyingProduct = ref(false);
  if (URLPath[1] === 'product-modify') modifyingProduct.value = true;

  let modifyingCoupon = ref(false);
  if (URLPath[1] === 'coupon-modify') modifyingCoupon.value = true;

  let modifyingNotification = ref(false);
  if (URLPath[1] === 'notification-modify') modifyingNotification.value = true;

  // 상수
  const PAGENATION_SIZE = 30;

  // 통계 관련 데이터
  let topWishList = ref([]);
  
  let newComers = ref(0);
  let totalSales = ref(0);
  let totalOrders = ref(0);
  let totalRefunds = ref(0);
  
  let topSales = ref([]);

  const vuetifyTheme = useTheme();
  let incomeGraph = ref([{data:[]}]);
  let graphOptions = computed(() => {
    const currentTheme = ref(vuetifyTheme.current.value.colors)
    const variableTheme = ref(vuetifyTheme.current.value.variables)
    const disabledColor = `rgba(${hexToRgb(currentTheme.value['on-surface'])},${variableTheme.value['disabled-opacity']})`
    const borderColor = `rgba(${hexToRgb(String(variableTheme.value['border-color']))},${variableTheme.value['border-opacity']})`
  
    return {
      chart: {
        offsetY: -10,
        offsetX: -15,
        parentHeightOffset: 0,
        toolbar: { show: false },
      },
      plotOptions: {
        bar: {
          borderRadius: 6,
          distributed: true,
          columnWidth: '30%',
        },
      },
      stroke: {
        width: 2,
        colors: [currentTheme.value.surface],
      },
      legend: { show: false },
      grid: {
        borderColor,
        strokeDashArray: 7,
        xaxis: { lines: { show: false } },
      },
      dataLabels: { enabled: false },
      colors: [
        currentTheme.value['track-bg'],
        currentTheme.value['track-bg'],
        currentTheme.value['track-bg'],
        'rgba(var(--v-theme-primary),1)',
        currentTheme.value['track-bg'],
        currentTheme.value['track-bg'],
      ],
      states: {
        hover: { filter: { type: 'none' } },
        active: { filter: { type: 'none' } },
      },
      xaxis: {
        categories: ['2개월 전', '지난 달', '이번 달'],
        tickPlacement: 'on',
        labels: { show: false },
        crosshairs: { opacity: 0 },
        axisTicks: { show: false },
        axisBorder: { show: false },
      },
      yaxis: {
        show: true,
        tickAmount: 4,
        labels: {
          style: {
            colors: disabledColor,
            fontSize: '13px',
          },
          formatter: value => `${value > 9999 ? `${(value / 10000).toFixed(0)}` : value}만`,
        },
      },
      responsive: [
        {
          breakpoint: 1560,
          options: { plotOptions: { bar: { columnWidth: '35%' } } },
        },
        {
          breakpoint: 1380,
          options: { plotOptions: { bar: { columnWidth: '45%' } } },
        },
      ],
    }
  });

  // 제품 목록 및 검색
  let productList = ref([]);
  let findProductKeyword = ref('');
  let productStorageList = ref([]);
  
  // 특정 제품 정보(수정 전용)
  let targetProduct = ref({
    name: '',
    price: '',
    brand: '',
    stock: '',
    description: '',
    category: '',
    cpuSpec: { amdCpuType: '', socketType: '', coreCount: '', threadCount: '', memorySpec: '', builtInGraphic: '', manufactoringProcess: '', baseClock: '', maxClock: '', l2Cache: '', l3Cache: '', operateSystem: '', tdp: '', ppt: '', pcieVer: '', maxPcie: '', maxMemorySize: '', memoryClock: '', memoryChannel: '', pakageType: '', cooler: '', registYear: '', registMonth: '' },
    gpuSpec: { chipsetManufacturer: '', productSeries: '', gpuManufacturingProcess: '', interfaceType: '', recommendedPowerCapacity: '', powerPort: '', gpuLength: '', boostClock: '',streamProcessor: '', memoryType: '', memoryClock: '', gpuMemory: '', memoryBus:'', hdmi:'', displayPort: '', monitorSupport: '', fanCount: '', thickness: '', registYear: '', registMonth:''},
    hddSpec: { productCategory: '', diskSize: '', hddCapacity: '', interfaceType: '', hddRpm: '', hddBuffer: '', transferSpeed: '', recordingMethod: '', thickness: '', workload: '', noise: '', registYear: '', registMonth: ''  },
    ssdSpec: { productCategory: '', formFactor: '', interfaceType: '', protocol: '', ssdCapacity: '', memoryType: '', nandStructure: '', controller: '', ssdRead: '', ssdWrite: '', mtbf: '', tbw: '', nvmeHeatsink: '', width: '', height: '', thickness: '', weight: '', registYear: '', registMonth: '' },
    ramSpec: { usageDevice: '', productCategory: '', memorySpec: '', ramSize: '', operatingClock: '', ramTiming: '', operatingVoltage: '', ramNum: '', heatsink: '', height: '', registYear: '', registMonth: '' }
  });
  let targetPreviewImages = ref([]);
  let existingFilePath = ref([]);
  let uploadTarget = ref([]);  

  // 쿠폰 목록
  let couponList = ref([]);
  let couponStorageList = ref([]);

  // 쿠폰 검색용
  let findCouponKeyword = ref('');

  // 특정 쿠폰 정보(수정 전용)
  let targetCoupon = ref({
    couponName: '',
    discount: '',
    expiryDate: '',
    productIdx: '',
    quantity: ''
  })
  let couponProduct = ref('');

  // 사용자 목록
  let userStorageList = ref([]);
  let userList = ref([]);
  let totalUsers = ref(0);
  // 사용자 검색
  let findUserKeyword = ref('');

  // 사용자 주문 내역 관련
  let orderStorageList = ref([]);
  let orderList = ref([]);
  let orderDetailList = ref([]);

  // 알림 관련 
  let notificationStorageList = ref([]);
  let notificationList = ref([]);
  let targetNotification = ref({
    notiTitle: '',
    notiContent: '',
  });


  let orderDetailOffcanvas = ref(false);

  let totalElements = ref(0);

  // ------------------------------------------------
  // ---------------- actions -----------------------
  // ------------------------------------------------

  const handleOrderDetailOffcanvas = (item) => {
    if (!orderDetailOffcanvas.value) orderDetailList.value = item;
    orderDetailOffcanvas.value = !orderDetailOffcanvas.value;
  };

  
  // -------------------- 알림 -------------------------

  const loadNotificationList = async () => {
    try {
      const result = await axios.get('/api/notification/all');
      // console.log(result.data);
      notificationStorageList.value = [];
      notificationList.value = [];
      notificationStorageList.value = result.data.data;
      notificationList.value = result.data.data.slice(0, PAGENATION_SIZE);
    } catch (e) {
      console.log(e);
    }
  };

  const submitNotificationRegisterForm = async (notice) => {
    const payload = {
      ...notice,
    };
    // console.log('알림 등록 데이터:', payload)
    // 여기서 axios.post('/api/coupons', payload).then(...)
    axios.post('/api/notification/all', payload, {
      baseURL: config.public.apiBaseUrl
    }).then(async (result) => {
      alert("알림 공지가 등록되었습니다!");
      await loadNotificationList();
      navigateTo('/dashboard');
    }).catch((e) => {
      alert("등록 실패: " + e);
    });
  };

  const sliceNotificationList = (start, end) => {
    notificationList.value = notificationStorageList.value.slice(start, end);
  };

  const deleteNotification = async (idx) => {
    if (confirm(`정말 이벤트 ${idx}번을 삭제할 것입니까?`)){
      try{
        await axios.delete(`/api/notification/all?idx=${idx}`);
        notificationList.value = notificationStorageList.value.filter((value) => value.idx !== idx).slice(0,PAGENATION_SIZE);
      } catch (e) {
        console.log(e);
      }
    }
  };

  // ------------------ 사용자 정보 -------------------------

  const loadUserInfo = async (offset) => {
    // 기존 정보를 가져온다.
    const result = await axios.get(`/api/user/alluser?offset=${offset}&limit=${PAGENATION_SIZE}`, {
      baseURL: config.public.apiBaseUrl,
    });
    //console.log(result.data);
    userStorageList.value = result.data.data.content;
    userList.value = result.data.data.content;
    totalUsers.value = result.data.data.totalElements;
  };

  
  const findUsers = async () => {
    try {
      const result = await axios.get(`/api/user/finduser?keyword=${findUserKeyword.value}`);
      console.log(result);
      userStorageList.value = [];
      userList.value = [];
      userStorageList.value = result.data.data;
      userList.value = result.data.data.slice(0, PAGENATION_SIZE);

    } catch (e) {
      console.log(e);
    }
  };

  const sliceUserList = (start, end) => {
    userList.value = userStorageList.value.slice(start, end);
  };

  const loadUserOrder = async (userIdx) => {
    const result = await axios.get(`/api/order/orderlist/${userIdx}`, {
      baseURL: config.public.apiBaseUrl,
    });
    orderStorageList.value = result.data.data;
    orderList.value = orderStorageList.value.slice(0, PAGENATION_SIZE);
  };

  const sliceOrderList = (start, end) => {
    orderList.value = orderStorageList.value.slice(start, end);
  };

  // --------------- 제품 관련 ----------------------

  const loadProductList = async (offset) => {
    const result = await axios.get(`/api/product/list?page=${offset}&size=30`, {
      baseURL: config.public.apiBaseUrl,
    });
    productStorageList.value = result.data.data.content;
    productList.value = result.data.data.content;
    totalElements.value = result.data.data.totalElements;
    //console.log(result.data.data);
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
      await axios.post('/api/productimage', imagePayload);
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
    for await (let file of uploadTarget.value) {
      let formdata = new FormData();
      formdata.append("file", file);
      const resultUrl = await axios.put('/api/productimage/upload', formdata);
      imageUrls.push(resultUrl.data.data);
    }
    const payload = {
      ...targetProduct.value
    }
    // console.log(payload);
    // axios.post('/api/products', payload) 등으로 서버 전송 처리
    axios.put(`/api/product/update/${route.params.idx}`, payload
    ).then(async (result) => {
      const imagePayload = {
        productIdx: result.data.data.idx,
        imagePath: imageUrls
      };
      await axios.post('/api/productimage', imagePayload);
      await loadProductList(0);
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
    existingFilePath.value = result.data.data.images;
    //console.log(targetProduct.value);
  };

  const loadStatistics = async () => {
    let result;
    try{
      result = await axios.get("/api/statistics/wishlist", {
      });
      topWishList.value = result.data.data;
    }
    catch (e) {
      console.log(e);
    }
    try {
      result = await axios.get("/api/statistics/order", {
      });
      totalOrders.value = result.data.data;
    }
      catch (e) {
      console.log(e);
    }
    try {
      result = await axios.get("/api/statistics/refund", {
      });
      totalRefunds.value = result.data.data;
    }
    catch (e) {
      console.log(e);
    }
    try {
      result = await axios.get("/api/statistics/topsales", {
      });
      topSales.value = result.data.data;
    } catch (e) {
      console.log(e);
    }
    try {
      result = await axios.get("/api/statistics/incomes", {
      });
      incomeGraph.value = [{data:result.data.data}];// 그래프 갱신 
    } catch (e) {
      console.log(e);
    }
        
    try{
      result = await axios.get("/api/statistics", {
      });
      newComers.value = result.data.data.newCustomers;
      totalSales.value = result.data.data.totalSales;      

    } catch (e) {
      console.log(e);
    }
    
  };

  const deleteProduct = async (idx) => {
    if (confirm(`정말 제품 번호 ${idx}를 삭제할 것입니까? 구매 기록이 있거나 쿠폰이 발급된 제품은 삭제되지 않습니다.`)){
      try{
        await axios.delete(`/api/product/${idx}`);
        await loadProductList(0);
        productList.value = productStorageList.value.filter((value) => value.idx !== idx).slice(0,PAGENATION_SIZE);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const findProduct = async (offset) => {
    try {
      const result = await axios.get(`/api/product/search?keyword=${findProductKeyword.value}&page=${offset}&size=30`);
      productStorageList = [];
      productList.value = [];
      productStorageList.value = result.data.data.content;
      productList.value = result.data.data.content;
      totalElements.value = result.data.dat.totalElements;
    } catch (e) {
      console.log(e);
    }
  };

  const sliceProductList = (start, end) => {
    productList.value = productStorageList.value.slice(start, end);
  }
  // --------------- 쿠폰 관련 액션 -------------------

  const loadCouponList = async () => {
    const result = await axios.get('/api/coupon', {
      baseURL: config.public.apiBaseUrl,
    });
    couponList.value = result.data.data.couponList.slice(0, PAGENATION_SIZE);
    couponStorageList.value = result.data.data.couponList;
    return result.data.couponList;
  };

  const loadCouponInfo = async (idx) => {
    try {
      const result = await axios.get(`/api/coupon/details/${idx}`);
      //console.log(result.data);
      targetCoupon.value.couponName = result.data.data.couponName;
      targetCoupon.value.discount=result.data.data.couponDiscountRate;
      targetCoupon.value.productIdx=result.data.data.productIdx;
      targetCoupon.value.quantity=result.data.data.couponStock;
      const resultDate = result.data.data.couponValidDate.toString().split('T')[0].split('-');
      targetCoupon.value.expiryDate= `${resultDate[0]}-${resultDate[1]}-${resultDate[2]}`;
    } catch (e) {
      console.log(e);
    }
  }

  const submitCouponRegisterForm = async (coupon, userIdx) => {
    // 실제 서버로 전송할 payload
    
    // 여기서 axios.post('/api/coupons', payload).then(...)
    if (userIdx) {
      const payload = {
        userIdx,
        ...coupon,
      };
      //console.log('등록 데이터:', payload);
      $fetch('/api/coupon/issue', {
        baseURL: config.public.apiBaseUrl,
        method: 'POST',
        body: payload,
      }).then(async (result) => {
        alert("사용자 전용 쿠폰이 등록되었습니다!");
        await loadCouponList();
        couponProduct.value = '';
        navigateTo('/dashboard');
      }).catch((e) => {
        alert("등록 실패: " + e);
      });
    } else {
      const payload = {
        ...coupon,
      };
      //console.log('등록 데이터:', payload);
      $fetch('/api/coupon/issueall', {
        baseURL: config.public.apiBaseUrl,
        method: 'POST',
        body: payload,
      }).then(async (result) => {
        alert("등록되었습니다!");
        couponProduct.value = '';
        await loadCouponList();
        navigateTo('/dashboard');
      }).catch((e) => {
        alert("등록 실패: " + e);
      });
    }
    
  };

  const submitCouponModifyForm = async () => {
    // 실제 서버로 전송할 payload
    const payload = {
      ...targetCoupon.value,
    }
    //console.log('수정할 쿠폰 데이터:', payload);
    // 여기서 axios.post('/api/coupons', payload).then(...)
    const result = await axios.put(`/api/coupon/update/${route.params.idx}`, payload, {
      baseURL: config.public.apiBaseUrl,
    });
    alert("쿠폰이 수정되었습니다!");
    await loadCouponList();
    navigateTo('/dashboard');
  };

  const deleteCoupon = async (idx) => {
    if (confirm(`정말 쿠폰 ${idx}을 삭제할 것입니까? 사용한 사용자가 있는 쿠폰은 삭제되지 않습니다.`)){
      try{
        await axios.delete(`/api/coupon/delete?idx=${idx}`);
        await loadCouponList();
        couponList.value = couponStorageList.value.filter((value) => value.couponIdx !== idx).slice(0,PAGENATION_SIZE);
      } catch (e) {
        console.log(e);
      }
    }
  };
  const sliceCouponList = (start, end) => {
    couponList.value = couponStorageList.value.slice(start, end);
  }

  const findCoupon = async () => {
    try {
      const result = await axios.get(`/api/coupon/search?keyword=${findCouponKeyword.value}`);
      couponStorageList.value = [];
      couponList.value = [];
      couponStorageList.value = result.data.data.couponList;
      couponList.value = result.data.data.couponList.slice(0, PAGENATION_SIZE);
      //console.log(result.data);
    } catch (e) {
      console.log(e);
    }
  };

  const changeCouponTarget = (idx) => {
    couponProduct.value = idx.toString();
  };

  const submitEventRegisterForm = async (event) => {
    // 실제 서버로 전송할 payload: 쿠폰 메타데이터와 똑같이 취급됨에 주의의
    const payload = {
      ...event,
    };
    //console.log('이벤트 등록 데이터:', payload)
    // 여기서 axios.post('/api/coupons', payload).then(...)

    const result = await axios.post('/api/coupon/events', payload );
    alert("이벤트가 등록되었습니다!");
    await loadCouponList();
    navigateTo('/dashboard');
  };

  const submitEventModifyForm = async () => {
    // 실제 서버로 전송할 payload
    const payload = {
      ...targetCoupon.value,
    }
    //console.log('수정할 쿠폰 데이터:', payload);
    // 여기서 axios.put()
    // post를 하면 이벤트 쿠폰 발행이므로 혼동하지 말 것
    const result = await axios.put(`/api/coupon/events/${route.params.idx}`, payload);
    alert("이벤트가 수정되었습니다!");
    await loadCouponList();
    navigateTo('/dashboard');
  };

  const deleteEvent = async (idx) => {
    if (confirm(`정말 이벤트 ${idx}을 삭제할 것입니까? 사용한 사용자의 쿠폰은 삭제되지 않습니다.`)){
      try{
        await axios.delete(`/api/coupon/events?idx=${idx}`);
        await loadCouponList();
        couponList.value = couponStorageList.value.filter((value) => value.couponIdx !== idx).slice(0,PAGENATION_SIZE);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const cancelOrder = async (idx) => {
    try{
      const result = await axios.post(`/api/order/cancel/${idx}`);
      orderList.value = orderList.value.map((value) => value.idx !== idx);
    } catch(e) {
      alert("주문 취소 및 환불에 실패했습니다");
    }
    
  };

  // ---------------------------------
  // ====== 초기화할 것은 여기로 ======
  onMounted(async () => {
    await loadStatistics();
    await loadCouponList();
    await loadProductList(0);
    await loadUserInfo(0);
    await loadNotificationList();
  });
  
  return {
    loadCouponList,
    loadProductList,
    loadNotificationList,
    loadStatistics,
    loadProductInfo,
    loadCouponInfo,
    loadUserInfo,
    loadUserOrder,
    // CREATE 
    submitProductRegisterForm,
    submitCouponRegisterForm,
    submitNotificationRegisterForm,
    submitEventRegisterForm,
    // UPDATE
    submitProductModifyForm,
    submitCouponModifyForm,
    submitEventModifyForm,
    // DELETE
    deleteProduct,
    deleteCoupon,
    deleteNotification,
    deleteEvent,
    // 메타데이터
    modifyingProduct,
    modifyingCoupon,
    // 검색
    findProduct,
    findProductKeyword,
    findUsers,
    findUserKeyword,
    findCoupon,
    findCouponKeyword,
    // 제품 목록, 쿠폰 목록, 사용자 목록, 알림 목록
    productStorageList,
    couponStorageList,
    userStorageList,
    orderStorageList,
    notificationStorageList,
    // notificationList,
    // 제품 수정용 데이터
    targetProduct,
    existingFilePath,
    targetPreviewImages,
    uploadTarget,
    // 통계
    topWishList,
    newComers,
    totalSales,
    totalOrders,
    totalRefunds,
    topSales,
    incomeGraph,
    graphOptions,
    // 쿠폰 수정용 데이터
    targetCoupon,
    couponProduct,

    // 알림 수정
    targetNotification,
    // 페이지네이션 관련
    PAGENATION_SIZE,
    sliceProductList,
    sliceCouponList,
    sliceUserList,
    sliceOrderList,
    sliceNotificationList,
    productList,
    couponList,
    userList,
    orderList,
    orderDetailList,
    notificationList,

    // 주문 상세보기 페이지
    orderDetailOffcanvas,
    handleOrderDetailOffcanvas,

    changeCouponTarget,
    totalElements,
    totalUsers,
    cancelOrder,
  };
});