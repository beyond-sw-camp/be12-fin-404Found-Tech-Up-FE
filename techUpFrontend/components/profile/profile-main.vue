<script setup>
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가
import { useDeviceStore } from '../../pinia/useDeviceStore';
import { useUserOrderStore } from '../../pinia/useUserOrderStore';
import { useWishlistStore } from '@/pinia/useWishlistStore';
import { useCouponStore } from '@/pinia/useCouponStore';
import { useNotificationStore } from '../../pinia/useNotificationStore';
import { ref } from 'vue';

const notificationStore = useNotificationStore(); // 알림 스토어 초기화
const deviceStore = useDeviceStore(); // 디바이스 스토어 초기화
const userOrderStore = useUserOrderStore(); // 주문 스토어 초기화
const wishlistStore = useWishlistStore(); // 위시리스트 스토어 초기화
const couponStore = useCouponStore(); // 쿠폰 스토어 초기화
const valueCount = ref({
  alarmsCount: 0,
  devicesCount: 0,
  ordersCount: 0,
  wishlistCount: 0,
  couponsCount: 0
})


const userStore = useUserStore();
const router = useRouter();

// 탭 전환 함수 추가
const switchTab = (tabId) => {
  // Bootstrap 탭 활성화
  const tabElement = document.getElementById(tabId);
  if (tabElement) {
    const tab = new bootstrap.Tab(tabElement);
    tab.show();
  }
};

const logout = async () => {
  try {
    const response = await userStore.logout();
    console.log("Logout success:", response);
    alert('로그아웃이 완료되었습니다.');
    router.push('/login'); // 로그인 성공 시 메인 페이지 경로로 이동
  } catch (error) {
    if (error.response) {
      // 서버에서 반환한 에러 메시지 처리
      alert(error.response.data.errorMessage);
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  }
};
</script>

<template>
  <div class="profile__main">
    <div class="profile__main-top pb-80">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="profile__main-inner d-flex flex-wrap align-items-center">
            <!-- <div class="profile__main-thumb">
              <img src="/img/users/user-10.jpg" alt="">
              <div class="profile__main-thumb-edit">
                <input id="profile-thumb-input" class="profile-img-popup" type="file">
                <label for="profile-thumb-input"><i class="fa-light fa-camera"></i></label>
              </div>
            </div> -->
            <div class="profile__main-content">
              <h4 class="profile__main-title">환영합니다, <span>{{ userStore.userInfo.userNickname }}</span>님!</h4>
              <p>당신에게 <span>{{ notificationStore.notifications.length }}</span>개 알림이 있습니다</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile__main-logout text-sm-end">
            <nuxt-link class="tp-logout-btn" @click="logout">로그아웃</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="profile__main-info">
      <div class="row gx-3">
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <a href="#" class="nav-link" @click.prevent="switchTab('nav-devices-tab')">
              <div class="profile__main-info-icon">
                <span>
                  <span class="profile-icon-count profile-download">{{ deviceStore.registerList.length }}</span>
                  <svg-download />
                </span>
              </div>
            </a>
            <h4 class="profile__main-info-title">내 기기 보기</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <a href="#" class="nav-link" @click.prevent="switchTab('nav-order-tab')">
              <div class="profile__main-info-icon">
                <span>
                  <span class="profile-icon-count profile-order">{{ userOrderStore.orderList.length }}</span>
                  <svg-orders />
                </span>
              </div>
            </a> 
            <h4 class="profile__main-info-title">주문</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <nuxt-link to="/wishlist" class="nav-link"> 
              <div class="profile__main-info-icon">
                <span>
                  <span class="profile-icon-count profile-wishlist">{{ wishlistStore.wishlists.length }}</span>
                  <svg-wishlist-2 />
                </span>
              </div>
            </nuxt-link>
            <h4 class="profile__main-info-title">위시리스트</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <nuxt-link to="/coupons" class="nav-link">
              <div class="profile__main-info-icon">
                <span>
                  <span class="profile-icon-count profile-wishlist">{{ couponStore.myCoupons.length }}</span>
                  <svg-gift-box />
                </span>
              </div>
            </nuxt-link>
            <h4 class="profile__main-info-title">쿠폰함</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>