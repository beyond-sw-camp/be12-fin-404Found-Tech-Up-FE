<template>
  <div class="tp-product-banner-area pb-90">
    <div class="container">
      <div class="tp-product-banner-slider fix">
        <Swiper :slidesPerView="1" :spaceBetween="0" :effect="'fade'" :pagination="{
          el: '.tp-product-banner-slider-dot',
          clickable: true,
        }" :modules="[EffectFade, Pagination]" class="tp-product-banner-slider-active swiper-container">
          <SwiperSlide v-for="(item, i) in bannerProducts" :key="i"
            class="tp-product-banner-inner theme-bg p-relative z-index-1 fix">
            <h4 class="tp-product-banner-bg-text">{{ item.banner_bg_txt }}</h4>
            <div class="row align-items-center">
              <div class="col-xl-6 col-lg-6">
                <div class="tp-product-banner-content p-relative z-index-1">
                  <span class="tp-product-banner-subtitle">
                    {{ item.subtitle }}
                  </span>
                  <h3 class="tp-product-banner-title">
                    {{ item.title }}
                  </h3>
                  <div class="tp-product-banner-price mb-40">
                    <span class="old-price">{{ formatPrice(item.oldPrice, false) }}</span>
                    <p class="new-price">{{ formatPrice(item.newPrice, false) }}</p>
                  </div>
                  <div class="tp-product-banner-btn">
                    <nuxt-link href="/shop" class="tp-btn tp-btn-2">Shop now</nuxt-link>
                  </div>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6">
                <div class="tp-product-banner-thumb-wrapper p-relative">
                  <div class="tp-product-banner-thumb-shape">
                    <span class="tp-product-banner-thumb-gradient"></span>
                    <img class="tp-offer-shape" src="/img/banner/banner-slider-offer.png" alt="offer-shape" />
                  </div>
                  <div class="tp-product-banner-thumb text-end p-relative z-index-1">
                    <img :src="item.img" alt="slider-img" />
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <div class="tp-product-banner-slider-dot tp-swiper-dot"></div>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { EffectFade, Pagination } from "swiper/modules";

// bannerProducts 데이터 (JavaScript 버전)
const bannerProducts = [
  {
    id: 1,
    banner_bg_txt: "tablet",
    subtitle: "Tablet Collection 2023",
    title: "Galaxy Tab S6 Lite Android Tablet",
    oldPrice: 320,
    newPrice: 288,
    img: "/img/banner/banner-slider-1.png",
  },
  {
    id: 2,
    banner_bg_txt: "tablet",
    subtitle: "Tablet Collection 2023",
    title: "Galaxy Tab S6 Lite Android Tablet",
    oldPrice: 320,
    newPrice: 288,
    img: "/img/banner/banner-slider-2.png",
  },
  {
    id: 3,
    banner_bg_txt: "tablet",
    subtitle: "Tablet Collection 2023",
    title: "Galaxy Tab S6 Lite Android Tablet",
    oldPrice: 320,
    newPrice: 288,
    img: "/img/banner/banner-slider-3.png",
  },
];

// 가격 포맷 함수 (withCurrency가 false일 경우 단순 소수점 두자리 형식)

function formatPrice(price, withCurrency = true) {
  const formatted = Number(price).toLocaleString('ko-KR', {
    maximumFractionDigits: 0
  });
  return withCurrency ? `${formatted}원` : formatted;
}

</script>
