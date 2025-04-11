<template>
  <section class="community-blog-area pt-110 pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xl-12">
          <div class="community-section-title-wrapper mb-50 text-center">
            <span class="community-section-title-pre">
              Our Community
              <svg-section-line-2/>
            </span>
            <h3 class="community-section-title">Latest Posts & Discussions</h3>
          </div>
        </div>
      </div>
      <div class="row">
        <div
          v-for="item in blog_items"
          :key="item.id"
          class="col-xl-4 col-lg-4 col-md-6"
        >
          <!-- 커뮤니티 그리드 아이템 컴포넌트 -->
          <community-grid-item :item="item" />
        </div>
      </div>
      <div class="row">
        <div class="col-xl-12">
          <div class="community-more mt-10 text-center">
            <nuxt-link
              to="/community"
              class="community-btn community-btn-border community-btn-border-sm"
            >
              Discover More
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="js">
import communityData from '@/data/community-data';

const blog_items = communityData.filter((b) => b.blog === 'fashion');
</script>

<style scoped>
/* 커뮤니티 게시판 영역 */
.community-blog-area {
  padding-top: 110px;
  padding-bottom: 120px;
  background-color: #f4f6f8; /* 밝은 그레이 배경 */
}

/* 섹션 제목 영역 */
.community-section-title-wrapper {
  margin-bottom: 50px;
  text-align: center;
}

.community-section-title-pre {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: #666;
  margin-bottom: 10px;
  position: relative;
}

.community-section-title {
  font-size: 32px;
  font-weight: 700;
  color: #333;
  margin: 0;
}

/* More 버튼 영역 */
.community-more {
  margin-top: 10px;
  text-align: center;
}

/* 버튼 스타일 */
.community-btn {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: #000;
  text-decoration: none;
  border: 2px solid #000;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.community-btn:hover {
  background-color: #000;
  color: #fff;
}

.community-btn-border-sm {
  padding: 8px 16px;
  font-size: 14px;
}
</style>
