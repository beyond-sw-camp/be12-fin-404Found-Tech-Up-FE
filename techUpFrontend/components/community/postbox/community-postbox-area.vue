<template>
  <section class="tp-postbox-area pt-120 pb-120">
    <div class="container">
      <div class="row">
        <!-- 게시글 리스트 -->
        <div class="col-xl-9 col-lg-8">
          <div class="tp-postbox-wrapper pr-50">
            <community-postbox-item
              v-for="(post, i) in paginatedItems"
              :key="i"
              :item="post"
            />

            <!-- 페이지네이션 -->
            <div class="tp-blog-pagination mt-50">
              <div class="tp-pagination">
                <ui-pagination
                  :items-per-page="4"
                  :data="communityItems"
                  @handle-paginate="handlePagination"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- 사이드바 -->
        <div class="col-xl-3 col-lg-4">
          <community-sidebar />
        </div>
      </div>
    </div>
  </section>

  <!-- 비디오 모달 -->
  <modal-video />
</template>

<script setup>
import { ref } from "vue";
import communityData from "@/data/community-data";

// 전체 커뮤니티 데이터
const communityItems = communityData.filter((b) => b.blog === "community-postbox");

// 페이지네이션 관련 상태
const paginatedItems = ref(communityItems);
const startIndex = ref(0);
const endIndex = ref(communityItems.length);

// 페이지네이션 핸들러
const handlePagination = (data, start, end) => {
  paginatedItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};
</script>
