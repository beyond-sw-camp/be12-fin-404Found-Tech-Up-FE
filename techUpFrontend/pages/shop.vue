<template>
  <div>
    <!-- breadcrumb start -->
    <breadcrumb-1 title="Shop Grid" subtitle="Shop Grid" />
    <!-- breadcrumb end -->

    <!-- shop area start -->
    <shop-area />
    <!-- shop area end -->
  </div>
</template>

<script setup>
const config = useRuntimeConfig();
const { data: products, error } = await useFetch('/product/list', {
  baseURL: config.public.apiBaseUrl
});
if (error.value) {
  console.error("상품 리스트를 불러오는데 실패했습니다.", error.value);
} else {
  console.log("상품 리스트:", products.value);
}
useSeoMeta({ title: "Shop Page" });
</script>