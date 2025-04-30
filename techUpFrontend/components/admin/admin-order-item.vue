<script setup>
import { navigateTo } from 'nuxt/app';
import { useAdminStore } from '../../pinia/useAdminStore';

const props = defineProps({
  item: Object,
});

const item = ref(props.item);
const adminStore = useAdminStore();

console.log(item.value);

let title = ref('');
let quantity = ref(0);
let done = ref(true);

let titleData = item.value.orderDetails.reduce((prev, value) => prev + 1, -1);

title.value = `${item.value.orderDetails[0].orderDetailName}` + (titleData > 0 ? ` 외 ${titleData.toString()}건 ` : '');
quantity.value = item.value.orderDetails.reduce((prev, value) => {
  prev += value.orderDetailQuantity;
  return prev;
}, 0);

done.value = item.value.orderStatus === "PAID" ? true : false;

const handleOffCanvas = (item) => {
  adminStore.handleOrderDetailOffcanvas(item.orderDetails);
};

let status = ref(item.value.orderStatus);

const cancelOrder = async () => {
  done.value = await adminStore.cancelOrder(item.value.orderIdx);
  navigateTo('/dashboard');
};

</script>
<template>
  <tr>
    <th scope="row"> #{{ item.orderIdx }}</th>
    <td data-info="title">{{ title }}</td>
    <td data-info="date">{{ item.orderDate }}</td>
    <td data-info="quantity">{{ quantity }}</td>
    <td data-info="totalPrice">{{ item.orderTotalPrice }}</td>
    <td data-info="status">{{ status }}</td>
    <td><button @click="handleOffCanvas(item)" class="tp-btn" style="font-weight:bold;font-size:smaller;">상세
        내역</button></td>
    <td><button v-if="item.orderStatus === 'REFUND_REQUESTED'" href="#" class="tp-btn"
        style="font-weight:bold;font-size:smaller;background-color: yellow;" @click="cancelOrder">취소하기</button>
      <div v-else>-</div>
    </td>
  </tr>
</template>
