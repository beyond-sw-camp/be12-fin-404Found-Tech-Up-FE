<template>
  <tr>
    <!-- img -->
    <td class="tp-cart-img">
      <nuxt-link :href="`/product-details/${item.idx}`" style="background-color: #F2F3F5;display: block;">
        <img :src="item.images[0]" alt="image" />
      </nuxt-link>
    </td>
    <!-- title -->
    <td class="tp-cart-title">
      <nuxt-link :href="`/product-details/${item.idx}`">{{ item.name }}</nuxt-link>
    </td>
    <!-- category -->
    <td class="tp-cart-category"><span>{{ item.category }}</span></td>
    <!-- stock -->
    <td class="tp-cart-category"><span>{{ item.stock }}</span></td>
    <!-- price -->
    <td class="tp-cart-category"><span>{{ item.price }}</span></td>
    <!-- review -->
    <!-- <td class="tp-cart-category"><span>{{ item.category.name }}</span></td> -->

    <!-- action -->
    <td class="tp-cart-add-to-cart">
      <button class="device-register tp-btn-2" @click="">
        <span>발급</span>
      </button>
    </td>
    <td class="tp-cart-add-to-cart">
      <button class="device-register tp-btn-2" @click="">
        <span>삭제</span>
      </button>
    </td>
    <td>
      <nuxt-link :href="`/product-modify/${item.idx}`">
        <button class="device-register tp-btn-2" @click="">
          <span>수정</span>
        </button>
      </nuxt-link>
    </td>
  </tr>
</template>

<script setup>

const props = defineProps({ item: Object });

const item = props.item;

</script>

<style scoped>
.device-register {
  color: aliceblue;
  font-size: smaller;
}
</style>
