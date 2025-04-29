<script setup>
import { VAvatar, VCard, VCardItem, VCardText, VCardTitle, VIcon, VList, VListItem, VListItemSubtitle, VListItemTitle } from 'vuetify/components'
import { useAdminStore } from '../../pinia/useAdminStore';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const storeRef = storeToRefs(adminStore);

let topKeywords = ref([]);

/*
let topKeywords = props.topKeywords.map((value) => {
  let result = {};
  result.abbr = value.brand;
  result.amount = value.cw;
});

console.log(topKeywords);
*/
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Top Keywords</VCardTitle>
    </VCardItem>

    <!--
    <VCardText>
      <VList class="card-list">
        <VListItem v-for="data in topWishList" :key="data.abbr">
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
