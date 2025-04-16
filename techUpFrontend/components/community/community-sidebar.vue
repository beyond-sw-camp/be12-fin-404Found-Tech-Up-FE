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
        <input v-model="searchQuery" type="text" placeholder="검색어를 입력하세요" />
        <button type="submit">
          <svg-search />
        </button>
      </div>
    </form>
  </div>
</div>


    <!-- 글쓰기 버튼 -->
    <div class="community-sidebar-widget mb-35">
      <div class="community-sidebar-widget-content">
        <nuxt-link to="/community/write" class="community-write-btn">
          글쓰기
        </nuxt-link>
      </div>
    </div>

    <!-- 최신 게시물 -->
    <div class="community-sidebar-widget mb-35">
      <h3 class="community-sidebar-widget-title">최신 게시물</h3>
      <div class="community-sidebar-widget-content">
        <div class="community-sidebar-blog-item-wrapper">
          <div
            v-for="item in recentPost"
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
    <!-- 카테고리 -->
<div class="community-sidebar-widget widget_categories mb-35">
  <h3 class="community-sidebar-widget-title">카테고리</h3>
  <div class="community-sidebar-widget-content">
    <ul>
      <li v-for="category in categories" :key="category.name">
        <nuxt-link :to="`/community?category=${encodeURIComponent(category.name)}`">
          {{ category.label }}
        </nuxt-link>
      </li>
    </ul>
  </div>
</div>

  </div>
</template>
<script setup>
import { ref, computed, onBeforeMount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { format } from 'date-fns';
import { useBoardStore } from '@/pinia/useBoardStore';

const route = useRoute();
const router = useRouter(); // router 추가
const boardStore = useBoardStore();

// 검색어 입력 및 타입 선택 상태
const searchQuery = ref('');
const searchType = ref('title'); // 기본값: 제목

// 최근 게시물 3개
const recentPost = computed(() => boardStore.boardList.slice(0, 3));

// 카테고리 정의
const categories = [
  { name: '자유', label: '자유' },
  { name: 'Q&A', label: 'Q&A' },
  { name: '추천', label: '추천' },
  { name: '후기', label: '후기' }
];

// 날짜 포맷
const formatDate = (dateStr) => {
  try {
    return format(new Date(dateStr), 'yyyy-MM-dd');
  } catch {
    return dateStr;
  }
};

// 검색 요청 시 Vue Router 사용하여 쿼리 변경
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/community',
      query: {
        ...route.query, // 기존 쿼리 유지(카테고리 등)
        search: searchQuery.value.trim(),
        type: searchType.value
      }
    });
  }
};

// 쿼리 파라미터로 게시글 불러오기 함수
const loadBoardList = () => {
  if (process.client) {
    const category = route.query.category || null;
    const search = route.query.search || null;
    const type = route.query.type || null;

    console.log('쿼리 확인:', { category, search, type }); // 디버깅용

    boardStore.fetchBoardList({
      page: 0,
      size: 3,
      sort: 'boardCreated',
      direction: 'desc',
      category,
      search,
      type
    });
  }
};

// 라우트 쿼리 변경 감지
watch(
  () => route.query,
  () => {
    console.log('라우트 쿼리 변경 감지:', route.query);
    loadBoardList();
  },
  { deep: true }
);

// 초기 마운트 시 실행
onBeforeMount(() => {
  loadBoardList();
  
  // URL에 검색어가 있으면 검색 입력란에 설정
  if (route.query.search) {
    searchQuery.value = route.query.search.toString();
  }
  if (route.query.type) {
    searchType.value = route.query.type.toString();
  }
});
</script>


<style scoped>
/* 커뮤니티 사이드바 래퍼 */
.community-sidebar-wrapper {
  margin-left: 24px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* 공통 위젯 스타일 */
.community-sidebar-widget {
  background-color: #f9f9f9;
  padding: 1rem 1.2rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}

/* 위젯 제목 */
.community-sidebar-widget-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.75rem;
  padding-bottom: 0.4rem;
  border-bottom: 1px solid #ccc;
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
  background-color: #fff;
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

/* 글쓰기 버튼 */
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
  padding: 8px 6px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  background-color: #fff;
  font-size: 0.95rem;
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

</style>