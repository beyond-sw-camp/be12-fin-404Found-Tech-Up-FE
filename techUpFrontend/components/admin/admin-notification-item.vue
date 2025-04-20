<template>
  <tr style="font-size:x-small;">
    <td>#{{ item.idx }}</td>
    <td>{{ item.notiTitle }}</td>
    <td>{{ item.notiContent }}</td>
    <td>{{ item.notiCreated }}</td>
    <td v-if="item.idx > 4"><button class="tp-btn-2" style="font-size:small;background-color: red;"
        @click="adminStore.deleteNotification(item.idx)">삭제</button>
    </td>
  </tr>
</template>
<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';


const props = defineProps({ item: Object });

const item = props.item;

const adminStore = useAdminStore();

</script>