<template>
  <div class="admin__address">
    <div class="tp-header-search-box"
      style="width:100%;display:inline-flex;background-color:#f8f8f8; padding-right: 2rem;">
      <input type="text" placeholder="Search for Products..." v-model="searchText"
        style="color:black;background-color:inherit; padding-right: inherit;" />
      <button type="submit" style="width:1rem;">
        <SvgSearch />
      </button>
    </div>
    <div class="row">
      <div class="col-xl-12">
        <div class="tp-cart-list mt-10">
          <table style="text-align:center;">
            <thead>
              <tr>
                <th style="width:10%">번호</th>
                <th style="width:30%">제품</th>
                <th style="width:10%">카테고리</th>
                <th style="width:10%">재고</th>
                <th style="width:10%">평점</th>
                <th style="width:10%">쿠폰 발급</th>
                <th style="width:10%">삭제</th>
                <th style="width:10%">편집</th>
              </tr>
            </thead>
            <tbody>
              <!-- wishlist item start -->
              <device-item v-for="item in deviceList" :key="item.id" :item="item" :registered="true" />
              <!-- wishlist item end -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="tp-pagination mt-30">
      <ui-pagination :items-per-page="4" :data="filteredItems" @handle-paginate="handlePagination" />
    </div>
  </div>
</template>

<script setup>
let filteredItems = ref([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
let startIndex = ref(0);
let endIndex = ref(filteredItems.length);

const handlePagination = (data, start, end) => {
  console.log("data", data, "start", start, "end", end);
  filteredItems.value = data;
  startIndex.value = start;
  endIndex.value = end;
};
</script>