<template>
  <section :class="`breadcrumb__area include-bg ${center ? 'text-center' : ''} pt-95 pb-50`"
    :style="`background-color:${bg_clr && '#EFF1F5'}`">
    <div class="container">
      <div class="row">
        <div class="col-xxl-12">
          <div class="breadcrumb__content p-relative z-index-1">
            <h3 class="breadcrumb__title">{{ title }}</h3>
            <div class="breadcrumb__list">
              <span><nuxt-link href="/">홈</nuxt-link></span>
              <span>{{ subtitle }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ title: String, subtitle: String, center: Boolean, bg_clr: Boolean });
const center = ref(props.center);
const title = ref(props.title);
const bg_clr = ref(props.bg_clr);
const subtitle = ref(props.subtitle);
</script>
