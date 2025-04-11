<script setup>
import { VCol, VRow } from 'vuetify/components';
import AnalyticsTotalEarning from '@/views/dashboard/AnalyticsTotalEarning.vue'
import AnalyticsMonthlyOverview from '@/views/dashboard/AnalyticsMonthlyOverview.vue'
import AnalyticsTopWishlist from '@/views/dashboard/AnalyticsTopWishlist.vue';
import AnalyticsTopKeyword from '@/views/dashboard/AnalyticsTopKeyword.vue';
import AnalyticsRecentOrders from '@/views/dashboard/AnalyticsRecentOrders.vue';
import AnalyticsSalesRanking from '@/views/dashboard/AnalyticsSalesRanking.vue';
import AnalyticsViewRanking from '@/views/dashboard/AnalyticsViewRanking.vue';
import AnalyticsNewcomers from '../../views/dashboard/AnalyticsNewcomers.vue';
import { useRuntimeConfig } from 'nuxt/app';
import AnalyticsTotalOrders from '../../views/dashboard/AnalyticsTotalOrders.vue';
import AnalyticsTotalRefunds from '../../views/dashboard/AnalyticsTotalRefunds.vue';


const config = useRuntimeConfig();

const result = await useFetch('/statistics', {
  baseURL: config.public.apiBaseUrl
});

console.log(result.data.value);

let topWishList = ref(result.data.value.topWishList.map((value) => {
  let result = {};
  result.abbr = value.brand;
  result.amount = value.cw;
}));

let newComers = ref(result.data.value.newCustomers);
let totalSales = ref(result.data.value.totalSales);
let totalOrders = ref(result.data.value.totalOrders);
let totalRefunds = ref(result.data.value.totalRefunds);

let topSales = ref(result.data.value.topSales);

</script>

<template>
  <VRow class="match-height">
    <!-- 이번 달 신규 회원수-->
    <!-- 이번 달 총 주문 수 -->
    <!-- 이번 달 총 주문 취소 수 -->
    <VCol cols="4" md="12">
      <!-- 요약 통계(신규 회원수, 총 주문 수, 총 주문 취소 수)-->
      <VRow class="match-height">
        <VCol cols="4" md="6">
          <AnalyticsNewcomers :newComers="newComers" />
        </VCol>
        <VCol cols="4" md="6">
          <AnalyticsTotalEarning :totalSales="totalSales" />
        </VCol>
      </VRow>
      <VRow class="match-height">
        <VCol cols="4" md="6">
          <AnalyticsTotalOrders :totalOrders="totalOrders" />
        </VCol>
        <VCol cols="4" md="6">
          <AnalyticsTotalRefunds :totalRefunds="totalRefunds" />
        </VCol>
      </VRow>
      <!-- 매출 요약 -->
      <VRow class="match-height">
        <VCol cols="4" md="12">
          <AnalyticsMonthlyOverview />
        </VCol>
      </VRow>
    </VCol>
    <!-- 최근 주문 내역 -->
    <!--
    <VCol cols="8" md="5">
      <AnalyticsRecentOrders />
    </VCol>
    -->


  </VRow>
  <!-- 조회수 상위 제품 -->
  <!-- TODO -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsViewRanking />
    </VCol>
  </VRow>
  <!-- 판매량 상위 제품 -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsSalesRanking :salesRank="topSales" />
    </VCol>
  </VRow>
  <!-- 위시리스트 상위 제품 -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsTopWishlist :topWishList="topWishList" />
    </VCol>
  </VRow>
  <!-- 상위 검색 키워드 목록 -->
  <!-- TODO -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsTopKeyword />
    </VCol>
  </VRow>
  <!-- 기존 컴포넌트 메모용 -->
  <!--
    <VCol cols="12" md="8">
      <AnalyticsTransactions />
    </VCol>
    <VCol cols="12" md="4">
      <VRow class="match-height">
        <VCol cols="12" sm="6">
          <AnalyticsTotalProfitLineCharts />
        </VCol>

        <VCol cols="12" sm="6">
          <AnalyticsBarCharts />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="12" md="8">
      <AnalyticsDepositWithdraw />
    </VCol>

    <VCol cols="12">
      <AnalyticsUserTable />
    </VCol>
  -->
</template>
