<template>
  <div>
    <section class="tp-error-area pt-110 pb-110">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-xl-6 col-lg-8 col-md-10">
            <div class="tp-error-content text-center">
              <div class="tp-error-thumb">
                <img src="/img/error/error.png" alt="" />
              </div>

              <h5 class="tp-error-title">페이지를 찾을 수 없습니다!</h5>
              <p>
                이런! 당신이 찾는 페이지는 없습니다!
              </p>
              <nuxt-link href="/" class="tp-error-btn">홈페이지로</nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({ title: "404 Page" });
</script>
