<template>
  <div class="tp-shop-sidebar mr-10">
    <!-- filter -->
    <div class="tp-shop-widget mb-35">
      <h3 class="tp-shop-widget-title no-border">Price Filter</h3>
      <!-- price filter start -->
      <shop-sidebar-price-filter />
      <!-- price filter end -->
    </div>

    <!-- status -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Product Status</h3>
      <!-- filter status start -->
      <shop-sidebar-filter-status />
      <!-- filter status end -->
    </div>

    <!-- categories -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Categories</h3>
      <!-- filter categories start -->
      <shop-sidebar-filter-categories />
      <!-- filter categories end -->
    </div>

    <!-- product rating -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Top Rated Products</h3>
      <!-- filter top-product start -->
      <shop-sidebar-top-product />
      <!-- filter top-product end -->
    </div>

    <!-- brand -->
    <div class="tp-shop-widget mb-50">
      <h3 class="tp-shop-widget-title">Popular Brands</h3>
      <!-- filter brand start -->
      <shop-sidebar-filter-brand />
      <!-- filter brand end -->
    </div>

    <!-- reset filter start -->
    <shop-sidebar-reset-filter />
    <!-- reset filter end -->
  </div>
</template>

<script setup>
</script>
