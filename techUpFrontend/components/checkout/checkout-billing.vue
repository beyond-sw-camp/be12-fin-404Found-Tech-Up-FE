<template>
  <div class="tp-checkout-bill-form">
    <div class="tp-checkout-bill-inner">
      <div class="row">
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>받는 분 성함 <span>*</span></label>
            <input v-model="form.recipientName" type="text" placeholder="수신인의 이름을 입력하세요" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>주소 <span>*</span></label>
            <input v-model="form.address" type="text" placeholder="도로명, 번지 등을 입력하세요" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>우편번호</label>
            <input v-model="form.postalCode" type="text" placeholder="예: 12345" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <input v-model="form.addressDetail" type="text" placeholder="아파트, 동/호수 등" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>전화번호 <span>*</span></label>
            <input v-model="form.phone" type="text" placeholder="예: 010-1234-5678" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>이메일 주소</label>
            <input v-model="form.email" type="email" placeholder="예: example@email.com" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>주문 메모 (선택)</label>
            <textarea v-model="form.memo" placeholder="배송 요청사항 등을 입력하세요"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const emits = defineEmits(['update:billing'])
const form   = reactive({
  recipientName: '',
  address:      '',
  postalCode:     '',
  addressDetail:       '',
  phone:        '',
  email:        '',
  memo:         ''
})

watch(form, () => emits('update:billing', { ...form }), { deep: true })
</script>
