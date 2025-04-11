<script setup>
import { VCard, VCardItem, VCardText, VCardTitle } from 'vuetify/components';

const props = defineProps({
  totalRefunds: Number
})

const totalRefunds = ref(props.totalRefunds);


</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>총 주문 취소</VCardTitle>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center">
        <h5 class="text-h5">
          {{ totalRefunds }}
        </h5>
      </div>
      <!-- 활성화? -->
      <!--
      <VIcon size="24" icon="ri-arrow-up-s-line" color="success" />
      <div class="text-success">
        10%
      </div>
      -->
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
