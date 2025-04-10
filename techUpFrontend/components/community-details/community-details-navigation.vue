<template>
    <div
      class="tp-postbox-details-navigation d-none d-md-flex justify-content-between align-items-center"
    >
      <div class="tp-postbox-details-navigation-item d-flex align-items-center">
        <div class="tp-postbox-details-navigation-icon mr-15">
          <span>
            <nuxt-link href="/community-details">
              <svg-prev-nav />
            </nuxt-link>
          </span>
        </div>
        <div class="tp-postbox-details-navigation-content">
          <span>이전 글</span>
          <h3 class="tp-postbox-details-navigation-title">
            <nuxt-link href="/community-details">
              적절한 타이밍에 팀원 채용하기
            </nuxt-link>
          </h3>
        </div>
      </div>
      <div
        class="tp-postbox-details-navigation-item d-flex align-items-center text-end"
      >
        <div class="tp-postbox-details-navigation-content">
          <span>다음 글</span>
          <h3 class="tp-postbox-details-navigation-title">
            <nuxt-link href="/community-details">
              다시 돌아온 90년대 감성 완벽하게 즐기기
            </nuxt-link>
          </h3>
        </div>
        <div class="tp-postbox-details-navigation-icon ml-15">
          <span>
            <nuxt-link href="/community-details">
              <svg-next-nav />
            </nuxt-link>
          </span>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  </script>
  