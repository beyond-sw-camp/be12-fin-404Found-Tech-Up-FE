<template>
  <tr style="font-size:x-small;">
    <td>{{ item.couponIdx }}</td>
    <td>{{ item.couponName }}</td>
    <td>{{ item.couponDiscountRate }}%</td>
    <td>{{ item.couponValidDate }}</td>
    <td><a href="#" class="tp-logout-btn" style="font-size:small">변경</a></td>
    <td><a href="#" class="tp-logout-btn" style="font-size:small;background-color: red;">삭제</a></td>
  </tr>
</template>
<script setup>

const props = defineProps({ item: Object });

const item = props.item;
</script>