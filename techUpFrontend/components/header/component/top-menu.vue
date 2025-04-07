<template>
  <div class="tp-header-top-menu d-flex align-items-center justify-content-end">
    <div class="tp-header-top-menu-item tp-header-lang">
      <span @click="handleActive('lang')" class="tp-header-lang-toggle" id="tp-header-lang-toggle">Korean</span>
      <ul :class="`${isActive === 'lang' ? 'tp-lang-list-open' : ''}`">
        <li>
          <a href="#">English</a>
        </li>
        <li>
          <a href="#">Korean</a>
        </li>
      </ul>
    </div>
    <div class="tp-header-top-menu-item tp-header-currency">
      <span @click="handleActive('currency')" class="tp-header-currency-toggle"
        id="tp-header-currency-toggle">KRW</span>
      <ul :class="`${isActive === 'currency' ? 'tp-currency-list-open' : ''}`">
        <li>
          <a href="#">KRW</a>
        </li>
        <li>
          <a href="#">USD</a>
        </li>
      </ul>
    </div>
    <div class="tp-header-top-menu-item tp-header-setting">
      <span @click="handleActive('setting')" class="tp-header-setting-toggle"
        id="tp-header-setting-toggle">Setting</span>
      <ul :class="`${isActive === 'setting' ? 'tp-setting-list-open' : ''}`">
        <li>
          <nuxt-link href="/profile">My Profile</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/wishlist">Wishlist</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/cart">Cart</nuxt-link>
        </li>
        <li>
          <nuxt-link href="/login">Login</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
let isActive = ref<string>('')
// handle active
const handleActive = (type: string) => {
  if (type === isActive.value) {
    isActive.value = ''
  }
  else {
    isActive.value = type
  }
}
</script>
