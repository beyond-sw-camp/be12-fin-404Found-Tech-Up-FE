<template>
  <tr style="font-size:x-small;">
    <td>{{ item.couponIdx }}</td>
    <td>{{ item.couponName }}</td>
    <td>{{ item.couponDiscountRate }}%</td>
    <td>{{ item.couponValidDate }}</td>
    <td><nuxt-link :href="`/coupon-modify/${item.couponIdx}`" class="tp-logout-btn"
        style="font-size:small">변경</nuxt-link>
    </td>
    <td><button class="device-register tp-btn-2" @click="adminStore.deleteCoupon(item.couponIdx)">
        <span>삭제</span>
      </button>
    </td>
  </tr>
</template>
<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';


const props = defineProps({ item: Object });

const item = props.item;

const adminStore = useAdminStore();

</script>