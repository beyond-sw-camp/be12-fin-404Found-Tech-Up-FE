<template>
  <tr style="font-size:x-small;">
    <td>#{{ item.idx }}</td>
    <td>{{ item.notiTitle }}</td>
    <td>{{ item.notiContent }}</td>
    <td>{{ item.notiCreated }}</td>
    <td><a href="#" class="tp-logout-btn" style="font-size:x-small">편집</a></td>
    <td><a href="#" class="tp-logout-btn" style="font-size:x-small;background-color: red;">삭제</a></td>
  </tr>
</template>
<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';


const props = defineProps({ item: Object });

const item = props.item;

const adminStore = useAdminStore();

</script>