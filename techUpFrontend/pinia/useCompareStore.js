import { ref } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import axios from 'axios';

export const useCompareStore = defineStore("compare_product", () => {
  let compare_items = ref([]); // Note: 비교 뿐만 아니라 제품 목록 쪽 모듈에서 쓰고 있음

  let compare_cpu_items = ref([]);
  let compare_gpu_items = ref([]);
  let compare_ram_items = ref([]);
  let compare_ssd_items = ref([]);
  let compare_hdd_items = ref([]);

  const mapToItem = (x) => {
    return {
      idx:    x.idx ?? x.productIdx,
      category:      x.category,
      productType:   x.category,
      images:     (x.images?.[0] || x.productImageUrl || x.imageUrl) || "",
      name:    x.name  || x.productName,
      price:   x.price || x.productPrice,
      discount: x.discount ?? x.productDiscount,
      brand:   x.brand,
      reviews: x.reviews ?? [],
      reviewAverage: x.rating ?? x.ratings ?? 0,
      reviewHalf:    ((x.rating ?? x.ratings) % 1) >= 0.5,
      imageURLs: (x.images || [ x.imageUrl || x.productImageUrl ]).map(u => ({ img: u })),
    };
  };

  // add_compare_product
  const add_compare_product = (payload) => {
    console.log(payload);
    if (payload.category === "CPU"){
      const isAdded = compare_cpu_items.value.findIndex((p) => p.idx === payload.idx);
      if (isAdded !== -1) {
        compare_cpu_items.value = compare_cpu_items.value.filter(
          (p) => p.idx !== payload.idx
        );
        toast.error(`${payload.name} remove to compare`);
      } else {
        compare_cpu_items.value.push(payload);
        toast.success(`${payload.name} added to compare`);
      }
      localStorage.setItem(
        "compare_cpus",
        JSON.stringify(compare_cpu_items.value)
      );
    } else if (payload.category === "GPU"){
      const isAdded = compare_gpu_items.value.findIndex((p) => p.idx === payload.idx);
      if (isAdded !== -1) {
        compare_gpu_items.value = compare_cpu_items.value.filter(
          (p) => p.idx !== payload.idx
        );
        toast.error(`${payload.name} remove to compare`);
      } else {
        compare_gpu_items.value.push(payload);
        toast.success(`${payload.name} added to compare`);
      }
      localStorage.setItem(
        "compare_gpus",
        JSON.stringify(compare_gpu_items.value)
      );
    } else if (payload.category === "RAM"){
      const isAdded = compare_ram_items.value.findIndex((p) => p.idx === payload.idx);
      if (isAdded !== -1) {
        compare_ram_items.value = compare_ram_items.value.filter(
          (p) => p.idx !== payload.idx
        );
        toast.error(`${payload.name} remove to compare`);
      } else {
        compare_ram_items.value.push(payload);
        toast.success(`${payload.name} added to compare`);
      }
      localStorage.setItem(
        "compare_rams",
        JSON.stringify(compare_ram_items.value)
      );
    } else if (payload.category === "SSD"){
      const isAdded = compare_ssd_items.value.findIndex((p) => p.idx === payload.idx);
      if (isAdded !== -1) {
        compare_ssd_items.value = compare_ssd_items.value.filter(
          (p) => p.idx !== payload.idx
        );
        toast.error(`${payload.name} remove to compare`);
      } else {
        compare_ssd_items.value.push(payload);
        toast.success(`${payload.name} added to compare`);
      }
      localStorage.setItem(
        "compare_ssds",
        JSON.stringify(compare_ssd_items.value)
      );
    } else if (payload.category === "HDD"){
      const isAdded = compare_hdd_items.value.findIndex((p) => p.idx === payload.idx);
      if (isAdded !== -1) {
        compare_hdd_items.value = compare_hdd_items.value.filter(
          (p) => p.idx !== payload.idx
        );
        toast.error(`${payload.name} remove to compare`);
      } else {
        compare_hdd_items.value.push(payload);
        toast.success(`${payload.name} added to compare`);
      }
      localStorage.setItem(
        "compare_hdds",
        JSON.stringify(compare_hdd_items.value)
      );
    }
    
  };
  // removeCompare
  const removeCompare = (payload) => {
    console.log(payload);
    if (payload.category === "CPU") {
      compare_cpu_items.value = compare_cpu_items.value.filter(
        (p) => p.idx !== payload.idx
      );
      toast.error(`${payload.name} remove to compare`);
      localStorage.setItem(
        "compare_cpus",
        JSON.stringify(compare_cpu_items.value)
      );
    } else if (payload.category === "GPU"){
      compare_gpu_items.value = compare_gpu_items.value.filter(
        (p) => p.idx !== payload.idx
      );
      toast.error(`${payload.name} remove to compare`);
      localStorage.setItem(
        "compare_gpus",
        JSON.stringify(compare_gpu_items.value)
      );
    } else if (payload.category === "RAM"){
      compare_ram_items.value = compare_ram_items.value.filter(
        (p) => p.idx !== payload.idx
      );
      toast.error(`${payload.name} remove to compare`);
      localStorage.setItem(
        "compare_rams",
        JSON.stringify(compare_ram_items.value)
      );
    }
    else if (payload.category === "SSD"){
      compare_ssd_items.value = compare_ssd_items.value.filter(
        (p) => p.idx !== payload.idx
      );
      toast.error(`${payload.name} remove to compare`);
      localStorage.setItem(
        "compare_ssds",
        JSON.stringify(compare_ssd_items.value)
      );
    }
    else if (payload.category === "HDD"){
      compare_hdd_items.value = compare_hdd_items.value.filter(
        (p) => p.idx !== payload.idx
      );
      toast.error(`${payload.name} remove to compare`);
      localStorage.setItem(
        "compare_hdds",
        JSON.stringify(compare_hdd_items.value)
      );
    }
    
  };

  // cart product initialize
  const initializeCompareProducts = async () => {
    //const compareData = localStorage.getItem("compare_products");
    compare_cpu_items.value = localStorage.getItem("compare_cpus") ? JSON.parse(localStorage.getItem("compare_cpus")): [];
    compare_gpu_items.value = localStorage.getItem("compare_gpus") ? JSON.parse(localStorage.getItem("compare_gpus")): [];
    compare_ram_items.value = localStorage.getItem("compare_rams") ? JSON.parse(localStorage.getItem("compare_rams")): [];
    compare_ssd_items.value = localStorage.getItem("compare_ssds") ? JSON.parse(localStorage.getItem("compare_ssds")): [];
    compare_hdd_items.value = localStorage.getItem("compare_hdds") ? JSON.parse(localStorage.getItem("compare_hdds")): [];
  };

  const loadSuggestionProducts = async (products) => {
    let result = products;
    //console.log(result);
    for await (let product of products) {
      try {
        const rec = await axios.post("/api/product/recommend/content-based", { product_idx: product.idx, result_num: 1 });
        const recs = rec.data.data;
        //console.log(recs);
        result = result.concat(recs);
      } catch(e) {
        console.log(e);
        return result;
      }
    }
    return result;
  };

  return {
    initializeCompareProducts,
    add_compare_product,
    removeCompare,
    loadSuggestionProducts,
    mapToItem,
    compare_items,
    compare_cpu_items,
    compare_gpu_items,
    compare_ram_items,
    compare_ssd_items,
    compare_hdd_items,
  };
});
