<template>
  <footer>
    <div
      :class="`tp-footer-area ${primary_style ? 'tp-footer-style-2 tp-footer-style-primary tp-footer-style-6' : ''} ${style_2 ? 'tp-footer-style-2' : style_3 ? 'tp-footer-style-2 tp-footer-style-3' : ''}`"
      :data-bg-color="`${style_2 ? 'footer-bg-white' : style_3 ? 'footer-bg-white' : 'footer-bg-grey'}`">
      <div class="tp-footer-top pt-95 pb-40">
        <div class="container">
          <div class="row">
            <div class="col-xl-4 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-1 mb-50">
                <div class="tp-footer-widget-content">
                  <div class="tp-footer-logo">
                    <nuxt-link href="/">
                      <img src="/img/logo/logo.svg" alt="logo">
                    </nuxt-link>
                  </div>
                  <p class="tp-footer-desc">최고의 선택을 도와줍니다
                  </p>
                  <div class="tp-footer-social">
                    <!-- social links -->
                    <footer-social-links />
                    <!-- social links -->
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-2 mb-50">
                <h4 class="tp-footer-widget-title">사용자</h4>
                <div class="tp-footer-widget-content">
                  <ul>
                    <li><nuxt-link href="/profile">내 프로파일</nuxt-link></li>
                    <li><nuxt-link href="/cart">장바구니</nuxt-link></li>
                    <li><nuxt-link href="/wishlist">위시리스트</nuxt-link></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-3 mb-50">
                <h4 class="tp-footer-widget-title">정보</h4>
                <div class="tp-footer-widget-content">
                  <ul>
                    <li><nuxt-link href="/about">소개</nuxt-link></li>
                    <li><nuxt-link href="/privacy">개인정보처리방침</nuxt-link></li>
                    <li><nuxt-link href="/community">커뮤니티</nuxt-link></li>
                    <!-- <li><a href="#">약관 </a></li> -->
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-4 col-sm-6">
              <div class="tp-footer-widget footer-col-4 mb-50">
                <h4 class="tp-footer-widget-title">문의</h4>
                <div class="tp-footer-widget-content">
                  <div class="tp-footer-talk mb-20">
                    <span>전화번호</span>
                    <h4><a href="tel:670-413-90-762">(+82) 010-1234-1234</a></h4>
                  </div>
                  <!-- footer contact start -->
                  <footer-contact />
                  <!-- footer contact end -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- bottom area start -->
      <footer-bottom-area />
      <!-- bottom area end -->
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ primary_style?: boolean; style_2?: boolean; style_3?: boolean; }>();
</script>
