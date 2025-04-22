<template>
  <tr>
    <th scope="row"> {{ item.idx }}</th>
    <td data-info="title">{{ item.title }}</td>
    <td data-info="status done">{{ item.status }}</td>
    <td><a href="#" class="tp-logout-btn">{{ item.details }}</a></td>
  </tr>
</template>

<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';
const props = defineProps({ item: Object });

const item = ref(props.item);
const adminStore = useAdminStore();

</script>
