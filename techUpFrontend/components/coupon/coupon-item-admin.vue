<template>
  <tr style="font-size:x-small;">
    <td>{{ item.couponIdx }}</td>
    <td>{{ item.couponName }}</td>
    <td>{{ item.couponDiscountRate }}%</td>
    <td>{{ item.couponValidDate }}</td>
    <td>{{ item.couponStock < 0 ? '-' : item.couponStock }}</td>
    <td>
      <nuxt-link v-if="item.couponStock >= 0" :href="`/event-modify/${item.couponIdx}`" class="tp-logout-btn"
        style="font-size:small">변경
      </nuxt-link>
      <nuxt-link v-else :href="`/coupon-modify/${item.couponIdx}`" class="tp-logout-btn" style="font-size:small">변경
      </nuxt-link>
    </td>
    <td><button class="tp-btn-2" @click="deleteItem">
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

const deleteItem = () => {
  if (item.couponStock >= 0) {
    adminStore.deleteEvent(item.couponIdx);
  } else {
    adminStore.deleteCoupon(item.couponIdx);
  }
}

</script>