<template>
  <div class="tp-checkout-bill-form">
    <div class="tp-checkout-bill-inner">
      <div class="row">
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>이름 <span>*</span></label>
            <input type="text" placeholder="이름을 입력하세요" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>성 <span>*</span></label>
            <input type="text" placeholder="성을 입력하세요" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>회사명 (선택)</label>
            <input type="text" placeholder="예: OO 주식회사" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>국가 / 지역</label>
            <input type="text" placeholder="대한민국" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>주소</label>
            <input type="text" placeholder="도로명, 번지 등을 입력하세요" />
          </div>

          <div class="tp-checkout-input">
            <input type="text" placeholder="아파트, 동/호수 등 (선택사항)" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>시 / 도</label>
            <input type="text" placeholder="" />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>행정구역 / 구</label>
            <ui-nice-select
              :options="[
                { value: 'seoul', text: '서울특별시' },
                { value: 'busan', text: '부산광역시' },
                { value: 'incheon', text: '인천광역시' },
                { value: 'jeju', text: '제주특별자치도' }
              ]"
              name="seoul"
              :default-current="0"
              @onChange="changeHandler"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="tp-checkout-input">
            <label>우편번호</label>
            <input type="text" placeholder="예: 12345" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>전화번호 <span>*</span></label>
            <input type="text" placeholder="예: 010-1234-5678" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>이메일 주소 <span>*</span></label>
            <input type="email" placeholder="예: example@email.com" />
          </div>
        </div>
        <div class="col-md-12">
          <div class="tp-checkout-input">
            <label>주문 메모 (선택)</label>
            <textarea placeholder="배송 요청사항 등을 입력하세요"></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const changeHandler = (e, index) => {
  console.log(e);
};
</script>
