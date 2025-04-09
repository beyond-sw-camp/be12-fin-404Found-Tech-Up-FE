<template>
    <div class="tp-sidebar-wrapper tp-sidebar-ml--24">
      <!-- 검색 -->
      <div class="tp-sidebar-widget mb-35">
        <div class="tp-sidebar-search">
          <form action="#">
            <div class="tp-sidebar-search-input">
              <input type="text" placeholder="검색어를 입력하세요">
              <button type="submit">
                <svg-search />
              </button>
            </div>
          </form>
        </div>
      </div>
  
      <!-- 소개 -->
      <div class="tp-sidebar-widget mb-35">
        <h3 class="tp-sidebar-widget-title">작성자 소개</h3>
        <div class="tp-sidebar-widget-content">
          <div class="tp-sidebar-about">
            <div class="tp-sidebar-about-thumb mb-25">
              <a href="#">
                <img src="/img/users/user-11.jpg" alt="작성자 이미지">
              </a>
            </div>
            <div class="tp-sidebar-about-content">
              <h3 class="tp-sidebar-about-title">
                <a href="#">Ravi O'Leigh</a>
              </h3>
              <span class="tp-sidebar-about-designation">사진가 & 블로거</span>
              <p>협업과 성장, 그리고 기록을 사랑하는 창작자입니다.</p>
              <div class="tp-sidebar-about-signature">
                <img src="/img/blog/signature/signature.png" alt="서명 이미지">
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 최신 글 -->
      <div class="tp-sidebar-widget mb-35">
        <h3 class="tp-sidebar-widget-title">최신 게시글</h3>
        <div class="tp-sidebar-widget-content">
          <div class="tp-sidebar-blog-item-wrapper">
            <div
              v-for="item in recent_post"
              :key="item.id"
              class="tp-sidebar-blog-item d-flex align-items-center"
            >
              <div class="tp-sidebar-blog-thumb">
                <nuxt-link :href="`/community-details/${item.id}`">
                  <img :src="item.img" alt="community-img">
                </nuxt-link>
              </div>
              <div class="tp-sidebar-blog-content">
                <div class="tp-sidebar-blog-meta">
                  <span>{{ item.date }}</span>
                </div>
                <h3 class="tp-sidebar-blog-title">
                  <nuxt-link :href="`/community-details/${item.id}`">
                    {{ item.title }}
                  </nuxt-link>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- 카테고리 -->
      <div class="tp-sidebar-widget widget_categories mb-35">
        <h3 class="tp-sidebar-widget-title">카테고리</h3>
        <div class="tp-sidebar-widget-content">
          <ul>
            <li><nuxt-link href="/community">디자인 <span>(12)</span></nuxt-link></li>
            <li><nuxt-link href="/community">브랜드 사례 <span>(6)</span></nuxt-link></li>
            <li><nuxt-link href="/community">웹 개발 <span>(2)</span></nuxt-link></li>
            <li><nuxt-link href="/community">UX 전략 <span>(8)</span></nuxt-link></li>
            <li><nuxt-link href="/community">서브컬처 <span>(0)</span></nuxt-link></li>
            <li><nuxt-link href="/community">커뮤니티 후기 <span>(3)</span></nuxt-link></li>
          </ul>
        </div>
      </div>
  
      <!-- 태그 -->
      <div class="tp-sidebar-widget mb-35">
        <h3 class="tp-sidebar-widget-title">인기 태그</h3>
        <div class="tp-sidebar-widget-content tagcloud">
          <a href="#">여름</a>
          <a href="#">빈티지</a>
          <a href="#">코디</a>
          <a href="#">디자인팁</a>
          <a href="#">라이프스타일</a>
          <a href="#">창작</a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import communityData from '@/data/community-data';
  const recent_post = communityData.slice(0, 3);
  </script>
  