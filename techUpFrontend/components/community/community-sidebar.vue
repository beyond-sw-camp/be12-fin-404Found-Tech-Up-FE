<!-- CommunitySidebar.vue -->
<template>
  <div class="community-sidebar-wrapper community-sidebar-ml--24">
    <!-- 검색 -->
    <div class="community-sidebar-widget mb-35">
      <div class="community-sidebar-search">
        <form @submit.prevent="handleSearch">
          <div class="community-sidebar-search-combo">
            <select v-model="searchType" class="search-type-select">
              <option value="title">제목</option>
              <option value="content">내용</option>
              <option value="writer">작성자</option>
            </select>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="검색어를 입력하세요"
            />
            <button type="submit">
              <svg-search />
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- 글쓰기 버튼 -->
<div
  class="community-sidebar-widget mb-35"
  v-if="userStore.isLoggedIn"
>
  <div class="community-sidebar-widget-content">
    <nuxt-link to="/community/write" class="community-write-btn">
      글쓰기
    </nuxt-link>
  </div>
</div>


    <!-- 최신 게시물 (순수 최신 3개) -->
    <div class="community-sidebar-widget mb-35">
      <h3 class="community-sidebar-widget-title">최신 게시물</h3>
      <div class="community-sidebar-widget-content">
        <div class="community-sidebar-blog-item-wrapper">
          <div
            v-for="item in recentPosts"
            :key="item.idx"
            class="community-sidebar-blog-item d-flex flex-column"
          >
            <div class="community-sidebar-blog-meta">
              <span>{{ formatDate(item.boardCreated) }}</span>
            </div>
            <h3 class="community-sidebar-blog-title">
              <nuxt-link :to="`/community-details/${item.idx}`">
                {{ item.boardTitle }}
              </nuxt-link>
            </h3>
          </div>
        </div>
      </div>
    </div>

    <!-- 카테고리 -->
    <div class="community-sidebar-widget widget_categories mb-35">
      <h3 class="community-sidebar-widget-title">카테고리</h3>
      <div class="community-sidebar-widget-content">
        <ul>
          <li v-for="category in categories" :key="category.name">
            <nuxt-link
              :to="`/community?category=${encodeURIComponent(category.name)}`"
            >
              {{ category.label }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { format } from 'date-fns';
import { useUserStore } from '@/pinia/useUserStore';
const userStore = useUserStore();


const route = useRoute();
const router = useRouter();

// 검색어/타입 초기화
const searchQuery = ref(route.query.search?.toString() || '');
const searchType  = ref(route.query.type?.toString()   || 'title');

// 순수 최신 3개 게시물 보관
const recentPosts = ref([]);

// 카테고리 목록
const categories = [
  { name: '자유', label: '자유' },
  { name: 'Q&A',  label: 'Q&A' },
  { name: '추천',  label: '추천' },
  { name: '후기',  label: '후기' }
];

// 날짜 포맷
const formatDate = dateStr => {
  try { return format(new Date(dateStr), 'yyyy-MM-dd'); }
  catch { return dateStr; }
};

// 검색 핸들러: URL 쿼리만 업데이트
const handleSearch = () => {
  if (!searchQuery.value.trim()) return;
  router.push({
    path: '/community',
    query: {
      ...route.query,
      search: searchQuery.value.trim(),
      type:   searchType.value,
      page:   0
    }
  });
};

// 마운트 시 필터 없이 최신 3개만 호출
onMounted(async () => {
  try {
    const { data } = await axios.get('/api/board/list', {
      params: {
        page: 0,
        size: 3,
        sort: 'boardCreated',
        direction: 'desc'
      }
    });
    recentPosts.value = data.data.boardList || [];
  } catch (e) {
    console.error('최신 게시물 조회 실패', e);
  }
});
</script>

<style scoped>
.community-sidebar-wrapper {
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.community-sidebar-widget {
  background-color: #f9f9f9;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

.community-sidebar-widget-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #ccc;
}

.community-sidebar-search-combo {
  display: flex;
  align-items: center;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  overflow: hidden;
  background-color: #fff;
  height: 40px;
}

.search-type-select {
  padding: 0 0.75rem;
  border: none;
  border-right: 1px solid #d1d5db;
  background-color: #f9f9f9;
  font-size: 0.9rem;
  height: 100%;
  outline: none;
  min-width: 70px;
  color: #333;
  cursor: pointer;
  appearance: none;
}

.community-sidebar-search-combo input {
  flex: 1;
  padding: 0 0.75rem;
  border: none;
  height: 100%;
  font-size: 0.9rem;
  background-color: #fff;
  outline: none;
}

.community-sidebar-search-combo button {
  padding: 0 0.75rem;
  height: 100%;
  border: none;
  background-color: transparent;
  color: #555;
  cursor: pointer;
  transition: background-color 0.3s;
}
.community-sidebar-search-combo button:hover {
  background-color: #eee;
}

.community-write-btn {
  display: block;
  width: 100%;
  text-align: center;
  background-color: #007bff;
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
.community-write-btn:hover {
  background-color: #0056b3;
}

/* 최신 게시물 영역 */
.community-sidebar-blog-item-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.community-sidebar-blog-item {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.community-sidebar-blog-meta {
  font-size: 0.8rem;
  color: #777;
  margin-bottom: 2px;
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

/* 카테고리 목록 */
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
</style>
