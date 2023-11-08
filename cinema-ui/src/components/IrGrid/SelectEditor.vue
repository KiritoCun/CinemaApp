<template>
  <div class="grid-editor-container">
    <el-select
      v-model="mData[props.rowIndex][props.prop]"
      popper-class="grid-editor"
      placeholder=""
      @change="handleSelectedChange"
      filterable
      clearable
    >
      <template v-if="selectProps.dictData">
        <el-option v-for="dict in selectProps.dictData" :key="dict.dictCode" :label="dict.label" :value="dict.value" />
      </template>
      <v-else>
        <el-option
          v-for="item in selectProps.dataSource"
          :key="item[selectProps.key]"
          :label="item[selectProps.label]"
          :value="item[selectProps.value]"
        />
      </v-else>
    </el-select>
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
  selectProps: {
    type: Object,
    default: null
  },
});
const emit = defineEmits(['update:data']);
const mData = computed({
  get: () => props.data,
  set: (val) => {
    emit('update:data', val)
  }
});
const handleSelectedChange = () => {
  if (props.selectProps.selectFunc) {
    if (props.selectProps.dictData && props.selectProps.dictData.length !== 0) {
      for (let i = 0; i < props.selectProps.dictData.length; i++) {
        if (mData.value[props.rowIndex][props.prop] === props.selectProps.dictData[i].value) {
          props.selectProps.selectFunc(props.rowIndex, props.selectProps.dictData[i]);
          return;
        }
      }
    } else {
      for (let i = 0; i < props.selectProps.dataSource.length; i++) {
        if (mData.value[props.rowIndex][props.prop] === props.selectProps.dataSource[i][props.selectProps.value]) {
          props.selectProps.selectFunc(props.rowIndex, props.selectProps.dataSource[i]);
          return;
        }
      }
    }
  }
}
watch(() => mData.value[props.rowIndex][props.prop], (v) => {
  if (props.selectProps.dictData && props.selectProps.dictData.length !== 0 && v) {
    for (let i = 0; i < props.selectProps.dictData.length; i++) {
      if (mData.value[props.rowIndex][props.prop] === props.selectProps.dictData[i].value) {
        return;
      }
    }
  } else {
    for (let i = 0; i < props.selectProps.dataSource.length; i++) {
      if (mData.value[props.rowIndex][props.prop] === props.selectProps.dataSource[i][props.selectProps.value]) {
        return;
      }
    }
  }
  mData.value[props.rowIndex][props.prop] = '';
}, { immediate: true });
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-editor-container {
  .el-select.el-select--default {
    height: 31px;
    min-height: 31px;
    width: 100%;
    padding: 0;
    .el-input.el-input--default {
      height: 31px;
    }
    .el-input__wrapper {
      height: 31px;
      min-height: 31px;
      border: none;
      box-shadow: none !important;
      &:hover {
        border: none;
      }
    }
  }
  .el-select.el-select--default .select-trigger .el-input.is-focus .el-input__wrapper {
    box-shadow: none !important;
    border: none;
  }
  .el-select.el-select--default .select-trigger .el-input .el-input__wrapper.is-focus {
    box-shadow: none !important;
    border: none;
  }
}
.el-popper.grid-editor {
  margin-top: -11px !important;
  .el-scrollbar__view {
    margin: 0 !important;
    .el-select-dropdown__item {
      height: 24px;
      padding: 4px 12px;
      line-height: 16px;
      span {
        color: $gray-700;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
      }
    }
    .el-select-dropdown__item.selected {
      background-color: $blue-50 !important;
      span {
        color: $blue-500;
      }
    }
    .el-select-dropdown__item.hover {
      background-color: $gray-100;
      &:active {
        background-color: $gray-200;
      }
    }
  }
}
</style>
