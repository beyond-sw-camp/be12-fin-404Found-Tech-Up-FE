import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useProductBackStore = defineStore("productDetail", () => {
  // 제품 상세 정보 저장 상태
  const product = ref(null)
  // 현재 활성화된 이미지 저장 상태
  const activeImg = ref('')

  // 모든 제품 목록 저장 상태(추천 api가 작동하지 않는 경우 사용)
  const allProducts = ref([])
  // 관련 제품 저장 상태
  const related     = ref([])

  // 백엔드 API를 호출하여 제품 상세 정보를 가져오는 함수
  async function fetchProductDetail(id) {
    try {
      const config = useRuntimeConfig()
      const response = await axios.get(`/api/product/${id}`, {
        baseURL: config.public.apiBaseUrl
      })
      // 백엔드 응답 구조에 맞춰 아래 조건문을 수정 (예: response.data.data 또는 response.data.result)
      if (response.data && response.data.data) {
        product.value = response.data.data
        if (product.value.images) {
          activeImg.value = product.value.images[0]
        }
      } else {
        console.error("API 응답 형식이 올바르지 않습니다.", response.data)
      }
    } catch (error) {
      console.error("제품 상세 데이터 호출 중 오류 발생:", error)
    }
  }

  async function fetchAllProducts(page = 0, size = 1000) {
    const config = useRuntimeConfig()
    const res = await axios.get(
      `/api/product/list?page=${page}&size=${size}`,
      { baseURL: config.public.apiBaseUrl }
    )
    allProducts.value = res.data?.data?.content || []
  }

  async function fetchRelatedProducts(id) {
    if (!product.value) return
    const config = useRuntimeConfig()
    try {
      const rec = await axios.post(
        '/api/product/recommend/item-based',
        { product_idx: id },
        { baseURL: config.public.apiBaseUrl }
      )
      related.value = rec.data?.data || []
    } catch {
      related.value = allProducts.value
        .filter(p =>
          p.category === product.value.category &&
          p.productIdx !== id
        )
        .slice(0, 8)
    }
  }

  // 이미지 활성화를 위한 헬퍼 함수
  const handleImageActive = (img) => {
    activeImg.value = img
  }

  return {
    product,
    activeImg,
    allProducts,
    related,
    fetchProductDetail,
    fetchAllProducts,
    fetchRelatedProducts,
    handleImageActive
  }
})
