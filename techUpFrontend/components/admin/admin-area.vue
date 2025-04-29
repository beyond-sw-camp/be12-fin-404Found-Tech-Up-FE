<template>
  <section class="admin__area pt-120 pb-120">
    <div class="container">
      <div v-if="userStore.isLoggedIn" class="admin__inner p-relative">
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
              <!-- admin nav start -->
              <admin-nav />
              <!-- admin nav end -->
            </div>
          </div>
          <div class="col-xxl-9 col-lg-9">
            <div class="admin__tab-content">
              <div class="tab-content" id="dashboard-tabContent">
                <div class="tab-pane fade show active" id="nav-dashboard" role="tabpanel"
                  aria-labelledby="nav-dashboard-tab">
                  <admin-dashboard />
                </div>
                <div class="tab-pane fade" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab">
                  <admin-users />
                </div>
                <div class="tab-pane fade" id="nav-usermod" role="tabpanel" aria-labelledby="nav-usermod-tab">
                  <admin-usermod />
                </div>
                <div class="tab-pane fade" id="nav-userorder" role="tabpanel" aria-labelledby="nav-userorder-tab">
                  <admin-userorder />
                </div>
                <div class="tab-pane fade" id="nav-devregister" role="tabpanel" aria-labelledby="nav-devregister-tab">
                  <admin-devregister :modding="false" />
                </div>
                <div class="tab-pane fade" id="nav-devlist" role="tabpanel" aria-labelledby="nav-devlist-tab">
                  <admin-devlist />
                </div>
                <div class="tab-pane fade" id="nav-notifications" role="tabpanel"
                  aria-labelledby="nav-notifications-tab">
                  <admin-notifications />
                </div>
                <div class="tab-pane fade" id="nav-notify" role="tabpanel" aria-labelledby="nav-notify-tab">
                  <admin-notify />
                </div>
                <div class="tab-pane fade" id="nav-coupons" role="tabpanel" aria-labelledby="nav-coupons-tab">
                  <admin-coupons />
                </div>
                <div class="tab-pane fade" id="nav-coupon-create" role="tabpanel" aria-labelledby="nav-coupon-create">
                  <admin-coupon-create />
                </div>
                <div class="tab-pane fade" id="nav-alert" role="tabpanel" aria-labelledby="nav-alert-tab">
                  <admin-alert />
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
import { useUserStore } from '../../pinia/useUserStore';
const userStore = useUserStore();
</script>
