<template>
    <!-- 브레드크럼 영역 시작 -->
    <section class="breadcrumb__area include-bg text-center pt-95 pb-50">
      <div class="container">
        <div class="row">
          <div class="col-xxl-12">
            <div class="breadcrumb__content p-relative z-index-1">
              <h3 class="breadcrumb__title">문의하기</h3>
              <div class="breadcrumb__list">
                <span><nuxt-link href="/">홈</nuxt-link></span>
                <span>문의</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 브레드크럼 영역 끝 -->
  
    <!-- 연락처 영역 시작 -->
    <section class="tp-contact-area pb-100">
      <div class="container">
        <div class="tp-contact-inner">
          <div class="row">
            <div class="col-xl-9 col-lg-8">
              <div class="tp-contact-wrapper">
                <h3 class="tp-contact-title">메시지 보내기</h3>
  
                <div class="tp-contact-form">
                  <!-- 폼 시작 -->
                  <forms-contact-form />
                  <!-- 폼 끝 -->
                  <p class="ajax-response"></p>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-4">
              <div class="tp-contact-info-wrapper">
                <!-- 연락처 정보 1 -->
                <div class="tp-contact-info-item">
                  <div class="tp-contact-info-icon">
                    <span>
                      <img src="/img/contact/contact-icon-1.png" alt="이메일 아이콘" />
                    </span>
                  </div>
                  <div class="tp-contact-info-content">
                    <p data-info="mail">
                      <a href="mailto:techup@gmail.com">techup@gmail.com</a>
                    </p>
                    <p data-info="phone">
                      <a href="tel:02-0000-0000">02-0000-0000</a>
                    </p>
                  </div>
                </div>
  
                <!-- 연락처 정보 2 -->
                <div class="tp-contact-info-item">
                  <div class="tp-contact-info-icon">
                    <span>
                      <img src="/img/contact/contact-icon-2.png" alt="위치 아이콘" />
                    </span>
                  </div>
                  <div class="tp-contact-info-content">
                    <p>
                      <a
                        href="https://www.google.com/maps/place/New+York,+NY,+USA/@40.6976637,-74.1197638,11z/data=!3m1!4b1!4m6!3m5!1s0x89c24fa5d33f083b:0xc80b8f06e177fe62!8m2!3d40.7127753!4d-74.0059728!16zL20vMDJfMjg2"
                        target="_blank"
                      >
                        보라매로 87 <br />
                        서울특별시 동작구
                      </a>
                    </p>
                  </div>
                </div>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 연락처 영역 끝 -->
  
    <!-- 지도 영역 시작 -->
    <section class="tp-map-area pb-120">
      <div class="container">
        <div class="row">
          <div class="col-xl-12">
            <div class="tp-map-wrapper">
              <div class="tp-map-hotspot">
                <span class="tp-hotspot tp-pulse-border">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#821F40" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 지도 영역 끝 -->
  </template>
  
  <script setup>
  // 스크립트가 비어있습니다. 추후 동작 추가 시 여기에 작성하세요.
  </script>
  