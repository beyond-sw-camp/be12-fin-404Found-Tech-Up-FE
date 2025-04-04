<template>
    <section class="tp-checkout-area pb-120" style="background-color: #EFF1F5;">
      <div class="container">
        <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
          <h3 class="py-2">장바구니에 담긴 상품이 없습니다</h3>
          <nuxt-link href="/shop" class="tp-checkout-btn">
            쇼핑 계속하기
          </nuxt-link>
        </div>
        <div v-else class="row">
          <div class="col-xl-7 col-lg-7">
            <!-- 체크아웃 확인 영역 -->
            <checkout-verify />
          </div>
  
          <!-- 결제 정보 입력 폼 -->
          <form>
            <div class="row">
              <div class="col-lg-7">
                <div class="tp-checkout-bill-area">
                  <h3 class="tp-checkout-bill-title">결제자 정보</h3>
                  <checkout-billing />
                </div>
              </div>
              <div class="col-lg-5">
                <!-- 주문 요약 및 결제 -->
                <checkout-order />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useCartStore } from '@/pinia/useCartStore'
  
  const cartStore = useCartStore()
  </script>
  