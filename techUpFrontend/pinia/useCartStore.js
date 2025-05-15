import { ref, onMounted, computed, watch } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import * as PortOne from '@portone/browser-sdk/v2'

export const useCartStore = defineStore("cart_product", () => {
  const route = useRoute();
  const router = useRouter();
  const cart_products = ref([]);
  let orderQuantity = ref(1);
  let cartOffcanvas = ref(false);
  let shipCost = ref(0);

  async function fetchCartProducts() {
    try {
      const config = useRuntimeConfig();
      const response = await axios.get("/api/cart", {
        baseURL: config.public.apiBaseUrl,
      });
      if (response.data && response.data.data) {
        cart_products.value = Array.isArray(response.data.data)
          ? response.data.data
          : [];
      }
      // 예: 5005: 사용자가 로그인하지 않음
      else if (response.data && response.data.code === 5005) {
        cart_products.value = [];
      } else {
        console.error("API 응답 형식이 올바르지 않습니다.", response.data);
        cart_products.value = [];
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push("/login");
      }
      cart_products.value = [];
    }
  }

  // 장바구니에 상품 추가 (백엔드 API 연동)
  async function addCartProduct(payload, productIdx, orderQuantity = 1) {
    try {
      // payload.productIdx를 이용해 백엔드에 POST 요청 (요청 본문에 수량 정보 포함)
      const config = useRuntimeConfig();
      const requestBody = { cartItemQuantity: orderQuantity };
      const response = await axios.post(
        `/api/cart/add/${productIdx}`,
        requestBody,
        { baseURL: config.public.apiBaseUrl }
      );
      if (response.data && response.data.data) {
        toast.success(`${payload.name} 장바구니에 추가되었습니다`,
          {
            onClick: () => {
              router.push("/cart")
            }
          }
        );
        // 백엔드 응답을 반영하여 장바구니 목록 다시 불러오기
        await fetchCartProducts();
      }
      // 5005: 사용자가 로그인하지 않음 
      else if (response.data && response.data.code === 5005) {
        cart_products.value = [];
        alert('로그인 후 이용해주세요.');
        window.location.href = '/login';
      }
    } catch (error) {
      const res = error.response;

      if (error.response && error.response.status === 401) {
        router.push("/login");
      }
      // 5002: 재고가 부족한 경우
      else if (res?.data?.code === 5002) {
        toast.error("재고가 부족합니다.");
        return;
      } else {
        toast.error("장바구니에 상품 추가에 실패했습니다.");
        console.error("장바구니 추가 오류:", error);
      }
    }
  }

  // 장바구니 항목 삭제 (백엔드 API 연동)
  async function removeCartProduct(payload, productIdx) {
    try {
      const config = useRuntimeConfig();
      const response = await axios.delete(
        `/api/cart/delete/${productIdx}`,
        { baseURL: config.public.apiBaseUrl }
      );
      if (response.data && response.data.data) {
        toast.error(`${payload.product.name} 장바구니에서 삭제되었습니다`,
          {
            onClick: () => {
              router.push("/cart")
            }
          });
        await fetchCartProducts();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push("/login");
      } else {
        toast.error("장바구니 항목 삭제에 실패했습니다.");
        console.error("장바구니 삭제 오류:", error);
      }
    }
  }

  // 수량 감소
  async function quantityDecrement(payload) {
    try {
      const config = useRuntimeConfig();
      const delta = -1;
      const response = await axios.put(
        `/api/cart/update/${payload.productIdx}`,
        { deltaQuantity: delta },
        { baseURL: config.public.apiBaseUrl }
      );
      if (response.data && response.data.data) {
        toast.info(`장바구니 수량 감소: ${payload.name}`);
        await fetchCartProducts();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push("/login");
      } else {
        toast.error("수량 감소에 실패했습니다.");
        console.error("수량 감소 오류:", error);
      }
    }
  }

  // quantity increment: 같은 방식으로 구현 가능
  async function quantityIncrement(payload) {
    try {
      const config = useRuntimeConfig();
      const delta = 1;
      const response = await axios.put(
        `/api/cart/update/${payload.productIdx}`,
        { deltaQuantity: delta },
        { baseURL: config.public.apiBaseUrl }
      );
      if (response.data && response.data.data) {
        toast.success(`${payload.name} 장바구니 수량 증가`);
        await fetchCartProducts();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        router.push("/login");
      } else {
        toast.error("수량 증가에 실패했습니다.");
        console.error("수량 증가 오류:", error);
      }
    }
  }

  // clear cart
  async function clear_cart() {
    const confirmMsg = window.confirm("Are you sure deleted your all cart items?");
    if (confirmMsg) {
      try {
        const config = useRuntimeConfig();
        const response = await axios.delete(
          `/api/cart/clear`,
          { baseURL: config.public.apiBaseUrl }
        );
        if (response.data && response.data.data) {
          cart_products.value = [];
          toast.error(`장바구니를 비웠습니다.`);
          await fetchCartProducts();
        }
      } catch (error) {
        toast.error("장바구니 비우기에 실패했습니다.");
      }
    }
  }

  async function clear_cart_without_asking() {
    try {
      const config = useRuntimeConfig();
      const response = await axios.delete(
        `/api/cart/clear`,
        { baseURL: config.public.apiBaseUrl }
      );
      if (response.data && response.data.data) {
        cart_products.value = [];
        await fetchCartProducts();
      }
    } catch (error) {
      toast.error("장바구니 비우기에 실패했습니다.");
    }
  }

  // 주문하기
  async function order(form, couponInfo, shippingMethod, paymentMethod) {
    if (cart_products.value.length === 0) {
      toast.error("장바구니에 상품이 없습니다.");
      return;
    }

    const {
      couponIdx,
      couponDiscountRate = 0,
      productIdx: couponProductIdx
    } = couponInfo


    const items = cart_products.value.map((item) => {
      const basePrice = Number(item.product.price);
      const productDiscountRate = Number(item.product.discount) / 100;

      // 할인율 적용
      let priceAfterProductDiscount = basePrice * (1 - productDiscountRate);

      // 쿠폰 적용
      if (couponIdx && item.product.productIdx === couponProductIdx) {
        priceAfterProductDiscount *= (1 - couponDiscountRate / 100);
      }

      return {
        productName: item.product.name,
        productIdx: item.product.productIdx,
        orderDetailQuantity: item.cartItemQuantity,
        orderDetailPrice: priceAfterProductDiscount
      };
    });

    const payload = {
      ...form,
      couponIdx: couponIdx || null,
      shippingMethod,
      paymentMethod,
      shipCost: shipCost.value,
      items: items,
    };

    try {
      // 주문 생성 API 호출
      const config = useRuntimeConfig();

      const res = await axios.post(
        '/api/order',
        payload,
        { baseURL: config.public.apiBaseUrl }
      );

      // 주문 생성 성공 시
      if (res.data && res.data.data) {
        const orderIdx = res.data.data.orderIdx;
        const storeId = res.data.data.storeId;
        const channelKey = res.data.data.channelKey;

        let orderTotal = items.reduce((sum, i) =>
          sum + i.orderDetailPrice * i.orderDetailQuantity, 0)

        // 배송비 추가
        orderTotal += shipCost.value;

        // 주문 생성 후 결제 API 호출
        const payConfig = useRuntimeConfig();
        const orderName = items.length < 2 ? items[0].productName + ' ' + items[0].orderDetailQuantity + '개' : items[0].productName + ' 외 ' + (items.length - 1) + '개 품목';

        const payRes = await PortOne.requestPayment({
          //storeId: Constants.PORTONE_STOREID,
          storeId: storeId,
          // 채널 키 설정
          channelKey: channelKey,
          paymentId: `order-${orderIdx}-${Date.now()}` + crypto.randomUUID(),
          orderName: orderName,
          totalAmount: orderTotal,
          currency: "CURRENCY_KRW",
          payMethod: paymentMethod
        });

        if (payRes.code) {
          // SDK-level error
          toast.error(payRes.message)
          return
        }
        // 결제 검증
        if (payRes.txId) {
          const res = await axios.post(
            `/api/order/verify/${orderIdx}`,
            { paymentId: payRes.paymentId, couponIdx: couponIdx },
            { baseURL: config.public.apiBaseUrl }
          );

          if (res.data && res.data.data) {
            // 결제 성공
            router.push(`/order/${orderIdx}`);
            toast.success("주문이 완료되었습니다.");
            await clear_cart_without_asking();
          }
        }
      }
    } catch (err) {
      console.error('주문 실패', err);
      alert('주문 생성에 실패했습니다.');
    }
  }

  // 초기 주문 수량 (1로 설정)
  function initialOrderQuantity() {
    orderQuantity.value = 1;
    return orderQuantity.value;
  }

  // totalPriceQuantity 계산
  const totalPriceQuantity = computed(() => {
    return cart_products.value.reduce(
      (acc, cartItem) => {
        let unitPrice = 0;
        // 할인 가격이 있는 경우
        if (cartItem.product.discount && cartItem.product.discount > 0) {
          unitPrice = cartItem.product.price - (cartItem.product.price * Number(cartItem.product.discount)) / 100;
        }
        else {
          unitPrice = cartItem.product.price;
        }
        const qty = cartItem.cartItemQuantity || 0;

        acc.quantity += qty;
        acc.total += unitPrice * qty;
        return acc;
      },
      { total: 0, quantity: 0 }
    );
  });

  // handle cartOffcanvas
  function handleCartOffcanvas() {
    cartOffcanvas.value = !cartOffcanvas.value;
  }

  onMounted(async () => {
    await fetchCartProducts();
  });

  // 라우터 변경 시 주문 수량 초기화
  watch(() => route.path, () => {
    orderQuantity.value = 1;
  });

  return {
    addCartProduct,
    cart_products,
    quantityDecrement,
    quantityIncrement,
    removeCartProduct,
    clear_cart,
    order,
    fetchCartProducts,
    initialOrderQuantity,
    totalPriceQuantity,
    handleCartOffcanvas,
    cartOffcanvas,
    orderQuantity,
    shipCost,
  };
});
