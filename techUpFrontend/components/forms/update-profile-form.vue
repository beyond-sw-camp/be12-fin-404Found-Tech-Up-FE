<template>
  <form @submit.prevent="handleSubmit">
    <div class="row">
      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="text" placeholder="Enter your username" value="홍길동">
            <span>
              <svg-user-3 />
            </span>
          </div>
        </div>
      </div>

      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="email" placeholder="Enter your email" value="example@mail.com">
            <span>
              <svg-email />
            </span>
          </div>
        </div>
      </div>
      <div class="col-xxl-6 col-md-6">
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
      </div>
      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="text" placeholder="Enter your number" value="010-1234-1234">
            <span>
              <svg-phone-2 />
            </span>
          </div>
        </div>
      </div>
      <div class="col-xxl-6 col-md-6">
        <div class="profile__input-box">
          <div class="profile__input">
            <ui-nice-select :options="[
              { value: 'Male', text: '남' },
              { value: 'Female', text: '녀' },
              { value: 'Others', text: '기타' }
            ]" name="남" :default-current="0" @onChange="changeHandler" />
          </div>
        </div>
      </div>
      <div class="col-xxl-12">
        <div class="profile__input-box">
          <div class="profile__input">
            <input type="text" placeholder="Enter your address" value="서울시 종로구 청와대로 1">
            <span>
              <svg-address />
            </span>
          </div>
        </div>
      </div>

      <div class="col-xxl-12">
        <div class="profile__input-box">
          <div class="profile__input">
            <textarea placeholder="Enter your bio">자기 소개 입력</textarea>
          </div>
        </div>
      </div>
      <div class="col-xxl-12">
        <div class="profile__btn">
          <button type="submit" class="tp-btn">프로필 바꾸기</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const changeHandler = (e: { value: string; text: string }, index: number) => {
  console.log(e);
};
const handleSubmit = () => {
  console.log('submitted')
}
</script>
