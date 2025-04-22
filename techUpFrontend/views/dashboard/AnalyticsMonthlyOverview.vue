<script setup>
import { computed, ref, watch } from 'vue'
import { VCard, VCardItem, VCardTitle, VCardText, VBtn } from 'vuetify/components'
//import VueApexCharts from 'vue3-apexcharts'

import { useAdminStore } from '../../pinia/useAdminStore';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>월간 수입</VCardTitle>
    </VCardItem>

    <VCardText>
      <VueApexCharts type="bar" :options="storeRef.graphOptions.value" :series="storeRef.incomeGraph.value"
        :height="200" />
      <!--
      <div class="d-flex align-center mb-5 gap-x-4">
        <h4 class="text-h4">
          {{ ratio }}%
        </h4>
      </div>
      
        <VBtn block>
          Details
        </VBtn>
      -->
    </VCardText>
  </VCard>
</template>
