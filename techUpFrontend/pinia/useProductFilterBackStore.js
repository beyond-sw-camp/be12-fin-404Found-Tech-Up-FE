import { defineStore } from "pinia";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { formatString } from '@/utils/index';
import PriceFilter from "../components/shop/sidebar/price-filter.vue";
import { navigateTo } from "nuxt/app";

export const useProductFilterBackStore = defineStore("product_filter", () => {
  const route = useRoute();
  const router = useRouter();
  const PARENT_CATEGORIES = ["CPU", "GPU", "RAM", "SSD", "HDD"];

  // 초기 상태를 정의하는 함수
  function getDefaultState() {
    return {
      products: [],
      selectVal: "",
      priceValues: [0, 0]
    };
  }

  let isLoading = ref(true);

  let productFilter = ref({
    category: '',
    nameKeyword: '',
    minPrice: 0,
    maxPrice: 10000000
  });

  const state = getDefaultState();

  const totalProducts = ref(0)
  let currentPage   = ref(0)
  const pageSize      = ref(10)

  // 백엔드 API에서 불러온 상품 데이터를 저장하는 상태
  let products = ref([]);

  const categories = computed(() =>
    PARENT_CATEGORIES.map((parent, i) => ({
      id: i,
      parent,
      slug: parent.toLowerCase(),
      products: products.value.filter((p) => p.category === parent)
    }))
  );

  // Axios를 이용해 백엔드 API에서 제품 목록을 가져오는 함수
  async function fetchProducts(category = ' ', page = 0, size = 10) {
    try {
      isLoading.value = true;
      currentPage.value = page
      pageSize.value    = size
      const config = useRuntimeConfig()
      const response = await axios.get(
        `/api/product/list?category=${category}&page=${page}&size=${size}`,
        { baseURL: config.public.apiBaseUrl }
      )
      const pageData = response.data.data
      products.value     = Array.isArray(pageData.content)
                            ? pageData.content
                            : []
      totalProducts.value = pageData.totalElements
      isLoading.value = false;
    } catch (err) {
      console.error("제품 데이터 API 호출 오류:", err)
      products.value     = []
      totalProducts.value = 0
    }
    console.log("호출 종료");
  }

  // 선택된 필터 옵션을 저장하는 상태
  let selectVal = ref("");

  const handleSelectFilter = (e) => {
    console.log("handle select", e);
    selectVal.value = e.value;
  };

  // products 배열을 기반으로 최대 제품 가격 계산
  const maxProductPrice = computed(() => {
    if (products.value && products.value.length > 0) {
      return Math.max(...products.value.map((p) => p.price - (p.price * p.discount / 100)));
    }
    return 0;
  });

  // 초기 가격 범위: [0, maxProductPrice]
  let priceValues = ref([0, maxProductPrice.value || 0]);

  // maxProductPrice가 변경되면 priceValues도 업데이트
  watch(maxProductPrice, (newVal) => {
    priceValues.value = [0, newVal];
  });

  const handlePriceChange = (value) => {
    priceValues.value = value;
  };

  const handleResetFilter = async () => {
    priceValues.value = [0, maxProductPrice.value];
    productFilter.value = {
      category: '',
      minPrice: 0,
      maxPrice: 10000000
    };
    await fetchProducts(0,10);
  };


  // 필터링: 백엔드에서 불러온 products 배열 기반 필터링 처리(프론트엔드 단에서 필터하는 액션)
  const filterProducts = async ( page = 0, size = 10) => {
    console.log(productFilter.value);
    const filteredResult = await axios.post(`/api/product/filter?page=${page}&size=${size}`, productFilter.value);
    console.log(filteredResult.data);
    products.value = [];
    products.value = filteredResult.data.data.content;
    totalProducts.value = 0;
    totalProducts.value = filteredResult.data.data.totalElements;
    maxProductPrice.value = productFilter.value.maxPrice;
    currentPage.value = page+1;
    console.log("필터 종료");
    if (productFilter.value.category === '') {
      navigateTo("/shop")
    } else {
      navigateTo(`/shop?category=${productFilter.value.category}`);
    }
  };


  /*
  const filteredProducts = computed(() => {
    const base = Array.isArray(products.value) ? [...products.value] : [];
    let filtered = base;

    // Price filter
    if (route.query.minPrice && route.query.maxPrice) {
      filtered = filtered.filter(
        (p) =>
          p.price - (p.price * p.discount / 100) >= Number(route.query.minPrice) &&
        p.price - (p.price * p.discount / 100) <= Number(route.query.maxPrice)
      );
    }
    // Status filter (예: on-sale 또는 in-stock)
    if (route.query.status) {
      const statuses = route.query.status.split(',');
      if (statuses.includes("on-sale")) {
        filtered = filtered.filter((p) => p.discount > 0);
      }
      if (statuses.includes("in-stock")) {
        filtered = filtered.filter((p) => p.stock > 0);
      }
    }
    // Category filter
    if (route.query.category) {
      filtered = filtered.filter(
        (p) => formatString(p.category) === route.query.category
      );
    }
    // Sub-category filter
    if (route.query.subCategory) {
      filtered = filtered.filter(
        (p) => formatString(p.children) === route.query.subCategory
      );
    }
    // Brand filter
    if (route.query.brand) {
      filtered = filtered.filter(
        (p) => formatString(p.brand) === route.query.brand
      );
    }
    // Select filter (정렬 등)
    if (selectVal.value) {
      if (selectVal.value === "default-sorting") {
        filtered = [...products.value];
      } else if (selectVal.value === "low-to-high" || selectVal.value === "low-to-hight") {
        filtered = filtered.slice().sort((a, b) => a.price - b.price);
      } else if (selectVal.value === "high-to-low") {
        filtered = filtered.slice().sort((a, b) => b.price - a.price);
      } else if (selectVal.value === "new-added") {
        filtered = filtered.slice(-8);
      } else if (selectVal.value === "on-sale") {
        filtered = filtered.filter((p) => p.discount > 0);
      }
    }
    return filtered;
  });
  */

  // 검색 필터: route 쿼리 값(searchText, productType 등)을 사용
  let searchResult = ref([]);
  const searchProducts = async (searchText, productType,  page = 0, size= 10) => {
    isLoading.value = true;
    console.log(`searching ${searchText} in category ${productType}`);
    let filteredResult;
    if (!productType) {
      filteredResult = await axios.get(`/api/product/search?keyword=${searchText}&page=${page}&size=${size}`);
    } else {
      filteredResult = await axios.get(`/api/product/search?keyword=${searchText}&category=${productType}&page=${page}&size=${size}`);
    }
    searchResult.value = [];
    searchResult.value = filteredResult.data.data.content.map((value) => {
      try {
        value.productIdx = value.idx;
        value.images = value.images[0];
        value.img = value.images;
      } catch (e) {
        value.productIdx = value.idx;
        value.img = "";
        value.images = "";
      }
      return value;
    });
    totalProducts.value = 0;
    totalProducts.value = filteredResult.data.data.totalElements;
    let filtered = [...searchResult.value];
    /*
    if (searchText && !productType) {
      filtered = filtered.filter((prd) =>
        (prd.name || "").toLowerCase().includes((searchText || "").toLowerCase())
      );
    }
    if (searchText && productType) {
      filtered = filtered.filter((prd) => {
        return (prd.category || "").toLowerCase() === productType.toLowerCase();
      }).filter(p => (p.name || "").toLowerCase().includes(searchText.toLowerCase()));
    }
    */
    switch (selectVal.value) {
      case "default-sorting":
        break;
      case "low-to-high":
        filtered = filtered.slice().sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "high-to-low":
        filtered = filtered.slice().sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "new-added":
        filtered = filtered.slice(-6);
        break;
      case "on-sale":
        filtered = filtered.filter((p) => p.discount > 0);
        break;
      default:
    }
    searchResult.value = filtered;
    isLoading.value = false;
  };

  function reset() {
    const defaults = getDefaultState();
    products.value = defaults.products;
    selectVal.value = defaults.selectVal;
    priceValues.value = defaults.priceValues;
    searchResult.value = [];
  }

  onMounted(async () => {
    // await fetchProducts(route.query.category ? route.query.category : '',0,10);
    // await searchProducts();
    isLoading.value = false;
  });

  // route의 변경 감지 (필요에 따라 리셋 등 처리)
  watch(
    () => ({ ...route.query, path: route.path }),
    () => {
      // 필요한 동작을 추가할 수 있습니다.
    }
  );

  return {
    isLoading,
    searchResult,
    products,
    totalProducts,
    categories,
    fetchProducts,
    maxProductPrice,
    priceValues,
    handleSelectFilter,
    productFilter,
    filterProducts,
    // filteredProducts,
    handlePriceChange,
    handleResetFilter,
    selectVal,
    searchProducts,
    reset
  };
  {
    persist: {
      paths: ['products', 'priceValues', 'selectVal']  // 메서드는 포함하지 않음
    }
  };
});
