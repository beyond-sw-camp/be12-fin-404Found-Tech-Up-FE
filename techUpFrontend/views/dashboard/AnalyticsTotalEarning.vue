<script setup>
import { VCard, VCardItem, VCardText, VCardTitle } from 'vuetify/components'
import { useAdminStore } from '../../pinia/useAdminStore';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

const profit = ref(storeRef.totalSales);
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>이 달의 수입(원)</VCardTitle>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center">
        <h5 class="text-h6">
          {{ profit }}
        </h5>
        <!-- 활성화? -->
        <!--
        <VIcon size="24" icon="ri-arrow-up-s-line" color="success" />
        <div class="text-success">
          10%
        </div>
        -->
      </div>
      <!--
        <VList class="card-list">
          <VListItem
            v-for="earning in earnings"
            :key="earning.title"
          >
            <template #prepend>
              <VAvatar
                rounded
                :image="earning.avatar"
                variant="tonal"
              />
            </template>

<VListItemTitle class="font-weight-medium">
  {{ earning.title }}
</VListItemTitle>
<VListItemSubtitle class="text-body-1">
  {{ earning.subtitle }}
</VListItemSubtitle>

<template #append>
              <div>
                <h6 class="text-h6 mb-2">
                  {{ earning.amount }}
                </h6>
                <VProgressLinear
                  :color="earning.progress"
                  model-value="80"
                  rounded-bar
                  rounded
                />
              </div>
            </template>
</VListItem>
</VList>
-->
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
