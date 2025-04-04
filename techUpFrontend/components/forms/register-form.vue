<template>
  <form @submit="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input-title">
          <label for="name">별명</label>
        </div>
        <div class="tp-login-input" style="display:inline-flex; width:100%;">
          <input id="name" type="text" placeholder="홍길동" v-bind="name" />
          <button type="submit" class="tp-login-btn w-50" @onClick="validateNickname">중복 확인</button>
        </div>
        <err-message :msg="errors.name" />
      </div>
      <div class="tp-login-input-box">
        <div class="tp-login-input-title">
          <label for="email">이메일</label>
        </div>
        <div class="tp-login-input" style="display:inline-flex; width:100%;">
          <input id="email" type="email" placeholder="example@mail.com" v-bind="email" />
          <button type="submit" class="tp-login-btn w-50" v-show="!showMailValid"
            @click="sendEmailValidation">인증</button>
        </div>
        <err-message :msg="errors.email" />
      </div>
      <div class="tp-login-input-box" v-if="showMailValid">
        <div class="tp-login-input-title">
          <label for="email">인증번호</label>
        </div>
        <div class="tp-login-input" style="display:inline-flex; width:100%;">
          <input id="emailValid" type="text" placeholder="000000" v-bind="emailValid" />
          <button type="submit" class="tp-login-btn w-50" v-show="!disableValidationButton"
            @click="confirmValidation">확인</button>
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
              placeholder="최소 8자, 영어 소문자 및 숫자 혼합" v-bind="password" />
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
              placeholder="최소 8자, 비밀번호와 같음" v-bind="passwordValid" />
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
      <button type="submit" class="tp-login-btn w-100">회원가입</button>
    </div>
  </form>
</template>

<script setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';

let showPass = ref(false);
let showPassValid = ref(false);

let showMailValid = ref(false);
let clockCounter = ref(180);
let clockCountingString = ref(`남은 시간 ${clockCounter.value}초`);

let disableValidationButton = ref(false);

let emailValidationString = ref('');

let timer = ref(null);

const { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required().label("Name"),
    email: yup.string().required().email().label("Email"),
    emailValid: yup.string().required().length(6).label("EmailVaild"),
    password: yup.string().required().min(6).label("Password"),
    passwordValid: yup.string().required().min(6).label("PasswordValid")
  }),
});

const onSubmit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2));
  resetForm()
});

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};

const togglePasswordValidVisibility = () => {
  showPassValid.value = !showPassValid.value;
};

const validateNickname = () => {

  // 중복이 없다고 하면 버튼 숨김

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
}

const sendEmailValidation = (ev) => {
  // axios 요청


  // 즉시 인증창 드러냄
  showMailValid.value = true;
  // 타이머 설정
  timer.value = setInterval(decreaseCounter, 1000);
};

const confirmValidation = (ev) => {
  // axios 요청

  // 요청이 성공이면 고유값을 저장하고 버튼 비활성화
  emailValidationString.value = '';
  disableValidationButton.value = true;
  clearInterval(timer.value);
  clockCountingString.value = '인증되었습니다.'

  // 요청이 실패하면 오류 처리, 타이머는 계속 돌림
  // clockCountingString.value = '인증에 실패했습니다.'
}


const name = defineInputBinds('name');
const email = defineInputBinds('email');
const emailValid = defineInputBinds('emailvalid');
const password = defineInputBinds('password');
const passwordValid = defineInputBinds('passwordvalid');
</script>
