<template>
  <div class="profile__ticket table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">주문 번호</th>
          <th scope="col">주문 제품</th>
          <th scope="col">상태</th>
          <th scope="col">상세 정보</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"> #2245</th>
          <td data-info="title">GTX 1650 외 1건</td>
          <td data-info="status pending">진행 중</td>
          <td><a href="#" class="tp-logout-btn">영수증</a></td>
        </tr>
        <tr>
          <th scope="row"> #2220</th>
          <td data-info="title">HP PC 외 1건</td>
          <td data-info="status reply">취소함</td>
          <td><a href="#" class="tp-logout-btn">영수증</a></td>
        </tr>
        <tr>
          <th scope="row"> #2125</th>
          <td data-info="title">RTX 4070 Ti 외 2건</td>
          <td data-info="status done">배송 중</td>
          <td><a href="#" class="tp-logout-btn">영수증</a></td>
        </tr>
        <tr>
          <th scope="row"> #2124</th>
          <td data-info="title">삼성 DDR4-3200 16GB x 2</td>
          <td data-info="status hold">배송 완료</td>
          <td><a href="#" class="tp-logout-btn">영수증</a></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>

</script>
