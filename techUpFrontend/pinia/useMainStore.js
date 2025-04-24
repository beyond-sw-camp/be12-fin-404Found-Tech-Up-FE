import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import axios from 'axios';
import product_data from '../data/product-data.js';

export const useMainStore = defineStore("main", () => {

  let suggestion = ref(product_data.filter((value) => value.productType === 'electronics').slice(0, 8));

  let newProducts = ref([]);
  let topWishlistProduct = ref([]);
  let topSalesProduct = ref([]);
  let allProducts = ref([]);

  const loadSuggestionProducts = async () => {
    // TODO: 백엔드 추천 API 갖고 와서 suggestion 변경
    // DTO 양식에 주의할 것: product/top-items.vue 컴포넌트 참조
  };

  const loadNewProduct = async () => {
    const resp = await axios.get("/api/product/list?page=0&size=30");
    const page = resp.data.data;
    const list = Array.isArray(page.content)
      ? page.content
      : [];

    newProducts.value = list
      .sort((a, b) => b.idx - a.idx)
      .slice(0, 3)
      .map((value) => ({
        idx: value.idx,
        category: value.category,
        productType: value.category,
        img: value.images[0] || '',
        name: value.name,
        slug: value.name,
        price: value.price,
        discount: value.discount,
        brand: value.brand,
        reviews: value.reviews,
        reviewAverage: value.ratings,
        reviewHalf:
          (value.ratings % 1) >= 0.5,
        imageURLs: value.images
          ? value.images.map((url) => ({ img: url }))
          : []
      }));
  };

  const loadTopWishlist = async () => {
    const resp = await axios.get("/api/statistics/wishlist");
    const list = Array.isArray(resp.data.data)
      ? resp.data.data
      : [];

    topWishlistProduct.value = list.slice(0, 3).map((value) => ({
      idx: value.productIdx,
      category: value.category,
      productType: value.category,
      img: value.imageUrl,
      name: value.productName,
      price: value.price,
      discount: value.productDiscount,
      brand: value.brand,
      reviews: value.reviews,
      reviewAverage: value.ratings,
      reviewHalf: (value.ratings % 1) >= 0.5,
      imageURLs: [{ img: value.imageUrl }]
    }));
  };

  const loadTopSales = async () => {
    const resp = await axios.get("/api/statistics/topsales");
    const list = Array.isArray(resp.data.data)
      ? resp.data.data
      : [];

    topSalesProduct.value = list.slice(0, 3).map((value) => ({
      idx: value.productIdx,
      category: value.category,
      productType: value.category,
      img: value.productImageUrl,
      name: value.productName,
      price: value.productPrice,
      discount: value.productDiscount,
      brand: value.brand,
      reviews: value.reviews || [],
      reviewAverage: value.ratings,
      reviewHalf: (value.ratings % 1) >= 0.5,
      imageURLs: [{ img: value.productImageUrl }]
    }));

  };


  onMounted(async () => {
    await Promise.all([
      loadNewProduct(),
      loadTopWishlist(),
      loadTopSales(),
    ]);
  });

  return {
    loadSuggestionProducts,
    loadNewProduct,
    loadTopWishlist,
    loadTopSales,
    suggestion,
    newProducts,
    topWishlistProduct,
    topSalesProduct,
    allProducts,
  };
});