<template>
    <form id="contact-form" @submit="onSubmit">
      <div class="tp-contact-input-wrapper">
        <div class="tp-contact-input-box">
          <div class="tp-contact-input">
            <input name="name" id="name" type="text" placeholder="홍길동" v-bind="name" />
          </div>
          <div class="tp-contact-input-title">
            <label for="name">이름</label>
          </div>
          <err-message :msg="errors.name" />
        </div>
  
        <div class="tp-contact-input-box">
          <div class="tp-contact-input">
            <input name="email" id="email" type="email" placeholder="example@email.com" v-bind="email" />
          </div>
          <div class="tp-contact-input-title">
            <label for="email">이메일</label>
          </div>
          <err-message :msg="errors.email" />
        </div>
  
        <div class="tp-contact-input-box">
          <div class="tp-contact-input">
            <input name="subject" id="subject" type="text" placeholder="제목을 입력해주세요" v-bind="subject" />
          </div>
          <div class="tp-contact-input-title">
            <label for="subject">제목</label>
          </div>
          <err-message :msg="errors.subject" />
        </div>
  
        <div class="tp-contact-input-box">
          <div class="tp-contact-input">
            <Field name="message" v-slot="{ field }">
              <textarea v-bind="field" id="message" name="message" placeholder="메시지를 입력해주세요"></textarea>
            </Field>
          </div>
          <div class="tp-contact-input-title">
            <label for="message">메시지</label>
          </div>
          <err-message :msg="errors.message" />
        </div>
      </div>
  
      <div class="tp-contact-suggetions mb-20">
        <div class="tp-contact-remeber">
          <input id="remember" type="checkbox" />
          <label for="remember">다음에 사용할 수 있도록 이름, 이메일, 웹사이트 정보를 브라우저에 저장합니다.</label>
        </div>
      </div>
  
      <div class="tp-contact-btn">
        <button type="submit">메시지 보내기</button>
      </div>
    </form>
  </template>
  
  <script setup>
  import { useForm, Field } from 'vee-validate'
  import * as yup from 'yup'
  
  const { errors, handleSubmit, defineInputBinds, resetForm } = useForm({
    validationSchema: yup.object({
      name: yup.string().required().label('이름'),
      email: yup.string().required().email().label('이메일'),
      subject: yup.string().required().label('제목'),
      message: yup.string().required().label('메시지')
    })
  })
  
  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2))
    resetForm()
  })
  
  const name = defineInputBinds('name')
  const email = defineInputBinds('email')
  const subject = defineInputBinds('subject')
  </script>
  