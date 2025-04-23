<template>
  <section class="tp-slider-area p-relative z-index-1">
    <Swiper :slidesPerView="1" :spaceBetween="30" :loop="false" :navigation="{
      nextEl: '.tp-slider-button-next',
      prevEl: '.tp-slider-button-prev',
    }" :pagination="{
        el: '.tp-slider-dot',
        clickable: true,
      }" :effect="'fade'" :modules="[Navigation, Pagination, EffectFade]"
      :onSlideChange="(swiper) => handleActiveIndex(swiper.activeIndex)"
      :class="`tp-slider-active tp-slider-variation swiper-container ${isActive ? 'is-light' : ''}`">
      <SwiperSlide v-for="(item, i) in sliderData" :key="i"
        :class="`tp-slider-item tp-slider-height d-flex align-items-center ${item?.green_bg ? 'green-dark-bg' : item?.is_light ? 'is-light' : ''}`"
        :style="item.is_light && `background-color:#E3EDF6`">
        <div class="tp-slider-shape">
          <img class="tp-slider-shape-1" src="/img/slider/shape/slider-shape-1.png" alt="slider-shape" />
          <img class="tp-slider-shape-2" src="/img/slider/shape/slider-shape-2.png" alt="slider-shape" />
          <img class="tp-slider-shape-3" src="/img/slider/shape/slider-shape-3.png" alt="slider-shape" />
          <img class="tp-slider-shape-4" src="/img/slider/shape/slider-shape-4.png" alt="slider-shape" />
        </div>
        <div class="container">
          <div class="row align-items-center">
            <div class="col-xl-5 col-lg-6 col-md-6">
              <div class="tp-slider-content p-relative z-index-1">
                <span>{{ item.pre_title.text }} <b>{{ formatPrice(item.pre_title.price) }}</b></span>
                <h3 class="tp-slider-title">{{ item.title }}</h3>
                <p>
                  {{ item.subtitle.text_1 }}
                  <span>-{{ item.subtitle.percent }}%
                    <SvgOfferLine />
                  </span>
                  {{ item.subtitle.text_2 }}
                </p>
                <div class="tp-slider-btn">
                  <nuxt-link href="/shop" class="tp-btn tp-btn-2 tp-btn-white">
                    Shop Now
                    <SvgRightArrow />
                  </nuxt-link>
                </div>
              </div>
            </div>
            <div class="col-xl-7 col-lg-6 col-md-6">
              <div class="tp-slider-thumb text-end">
                <img :src="item.img" alt="slider-img" />
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>
      <div class="tp-slider-arrow tp-swiper-arrow d-none d-lg-block">
        <button type="button" class="tp-slider-button-prev">
          <SvgPrevArrow />
        </button>
        <button type="button" class="tp-slider-button-next">
          <SvgNextArrow />
        </button>
      </div>
      <div class="tp-slider-dot tp-swiper-dot"></div>
    </Swiper>
  </section>
</template>

<script>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import SvgOfferLine from '@/components/svg/offer-line.vue'
import SvgRightArrow from '@/components/svg/right-arrow.vue'
import SvgPrevArrow from '@/components/svg/prev-arrow.vue'
import SvgNextArrow from '@/components/svg/next-arrow.vue'

// slider data
const sliderData = [
  {
    id: 1,
    pre_title: { text: "Starting at", price: 274 },
    title: "The best tablet Collection 2023",
    subtitle: {
      text_1: "Exclusive offer ",
      percent: 35,
      text_2: "off this week",
    },
    img: "/img/slider/slider-img-1.png",
    green_bg: true,
  },
  {
    id: 2,
    pre_title: { text: "Starting at", price: 999 },
    title: "The best note book collection 2023",
    subtitle: {
      text_1: "Exclusive offer ",
      percent: 10,
      text_2: "off this week",
    },
    img: "/img/slider/slider-img-2.png",
    green_bg: true,
  },
  {
    id: 3,
    pre_title: { text: "Starting at", price: 999 },
    title: "The best note book collection 2023",
    subtitle: {
      text_1: "Exclusive offer ",
      percent: 10,
      text_2: "off this week",
    },
    img: "/img/slider/slider-img-3.png",
    is_light: true,
  },
];

const isActive = ref(false);
const handleActiveIndex = (index) => {
  isActive.value = index === 2;
};

const formatPrice = (price) => {
  return `${price}원`;
};

export default {
  name: "HeroBannerOne",
  components: {
    Swiper,
    SwiperSlide,
    SvgOfferLine,
    SvgRightArrow,
    SvgPrevArrow,
    SvgNextArrow,
  },
  setup() {
    return {
      sliderData,
      isActive,
      handleActiveIndex,
      formatPrice,
      Navigation,
      Pagination,
      EffectFade,
    };
  },
};
</script>
