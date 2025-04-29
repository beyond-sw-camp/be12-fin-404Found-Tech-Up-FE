<script setup lang="ts">
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const userStore = useUserStore();
const router = useRouter();

const updateuser = ref({
  userPhone: "",
  userAddress: ""
})

const userUpdate = async () => {
  console.log(userStore.userInfo);
  updateuser.value.userPhone = userStore.userInfo.userPhone;
  updateuser.value.userAddress = userStore.userInfo.userAddress;
  if (updateuser.value.userPhone === "") {
    alert("전화 번호를 입력해주세요.");
    return;
  }

  if (updateuser.value.userAddress === "") {
    alert("주소를 입력해주세요.");
    return;
  }
  try {
    const response = await userStore.updateProfile(updateuser.value);
    console.log("success:", response);
    alert('회원정보 수정이 완료되었습니다.');
  } catch (error) {
    console.error('회원정보 수정 중 오류 발생:', error.response.data);
    if (error.response.data.code) {
      alert(error.response.data.message);
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  }
};

const deleteAccount = async () => {
  if (confirm('정말로 회원 탈퇴를 진행하시겠습니까?')) {
    try {
      const response = await userStore.deleteAccount(); // 회원 탈퇴 API 호출
      console.log('회원 탈퇴 성공:', response);
      alert('회원 탈퇴가 완료되었습니다.');
      router.push('/login'); // 탈퇴 성공 시 /login 경로로 이동
    } catch (error) {
      console.error('회원 탈퇴 중 오류 발생:', error.response.data);
    if (error.response.data.code) {
      alert(error.response.data.message);
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
    }
  }
};

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
  }
});
</script>

<template>
  <form v-if="userStore.userInfo" @submit.prevent="handleSubmit">
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
              type="tel"
              placeholder="Enter your phone number"
              v-model="userStore.userInfo.userPhone"
              @input="userStore.userInfo.userPhone = userStore.userInfo.userPhone.replace(/[^0-9]/g, '')"
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
              placeholder="Enter your address"
              v-model="userStore.userInfo.userAddress"
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
      <div class="col-xxl-12 d-flex justify-content-between align-items-center">
        <div class="profile__btn">
          <button type="button" class="tp-btn" @click="userUpdate">프로필 바꾸기</button>
        </div>
        <div class="profile__btn">
          <button type="button" class="tp-btn tp-btn-red" @click="deleteAccount">회원 탈퇴하기</button>
        </div>
      </div>
    </div>
  </form>
</template>

<style scoped>
.tp-btn {
  background-color: var(--tp-theme-primary);
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.tp-btn:hover {
  background-color: #2762af;
}

.tp-btn-red {
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.tp-btn-red:hover {
  background-color: #d9363e;
}
</style>
