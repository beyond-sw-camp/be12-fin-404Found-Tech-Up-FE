<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';

const props = defineProps({ item: Object });

const item = ref(props.item);
const adminStore = useAdminStore();

console.log(item.value);

let title = ref('');
let quantity = ref(0);
let done = ref(false);

let titleData = item.value.orderDetails.reduce((prev, value) => prev + 1, -1);

title.value = `${item.value.orderDetails[0].orderDetailName}` + (titleData > 0 ? ` 외 ${titleData.toString()}건 ` : '');
quantity.value = item.value.orderDetails.reduce((prev, value) => {
  prev += value.orderDetailQuantity;
}, 0);

done.value = item.value.orderStatus === "PAID" ? false : true;


</script>
<template>
  <tr>
    <th scope="row"> #{{ item.orderIdx }}</th>
    <td data-info="title">{{ title }}</td>
    <td data-info="date">{{ item.orderDate }}</td>
    <td data-info="quantity">{{ quantity }}</td>
    <td data-info="totalPrice">{{ item.orderTotalPrice }}</td>
    <td><a href="#" class="tp-btn">상세 내역</a></td>
    <td><a v-if="!done" href="#" class="tp-btn">취소/환불</a>
      <div>-</div>
    </td>
    <td><a v-if="!done" href="#" class="tp-btn">처리하기</a>
      <div>-</div>
    </td>
  </tr>
</template>
