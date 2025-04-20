<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가

let showPass = ref(false);
let showPassValid = ref(false);

let showMailValid = ref(false);
let showPwdValid = ref(false);
let clockCounter = ref(180);
let clockCountingString = ref(`남은 시간 ${clockCounter.value}초`);

let disableValidationButton = ref(false);

let timer = ref(null);

const userStore = useUserStore();
const router = useRouter();

let isSignup = ref(false);
const user = ref({
  userEmail: "",
  inputCode: "",
  userPassword: "",
  userConfirmPassword: ""
})

const sendEmail = async () => {
  const email = user.value.userEmail;
  const issign = isSignup.value; // 가입 여부를 나타내는 변수 추가
  if (!email) {
    alert('이메일을 입력해주세요.');
    return;
  }

  try {
    const response = await userStore.sendEmail(email, issign); // Pinia store의 함수 호출
    console.log(response);
    if (response.isSuccess) {
      alert('이메일을 전송하였습니다.');
      showMailValid.value = true;
      // 타이머 설정
      timer.value = setInterval(decreaseCounter, 1000);
    }
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error.response.data);
    if (error.response.data.code) {
      alert(error.response.data.message);
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  }
};

const verifyEmail = async () => {
  const email = user.value.userEmail; // 입력된 닉네임 가져오기
  const code = user.value.inputCode;
  if (!code) {
    alert('이메일 인증 코드를 입력해주세요.');
    return;
  }

  try {
    const response = await userStore.verifyEmail(email, code); // Pinia store의 함수 호출
    console.log(response);
    if (response.isSuccess) {
      alert('이메일 인증을 완료했습니다.');
      disableValidationButton.value = true;
      clearInterval(timer.value);
      clockCountingString.value = '인증되었습니다.';
      showPwdValid.value = true;
    } 
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error.response.data);
    if (error.response.data.code) {
      alert(error.response.data.message);
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  }
};

const editPwd = async () => {
  console.log(user.value);

  if (user.value.userPassword !== user.value.userConfirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
  }
  try {
    const response = await userStore.editPwd(user.value);
    console.log("success:", response);
    alert('비밀번호 변경이 완료되었습니다.');
    router.push('/login'); // 회원가입 성공 시 /login 경로로 이동
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error.response.data);
    if (error.response.data.code) {
      alert(error.response.data.message);
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  }
};

const decreaseCounter = () => {
  if (clockCounter.value === 0) {
    clearInterval(timer.value);
    disableValidationButton.value = true;
    clockCountingString.value = '시간이 만료되었습니다. 다시 가입을 진행해주세요.';
  } else {
    clockCounter.value -= 1;
    clockCountingString.value = `남은 시간 ${clockCounter.value}초`;
  }
};

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};

const togglePasswordValidVisibility = () => {
  showPassValid.value = !showPassValid.value;
};

const { errors, handleSubmit, defineInputBinds, resetForm } =
  useForm({
    validationSchema: yup.object({
      email: yup.string().required().email().label("Email")
    }),
  });

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values));
  resetForm();
});
</script>

<template>
  <section class="tp-login-area pb-140 p-relative z-index-1 fix">
    <div class="tp-login-shape">
      <img class="tp-login-shape-1" src="/img/login/login-shape-1.png" alt="shape">
      <img class="tp-login-shape-2" src="/img/login/login-shape-2.png" alt="shape">
      <img class="tp-login-shape-3" src="/img/login/login-shape-3.png" alt="shape">
      <img class="tp-login-shape-4" src="/img/login/login-shape-4.png" alt="shape">
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-xl-6 col-lg-8">
          <div class="tp-login-wrapper">
            <div class="tp-login-top text-center mb-30">
              <h3 class="tp-login-title">비밀번호 초기화</h3>
              <p>비밀번호 초기화를 위해 가입하셨던 이메일을 입력하세요</p>
            </div>
            <div class="tp-login-option">
              <form @submit.prevent="onSubmit">
                <div class="tp-login-input-wrapper">
                  <div class="tp-login-input-box">
                    <div class="tp-login-input">
                      <input id="email" type="email" placeholder="example@mail.com" v-model="user.userEmail" :disabled="emailSent" />
                    </div>
                    <div class="tp-login-input-title">
                      <label for="email">이메일</label>
                    </div>
                    <err-message :msg="errors.email" />
                  </div>
                </div>
                <div v-if="showMailValid" class="tp-login-input-wrapper">
                  <div class="tp-login-input-box">
                    <div class="tp-login-input">
                      <input id="code" type="text" placeholder="인증 코드를 입력하세요" v-model="user.inputCode" />
                    </div>
                    <div class="tp-login-input-title">
                      <label for="code">인증 코드</label>
                    </div>
                  </div>
                  <err-message :msg="errors.emailValid" />
                  <div>{{ clockCountingString }}</div>
                </div>
                <div v-if="showPwdValid" class="tp-login-input-box">
                  <div class="p-relative">
                    <div class="tp-login-input">
                      <input id="tp_password" :type="showPass ? 'text' : 'password'" name="password"
                        placeholder="최소 8자, 영어 소문자 및 숫자 혼합" v-model="user.userPassword" />
                    </div>
                    <div class="tp-login-input-eye" id="password-show-toggle">

                      <span class="open-eye" @click="togglePasswordVisibility">
                        <template v-if="showPass">
                          <svg-open-eye />
                        </template>
                        <template v-else>
                          <svg-close-eye />
                        </template>
                      </span>

                    </div>
                    <div class="tp-login-input-title">
                      <label for="tp_password">비밀번호</label>
                    </div>
                  </div>
                  <err-message :msg="errors.password" />
                </div>
                <div v-if="showPwdValid" class="tp-login-input-box">
                  <div class="p-relative">
                    <div class="tp-login-input">
                      <input id="tp_password" :type="showPassValid ? 'text' : 'password'" name="password"
                        placeholder="최소 8자, 비밀번호와 같음" v-model="user.userConfirmPassword" />
                    </div>
                    <div class="tp-login-input-eye" id="password-show-toggle">

                      <span class="open-eye" @click="togglePasswordValidVisibility">
                        <template v-if="showPassValid">
                          <svg-open-eye />
                        </template>
                        <template v-else>
                          <svg-close-eye />
                        </template>
                      </span>

                    </div>
                    <div class="tp-login-input-title">
                      <label for="tp_password">비밀번호 확인</label>
                    </div>
                  </div>
                  <err-message :msg="errors.passwordValid" />
                </div>
                <div class="tp-login-bottom mb-15">
                  <button v-if="!showMailValid && !showPwdValid" type="button" class="tp-login-btn w-100" @click="sendEmail">메일 보내기</button>
                  <button v-if="showMailValid && !showPwdValid" type="button" class="tp-login-btn w-100" @click="verifyEmail">인증 확인</button>
                  <button v-if="showMailValid && showPwdValid" type="button" class="tp-login-btn w-100" @click="editPwd">비밀번호 변경</button>
                </div>
                <div class="tp-login-suggetions d-sm-flex align-items-center justify-content-center">
                  <div class="tp-login-forgot">
                    <span>비밀번호가 기억나셨나요? <nuxt-link href="/login"> 로그인</nuxt-link></span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.tp-login-btn {
  font-weight: 500;
  font-size: 16px;
  color: var(--tp-common-white);
  background-color: var(--tp-theme-primary);
  padding: 14px 30px;
  text-align: center;
  display: inline-block;
}
.tp-login-btn:hover {
  background-color: #2762af;
}
</style>