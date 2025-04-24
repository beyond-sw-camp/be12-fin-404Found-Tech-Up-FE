<template>
  <tr>
    <th scope="row"> #{{ item.userIdx }}</th>
    <td data-info="title" style="width:10%;">{{ item.userNickname }}</td>
    <td data-info="email" style="width:15%;">{{ item.userEmail }}</td>
    <td data-info="phone" style="width:5%;">{{ item.userPhone }}</td>
    <td data-info="address" style="width:25%;">{{ item.userAddress }}</td>
    <td data-info="posts" style="width:5%;">{{ item.userPosts }}</td>
    <td data-info="reviews" style="width:5%;">{{ item.userReviews }}</td>
    <td><nuxt-link :href="`/userorder/${item.userIdx}`" class="tp-btn" style="width:5%;">주문 내역</nuxt-link></td>
    <td><nuxt-link :href="`/coupon-register/${item.userIdx}`" class="tp-btn" style="width:5%;">쿠폰 발행</nuxt-link></td>
  </tr>
</template>
<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';

const props = defineProps({ item: Object });

const item = ref(props.item);

const adminStore = useAdminStore();
</script>
