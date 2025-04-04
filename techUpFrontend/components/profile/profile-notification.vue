<template>
  <div class="profile__notification">
    <div class="profile__notification-top mb-30">
      <h3 class="profile__notification-title">내 활동 알림</h3>
      <p>테크업에서 소개하는 새로운 제품, 맞춤형 추천 알림, 쿠폰 알림, 재고 알림을 받아보세요</p>
    </div>
    <div class="profile__notification-wrapper">
      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input class="form-check-input" type="checkbox" role="switch" id="like" checked>
          <label class="form-check-label" for="like">재고 소진 알림</label>
        </div>
      </div>
      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input class="form-check-input" type="checkbox" role="switch" id="post" checked>
          <label class="form-check-label" for="post">사용자 맞춤 알림</label>
        </div>
      </div>
      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input class="form-check-input" type="checkbox" role="switch" id="new" checked>
          <label class="form-check-label" for="new">신규 제품 알림</label>
        </div>
      </div>
      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input class="form-check-input" type="checkbox" role="switch" id="new" checked>
          <label class="form-check-label" for="new">쿠폰 알림</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
