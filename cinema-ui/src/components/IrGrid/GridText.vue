<template>
  <div class="grid-text-container">
    {{ mData[rowIndex][prop] }}
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  rowIndex: {
    type: Number,
    default: null
  },
  prop: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    default() {
      return {};
    }
  },
  datePickerProps: {
    type: Object,
    default() {
      return {};
    }
  }
});
const emit = defineEmits(['update:data']);
const mData = computed({
  get: () => props.data,
  set: (val) => {
    emit('update:data', val)
  }
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-text-container {
  width: 100%;
  height: 100%;
  padding: 8px;
}
</style>
