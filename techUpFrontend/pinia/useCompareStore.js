import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useCompareStore = defineStore("compare_product", () => {
  let compare_items = ref([]);

  // add_compare_product
  const add_compare_product = (payload) => {
    const isAdded = compare_items.value.findIndex((p) => p.idx === payload.idx);
    if (isAdded !== -1) {
      compare_items.value = compare_items.value.filter(
        (p) => p.idx !== payload.idx
      );
      toast.error(`${payload.name} remove to compare`);
    } else {
      compare_items.value.push(payload);
      toast.success(`${payload.name} added to compare`);
    }
    localStorage.setItem(
      "compare_products",
      JSON.stringify(compare_items.value)
    );
  };
  // removeCompare
  const removeCompare = (payload) => {
    compare_items.value = compare_items.value.filter(
      (p) => p.idx !== payload.idx
    );
    toast.error(`${payload.name} remove to compare`);
    localStorage.setItem(
      "compare_products",
      JSON.stringify(compare_items.value)
    );
  };

  // cart product initialize
  const initializeCompareProducts = () => {
    const compareData = localStorage.getItem("compare_products");
    if (compareData) {
      compare_items.value = JSON.parse(compareData);
    }
  };

  // mounted to update cart products
  onMounted(() => {
    initializeCompareProducts();
  });
  return {
    add_compare_product,
    removeCompare,
    compare_items,
  };
});
