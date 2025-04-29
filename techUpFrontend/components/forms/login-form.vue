<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";
import { useUserStore } from '@/pinia/useUserStore'; // useUserStore import 추가

const userStore = useUserStore();
const router = useRouter();

const loginUser = ref({
  email: "",
  password: ""
})

const login = async () => {
  console.log(loginUser.value);
  if (!loginUser.value.email) {
    alert("이메일을 입력해주세요.");
    return;
  }

  if (!loginUser.value.password) {
    alert("비밀번호를 입력해주세요.");
    return;
  }
  try {
    const response = await userStore.login(loginUser.value);
    console.log("Login success:", response);
    alert('로그인이 완료되었습니다.');
    router.push('/'); // 로그인 성공 시 메인 페이지 경로로 이동
  } catch (error) {
    if (error.response) {
      // 서버에서 반환한 에러 메시지 처리
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    } else {
      // 네트워크 에러 또는 서버와의 연결 문제
      alert("서버와 연결할 수 없습니다. 다시 시도해주세요.");
    }
  }
};

let showPass = ref(false);

const { errors, handleSubmit, resetForm } =
  useForm({
    validationSchema: yup.object({
      email: yup.string().required().email().label("Email"),
      password: yup.string().required().min(6).label("Password"),
    }),
  });

const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
  resetForm();
});

const togglePasswordVisibility = () => {
  showPass.value = !showPass.value;
};
</script>

<template>
  <form @submit="onSubmit">
    <div class="tp-login-input-wrapper">
      <div class="tp-login-input-box">
        <div class="tp-login-input">
          <input id="email" type="email" placeholder="example@mail.com" v-model="loginUser.email" />
        </div>
        <div class="tp-login-input-title">
          <label for="email">이메일</label>
        </div>
        <err-message :msg="errors.email" />
      </div>
      <div class="tp-login-input-box">
        <div class="p-relative">
          <div class="tp-login-input">
            <input id="tp_password" :type="showPass ? 'text' : 'password'" name="password"
              placeholder="Min. 6 character" v-model="loginUser.password" />
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
    </div>
    <div class="tp-login-suggetions d-sm-flex align-items-center justify-content-between mb-20">
      <div class="tp-login-remeber">
        <input id="remeber" type="checkbox" />
        <label for="remeber">아이디 기억하기</label>
      </div>
      <div class="tp-login-forgot">
        <nuxt-link href="/forgot">비밀번호를 잊으셨나요?</nuxt-link>
      </div>
    </div>
    <div class="tp-login-bottom">
      <button type="submit" class="tp-login-btn w-100" @click="login">로그인</button>
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
</style>