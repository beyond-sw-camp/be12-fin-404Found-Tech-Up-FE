import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import product_data from "@/data/product-data";
import { formatString } from "@/utils/index";

export const useProductFilterStore = defineStore("product_filter", () => {
  const route = useRoute();
  const router = useRouter();

  const selectVal = ref("");

  const handleSelectFilter = (e) => {
    console.log("handle select", e);
    selectVal.value = e.value;
  };

  const maxProductPrice = product_data.reduce((max, product) => {
    return product.price > max ? product.price : max;
  }, 0);

  const priceValues = ref([0, maxProductPrice]);

  const handlePriceChange = (value) => {
    priceValues.value = value;
  };

  const handleResetFilter = () => {
    priceValues.value = [0, maxProductPrice];
  };

  const filteredProducts = computed(() => {
    let filteredProducts = [...product_data];

    // Price filter
    if (route.query.minPrice && route.query.maxPrice) {
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.price >= Number(route.query.minPrice) &&
          p.price <= Number(route.query.maxPrice)
      );
    }

    // Status filter
    if (route.query.status) {
      if (route.query.status === "on-sale") {
        filteredProducts = filteredProducts.filter((p) => p.discount > 0);
      } else if (route.query.status === "in-stock") {
        filteredProducts = filteredProducts.filter((p) => p.status === "in-stock");
      }
    }

    // Category filter
    if (route.query.category) {
      filteredProducts = filteredProducts.filter(
        (p) => formatString(p.parent) === route.query.category
      );
    }

    // Sub-category filter
    if (route.query.subCategory) {
      filteredProducts = filteredProducts.filter(
        (p) => formatString(p.children) === route.query.subCategory
      );
    }

    // Brand filter
    if (route.query.brand) {
      filteredProducts = filteredProducts.filter(
        (p) => formatString(p.brand.name) === route.query.brand
      );
    }

    // Select filter
    if (selectVal.value) {
      if (selectVal.value === "default-sorting") {
        filteredProducts = [...product_data];
      } else if (selectVal.value === "low-to-hight") {
        filteredProducts = filteredProducts.slice().sort((a, b) => a.price - b.price);
      } else if (selectVal.value === "high-to-low") {
        filteredProducts = filteredProducts.slice().sort((a, b) => b.price - a.price);
      } else if (selectVal.value === "new-added") {
        filteredProducts = filteredProducts.slice(-8);
      } else if (selectVal.value === "on-sale") {
        filteredProducts = filteredProducts.filter((p) => p.discount > 0);
      }
    }

    return filteredProducts;
  });

  const searchFilteredItems = computed(() => {
    let filteredProducts = [...product_data];
    const { searchText, productType } = route.query;

    if (searchText && !productType) {
      filteredProducts = filteredProducts.filter((prd) =>
        prd.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (!searchText && productType) {
      filteredProducts = filteredProducts.filter(
        (prd) => prd.productType.toLowerCase() === productType.toLowerCase()
      );
    }

    if (searchText && productType) {
      filteredProducts = filteredProducts
        .filter(
          (prd) => prd.productType.toLowerCase() === productType.toLowerCase()
        )
        .filter((p) =>
          p.title.toLowerCase().includes(searchText.toLowerCase())
        );
    }

    switch (selectVal.value) {
      case "default-sorting":
        break;
      case "low-to-high":
        filteredProducts = filteredProducts
          .slice()
          .sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "high-to-low":
        filteredProducts = filteredProducts
          .slice()
          .sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "new-added":
        filteredProducts = filteredProducts.slice(-6);
        break;
      case "on-sale":
        filteredProducts = filteredProducts.filter((p) => p.discount > 0);
        break;
      default:
    }

    return filteredProducts;
  });

  watch(
    () => route.query || route.path,
    () => {}
  );

  return {
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
