<script setup>
import { VAvatar, VCard, VCardItem, VCardText, VCardTitle, VList, VListItem, VListItemTitle } from 'vuetify/components'

const props = defineProps({
  salesRank: []
});
let salesRank = [];

/*
let salesRank = props.salesRank.map((value) => {
  let result = {};
  result.abbr = value.name;
  result.amount = value.price;
});

console.log(salesRank);
*/
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Top Sales</VCardTitle>
    </VCardItem>
    <!--
    <VCardText>
      <VList class="card-list">
        <VListItem v-for="data in salesRank" :key="data.abbr">
          <template #prepend>
            <VAvatar :color="data.color" variant="tonal" size="40">
              {{ data.abbr }}
            </VAvatar>
          </template>

<VListItemTitle class="mb-1 d-flex align-center">
  <h6 class="text-h6">
    {{ data.amount }}
  </h6>
</VListItemTitle>
</VListItem>
</VList>
</VCardText>
-->
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.875rem;
}
</style>
