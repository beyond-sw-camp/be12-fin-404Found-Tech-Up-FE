<template>
  <section class="admin__area pt-120 pb-120">
    <div class="container">
      <div class="admin__inner p-relative">
        <!--
        <div class="admin__shape">
          <img class="profile__shape-1" src="/img/login/laptop.png" alt="">
          <img class="profile__shape-2" src="/img/login/man.png" alt="">
          <img class="profile__shape-3" src="/img/login/shape-1.png" alt="">
          <img class="profile__shape-4" src="/img/login/shape-2.png" alt="">
          <img class="profile__shape-5" src="/img/login/shape-3.png" alt="">
          <img class="profile__shape-6" src="/img/login/shape-4.png" alt="">
        </div>
        -->
        <div class="row">
          <div class="col-xxl-3 col-lg-3">
            <div class="admin__tab mr-10">
              <!-- admin nav start -->
              <nuxt-link href="/dashboard">대시보드로 돌아가기</nuxt-link>
              <!-- admin nav end -->
            </div>
          </div>
          <div class="col-xxl-9 col-lg-9">
            <div class="admin__tab-content">
              <div class="tab-content" id="dashboard-tabContent">
                <div class="tab-pane fade show active" id="nav-dashboard" role="tabpanel"
                  aria-labelledby="nav-dashboard-tab">
                  <admin-devregister :modding="modding" :productInfo="productInfo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useRuntimeConfig } from 'nuxt/app';

const props = defineProps({
  modify: Boolean,
  idx: Number
})

const modding = ref(props.modify);
const idx = ref(props.idx);

let productInfo = ref({});
const config = useRuntimeConfig();

// 기존 정보를 가져온다.
const result = await $fetch(`/product/${idx.value}`, {
  baseURL: config.public.apiBaseUrl,
});

productInfo.value = {
  name: result.data.name,
  price: result.data.price,
  brand: result.data.brand,
  stock: result.data.stock,
  description: result.data.description,
  category: result.data.category,
  cpuSpec: result.data.cpuSpec ? result.data.cpuSpec : null,
  gpuSpec: result.data.gpuSpec ? result.data.gpuSpec : null,
  hddSpec: result.data.hddSpec ? result.data.hddSpec : null,
  ssdSpec: result.data.ssdSpec ? result.data.ssdSpec : null,
  ramSpec: result.data.ramSpec ? result.data.ramSpec : null
};

</script>
