<template>
  <nav>
    <div class="nav nav-tabs tp-tab-menu flex-column" id="profile-tab" role="tablist">
      <button class="nav-link active" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile"
        type="button" role="tab" aria-controls="nav-profile" aria-selected="false">
        <span><i class="fa-regular fa-user-pen"></i></span>프로필
      </button>
      <button class="nav-link" id="nav-information-tab" data-bs-toggle="tab" data-bs-target="#nav-information"
        type="button" role="tab" aria-controls="nav-information" aria-selected="false">
        <span><i class="fa-regular fa-circle-info"></i></span> 사용자 정보
      </button>
      <button class="nav-link" id="nav-devices-tab" data-bs-toggle="tab" data-bs-target="#nav-devices" type="button"
        role="tab" aria-controls="nav-devices" aria-selected="false">
        <span><i class="fa-light fa-location-dot"></i></span> 내 기기 정보
      </button>
      <button class="nav-link" id="nav-board-tab" data-bs-toggle="tab" data-bs-target="#nav-board" type="button"
        role="tab" aria-controls="nav-board" aria-selected="false">
        <span><i class="fa-light fa-clipboard-list-check"></i></span> 내 게시글 목록
      </button>
      <button class="nav-link" id="nav-order-tab" data-bs-toggle="tab" data-bs-target="#nav-order" type="button"
        role="tab" aria-controls="nav-order" aria-selected="false">
        <span><i class="fa-light fa-clipboard-list-check"></i></span> 내 주문 내역
      </button>
      <button class="nav-link" id="nav-notification-tab" data-bs-toggle="tab" data-bs-target="#nav-notification"
        type="button" role="tab" aria-controls="nav-notification" aria-selected="false">
        <span><i class="fa-regular fa-bell"></i></span> 알림 내역
      </button>
      <button class="nav-link" id="nav-password-tab" data-bs-toggle="tab" data-bs-target="#nav-password" type="button"
        role="tab" aria-controls="nav-password" aria-selected="false">
        <span><i class="fa-regular fa-lock"></i></span> 비밀번호 바꾸기
      </button>
    </div>
  </nav>
</template>

<script setup></script>
