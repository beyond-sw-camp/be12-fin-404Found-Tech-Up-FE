<template>
  <div
    :class="[`nice-select ${className}`, { open: open }]"
    tabindex="0"
    @click.prevent="open = !open"
    role="button"
  >
    <span class="current">{{ current && current.text ? current.text : placeholder }}</span>
    <ul class="list" role="menubar" @click.prevent="$event.stopPropagation()">
      <li
        :class="[`option`, { 'selected focus': item.value === current.value }]"
        v-for="(item, index) in options"
        :key="`option-${index}`"
        @click.prevent="currentHandler(item, index)"
        role="menuitem"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "NiceSelect",
  props: {
    options: {
      type: Array,
      required: true
    },
    defaultCurrent: {
      type: Number,
      required: true
    },
    placeholder: String,
    className: String,
    name: String,
  },
  data() {
    return {
      open: false,
      current: this.options[this.defaultCurrent],
    };
  },
  methods: {
    onClose() {
      this.open = false;
    },
    currentHandler(item, index) {
      this.current = this.options[index];
      this.$emit("onChange", item);
      this.onClose();
    },
  },
});
</script>

<style scoped>
.nice-select .current,
.nice-select .option {
  white-space: pre-wrap;
}
</style>