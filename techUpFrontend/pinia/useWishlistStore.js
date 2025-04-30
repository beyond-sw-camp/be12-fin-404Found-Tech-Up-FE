import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import axios from "axios";
import { useRouter } from "vue-router";

export const useWishlistStore = defineStore("wishlist_product", () => {
  const router = useRouter();
  const wishlists = ref([]);

  // 백엔드로부터 위시리스트 데이터를 받아오는 함수
  async function fetchWishlist() {
    try {
      const config = useRuntimeConfig();
      const response = await axios.get("/api/wishlist", {
        baseURL: config.public.apiBaseUrl
      });
      if (response.data && response.data.data) {
        wishlists.value = Array.isArray(response.data.data)
          ? response.data.data
          : [];
      }
      // 11003: 사용자가 로그인하지 않음 
      else if (response.data.code === 11003) {
        wishlists.value = [];
      } else {
        console.error("API 응답 형식이 올바르지 않습니다.", response.data);
        wishlists.value = [];
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // 로그인되지 않은 경우 로그인 페이지로 리다이렉트
        router.push("/login");
      } else if(error.response) {
        toast.error("위시리스트 데이터를 불러오는데 실패했습니다.");
        console.error("위시리스트 API 호출 오류:", error);
      }
      wishlists.value = [];
    }
  }

  // 위시리스트 토글 (추가/삭제)를 백엔드 API로 호출하는 함수
  async function toggleWishlist(productIdx) {
    try {
      const config = useRuntimeConfig();
      const response = await axios.post(
        `/api/wishlist/toggle/${productIdx}`,
        {},
        { baseURL: config.public.apiBaseUrl }
      );
      // 서버 응답에 따라 토스트 메시지를 표시 (WishlistController의 응답 참고&#8203;:contentReference[oaicite:2]{index=2}&#8203;:contentReference[oaicite:3]{index=3})
      if (response.data.code === 11000) {
        toast.success("위시리스트가 업데이트되었습니다.",
          {
            onClick: () => {
              router.push("/wishlist");
            }
          }
        );
        await fetchWishlist();
      } else if (response.data.code === 11003) {
        toast.error("로그인 후 이용해주세요!");
      } else {
        toast.error("위시리스트 토글에 실패했습니다.");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push("/login");
      } else {
        toast.error("위시리스트 토글에 실패했습니다.");
        console.error("위시리스트 토글 오류:", error);
      }
    }
  }

  // 삭제 역시 토글 방식으로 구현 (이미 추가된 경우 토글하면 삭제되므로)
  async function removeWishlist(product) {
    await toggleWishlist(product.productIdx);
  }

  onMounted(() => {
    fetchWishlist();
  });

  return {
    wishlists,
    fetchWishlist,
    toggleWishlist,
    removeWishlist,
  };
});
