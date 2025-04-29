<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가

let showPass = ref(false);
let showPassValid = ref(false);

let showMailValid = ref(false);
let showResendButton = ref(false);
let clockCounter = ref(180);
let clockCountingString = ref(`남은 시간 ${clockCounter.value}초`);

let disableValidationButton = ref(false);

let nicknameValidationDisabled = ref(false); // 닉네임 중복 확인 버튼 비활성화 상태 추가

let timer = ref(null);

const userStore = useUserStore();
const router = useRouter();

let isSignup = ref(true);
const signupuser = ref({
  userNickname: "",
  verifyNickname: "",
  userEmail: "",
  inputCode: "",
  userPassword: "",
  userConfirmPassword: ""
})

const validateNickname = async () => {
  const nickname = signupuser.value.userNickname; // 입력된 닉네임 가져오기
  if (!nickname) {
    alert('별명을 입력해주세요.');
    return;
  }

  try {
    const response = await userStore.verifyNickname(nickname); // Pinia store의 함수 호출
    if (response.data.verifyNickname) {
      alert('사용 가능한 별명입니다.');
      signupuser.value.verifyNickname = response.data.verifyNickname; // 서버에서 받은 고유값 저장
      nicknameValidationDisabled.value = true; // 버튼 비활성화
    } else {
      alert('중복된 별명입니다. 다른 별명을 입력해주세요.');
      signupuser.value.userNickname = ""; // 입력 필드 초기화
    }
  } catch (error) {
    console.error('닉네임 중복 확인 중 오류 발생:', error);
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
};

const sendEmail = async () => {
  const email = signupuser.value.userEmail; // 입력된 닉네임 가져오기
  const issign = isSignup.value;
  if (!email) {
    alert('이메일을 입력해주세요.');
    return;
  }

  try {
    showMailValid.value = true;
    showResendButton.value = true;
    // 타이머 설정
    clearInterval(timer.value);
    clockCounter.value = 180;
    timer.value = setInterval(decreaseCounter, 1000);
    const response = await userStore.sendEmail(email, issign); // Pinia store의 함수 호출
    console.log(response);
    if (response.isSuccess) {
      alert('이메일을 전송하였습니다.');
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
  const email = signupuser.value.userEmail; // 입력된 닉네임 가져오기
  const code = signupuser.value.inputCode;
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
      timer.value = null;
      clockCountingString.value = '인증되었습니다.';
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

const signup = async () => {
  console.log(signupuser.value);
  if (signupuser.value.verifyNickname == false) {
    alert("닉네임 중복 여부를 확인해주세요.");
    return;
  }

  if (signupuser.value.userPassword !== signupuser.value.userConfirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }
  try {
    const response = await userStore.signup(signupuser.value);
    console.log("Signup success:", response);
    alert('회원가입이 완료되었습니다.');
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

const { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    emailValid: yup.string().required().length(6).label("EmailVaild"),
    password: yup.string().required().min(6).label("Password"),
    passwordValid: yup.string().required().min(6).label("PasswordValid")
  }),
});

// const onSubmit = handleSubmit(values => {
//   alert(JSON.stringify(values, null, 2));
//   resetForm();
// });

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};

const togglePasswordValidVisibility = () => {
  showPassValid.value = !showPassValid.value;
};

const decreaseCounter = () => {
  if (clockCounter.value === 0) {
    clearInterval(timer.value);
    timer.value = null;
    disableValidationButton.value = true;
    clockCountingString.value = '시간이 만료되었습니다. 다시 가입을 진행해주세요.';
  } else {
    clockCounter.value -= 1;
    clockCountingString.value = `남은 시간 ${clockCounter.value}초`;
  }
};
</script>

<template>
  <form @submit="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input-title">
          <label for="name">별명</label>
        </div>
        <div class="tp-login-input" style="display:inline-flex; width:100%;">
          <input
            id="name"
            type="text"
            placeholder="홍길동"
            v-model="signupuser.userNickname"
            :disabled="nicknameValidationDisabled"
          />
          <button v-if = "!nicknameValidationDisabled"
            type="button"
            class="tp-login-btn w-50"
            @click="validateNickname"
            :disabled="nicknameValidationDisabled"
          >중복 확인</button>
          <button v-else
            type="button"
            class="tp-login-btn-closed w-50"
            :disabled="nicknameValidationDisabled"
          >중복 확인</button>
        </div>
        <err-message :msg="errors.name" />
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input-title">
          <label for="email">이메일</label>
        </div>
        <div class="tp-login-input" style="display:inline-flex; width:100%;">
          <input id="email" type="email" placeholder="example@mail.com" :disabled="disableValidationButton" v-model="signupuser.userEmail" />
          <button v-if="!showResendButton&!disableValidationButton"  type="button" class="tp-login-btn w-50" v-show="!showMailValid"
            @click="sendEmail">인증</button>
          <button v-if="showResendButton&!disableValidationButton" type="button" class="tp-login-btn w-50" v-show="showMailValid"
            @click="sendEmail">재전송</button>
          <button v-if="disableValidationButton&showResendButton" type="button" class="tp-login-btn-closed w-50" :disabled="disableValidationButton"
            >재전송</button>
        </div>
        <err-message :msg="errors.email" />
      </div>
      <div class="tp-login-input-box" v-if="showMailValid">
        <div class="tp-login-input-title">
          <label for="email">인증번호</label>
        </div>
        <div class="tp-login-input" style="display:inline-flex; width:100%;">
          <input id="emailValid" type="text" placeholder="000000" :disabled="disableValidationButton" v-model="signupuser.inputCode" />
          <button v-if="!disableValidationButton" type="button" class="tp-login-btn w-50" :disabled="disableValidationButton"
            @click="verifyEmail">확인</button>
          <button v-else type="button" class="tp-login-btn-closed w-50" :disabled="disableValidationButton"
            >확인</button>
        </div>
        <err-message :msg="errors.emailValid" />
        <div>{{ clockCountingString }}</div>
      </div>
      <div v-else>

      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
            <input id="tp_password" :type="showPass ? 'text' : 'password'" name="password"
              placeholder="최소 8자, 영어 소문자 및 숫자 혼합" v-model="signupuser.userPassword" />
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
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
            <input id="tp_password" :type="showPassValid ? 'text' : 'password'" name="password"
              placeholder="최소 8자, 비밀번호와 같음" v-model="signupuser.userConfirmPassword" />
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
    </div>
    <div class="tp-login-bottom">
      <button type="button" class="tp-login-btn w-100" @click="signup">회원가입</button>
    </div>
  </form>
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
.tp-login-btn-closed {
  font-weight: 500;
  font-size: 16px;
  color: var(--tp-common-white);
  background-color: #505965;
  padding: 14px 30px;
  text-align: center;
  display: inline-block;
}
</style>