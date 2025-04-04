<template>
  <div class="profile__main">
    <div class="profile__main-top pb-80">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="profile__main-inner d-flex flex-wrap align-items-center">
            <div class="profile__main-thumb">
              <img src="/img/users/user-10.jpg" alt="">
              <div class="profile__main-thumb-edit">
                <input id="profile-thumb-input" class="profile-img-popup" type="file">
                <label for="profile-thumb-input"><i class="fa-light fa-camera"></i></label>
              </div>
            </div>
            <div class="profile__main-content">
              <h4 class="profile__main-title">환영합니다, 홍길동님!</h4>
              <p>당신에게 <span>08</span>개 알림이 있습니다</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile__main-logout text-sm-end">
            <nuxt-link href="/login" class="tp-logout-btn">로그아웃</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="profile__main-info">
      <div class="row gx-3">
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-download">2</span>
                <svg-download />
              </span>
            </div>
            <h4 class="profile__main-info-title">내 기기 보기</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-order">5</span>
                <svg-orders />
              </span>
            </div>
            <h4 class="profile__main-info-title">주문</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-wishlist">10</span>
                <svg-wishlist-2 />
              </span>
            </div>
            <h4 class="profile__main-info-title">위시리스트</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-wishlist">07</span>
                <svg-gift-box />
              </span>
            </div>
            <h4 class="profile__main-info-title">쿠폰함</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

</script>
