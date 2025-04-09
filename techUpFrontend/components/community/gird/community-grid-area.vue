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
