<template>
  <section class="admin__area pt-120 pb-120">
    <div class="container">
      <div class="admin__inner p-relative">
        <!--
        <div class="admin__shape">
          <img class="profile__shape-1" src="/img/login/laptop.png" alt="">
          <img class="profile__shape-2" src="/img/login/man.png" alt="">
          <img class="profile__shape-3" src="/img/login/shape-1.png" alt="">
          <img class="profile__shape-4" src="/img/login/shape-2.png" alt="">
          <img class="profile__shape-5" src="/img/login/shape-3.png" alt="">
          <img class="profile__shape-6" src="/img/login/shape-4.png" alt="">
        </div>
        -->
        <div class="row">
          <div class="col-xxl-3 col-lg-3">
            <div class="admin__tab mr-10">
              <nav>
                <div class="nav nav-tabs tp-tab-menu flex-column" id="admin-tab" role="tablist">
                  <nuxt-link href="/dashboard"><button class="nav-link" id="nav-dashboard-tab" data-bs-toggle="tab"
                      data-bs-target="#nav-dashboard" type="button" role="tab" aria-controls="nav-dashboard"
                      aria-selected="false">
                      <span><i class="fa-regular fa-user-pen"></i></span>대시보드
                    </button>
                  </nuxt-link>
                  <nuxt-link href="#" class="nav-link active"><button id="nav-users-tab" aria-selected="true">
                      <span><i class="fa-regular fa-circle-info"></i></span> 사용자 관리
                    </button>
                  </nuxt-link>
                  <nuxt-link href="/dashboard"><button class="nav-link" id="nav-devlist-tab" data-bs-toggle="tab"
                      data-bs-target="#nav-devlist" type="button" role="tab" aria-controls="nav-devlist"
                      aria-selected="false">
                      <span><i class="fa-light fa-clipboard-list-check"></i></span> 제품 목록
                    </button>
                  </nuxt-link>
                  <nuxt-link href="/dashboard">
                    <button class="nav-link" id="nav-notifications-tab" data-bs-toggle="tab"
                      data-bs-target="#nav-notifications" type="button" role="tab" aria-controls="nav-notifications"
                      aria-selected="false">
                      <span><i class="fa-light fa-clipboard-list-check"></i></span> 알림
                    </button>
                  </nuxt-link>
                  <nuxt-link href="/dashboard">
                    <button class="nav-link" id="nav-coupons-tab" data-bs-toggle="tab" data-bs-target="#nav-coupons"
                      type="button" role="tab" aria-controls="nav-coupons" aria-selected="false">
                      <span><i class="fa-regular fa-bell"></i></span> 쿠폰 목록
                    </button>
                  </nuxt-link>
                  <nuxt-link href="/dashboard">
                    <button class="nav-link" id="nav-alert-tab" data-bs-toggle="tab" data-bs-target="#nav-alert"
                      type="button" role="tab" aria-controls="nav-alert" aria-selected="false">
                      <span><i class="fa-regular fa-lock"></i></span> 관리자 알림
                    </button>
                  </nuxt-link>
                </div>
              </nav>
            </div>
          </div>
          <div class="col-xxl-9 col-lg-9">
            <div class="admin__tab-content">
              <div class="tab-content" id="dashboard-tabContent">
                <div class="tab-pane fade show active" id="nav-dashboard" role="tabpanel"
                  aria-labelledby="nav-dashboard-tab">
                  <admin-users />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

</script>
