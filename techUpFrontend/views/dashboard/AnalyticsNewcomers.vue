<script setup>
import { VCard, VCardItem, VCardText, VCardTitle } from 'vuetify/components';

const props = defineProps({
  newComers: Number
})

const newComers = ref(props.newComers ? props.newComers : 0);
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>신규 회원</VCardTitle>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center">
        <h5 class="text-h5">
          {{ newComers }}
        </h5>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
