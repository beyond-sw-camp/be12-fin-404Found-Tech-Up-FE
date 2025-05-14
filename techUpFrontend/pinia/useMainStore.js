import { onMounted, ref } from "vue";
import { defineStore } from "pinia";
import axios from 'axios';
import { useRuntimeConfig } from '#imports';  
import product_data from '../data/product-data.js';
import { useUserStore } from "@/pinia/useUserStore.js";

export const useMainStore = defineStore("main", () => {
  const config = useRuntimeConfig();

  function mapToItem(x) {
    return {
      idx: x.idx ?? x.productIdx,
      category: x.category,
      productType: x.category,
      img: (x.images?.[0] || x.productImageUrl || x.imageUrl) || "",
      name: x.name || x.productName,
      price: x.price || x.productPrice,
      discount: x.discount ?? x.productDiscount,
      brand: x.brand,
      reviews: x.reviews ?? [],
      reviewAverage: x.rating ?? x.ratings ?? 0,
      reviewHalf: ((x.rating ?? x.ratings) % 1) >= 0.5,
      imageURLs: (x.images || [x.imageUrl || x.productImageUrl]).map(u => ({ img: u })),
    };
  }

  let suggestion = ref([]);

  let newProducts = ref([]);
  let topWishlistProduct = ref([]);
  let topSalesProduct = ref([]);
  let allProducts = ref([]);
  const userStore = useUserStore();

  const loadSuggestionProducts = async () => {
    const config = useRuntimeConfig();
    try {
      await userStore.checkAuth();
      if (userStore.isLoggedIn) {
        const me = await axios.get("/api/user-product/my-product", {
          baseURL: config.public.apiBaseUrl,
        });
        const user = me.data.data;
        if (user?.products?.length) {
          const recRes = await axios.post(
            "/api/product/recommend/item-based",
            { product_idx: user.products[0].idx, result_num: 8 },
            { baseURL: config.public.apiBaseUrl }
          );
          const recs = recRes.data.data;
          if (Array.isArray(recs) && recs.length) {
            suggestion.value = recs.slice(0, 8).map(mapToItem);
            return;
          }
        }
      }
    } catch (err) {
      console.warn("Could not load recommendations, falling back", err);
    }
  
    const listRes = await axios.get("/api/product/list?page=0&size=8", {
      baseURL: config.public.apiBaseUrl,
    });
    const page = listRes.data.data;
    suggestion.value = Array.isArray(page.content)
      ? page.content.slice(0, 8).map(mapToItem)
      : [];
  };

  const loadNewProduct = async () => {
    const resp = await axios.get("/api/product/list?page=0&size=3");
    const page = resp.data.data;
    const list = Array.isArray(page.content)
      ? page.content
      : [];

    newProducts.value = list
      .sort((a, b) => b.idx - a.idx)
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
      loadSuggestionProducts(),
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