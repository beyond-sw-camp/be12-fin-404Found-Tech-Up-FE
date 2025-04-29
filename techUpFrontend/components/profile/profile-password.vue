<script setup>
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가

let showPassValid1 = ref(false);
let showPassValid2 = ref(false);
let showPassValid3 = ref(false);

const userStore = useUserStore();

const userInfo = ref({
  userCurrentPassword: "",
  userPassword: "",
  userConfirmPassword: ""
})

const updatePwd = async () => {
  console.log(userInfo.value);
  if (userInfo.value.userCurrentPassword == false) {
    alert("이전 비밀번호를 입력해주세요.");
    return;
  }

  if (userInfo.value.userPassword == false) {
    alert("새 비밀번호를 입력해주세요.");
    return;
  }

  if (userInfo.value.userConfirmPassword == false) {
    alert("새 비밀번호 확인을 입력해주세요.");
    return;
  }

  if (userInfo.value.userPassword !== userInfo.value.userConfirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
  }
  try {
    const response = await userStore.updatePwd(userInfo.value);
    console.log("success:", response);
    alert('비밀번호 변경이 완료되었습니다.');

    // 값 초기화
    userInfo.value = {
      userCurrentPassword: "",
      userPassword: "",
      userConfirmPassword: ""
    };
  } catch (error) {
    console.error('비밀번호 변경 중 오류 발생:', error.response.data);
    if (error.response.data.code) {
      alert(error.response.data.message);
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  }
};

const togglePasswordVisibility1 = () => {
  showPassValid1.value = !showPassValid1.value;
};

const togglePasswordVisibility2 = () => {
  showPassValid2.value = !showPassValid2.value;
};

const togglePasswordVisibility3 = () => {
  showPassValid3.value = !showPassValid3.value;
};

const handleSubmit = () => {
  console.log('submitted')
}
</script>

<template>
  <div class="profile__password">
    <form @submit.prevent="handleSubmit">
      <div class="row">
        <div class="col-xxl-12">
          <div class="tp-profile-input-box">
            <div class="tp-contact-input">
              <input name="old_pass" id="old_pass" :type="showPassValid1 ? 'text' : 'password'" v-model="userInfo.userCurrentPassword">
            </div>
            <div class="tp-login-input-eye" id="password-show-toggle">
              <span class="open-eye" @click="togglePasswordVisibility1">
                <template v-if="showPassValid1">
                  <svg-open-eye />
                </template>
                <template v-else>
                  <svg-close-eye />
                </template>
              </span>
            </div>
            <div class="tp-profile-input-title">
              <label for="old_pass">이전 비밀번호</label>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-md-6">
          <div class="tp-profile-input-box">
            <div class="tp-profile-input">
              <input name="new_pass" id="new_pass" :type="showPassValid2 ? 'text' : 'password'" v-model="userInfo.userPassword"> 
            </div>
            <div class="tp-login-input-eye" id="password-show-toggle">
              <span class="open-eye" @click="togglePasswordVisibility2">
                <template v-if="showPassValid2">
                  <svg-open-eye />
                </template>
                <template v-else>
                  <svg-close-eye />
                </template>
              </span>
            </div>
            <div class="tp-profile-input-title">
              <label for="new_pass">새 비밀번호</label>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-md-6">
          <div class="tp-profile-input-box">
            <div class="tp-profile-input">
              <input name="con_new_pass" id="con_new_pass" :type="showPassValid3 ? 'text' : 'password'" v-model="userInfo.userConfirmPassword">
            </div>
            <div class="tp-login-input-eye" id="password-show-toggle">
              <span class="open-eye" @click="togglePasswordVisibility3">
                <template v-if="showPassValid3">
                  <svg-open-eye />
                </template>
                <template v-else>
                  <svg-close-eye />
                </template>
              </span>
            </div>
            <div class="tp-profile-input-title">
              <label for="con_new_pass">새 비밀번호 확인(재입력)</label>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-md-6">
          <div class="profile__btn">
            <button type="button" class="tp-btn" @click="updatePwd">비밀번호 바꾸기</button>
          </div>
        </div>
      </div>
    </form>
  </div>
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
</style>