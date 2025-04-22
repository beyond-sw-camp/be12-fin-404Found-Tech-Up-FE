<template>
  <div class="profile__ticket table-responsive">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">알림 제목</th>
          <th scope="col">알림 내용</th>
          <th scope="col">상태</th>
          <th scope="col">확인하기</th>
        </tr>
      </thead>
      <tbody>
        <admin-alert-item v-for="item in itemlist" :key="item.idx" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

let itemlist = ref([]);
</script>
