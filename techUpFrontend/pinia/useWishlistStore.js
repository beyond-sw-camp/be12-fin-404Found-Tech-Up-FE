import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useWishlistStore = defineStore("wishlist_product", () => {
  let wishlists = ref([]);

  // add_wishlist_product
  const add_wishlist_product = (payload) => {
    const isAdded = wishlists.value.findIndex((p) => p.id === payload.id);
    if (isAdded !== -1) {
      wishlists.value = wishlists.value.filter((p) => p.id !== payload.id);
      toast.error(`${payload.title} remove to wishlist`);
    } else {
      wishlists.value.push(payload);
      toast.success(`${payload.title} added to wishlist`);
    }
    localStorage.setItem("wishlist_products", JSON.stringify(wishlists.value));
  };
  // removeWishlist
  const removeWishlist = (payload) => {
    wishlists.value = wishlists.value.filter((p) => p.id !== payload.id);
    toast.error(`${payload.title} remove to wishlist`);
    localStorage.setItem("wishlist_products", JSON.stringify(wishlists.value));
  };

  // cart product initialize
  const initializeWishlistProducts = () => {
    const wishlistData = localStorage.getItem("wishlist_products");
    if (wishlistData) {
      wishlists.value = JSON.parse(wishlistData);
    }
  };

  // mounted to update cart products
  onMounted(() => {
    initializeWishlistProducts();
  });
  return {
    add_wishlist_product,
    removeWishlist,
    wishlists,
  };
});
