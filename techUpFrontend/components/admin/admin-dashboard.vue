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

const totalProfit = {
  title: 'Total Profit',
  color: 'secondary',
  icon: 'ri-pie-chart-2-line',
  stats: '$25.6k',
  change: 42,
  subtitle: 'Weekly Project',
}

const newProject = {
  title: 'New Project',
  color: 'primary',
  icon: 'ri-file-word-2-line',
  stats: '862',
  change: -18,
  subtitle: 'Yearly Project',
}
</script>

<template>
  <VRow class="match-height">
    <!-- 이번 달 신규 회원수-->
    <!-- 이번 달 총 주문 수 -->
    <!-- 이번 달 총 주문 취소 수 -->
    <VCol cols="4" md="7">
      <!-- 요약 통계(신규 회원수, 총 주문 수, 총 주문 취소 수)-->
      <VRow class="match-height">
        <VCol cols="4" md="6">
          <AnalyticsNewcomers />
        </VCol>
        <VCol cols="4" md="6">
          <AnalyticsTotalEarning />
        </VCol>
      </VRow>
      <!-- 매출 요약 -->
      <VRow class="match-height">
        <VCol cols="4" md="12">
          <AnalyticsMonthlyOverview />
        </VCol>
      </VRow>
    </VCol>

    <VCol cols="8" md="5">
      <AnalyticsRecentOrders />
    </VCol>
    <!-- 최근 주문 내역 -->

  </VRow>
  <!-- 조회수 상위 제품 -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsViewRanking />
    </VCol>
  </VRow>
  <!-- 판매량 상위 제품 -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsSalesRanking />
    </VCol>
  </VRow>
  <!-- 위시리스트 상위 제품 -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsTopWishlist />
    </VCol>
  </VRow>
  <!-- 상위 검색 키워드 목록 -->
  <VRow class="match-height">
    <VCol cols="12" md="12">
      <AnalyticsTopKeyword />
    </VCol>
  </VRow>

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
