<template>
  <div class="admin__user table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">닉네임</th>
          <th scope="col">이메일</th>
          <th scope="col">게시글 수</th>
          <th scope="col">리뷰 수</th>
          <th scope="col">주문 내역</th>
          <th scope="col">쿠폰</th>
          <th scope="col">회원 정보</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"> #115</th>
          <td data-info="title">홍길동</td>
          <td data-info="email">exampl5@example.com</td>
          <td data-info="posts">1</td>
          <td data-info="reviews">1</td>
          <td><a href="#" class="tp-btn">주문 내역</a></td>
          <td><a href="#" class="tp-btn">쿠폰 발행</a></td>
          <td><a href="#" class="tp-btn">회원 정보</a></td>
        </tr>
        <tr>
          <th scope="row"> #114</th>
          <td data-info="title">김정엽</td>
          <td data-info="email">exampl4@example.com</td>
          <td data-info="posts">1</td>
          <td data-info="reviews">1</td>
          <td><a href="#" class="tp-btn">주문 내역</a></td>
          <td><a href="#" class="tp-btn">쿠폰 발행</a></td>
          <td><a href="#" class="tp-btn">회원 정보</a></td>
        </tr>
        <tr>
          <th scope="row"> #113</th>
          <td data-info="title">김무성</td>
          <td data-info="email">exampl3@example.com</td>
          <td data-info="posts">1</td>
          <td data-info="reviews">1</td>
          <td><a href="#" class="tp-btn">주문 내역</a></td>
          <td><a href="#" class="tp-btn">쿠폰 발행</a></td>
          <td><a href="#" class="tp-btn">회원 정보</a></td>
        </tr>
        <tr>
          <th scope="row"> #112</th>
          <td data-info="title">오건하</td>
          <td data-info="email">exampl2@example.com</td>
          <td data-info="posts">1</td>
          <td data-info="reviews">1</td>
          <td><a href="#" class="tp-btn">주문 내역</a></td>
          <td><a href="#" class="tp-btn">쿠폰 발행</a></td>
          <td><a href="#" class="tp-btn">회원 정보</a></td>
        </tr>
        <tr>
          <th scope="row"> #111</th>
          <td data-info="title">황경윤</td>
          <td data-info="email">exampl1@example.com</td>
          <td data-info="posts">1</td>
          <td data-info="reviews">1</td>
          <td><a href="#" class="tp-btn">주문 내역</a></td>
          <td><a href="#" class="tp-btn">쿠폰 발행</a></td>
          <td><a href="#" class="tp-btn">회원 정보</a></td>
        </tr>
      </tbody>
    </table>
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
