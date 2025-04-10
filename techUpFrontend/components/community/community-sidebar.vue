<template>
  <div class="community-sidebar-wrapper community-sidebar-ml--24">
    <!-- 검색 -->
    <div class="community-sidebar-widget mb-35">
      <div class="community-sidebar-search">
        <form action="#">
          <div class="community-sidebar-search-input">
            <input type="text" placeholder="검색어를 입력하세요" />
            <button type="submit">
              <svg-search />
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 최신 게시물 (썸네일 제거) -->
    <div class="community-sidebar-widget mb-35">
      <h3 class="community-sidebar-widget-title">최신 게시물</h3>
      <div class="community-sidebar-widget-content">
        <div class="community-sidebar-blog-item-wrapper">
          <div
            v-for="item in recent_post"
            :key="item.id"
            class="community-sidebar-blog-item d-flex flex-column"
          >
            <div class="community-sidebar-blog-meta">
              <span>{{ item.date }}</span>
            </div>
            <h3 class="community-sidebar-blog-title">
              <nuxt-link :to="`/community-details/${item.id}`">
                {{ item.title }}
              </nuxt-link>
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- 카테고리 (PC 부품 업그레이드 관련) -->
    <div class="community-sidebar-widget widget_categories mb-35">
      <h3 class="community-sidebar-widget-title">카테고리</h3>
      <div class="community-sidebar-widget-content">
        <ul>
          <li>
            <nuxt-link to="/community">
              CPU <span>(15)</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/community">
              GPU <span>(10)</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/community">
              RAM <span>(8)</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/community">
              스토리지 <span>(12)</span>
            </nuxt-link>
          </li>
          <li>
            <nuxt-link to="/community">
              파워/케이스 <span>(5)</span>
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- 인기 태그 (PC 부품 업그레이드 관련) -->
    <div class="community-sidebar-widget mb-35">
      <h3 class="community-sidebar-widget-title">인기 태그</h3>
      <div class="community-sidebar-widget-content tagcloud">
        <a href="#">오버클럭</a>
        <a href="#">업그레이드</a>
        <a href="#">벤치마크</a>
        <a href="#">DIY</a>
        <a href="#">PC빌드</a>
        <a href="#">튜닝</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import communityData from '@/data/community-data';

// 최신 게시물: 최신순 상위 3개 항목 (필요에 따라 조정)
const recent_post = communityData.slice(0, 3);
</script>

<style scoped>
/* 커뮤니티 사이드바 래퍼 */
.community-sidebar-wrapper {
  margin-left: 24px;
}

/* 공통 위젯 스타일 */
.community-sidebar-widget {
  margin-bottom: 35px;
}

/* 검색 영역 */
.community-sidebar-search-input {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  overflow: hidden;
}
.community-sidebar-search-input input {
  flex: 1;
  padding: 8px 12px;
  border: none;
  outline: none;
}
.community-sidebar-search-input button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.3s;
}
.community-sidebar-search-input button:hover {
  background-color: #0056b3;
}

/* 위젯 제목 */
.community-sidebar-widget-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
}

/* 최신 게시물 영역 (썸네일 제거) */
.community-sidebar-blog-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.community-sidebar-blog-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.community-sidebar-blog-meta {
  font-size: 0.8rem;
  color: #777;
}
.community-sidebar-blog-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
}
.community-sidebar-blog-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}
.community-sidebar-blog-title a:hover {
  color: #000;
}

/* 카테고리 */
.community-sidebar-widget-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.community-sidebar-widget-content ul li {
  margin-bottom: 10px;
}
.community-sidebar-widget-content ul li a {
  color: #007bff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s;
}
.community-sidebar-widget-content ul li a:hover {
  color: #0056b3;
}

/* 인기 태그 */
.tagcloud a {
  display: inline-block;
  padding: 5px 10px;
  margin: 3px;
  background-color: #f1f1f1;
  color: #555;
  border-radius: 3px;
  font-size: 0.85rem;
  text-decoration: none;
  transition: background-color 0.3s, color 0.3s;
}
.tagcloud a:hover {
  background-color: #007bff;
  color: #fff;
}
</style>
