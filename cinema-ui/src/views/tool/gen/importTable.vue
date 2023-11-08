<template>
  <!-- import table -->
  <IrDialog :dialog="dialog">
    <template v-slot:body>
      <Layout1
        :loading="loading"
        :queryParams="queryParams"
        :total="total"
        :rowData="dbTableList"
        :columnSetting="columns"
        :rowKey="rowKey"
        :checkboxCol="true"
        :dialog="true"
        @onSearch="handleQuery"
        @onReset="resetQuery"
        @onSelectedRows="handleSeletectRows"
        @onPaging="getList"
      >
        <template v-slot:search-input>
          <el-form-item label="Data source" prop="dataName" class="form-item-search">
            <el-select v-model="queryParams.dataName" filterable placeholder="Select/Enter data source" style="width: 200px" @change="handleQuery">
              <el-option v-for="item in dataNameList" :key="item" :label="item" :value="item"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Table name" prop="tableName" class="form-item-search">
            <el-input v-model="queryParams.tableName" placeholder="Enter table name" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="Table description" prop="tableComment" class="form-item-search">
            <el-input v-model="queryParams.tableComment" placeholder="Enter table description" clearable @keyup.enter="handleQuery" />
          </el-form-item>
        </template>
      </Layout1>
    </template>
    <template v-slot:footer>
      <IrButton colorStyle="gray" type="secondary" title="Cancel" :width="100" @onClick="dialog.visible = false" />
      <IrButton colorStyle="blue" type="primary" title="OK" :width="100" @onClick="handleImportTable" />
    </template>
  </IrDialog>
</template>

<script setup lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listDbTable, importTable, getDataNames } from '@/api/tool/gen';
// IMPORT TYPE
import { DbTableQuery, DbTableVO } from '@/api/tool/gen/types';
// IMPORT GLOBAL TOOL (PROXY)
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(false);
const total = ref(0);
const tables = ref<Array<string>>([]);
const dbTableList = ref<Array<DbTableVO>>([]);
const rowKey = ref('tableName');
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "tableName", name: 'Table name', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "tableComment", name: 'Table comment', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "createTime", name: 'Creation time', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "updateTime", name: 'Update time', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  }
]);
const queryParams = reactive<DbTableQuery>({
  pageNum: 1,
  pageSize: 20,
  dataName: '',
  tableName: '',
  tableComment: '',
  orderByColumn: 'createTime',
  isAsc: 'descending'
});
const dataNameList = ref<Array<string>>([]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: 'Import table',
  width: '1100px'
});
const emit = defineEmits(["ok"]);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string)[]; }) => {
  tables.value = selectedIds.value;
}
/** list of query parameters */
const show = (dataName: string) => {
  getDataNameList();
  if(dataName){
    queryParams.dataName = dataName;
  } else {
    queryParams.dataName = 'master';
  }
  dialog.visible = true;
  getList();
}
/** query table data */
const getList = async () => {
  loading.value = true;
  const res = await listDbTable(queryParams);
  dbTableList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Search button action */
const handleQuery = () => {
  queryParams.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Import button action */
const handleImportTable = async () => {
  const tableNames = tables.value.join(",");
  if (tableNames == "") {
    proxy?.$modal.msgError("Please select a table to import");
    return;
  }
  const res = await importTable({ tables: tableNames, dataName: queryParams.dataName });
  proxy?.$modal.msgSuccess(res.msg);
  if (res.code === 200) {
    dialog.visible = false;
    emit("ok");
  }
}
/** Query multiple data source names */
const getDataNameList = async () => {
  const res = await getDataNames()
  dataNameList.value = res.data;
}

defineExpose({
  show,
});
</script>
