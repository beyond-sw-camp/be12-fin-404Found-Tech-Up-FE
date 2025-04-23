import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import axios from 'axios';
import product_data from '../data/product-data.js';

export const useMainStore= defineStore("main", () => {

  let suggestion = ref(product_data.filter((value) => value.productType === 'electronics').slice(0,8));

  let newProducts = ref([]);
  let topWishlistProduct = ref([]);
  let topSalesProduct = ref([]);

  const loadSuggestionProducts = async () => {
    // TODO: 백엔드 추천 API 갖고 와서 suggestion 변경
    // DTO 양식에 주의할 것: product/top-items.vue 컴포넌트 참조
    
  };

  const loadNewProduct = async () => {
    const result = await axios.get("/api/product/list");
    newProducts.value = result.data.data.sort((a, b) => b.idx - a.idx).slice(0, 3).map((value) => {
      let result = {};
      result.idx = value.idx;
      result.category = value.category;
      result.productType = value.category;
      result.img = value.images[0];
      result.name = value.name;
      result.slug = value.name;
      result.price = value.price;
      result.discount = value.discount;
      result.brand = value.brand;
      result.reviews = value.reviews;
      result.reviewAverage = value.ratings;
      result.reviewHalf = Math.round(value.ratings) - Math.round(value.ratings) >= 0.5;
      result.imageURLs = value.images ? value.images.map((url) => {
        return {"img":url};
      }) : [];
      return result;
    });
  };

  const loadTopWishlist = async () => {
    const result = await axios.get("/api/statistics/wishlist");
    topWishlistProduct.value = result.data.data.slice(0, 3).map((value) => {
      let result = {};
      result.idx = value.productIdx;
      result.category = value.category;
      result.productType = value.category;
      result.img = value.imageUrl;
      result.name = value.productName;
      result.price = value.price;
      result.discount = value.productDiscount;
      result.brand = value.brand;
      result.reviews = value.reviews;
      result.reviewAverage = value.ratings;
      result.reviewHalf = Math.round(value.ratings) - Math.round(value.ratings) >= 0.5;
      result.imageURLs = [{img: value.imageUrl}];
      return result;
    });
  };

  const loadTopSales = async () => {
    const result = await axios.get("/api/statistics/topsales");
    topSalesProduct.value = result.data.data.slice(0,3).map((value) => {
      let result = {};
      result.idx = value.productIdx;
      result.category = value.category;
      result.productType = value.category;
      result.img = value.productImageUrl;
      result.name= value.productName;
      result.price = value.productPrice;
      result.discount = value.productDiscount;
      result.brand = value.brand;
      result.reviews = value.reviews ? value.reviews : [];
      result.reviewAverage = value.ratings;
      result.reviewHalf = Math.round(value.ratings) - Math.round(value.ratings) >= 0.5;
      result.imageURLs = [{img: value.imageUrl}];
      return result;
    });
  };

  onMounted(async () => {
    await loadNewProduct();
    await loadTopWishlist();
    await loadTopSales();
  })

  return {
    loadSuggestionProducts,
    loadNewProduct,
    loadTopWishlist,
    loadTopSales,
    suggestion,
    newProducts,
    topWishlistProduct,
    topSalesProduct
  };
});