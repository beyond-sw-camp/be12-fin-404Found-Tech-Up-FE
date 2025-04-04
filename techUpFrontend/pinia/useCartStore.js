
import { ref, onMounted, computed, watch } from "vue";
import { defineStore } from "pinia";
import { toast } from "vue3-toastify";

export const useCartStore = defineStore("cart_product", () => {
  const route = useRoute(); // Nuxt의 useRoute는 auto-import 되거나, 필요 시 import 구문 추가
  let cart_products = ref([]);
  let orderQuantity = ref(1);
  let cartOffcanvas = ref(false);

  // add_cart_product
  const addCartProduct = (payload) => {
    const isExist = cart_products.value.some((i) => i.id === payload.id);
    if (payload.status === "out-of-stock") {
      toast.error(`Out of stock ${payload.title}`);
    } else if (!isExist) {
      const newItem = {
        ...payload,
        orderQuantity: 1,
      };
      cart_products.value.push(newItem);
      toast.success(`${payload.title} added to cart`);
    } else {
      cart_products.value.map((item) => {
        if (item.id === payload.id) {
          if (typeof item.orderQuantity !== "undefined") {
            if (item.quantity >= item.orderQuantity + orderQuantity.value) {
              item.orderQuantity =
                orderQuantity.value !== 1
                  ? orderQuantity.value + item.orderQuantity
                  : item.orderQuantity + 1;
              toast.success(`${orderQuantity.value} ${item.title} added to cart`);
            } else {
              toast.error(`No more quantity available for this product!`);
              orderQuantity.value = 1;
            }
          }
        }
        return { ...item };
      });
    }
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  // quantity increment
  const increment = () => {
    orderQuantity.value = orderQuantity.value + 1;
    return orderQuantity.value;
  };

  // quantity decrement
  const decrement = () => {
    orderQuantity.value = orderQuantity.value > 1 ? orderQuantity.value - 1 : 1;
    return orderQuantity.value;
  };

  // quantityDecrement
  const quantityDecrement = (payload) => {
    cart_products.value.map((item) => {
      if (item.id === payload.id) {
        if (typeof item.orderQuantity !== "undefined") {
          if (item.orderQuantity > 1) {
            item.orderQuantity = item.orderQuantity - 1;
            toast.info(`Decrement Quantity For ${item.title}`);
          }
        }
      }
      return { ...item };
    });
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  // remove_cart_products
  const removeCartProduct = (payload) => {
    cart_products.value = cart_products.value.filter((p) => p.id !== payload.id);
    toast.error(`${payload.title} remove to cart`);
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  // cart product initialize
  const initializeCartProducts = () => {
    const cartData = localStorage.getItem("cart_products");
    if (cartData) {
      cart_products.value = JSON.parse(cartData);
    }
  };

  // clear cart
  const clear_cart = () => {
    const confirmMsg = window.confirm("Are you sure deleted your all cart items ?");
    if (confirmMsg) {
      cart_products.value = [];
    }
    localStorage.setItem("cart_products", JSON.stringify(cart_products.value));
  };

  // initialOrderQuantity
  const initialOrderQuantity = () => {
    orderQuantity.value = 1;
    return orderQuantity.value;
  };

  // totalPriceQuantity
  const totalPriceQuantity = computed(() => {
    return cart_products.value.reduce(
      (cartTotal, cartItem) => {
        const { price, orderQuantity } = cartItem;
        if (typeof orderQuantity !== "undefined") {
          const itemTotal = price * orderQuantity;
          cartTotal.quantity += orderQuantity;
          cartTotal.total += itemTotal;
        }
        return cartTotal;
      },
      { total: 0, quantity: 0 }
    );
  });

  // handle cartOffcanvas
  const handleCartOffcanvas = () => {
    cartOffcanvas.value = !cartOffcanvas.value;
  };

  // set local storage product when project is mounted
  onMounted(() => {
    initializeCartProducts();
  });

  // when router changes then order quantity will be 1
  watch(() => route.path, () => {
    orderQuantity.value = 1;
  });
  return {
    addCartProduct,
    cart_products,
    quantityDecrement,
    removeCartProduct,
    clear_cart,
    initialOrderQuantity,
    totalPriceQuantity,
    handleCartOffcanvas,
    cartOffcanvas,
    orderQuantity,
    increment,
    decrement,
  };
});
