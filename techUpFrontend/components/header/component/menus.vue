<template>
  <ul>
    <li v-for="item in menu_data" :key="item.id"
      :class="`${item.drop_down ? 'has-dropdown' : item.mega_menu ? 'has-dropdown has-mega-menu' : ''}`">
      <nuxt-link :href="item.link">{{ item.title }}</nuxt-link>
      <!--
      <ul v-if="item.product_menus" class="tp-submenu tp-mega-menu mega-menu-style-2">

        <li v-for="(prd_m, i) in item.product_menus" :key="i" class="has-dropdown">
          <nuxt-link href="/shop" class="mega-menu-title">Shop Page</nuxt-link>
          <ul class="tp-submenu">
            <li v-for="(prd_sm, i) in prd_m.dropdown_menus" :key="i">
              <nuxt-link :href="prd_sm.link">{{ prd_sm.title }}</nuxt-link>
            </li>
          </ul>
        </li>
      </ul>
      -->
      <ul v-if="item.drop_down" class="tp-submenu">
        <li v-for="(drop_m, i) in item.dropdown_menus" :key="i">
          <nuxt-link :href="drop_m.link">{{ drop_m.title }}</nuxt-link>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
import { menu_data } from "@/data/menu-data";

export default {
  setup() {
    return {
      menu_data: menu_data,
    };
  }
};
</script>
