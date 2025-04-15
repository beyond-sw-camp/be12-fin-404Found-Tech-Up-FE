import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { formatString } from '@/utils/index';

export const useProductFilterBackStore = defineStore("product_filter", () => {
  const route = useRoute();
  const router = useRouter();

  // 초기 상태를 정의하는 함수
  function getDefaultState() {
    return {
      products: [],
      selectVal: "",
      priceValues: [0, 0]
    };
  }

  const state = getDefaultState();

  // 백엔드 API에서 불러온 상품 데이터를 저장하는 상태
  const products = ref([]);

  // Axios를 이용해 백엔드 API에서 제품 목록을 가져오는 함수
  async function fetchProducts() {
    try {
      const config = useRuntimeConfig();
      const response = await axios.get("/product/list", {
        baseURL: config.public.apiBaseUrl
      });
      if (response.data && response.data.data) {
        // 응답 데이터가 배열인지 확인하여 배열이 아니면 빈 배열을 할당
        products.value = Array.isArray(response.data.data)
          ? response.data.data
          : [];
        console.log("백엔드에서 가져온 제품 데이터:", products.value);
      } else {
        console.error("API 응답 형식이 올바르지 않습니다.", response.data);
        // 빈 배열로 초기화
        products.value = [];
      }
    } catch (err) {
      console.error("제품 데이터 API 호출 오류:", err);
      // 오류 발생 시 빈 배열로 초기화
      products.value = [];
    }
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
      return Math.max(...products.value.map((p) => p.price));
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

  const handleResetFilter = () => {
    priceValues.value = [0, maxProductPrice.value];
  };

  // 필터링: 백엔드에서 불러온 products 배열 기반 필터링 처리
  const filteredProducts = computed(() => {
    const base = Array.isArray(products.value) ? [...products.value] : [];
    let filtered = base;

    // Price filter
    if (route.query.minPrice && route.query.maxPrice) {
      filtered = filtered.filter(
        (p) =>
          p.price >= Number(route.query.minPrice) &&
          p.price <= Number(route.query.maxPrice)
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

  // 검색 필터: route 쿼리 값(searchText, productType 등)을 사용
  const searchFilteredItems = computed(() => {
    let filtered = [...products.value];
    const searchText = route.query.searchText || "";
    const productType = route.query.productType || "";

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
    return filtered;
  });

  function reset() {
    const defaults = getDefaultState();
    products.value = defaults.products;
    selectVal.value = defaults.selectVal;
    priceValues.value = defaults.priceValues;
  }

  // route의 변경 감지 (필요에 따라 리셋 등 처리)
  watch(
    () => ({ ...route.query, path: route.path }),
    () => {
      // 필요한 동작을 추가할 수 있습니다.
    }
  );

  return {
    products,
    fetchProducts,
    maxProductPrice,
    priceValues,
    handleSelectFilter,
    filteredProducts,
    handlePriceChange,
    handleResetFilter,
    selectVal,
    searchFilteredItems,
    reset
  };
  {
    persist: {
      paths: ['products', 'priceValues', 'selectVal']  // 메서드는 포함하지 않음
    }
  };
});
