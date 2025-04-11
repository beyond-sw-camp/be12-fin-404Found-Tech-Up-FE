import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductBackStore = defineStore("product", () => {
  // 백엔드 API에서 받아온 상품 데이터를 저장할 상태
  const products = ref([]);

  // 활성 이미지 관련 상태
  let activeImg = ref(null);

  // API 호출 함수
  async function fetchProducts() {
    try {
      const config = useRuntimeConfig();
      // 백엔드 '/product/list' 엔드포인트 호출
      const { data, error } = await useFetch('/product/list', {
        baseURL: config.public.apiBaseUrl,
      });
      if (error.value) {
        console.error("상품 데이터를 불러오는데 실패했습니다.", error.value);
      } else {
        products.value = data.value.data || [];
      }
    } catch (err) {
      console.error("API 호출 중 에러 발생", err);
    }
  }

  // 페이지가 생성될 때 혹은 사용자 액션에 따라 fetchProducts()를 호출할 수 있음

  let openFilterDropdown = ref(false);
  let openFilterOffcanvas = ref(false);
  
  const handleImageActive = (img) => {
    activeImg.value = img;
  };

  const handleOpenFilterDropdown = () => {
    openFilterDropdown.value = !openFilterDropdown.value;
  };

  const handleOpenFilterOffcanvas = () => {
    openFilterOffcanvas.value = !openFilterOffcanvas.value;
  };

  return {
    products,
    activeImg,
    openFilterDropdown,
    openFilterOffcanvas,
    fetchProducts,
    handleImageActive,
    handleOpenFilterDropdown,
    handleOpenFilterOffcanvas,
  };
});
