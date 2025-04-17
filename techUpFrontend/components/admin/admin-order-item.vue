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
<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';

const props = defineProps({ item: Object });

const item = ref(props.item);
const adminStore = useAdminStore();

let title = ref('');
let quantity = ref(0);
let done = ref(false);

let titleData = props.orderDetails.reduce((prev, value) => {
  if (prev == null) prev = value.orderDetailName;
  count += 1;
}, { main: null, count: -1 });

title.value = `${titleData.main}` + (titleData.count > 0 ? ` 외 ${titleData.count.toString()}건 ` : '');
quantity.value = props.orderDetails.reduce((prev, value) => {
  prev += value.orderDetailQuantity;
}, 0);

done.value = props.orderStatus === pending ? false : true;


</script>
