<template>
  <div class="grid-button-container">
    <template v-for="(item) in buttonProps" :key="item.index">
      <IrButton
        v-if="item.permissionKey && (item.onlyKeys === null || item.onlyKeys === undefined || !item.onlyKeys.includes(data[rowIndex][item.key]))"
        :leftIcon="item.icon"
        :colorStyle="item.color"
        :toolTip="item.title"
        type="grid"
        buttonSize="small"
        v-hasPermi="[item.permissionKey]"
        @onClick="item.click(rowIndex)"
      />
      <IrButton
        v-else-if="item.onlyKeys === null || item.onlyKeys === undefined || !item.onlyKeys.includes(data[rowIndex][item.key])"
        :leftIcon="item.icon"
        :colorStyle="item.color"
        :toolTip="item.title"
        type="grid"
        buttonSize="small"
        @onClick="item.click(rowIndex)"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import IrButton from '@/components/IrButton/index.vue';
/**
 * IrButton
 */
interface IrGridButton {
  index: number;
  icon: string;
  click: any;
  color: string;
  permissionKey: string;
  onlyKeys: Array<number | string>;
  key: string,
  title: string;
}
const props = defineProps({
  rowIndex: {
    type: Number,
    default: null
  },
  buttonProps: {
    type: Array<IrGridButton | any>,
    default: null,
  },
  data: {
    type: Object,
    default() {
      return {};
    }
  }
});
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.grid-button-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 100%;
}
</style>
