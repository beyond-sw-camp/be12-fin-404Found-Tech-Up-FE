<template>
  <div style="color: red">
    {{ msg }}
  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({ msg: String });

const msg = ref(props.msg);
</script>
