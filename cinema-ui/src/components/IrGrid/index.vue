<template>
  <v-grid
    v-if="gridRefresh"
    theme="default"
    :source="rowData"
    :columns="mColumnSetting"
    :readonly="readonly"
    :row-headers="true"
    :resize="true"
    :range="true"
    :rowSize="32"
    :columnTypes="columnTypes"
    @beforesortingapply="handleBeforesortingapply"
    @beforecellfocus="handleBeforecellfocus"
    @beforeeditstart="handleBeforeeditstart"
  ></v-grid>
</template>
<script setup lang="ts">
import VGrid from "@revolist/vue3-datagrid";
import GridTag from '@/components/IrGrid/GridTag.vue';
import RowCheckbox from '@/components/IrGrid/RowCheckbox.vue';
import HeaderCheckbox from '@/components/IrGrid/HeaderCheckbox.vue';
import GridButton from '@/components/IrGrid/GridButton.vue';
import GridSwitch from '@/components/IrGrid/GridSwitch.vue';
import GridLink from '@/components/IrGrid/GridLink.vue';
import DateTimeEditor from '@/components/IrGrid/DateTimeEditor.vue';
import SelectEditor from '@/components/IrGrid/SelectEditor.vue';
import Validate from '@/components/IrGrid/Validate.vue';
import i18n from "@/lang";
import { VGridVueTemplate } from "@revolist/vue3-datagrid";
import { h } from 'vue';
import { useI18n } from 'vue-i18n';
import { ComponentInternalInstance } from "vue";
const { locale } = useI18n();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const props = defineProps({
  rowData: {
    type: Array<any>,
    default: null,
  },
  columnSetting: {
    type: Array<any>,
    default: null
  },
  rowKey: {
    type: String,
    default: 'unknown'
  },
  readonly: {
    type: Boolean,
    default: false
  },
  checkboxCol: {
    type: Boolean,
    default: false
  },
  columnTypes: {
    type: Object,
    default: null
  },
  reRender: {
    type: Boolean,
    default: false
  },
  rowDelete: {
    type: Boolean,
    default: false
  }
});
const columnNames = ref<any>([]);
const buttonNames = ref<any>([]);
const preventEditCol = ref<any>([]);
const gridRefresh = ref(true);
const ids = ref(<any>[]);
const checkAll = ref(false);
const emit = defineEmits(['update:rowData', 'update:columnSetting', 'onSelectedChange', 'onSorting', 'onSelectCell', 'spliceRowData']);
const mRowData = computed({
  get: () => props.rowData,
  set: (val) => {
    emit('update:rowData', val)
  }
});
const mColumnSetting = computed({
  get: () => getColumnSetting(),
  set: (val) => {
    emit('update:columnSetting', val)
  }
});

const checkHeaderCheckboxChange = () => {
  ids.value = [];
  for (let i = 0; i < mRowData.value.length; i++) {
    mRowData.value[i].checkbox = checkAll.value;
    if (mRowData.value[i].checkbox) {
      ids.value.push(mRowData.value[i][props.rowKey]);
    }
  }
  emit('onSelectedChange', ids);
}

const checkRowCheckboxChange = () => {
  let isAllCheck = true;
  if (mRowData.value.length === 0) {
    return;
  }
  ids.value = [];
  for (let i = 0; i < mRowData.value.length; i++) {
    if (!mRowData.value[i].checkbox) {
      isAllCheck = false;
    } else {
      ids.value.push(mRowData.value[i][props.rowKey]);
    }
  }
  checkAll.value = isAllCheck;
  emit('onSelectedChange', ids);
}
const handleBeforesortingapply = (e: any) => {
  e.preventDefault();
  let column = e.detail.column.prop;
  let order = e.detail.column.order;
  emit('onSorting', {column, order});
}
const handleBeforecellfocus = (e: any) => {
  emit('onSelectCell', e.detail);
}
const getColumnSetting = () => {
  let columns: any = props.checkboxCol ? [{
    prop: "checkbox",
    name: '',
    readonly: () => true,
    cellTemplate: VGridVueTemplate(h(RowCheckbox, {
      onChange: () => {
        checkRowCheckboxChange();
      },
      data: mRowData,
      checkAll: checkAll
    })),
    columnTemplate: VGridVueTemplate(h(HeaderCheckbox, {
      onChange: () => {
        checkHeaderCheckboxChange();
      },
      checkAll: checkAll,
    })),
    size: 33,
    pin: 'colPinStart'
  }].concat(props.columnSetting) : [{}].concat(props.columnSetting);
  if (!props.checkboxCol) {
    columns.splice(0, 1);
  }
  let i = columns.length
  preventEditCol.value = [];
  if (!columnNames.value.length) {
    columns.forEach((column: any) => {
      columnNames.value.push(column.name);
    });
  }
  while (i--) {
    columns[i].name = i18n.global.t(columnNames.value[i]);
    if (columns[i].show !== undefined && columns[i].show !== null && !columns[i].show && 'checkbox' !== columns[i].prop) {
      columns.splice(i, 1);
    } else {
      if ('left' === columns[i].align) {
        columns[i].cellProperties = () => { return { class: { 'align-left': true } }; };
      } else if ('right' === columns[i].align) {
        columns[i].cellProperties = () => { return { class: { 'align-right': true } }; };
      }
      if (columns[i].required) {
        columns[i].columnTemplate = (createElement: any, column: any) => { return createElement('span', {innerHTML: column.name + '<span class="grid-label-req"> *</span>'}, ''); };
      }
      if (columns[i].dictData) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridTag, { dictData: ref(columns[i].dictData) }));
      } else if (columns[i].buttonProps) {
        if (!buttonNames.value.length) {
          columns[i].buttonProps.forEach((button: any) => {
            buttonNames.value.push(button.title);
          });
        }
        columns[i].buttonProps.forEach((button: any, index: number) => {
          button.title = i18n.global.t(buttonNames.value[index]);
        });
        columns[i].cellTemplate = VGridVueTemplate(h(GridButton, { buttonProps: columns[i].buttonProps }));
      } else if (columns[i].switchFunc) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridSwitch, { change: columns[i].switchFunc }));
      } else if (columns[i].click) {
        columns[i].cellTemplate = VGridVueTemplate(h(GridLink, { click: columns[i].click }));
      } else if (columns[i].editor && columns[i].editor === 'datetime') {
        let props = {
          datePickerProps: {
            pickerType: 'date',
            valueFormat: 'YYYY-MM-DD HH:mm:ss',
            format: 'DD/MM/YYYY',
            placeholder: 'DD/MM/YYYY'
          }
        };
        if (columns[i].datePickerProps) {
          if (columns[i].datePickerProps.pickerType && columns[i].datePickerProps.pickerType !== '') {
            props.datePickerProps.pickerType = columns[i].datePickerProps.pickerType;
          }
          if (columns[i].datePickerProps.valueFormat && columns[i].datePickerProps.valueFormat !== '') {
            props.datePickerProps.valueFormat = columns[i].datePickerProps.valueFormat;
          }
          if (columns[i].datePickerProps.format && columns[i].datePickerProps.format !== '') {
            props.datePickerProps.format = columns[i].datePickerProps.format;
          }
          if (columns[i].datePickerProps.placeholder && columns[i].datePickerProps.placeholder !== '') {
            props.datePickerProps.placeholder = columns[i].datePickerProps.placeholder;
          }
        }
        columns[i].cellTemplate = VGridVueTemplate(h(DateTimeEditor, props));
        preventEditCol.value.push(columns[i].prop);
      } else if (columns[i].editor && columns[i].editor === 'select') {
        let props = {
          selectProps: columns[i].selectProps
        }
        columns[i].cellTemplate = VGridVueTemplate(h(SelectEditor, props));
        preventEditCol.value.push(columns[i].prop);
      } else if (columns[i].validate) {
        columns[i].cellTemplate = VGridVueTemplate(h(Validate, { validateProp: columns[i].validate }));
      } else if ('checkbox' !== columns[i].prop && (columns[i].cellTemplate === undefined || columns[i].cellTemplate === null)) {
        columns[i].cellTemplate = (createElement: any, props: any) => { return createElement('div', {class: 'grid-text-container'}, props.model[props.prop]); };
      }
    }
  }
  if (props.rowDelete) {
    columns = [{
      prop: 'deleteButton',
      name: '',
      readonly: () => true,
      cellTemplate: VGridVueTemplate(h(GridButton, {
        buttonProps: [{
          index: 1, icon: 'delete', title: '', color: 'red',
          click: (rowIndex: number) => { emit('spliceRowData', rowIndex)}
        }]
      })),
      size: 50,
      pin: 'colPinStart'
    }].concat(columns);
  }
  return columns;
}
const handleBeforeeditstart = (e: any) => {
  if (preventEditCol.value.includes(e.detail.prop)) {
    e.preventDefault();
  }
}
const validate = () => {
  if (!props.rowData.length) {
    proxy?.$modal.alertWarning(i18n.global.t('irgrid.validateNotInput'), i18n.global.t('irgrid.validateTt'));
    return false;
  }
  for (let i = 0; i < props.rowData.length; i++) {
    for (let j = 0; j < props.columnSetting.length; j++) {
      if (props.columnSetting[j].required) {
        if (!props.rowData[i][props.columnSetting[j].prop]) {
          proxy?.$modal.alertWarning(i18n.global.t('irgrid.validateDetail', { col: props.columnSetting[j].name, row: (i + 1) }), i18n.global.t('irgrid.validateTt'));
          return false;
        }
      }
    }
  }
  return true;
}
// exposed
defineExpose({
  validate,
});
watch(() => proxy?.$route, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
}, { immediate: true });
watch(() => props.reRender, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
}, { immediate: true });
watch(() => mColumnSetting.value, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
}, { immediate: true });
watch(() => locale.value, () => {
  gridRefresh.value = false;
  nextTick(() => {
    gridRefresh.value = true;
  });
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.module.scss";
.grid-text-container {
  width: 100%;
  height: 100%;
  padding: 8px;
}
.grid-label-req {
  color: $red-500;
}
</style>
