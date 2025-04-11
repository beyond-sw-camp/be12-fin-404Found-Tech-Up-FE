<script setup>
import { VAvatar, VCard, VCardItem, VCardText, VCardTitle, VList, VListItem, VListItemTitle } from 'vuetify/components'

const props = defineProps({
  salesRank: Array
});

let salesRank = props.salesRank.map((value) => {
  let result = {};
  result.productIdx = value.productIdx;
  result.productName = value.productName;
  result.number = value.number;
});

</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Top Sales</VCardTitle>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem v-for="data in salesRank" :key="data.abbr">
          <template #prepend>
            <VAvatar :color="data.color" variant="tonal" size="40">
              {{ data.title }}
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1 d-flex align-center">
            <h6 class="text-h6">
              {{ data.productName }}
            </h6>
          </VListItemTitle>
          <template #append>
            <VAvatar :color="data.color" variant="tonal" size="40">
              {{ data.number }}
            </VAvatar>
          </template>
        </VListItem>
      </VList>
    </VCardText>

  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.875rem;
}
</style>
