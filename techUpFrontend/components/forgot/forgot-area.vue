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
              <form @submit="onSubmit">
                <div class="tp-login-input-wrapper">
                  <div class="tp-login-input-box">
                    <div class="tp-login-input">
                      <input id="email" type="email" placeholder="example@mail.com" v-bind="email">
                    </div>
                    <div class="tp-login-input-title">
                      <label for="email">이메일</label>
                    </div>
                    <err-message :msg="errors.email" />
                  </div>
                </div>
                <div class="tp-login-bottom mb-15">
                  <button type="submit" class="tp-login-btn w-100">메일 보내기</button>
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

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

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

const email = defineInputBinds("email");
</script>
