<script setup>
import { computed, ref } from 'vue'
import { VCard, VCardItem, VCardTitle, VCardText, VBtn } from 'vuetify/components'
//import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'

import { useAdminStore } from '../../pinia/useAdminStore';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

// TODO: 아래 Props의 내용을 adminStore로 옮기기
const props = defineProps({
  xaxis: Array,
  data: Array,
  ratio: Number
});


const vuetifyTheme = useTheme()

const options = computed(() => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)
  const disabledColor = `rgba(${hexToRgb(currentTheme.value['on-surface'])},${variableTheme.value['disabled-opacity']})`
  const borderColor = `rgba(${hexToRgb(String(variableTheme.value['border-color']))},${variableTheme.value['border-opacity']})`

  return {
    chart: {
      offsetY: -10,
      offsetX: -15,
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 6,
        distributed: true,
        columnWidth: '30%',
      },
    },
    stroke: {
      width: 2,
      colors: [currentTheme.value.surface],
    },
    legend: { show: false },
    grid: {
      borderColor,
      strokeDashArray: 7,
      xaxis: { lines: { show: false } },
    },
    dataLabels: { enabled: false },
    colors: [
      currentTheme.value['track-bg'],
      currentTheme.value['track-bg'],
      currentTheme.value['track-bg'],
      'rgba(var(--v-theme-primary),1)',
      currentTheme.value['track-bg'],
      currentTheme.value['track-bg'],
    ],
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    xaxis: {
      categories: props.xaxis,
      tickPlacement: 'on',
      labels: { show: false },
      crosshairs: { opacity: 0 },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        style: {
          colors: disabledColor,
          fontSize: '13px',
        },
        formatter: value => `${value > 9999 ? `${(value / 10000).toFixed(0)}` : value}만`,
      },
    },
    responsive: [
      {
        breakpoint: 1560,
        options: { plotOptions: { bar: { columnWidth: '35%' } } },
      },
      {
        breakpoint: 1380,
        options: { plotOptions: { bar: { columnWidth: '45%' } } },
      },
    ],
  }
})

const series = [{
  data: props.data,
}]

const ratio = ref(props.ratio ? props.ratio : 0);


</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>월간 수입</VCardTitle>
    </VCardItem>

    <VCardText>
      <VueApexCharts type="bar" :options="options" :series="series" :height="200" />

      <div class="d-flex align-center mb-5 gap-x-4">
        <h4 class="text-h4">
          {{ ratio }}%
        </h4>
      </div>
      <!--
        <VBtn block>
          Details
        </VBtn>
      -->
    </VCardText>
  </VCard>
</template>
