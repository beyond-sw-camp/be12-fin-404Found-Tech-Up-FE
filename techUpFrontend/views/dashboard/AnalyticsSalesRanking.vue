<script setup>
import { useFetch } from 'nuxt/app';
import { onMounted } from 'vue';
import { VAvatar, VCard, VCardItem, VCardText, VCardTitle, VIcon, VList, VListItem, VListItemSubtitle, VListItemTitle } from 'vuetify/components'

const config = useRuntimeConfig();

const moreList = [
  {
    title: 'Yesterday',
    value: 'Yesterday',
  },
  {
    title: 'Last Week',
    value: 'Last Week',
  },
  {
    title: 'Last Month',
    value: 'Last Month',
  },
]


const result = await useFetch('/statistics', {
  baseURL: config.public.apiBaseUrl
});

let topWishList = result.data.value.topWishList.map((value) => {
  let result = {};
  result.abbr = value.brand;
  result.amount = value.cw;
});

console.log(topWishList);

</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>Top Sales</VCardTitle>

      <template #append>
        <div class="me-n3">
          <MoreBtn :menu-list="moreList" />
        </div>
      </template>
    </VCardItem>


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

  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.875rem;
}
</style>
