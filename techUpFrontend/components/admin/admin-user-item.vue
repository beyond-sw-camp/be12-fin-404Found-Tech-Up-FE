<template>
  <tr>
    <th scope="row"> #{{ item.orderIdx }}</th>
    <td data-info="title">{{ item.userNickname }}</td>
    <td data-info="email">{{ item.userEmail }}</td>
    <td data-info="posts">{{ item.userPosts }}</td>
    <td data-info="reviews">{{ item.userReviews }}</td>
    <td><nuxt-link :href="`/userorder/${item.userIdx}`" class="tp-btn">주문 내역</nuxt-link></td>
    <td><nuxt-link :href="`/coupon-register/${item.userIdx}`" class="tp-btn">쿠폰 발행</nuxt-link></td>
    <td><a href="#" class="tp-btn">회원 정보</a></td>
  </tr>
</template>
<script setup>
import { useAdminStore } from '../../pinia/useAdminStore';

const props = defineProps({ item: Object });

const item = ref(props.item);

const adminStore = useAdminStore();
</script>
