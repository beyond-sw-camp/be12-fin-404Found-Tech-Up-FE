<template>
  <section class="tp-cart-area pb-120">
    <div :class="`${full_width ? 'container-fluid' : shop_1600 ? 'container-shop' : 'container'}`">
      <div class="row">
        <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
          <h3>No Cart Items Found</h3>
          <nuxt-link href="/shop" class="tp-cart-checkout-btn mt-20">Continue Shipping</nuxt-link>
        </div>
        <div v-else class="row">
          <div class="col-xl-9 col-lg-8">
            <div class="tp-cart-list mb-25 mr-30">
              <table>
                <thead>
                  <tr>
                    <th colspan="2" class="tp-cart-header-product">제품명</th>
                    <th class="tp-cart-header-price">금액</th>
                    <th class="tp-cart-header-quantity">수량</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <!-- cart item start -->
                  <cart-item v-for="item in cartStore.cart_products" :key="item.id" :item="item" />
                  <!-- cart item end -->
                </tbody>
              </table>
            </div>
            <div class="tp-cart-bottom mr-30">
              <div class="row align-items-end">
                <div class="col-xl-6 col-md-8">
                  <div class="tp-cart-coupon">
                    <form @submit.prevent="handleCouponSubmit">
                      <div class="tp-cart-coupon-input-box">
                        <label>Coupon Code:</label>
                        <div class="tp-cart-coupon-input d-flex align-items-center">
                          <input type="text" placeholder="Enter Coupon Code" v-model="couponCode">
                          <button type="submit">Apply</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="col-xl-6 col-md-4">
                  <div class="tp-cart-update text-md-end">
                    <button @click="cartStore.clear_cart()" type="button" class="tp-cart-update-btn">Clear Cart</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-lg-4 col-md-6">
            <div class="tp-cart-checkout-wrapper">

              <div class="tp-cart-checkout-top d-flex align-items-center justify-content-between">
                <span class="tp-cart-checkout-top-title">주문 내역</span>
              </div>

              <div class="tp-order-info-list mb-30">
                <ul>
                  <!-- header -->
                  <li class="tp-order-info-list-header d-flex justify-content-between">
                    <h4>상품명</h4>
                    <h4>총합</h4>
                  </li>
                  <!-- items -->
                  <li v-for="item in cartStore.cart_products" :key="item.productIdx"
                    class="tp-order-info-list-desc d-flex justify-content-between">
                    <p>{{ item.product.name }} <span>× {{ item.cartItemQuantity }}</span></p>
                    <span>{{ formatPrice(
                      (item.product.discount > 0
                        ? item.product.price * (1 - item.product.discount / 100)
                        : item.product.price
                      ) * item.cartItemQuantity
                    ) }}</span>
                  </li>
                  <!-- subtotal -->
                  <li class="tp-order-info-list-subtotal d-flex justify-content-between">
                    <span>소계</span>
                    <span>{{ formatPrice(cartStore.totalPriceQuantity.total) }}</span>
                  </li>
                </ul>
              </div>

              <div class="tp-cart-checkout-total d-flex align-items-center justify-content-between">
                <span>총액</span>
                <span>{{ formatPrice(cartStore.totalPriceQuantity.total) }}</span>
              </div>
              <div class="tp-cart-checkout-proceed">
                <nuxt-link href="/checkout" class="tp-cart-checkout-btn w-100">구매하기</nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useCartStore } from "@/pinia/useCartStore";
import { formatPrice } from "@/utils/index";

const cartStore = useCartStore();
let couponCode = ref('');

const handleCouponSubmit = () => {
  console.log(couponCode.value);
}

onMounted(() => {
  cartStore.fetchCartProducts();
});
</script>
