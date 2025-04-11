<template>
  <section class="tp-blog-area pt-50 pb-75">
    <div class="container">
      <div class="row align-items-end">
        <!-- 타이틀 -->
        <div class="col-xl-4 col-md-6">
          <div class="tp-section-title-wrapper mb-50">
            <h3 class="tp-section-title">
              커뮤니티 주요 글 소개
              <SvgSectionLine />
            </h3>
          </div>
        </div>

        <!-- 전체 보기 버튼 -->
        <div class="col-xl-8 col-md-6">
          <div class="tp-blog-more-wrapper d-flex justify-content-md-end">
            <div class="tp-blog-more mb-50 text-md-end">
              <nuxt-link href="/community" class="tp-btn tp-btn-2 tp-btn-blue">
                전체 글 보기
                <SvgRightArrow />
              </nuxt-link>
              <span class="tp-blog-more-border"></span>
            </div>
          </div>
        </div>
      </div>

      <!-- 슬라이더 콘텐츠 -->
      <div class="row">
        <div class="col-xl-12">
          <div class="tp-blog-main-slider">
            <Swiper
              :slidesPerView="3"
              :spaceBetween="20"
              :autoplay="{ delay: 4000 }"
              :navigation="{
                nextEl: '.tp-blog-main-slider-button-next',
                prevEl: '.tp-blog-main-slider-button-prev',
              }"
              :pagination="{
                el: '.tp-blog-main-slider-dot',
                clickable: true,
              }"
              :breakpoints="{
                '1200': { slidesPerView: 3 },
                '992': { slidesPerView: 2 },
                '768': { slidesPerView: 2 },
                '576': { slidesPerView: 1 },
                '0': { slidesPerView: 1 },
              }"
              :modules="[Navigation, Pagination, Autoplay]"
              class="tp-blog-main-slider-active swiper-container"
            >
              <SwiperSlide
                v-for="(item, i) in communityItems"
                :key="i"
                class="tp-blog-item mb-30"
              >
                <div class="tp-blog-thumb p-relative fix">
                  <nuxt-link :href="`/community-details/${item.id}`">
                    <img :src="item.img" alt="community-img" />
                  </nuxt-link>
                  <div class="tp-blog-meta tp-blog-meta-date">
                    <span>{{ item.date }}</span>
                  </div>
                </div>

                <div class="tp-blog-content">
                  <h3 class="tp-blog-title">
                    <nuxt-link :href="`/community-details/${item.id}`">
                      {{ item.title }}
                    </nuxt-link>
                  </h3>
                  <div class="tp-blog-tag">
                    <span><i class="fa-light fa-tag"></i></span>
                    <a href="#">{{ item.tags?.[0] }}</a><a href="#">{{ item.tags?.[1] }}</a>
                  </div>
                  <p>{{ item.sm_desc }}</p>
                  <div class="tp-blog-btn">
                    <nuxt-link :href="`/community-details/${item.id}`" class="tp-btn-2 tp-btn-border-2">
                      자세히 보기
                      <span><SvgRightArrow /></span>
                    </nuxt-link>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import communityData from '@/data/community-data';
import { ref } from 'vue';

const communityItems = ref(communityData.filter(b => b.blog === 'community-highlight'));
</script>
