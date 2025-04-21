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
  return prev;
}, 0);

done.value = item.value.orderStatus === "PAID" ? false : true;

const handleOffCanvas = (item) => {
  adminStore.handleOrderDetailOffcanvas(item.orderDetails);
};

</script>
<template>
  <tr>
    <th scope="row"> #{{ item.orderIdx }}</th>
    <td data-info="title">{{ title }}</td>
    <td data-info="date">{{ item.orderDate }}</td>
    <td data-info="quantity">{{ quantity }}</td>
    <td data-info="totalPrice">{{ item.orderTotalPrice }}</td>
    <td data-info="status">{{ item.orderStatus }}</td>
    <td><button @click="handleOffCanvas(item)" class="tp-btn" style="font-weight:bold;font-size:smaller;">상세
        내역</button></td>
    <td><a v-if="!done" href="#" class="tp-btn"
        style="font-weight:bold;font-size:smaller;background-color: red;">취소/환불</a>
      <div v-else>-</div>
    </td>
    <td><a v-if="!done" href="#" class="tp-btn"
        style="font-weight:bold;font-size:smaller;background-color:green;">처리하기</a>
      <div v-else>-</div>
    </td>
  </tr>
</template>
