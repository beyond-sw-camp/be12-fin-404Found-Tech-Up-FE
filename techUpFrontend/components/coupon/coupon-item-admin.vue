<template>
  <tr style="font-size:x-small;">
    <td>{{ item.couponIdx }}</td>
    <td>{{ item.couponName }}</td>
    <td>{{ item.couponDiscountRate }}%</td>
    <td>{{ item.couponValidDate }}</td>
    <td><nuxt-link :href="`/coupon-modify/${item.idx}`" class="tp-logout-btn" style="font-size:small">변경</nuxt-link>
    </td>
    <td><a href="#" class="tp-logout-btn" style="font-size:small;background-color: red;">삭제</a></td>
  </tr>
</template>
<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';


const props = defineProps({ item: Object });

const item = props.item;

const adminStore = useAdminStore();
</script>