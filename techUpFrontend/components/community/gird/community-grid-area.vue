<template>
  <section class="tp-blog-grid-area pb-120">
    <div class="container">
      <div class="row">
        <div class="col-xl-9 col-lg-8">
          <div class="tp-blog-grid-wrapper">
            <div class="tp-blog-grid-top d-flex justify-content-between mb-40">
              <div class="tp-blog-grid-result">
                <p>
                  Showing 1–{{ communityItems.slice(startIndex, endIndex).length }}
                  of {{ communityItems.length }} results
                </p>
              </div>
              <div class="tp-blog-grid-tab tp-tab">
                <nav>
                  <div class="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      :class="`nav-link ${props.list_style ? '' : 'active'}`"
                      id="nav-grid-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-grid"
                      type="button"
                      role="tab"
                      aria-controls="nav-grid"
                      aria-selected="true"
                    >
                      <svg-grid />
                    </button>
                    <button
                      :class="`nav-link ${props.list_style ? 'active' : ''}`"
                      id="nav-list-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-list"
                      type="button"
                      role="tab"
                      aria-controls="nav-list"
                      aria-selected="false"
                    >
                      <svg-list />
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            <div class="tab-content" id="nav-tabContent">
              <!-- Grid 뷰 -->
              <div
                :class="`tab-pane fade ${props.list_style ? '' : 'show active'}`"
                id="nav-grid"
                role="tabpanel"
                aria-labelledby="nav-grid-tab"
                tabindex="0"
              >
                <div class="tp-blog-grid-item-wrapper">
                  <div class="row tp-gx-30">
                    <div
                      v-for="(item, i) in communityItems.slice(startIndex, endIndex)"
                      :key="i"
                      class="col-lg-6 col-md-6"
                    >
                      <community-grid-item :item="item" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- 리스트 뷰 -->
              <div
                :class="`tab-pane fade ${props.list_style ? 'show active' : ''}`"
                id="nav-list"
                role="tabpanel"
                aria-labelledby="nav-list-tab"
                tabindex="0"
              >
                <div class="tp-blog-list-item-wrapper">
                  <community-list-item
                    v-for="(item, i) in communityItems.slice(startIndex, endIndex)"
                    :key="i"
                    :item="item"
                  />
                </div>
              </div>

              <!-- Pagination -->
              <div class="row">
                <div class="col-xl-12">
                  <div class="tp-blog-pagination mt-30">
                    <div class="tp-pagination">
                      <ui-pagination
                        :items-per-page="6"
                        :data="communityItems"
                        @handle-paginate="handlePagination"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-xl-3 col-lg-4">
          <community-sidebar />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import communityData from '@/data/community-data';

const props = defineProps({
  list_style: {
    type: Boolean,
    default: false,
  },
});

const communityItems = communityData.filter((b) => b.blog === 'community-grid');
const filteredCommunityItems = ref(communityItems);
const startIndex = ref(0);
const endIndex = ref(communityItems.length);

const handlePagination = (data, start, end) => {
  filteredCommunityItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};
</script>

<style scoped>
/* 커뮤니티 게시판 리스트 페이지 스타일 */

/* 영역 배경 및 여백 조정 */
.tp-blog-grid-area {
  padding-bottom: 80px;
  background-color: #f4f6f8; /* 밝은 그레이 계열 배경 */
}

/* 게시판 전체 래퍼 */
.tp-blog-grid-wrapper {
  background-color: #ffffff;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

/* 상단 필터 및 결과 영역 */
.tp-blog-grid-top {
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

/* 결과 텍스트 */
.tp-blog-grid-result p {
  font-size: 16px;
  color: #333;
  margin: 0;
}

/* 탭 버튼 스타일 */
.nav-tabs .nav-link {
  font-size: 16px;
  font-weight: 500;
  color: #666;
  background: none;
  border: none;
  margin-right: 10px;
  padding: 8px 12px;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.nav-tabs .nav-link.active {
  color: #000;
  border-bottom: 2px solid #000;
}

/* Grid / List 아이템 래퍼 */
.tp-blog-grid-item-wrapper,
.tp-blog-list-item-wrapper {
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Pagination 영역 */
.tp-blog-pagination {
  text-align: center;
  margin-top: 20px;
}
.tp-pagination {
  display: inline-block;
}
</style>
