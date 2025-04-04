import product_data from '@/data/product-data';
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProductStore = defineStore("product", () => {

  let activeImg = ref(product_data[0].img);
  let openFilterDropdown = ref(false);
  let openFilterOffcanvas = ref(false);

  // handle image active
  const handleImageActive = (img) => {
    activeImg.value = img;
  };

  // handle filter dropdown toggle
  const handleOpenFilterDropdown = () => {
    openFilterDropdown.value = !openFilterDropdown.value;
  };

  // handle filter offcanvas toggle
  const handleOpenFilterOffcanvas = () => {
    openFilterOffcanvas.value = !openFilterOffcanvas.value;

  };

  return {
    activeImg,
    handleImageActive,
    handleOpenFilterDropdown,
    openFilterDropdown,
    openFilterOffcanvas,
    handleOpenFilterOffcanvas,
  };
});
