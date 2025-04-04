import { useCartStore } from './useCartStore';
import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { useProductStore } from './useProductStore';
import product_data from '@/data/product-data';

export const useUtilityStore = defineStore("utility", () => {
  const route = useRoute();
  const productStore = useProductStore();
  const cartStore = useCartStore();
  let openSearchBar = ref(false);
  let openMobileMenus = ref(false);
  // product modal
  let modalId = ref('product-modal-641e887d05f9ee1717e1348a');
  let product = ref(product_data[0]);
  // video modal

  const videoUrl = ref('https://www.youtube.com/embed/EW4ZYb3mCZk');
  const isVideoOpen = ref(false);
  let iframeElement = null;

  // handle image active
  const handleOpenSearchBar = () => {
    openSearchBar.value = !openSearchBar.value;
  };


  // handle mobile menu toggle
  const handleOpenMobileMenu = () => {
    openMobileMenus.value = !openMobileMenus.value;
  };

  // modal video play
  const playVideo = (videoId) => {
    const videoOverlay = document.querySelector("#video-overlay");
    videoUrl.value = `https://www.youtube.com/embed/${videoId}`;
    if (!iframeElement) {
      iframeElement = document.createElement("iframe");
      iframeElement.setAttribute("src", videoUrl.value);
      iframeElement.style.width = "60%";
      iframeElement.style.height = "80%";
    }
    
    isVideoOpen.value = true;

    if (videoOverlay) {
      videoOverlay.classList.add("open");
      videoOverlay.appendChild(iframeElement);
    }
  };

  // close modal video
  const closeVideo = () => {
    const videoOverlay = document.querySelector("#video-overlay.open");
    if (iframeElement) {
      iframeElement.remove();
      iframeElement = null;
    }

    isVideoOpen.value = false;
    if (videoOverlay) {
      videoOverlay.classList.remove("open");
    }

  };

  // handle Open Modal
  const handleOpenModal = (id, item) => {
    modalId.value = id;
    product.value = item;
    productStore.handleImageActive(item.img);
    cartStore.initialOrderQuantity();

  };

  const removeBackdrop = () => {
    const modalBackdrop = document.querySelector('.modal-backdrop');
    if (modalBackdrop) {
      modalBackdrop.remove();
      document.body.classList.remove('modal-open');
      document.body.removeAttribute('style');
    }
  };

  watch(() => route.path, () => {
    openSearchBar.value = false;
    openMobileMenus.value = false;
  });

  return {
    handleOpenSearchBar,
    openSearchBar,
    handleOpenModal,
    modalId,
    product,
    openMobileMenus,
    handleOpenMobileMenu,
    playVideo,
    isVideoOpen,
    iframeElement,
    closeVideo,
    removeBackdrop,
  };
});
