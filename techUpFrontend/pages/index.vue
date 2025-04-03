<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- hero banner start -->
      <hero-banner-one />
      <!-- hero banner end -->

      <!-- category start -->
      <categories-electronic />
      <!-- category end -->

      <!-- feature area start -->
      <feature-one />
      <!-- feature area end -->

      <!-- product area start -->
      <product-electronics-top-items />
      <!-- product area end -->

      <!-- banner area start -->
      <banner-area />
      <!-- banner area en -->

      <!-- offer product start -->
      <product-electronics-offer-items />
      <!-- offer product end -->

      <!-- product gadget area start -->
      <product-electronics-gadget-items />
      <!-- product gadget area end -->

      <!-- product banner start -->
      <banner-area-2 />
      <!-- product banner end -->

      <!-- product new arrivals area start -->
      <product-electronics-new-arrivals />
      <!-- product new arrivals area end -->

      <!-- product sm items start -->
      <product-electronics-sm-items />
      <!-- product sm items end -->

      <!-- blog item start -->
      <blog-electronic/>
      <!-- blog item end -->

    </nuxt-layout>
  </div>
</template>

<script>
definePageMeta({
  layout: false,
});
useSeoMeta({ title: "Tech Up" });
</script>
