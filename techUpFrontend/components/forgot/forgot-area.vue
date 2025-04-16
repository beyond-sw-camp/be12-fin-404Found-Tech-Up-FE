<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가

let showMailValid = ref(false);
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

    } else {
      alert('중복된 이메일입니다. 다른 별명을 입력해주세요.');
      user.value.userEmail = ""; // 입력 필드 초기화
    }
  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error.response.data);
    if (error.response.data.code === 2011) {
      alert('가입되지 않은 이메일입니다.');
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
      

    } else {
      alert('잘못된 인증 코드입니다. 다시시 입력해주세요.');
      clockCountingString.value = '인증에 실패했습니다.'
      user.value.inputCode = ""; // 입력 필드 초기화
    }
  } catch (error) {
    console.error('이메일 인증 코드 확인 중 오류 발생:', error);
    alert('오류가 발생했습니다. 다시 시도해주세요.');
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
                </div>
                <div class="tp-login-bottom mb-15">
                  <button v-if="!showMailValid" type="button" class="tp-login-btn w-100" @click="sendEmail">메일 보내기</button>
                  <button v-else type="button" class="tp-login-btn w-100" @click="verifyEmail">인증 확인</button>
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