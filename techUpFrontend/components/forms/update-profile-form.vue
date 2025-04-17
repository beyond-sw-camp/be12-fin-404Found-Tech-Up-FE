<script setup lang="ts">
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가

const userStore = useUserStore();

const changeHandler = (e: { value: string; text: string }, index: number) => {
  console.log(e);
};
const handleSubmit = () => {
  console.log('submitted')
}

onMounted(async () => {
  try {
    await userStore.myinfo(); // 사용자 정보 가져오기
    console.log('사용자 정보가 성공적으로 로드되었습니다.');
    console.log(userStore.userInfo); // 사용자 정보 출력
  } catch (error) {
    console.error('사용자 정보를 가져오는 중 오류 발생:', error);
    alert('사용자 정보를 가져오는 데 실패했습니다. 다시 시도해주세요.');
  }
});
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input
              type="text"
              :value="userStore.userInfo?.userNickname"
              readonly
            />
            <span>
              <svg-user-3 />
            </span>
          </div>
        </div>
      </div>

      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input
              type="email"
              :value="userStore.userInfo?.userEmail"
              readonly
            />
            <span>
              <svg-email />
            </span>
          </div>
        </div>
      </div>
      <!-- <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="text" placeholder="Enter username" value="gil01">
            <span>
              <i class="fa-brands fa-facebook-f"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="text" placeholder="Enter username" value="gil01">
            <span><i class="fa-brands fa-twitter"></i></span>
          </div>
        </div>
      </div> -->
      <div class="col-xxl-12">
        <div class="profile__input-box">
          <div class="profile__input">
            <input
              type="text"
              :value="userStore.userInfo?.userPhone"
            />
            <span>
              <svg-phone-2 />
            </span>
          </div>
        </div>
      </div>
      <!-- <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <ui-nice-select :options="[
              { value: 'Male', text: '남' },
              { value: 'Female', text: '녀' },
              { value: 'Others', text: '기타' }
            ]" name="남" :default-current="0" @onChange="changeHandler" />
          </div>
        </div>
      </div> -->
      <div class="col-xxl-12">
        <div class="profile__input-box">
          <div class="profile__input">
            <input
              type="text"
              :value="userStore.userInfo?.userAddress"
            />
            <span>
              <svg-address />
            </span>
          </div>
        </div>
      </div>

      <!-- <div class="col-xxl-12">
        <div class="profile__input-box">
          <div class="profile__input">
            <textarea placeholder="Enter your bio">자기 소개 입력</textarea>
          </div>
        </div>
      </div> -->
      <div class="col-xxl-12">
        <div class="profile__btn">
          <button type="button" class="tp-btn" @click="userUpdate">프로필 바꾸기</button>
        </div>
      </div>
    </div>
  </form>
</template>