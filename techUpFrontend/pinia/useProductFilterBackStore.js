import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { formatString } from '@/utils/index';

export const useProductFilterBackStore = defineStore("product_filter", () => {
  const route = useRoute();
  const router = useRouter();
  
  // 백엔드로부터 불러온 상품 데이터를 저장하는 상태
  const products = ref([]);
  
  // 백엔드 API에서 제품 목록을 가져오는 함수 (ex: useFetch 사용, Nuxt 3 기준)
  async function fetchProducts() {
    try {
      const config = useRuntimeConfig();
      const { data, error } = await useFetch('/product/list', {
        baseURL: config.public.apiBaseUrl,
      });
      if (error.value) {
        console.error("상품 데이터를 불러오는데 실패했습니다.", error.value);
      } else {
        // 응답 JSON이 BaseResponse 형태라면, 실제 데이터는 data.data 에 들어가 있음
        products.value = data.value.data || [];
      }
    } catch (err) {
      console.error("API 호출 오류:", err);
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
  let priceValues = ref([0, maxProductPrice.value]);

  // maxProductPrice가 변경될 경우 priceValues도 업데이트
  watch(maxProductPrice, (newVal) => {
    priceValues.value = [0, newVal];
  });

  const handlePriceChange = (value) => {
    priceValues.value = value;
  };

  const handleResetFilter = () => {
    priceValues.value = [0, maxProductPrice.value];
  };

  // 필터링: 백엔드에서 불러온 products 배열을 기반으로 필터링 처리
  const filteredProducts = computed(() => {
    let filtered = [...products.value];

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
      if (route.query.status === "on-sale") {
        filtered = filtered.filter((p) => p.discount > 0);
      } else if (route.query.status === "in-stock") {
        filtered = filtered.filter((p) => p.status === "in-stock");
      }
    }
    // Category filter
    if (route.query.category) {
      filtered = filtered.filter(
        (p) => formatString(p.parent) === route.query.category
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
        (p) => formatString(p.brand.name) === route.query.brand
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

  // 검색 필터: route 쿼리 값(searchText, productType 등)을 이용
  const searchFilteredItems = computed(() => {
    let filtered = [...products.value];
    const { searchText, productType } = route.query;

    if (searchText && !productType) {
      filtered = filtered.filter((prd) =>
        prd.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (!searchText && productType) {
      filtered = filtered.filter(
        (prd) => prd.productType.toLowerCase() === productType.toLowerCase()
      );
    }
    if (searchText && productType) {
      filtered = filtered.filter(
        (prd) => prd.productType.toLowerCase() === productType.toLowerCase()
      ).filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()));
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

  // route의 변경 감지 (필요에 따라 리셋 로직 추가 가능)
  watch(
    () => ({ ...route.query, path: route.path }),
    () => {
      // 필요하면 여기에 동작을 추가 (예: 초기화 등)
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
  };
});
