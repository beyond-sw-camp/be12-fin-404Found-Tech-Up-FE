<template>
    <section class="tp-compare-area pb-120">
      <div class="container">
        <!-- 비교 항목이 없을 때 -->
        <div v-if="compareStore.compare_items.length === 0" class="text-center pt-50">
          <h3>비교할 상품이 없습니다</h3>
          <nuxt-link href="/shop" class="tp-cart-checkout-btn mt-20">쇼핑 계속하기</nuxt-link>
        </div>
  
        <!-- 비교 항목이 있을 때 -->
        <div v-else class="row">
          <div class="col-xl-12">
            <div class="tp-compare-table table-responsive text-center">
              <table class="table">
                <tbody>
                  <!-- 상품 정보 -->
                  <tr>
                    <th>상품</th>
                    <td v-for="item in compareStore.compare_items" :key="item.idx">
                      <div class="tp-compare-thumb">
                        <img :src="item.img" alt="product" />
                        <h4 class="tp-compare-product-title">
                          <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
                        </h4>
                      </div>
                    </td>
                  </tr>
  
                  <!-- 설명 -->
                  <tr>
                    <th>상품 설명</th>
                    <td v-for="item in compareStore.compare_items" :key="item.idx">
                      <div class="tp-compare-desc">
                        <p>{{ item.description.substring(0, 150) }}</p>
                      </div>
                    </td>
                  </tr>
  
                  <!-- 가격 -->
                  <tr>
                    <th>가격</th>
                    <td v-for="item in compareStore.compare_items" :key="item.idx">
                      <div class="tp-compare-price" v-if="item.discount > 0">
                        <span class="old-price">{{ formatPrice(item.price, false) }}</span>
                        <span>
                          {{ formatPrice((Number(item.price) - (Number(item.price) * Number(item.discount)) / 100)) }}
                        </span>
                      </div>
                      <div class="tp-compare-price" v-else>
                        <span>{{ formatPrice(item.price) }}</span>
                      </div>
                    </td>
                  </tr>
  
                  <!-- 장바구니 담기 -->
                  <tr>
                    <th>장바구니</th>
                    <td v-for="item in compareStore.compare_items" :key="item.idx">
                      <div class="tp-compare-add-to-cart">
                        <button @click="cartStore.addCartProduct(item)" type="button" class="tp-btn">장바구니 담기</button>
                      </div>
                    </td>
                  </tr>
  
                  <!-- 평점 -->
                  <tr>
                    <th>평점</th>
                    <td v-for="item in compareStore.compare_items" :key="item.idx">
                      <div class="tp-compare-rating">
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                        <span><i class="fas fa-star"></i></span>
                      </div>
                    </td>
                  </tr>
  
                  <!-- 제거 -->
                  <tr>
                    <th>삭제</th>
                    <td v-for="item in compareStore.compare_items" :key="item.idx">
                      <div class="tp-compare-remove">
                        <button @click="compareStore.removeCompare(item)">
                          <i class="fal fa-trash-alt"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { useCompareStore } from '@/pinia/useCompareStore';
  import { useCartStore } from '@/pinia/useCartStore';
  
  const compareStore = useCompareStore();
  const cartStore = useCartStore();
  </script>
  