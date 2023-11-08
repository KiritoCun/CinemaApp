<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="tableList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item label="Data source" prop="dataName" class="form-item-search">
        <el-select
          v-model="queryParams.dataName"
          filterable
          clearable
          placeholder="Select/Enter data source"
          style="width: 120px"
          @change="handleQuery"
        >
          <el-option key="" label="All" value="" />
          <el-option v-for="item in dataNameList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Table name" prop="tableName" class="form-item-search">
        <el-input v-model="queryParams.tableName" placeholder="Enter table name" clearable style="width: 140px" @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="Table description" prop="tableComment" class="form-item-search">
        <el-input
          v-model="queryParams.tableComment"
          placeholder="Enter table description"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="Creation time" style="width: 225px" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          start-placeholder="Start date"
          end-placeholder="End date"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton colorStyle="blue" type="secondary" title="Generate" leftIcon="download" v-hasPermi="['tool:gen:code']" @onClick="handleGenTable" />
      <IrButton colorStyle="yellow" type="secondary" title="Import" leftIcon="upload" v-hasPermi="['tool:gen:import']" @onClick="openImportTable" />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        title="Edit"
        leftIcon="edit"
        v-hasPermi="['tool:gen:edit']"
        @onClick="handleEditTable"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        title="Delete"
        leftIcon="delete"
        v-hasPermi="['tool:gen:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:dialog>
      <!-- preview interface -->
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <el-tabs v-model="preview.activeName">
            <el-tab-pane
              v-for="(value, key) in preview.data"
              :label="(key as any).substring((key as any).lastIndexOf('/') + 1, (key as any).indexOf('.vm'))"
              :name="(key as any).substring((key as any).lastIndexOf('/') + 1, (key as any).indexOf('.vm'))"
              :key="value"
            >
              <el-link :underline="false" icon="DocumentCopy" v-copyText="value" v-copyText:callback="copyTextSuccess" style="float:right"
                >&nbsp;Copy</el-link
              >
              <pre>{{ value }}</pre>
            </el-tab-pane>
          </el-tabs>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" title="Cancel" :width="100" @onClick="dialog.visible = false" />
        </template>
      </IrDialog>
      <import-table ref="importRef" @ok="handleQuery" />
    </template>
  </Layout1>
</template>

<script setup name="Gen" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import importTable from './importTable.vue';
// IMPORT API
import { listTable, previewTable, delTable, genCode, synchDb, getDataNames } from '@/api/tool/gen';
// IMPORT TYPE
import { TableQuery, TableVO } from '@/api/tool/gen/types';
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import router from '@/router';
import { ComponentInternalInstance } from 'vue';
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const tableList = ref<TableVO[]>([]);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const uniqueId = ref("");
const rowKey = ref('tableId');
const dataNameList = ref<Array<string>>([]);
const importRef = ref(importTable);
const queryParams = ref<TableQuery>({
  pageNum: 1,
  pageSize: 20,
  tableName: '',
  tableComment: '',
  dataName: "",
  orderByColumn: 'createTime',
  isAsc: 'descending'
})
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "tableId", name: 'ID', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "dataName", name: 'Data source', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "tableName", name: 'Table name', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "tableComment", name: 'Table description', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "className", name: 'Class name', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "createTime", name: 'Creation time', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "updateTime", name: 'Update time', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'Operate', size: 170, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'eye', color: 'blue', permissionKey: 'tool:gen:preview',
        click: (rowIndex: number) => { handlePreview(tableList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'edit', color: 'gray', permissionKey: 'tool:gen:edit',
        click: (rowIndex: number) => { handleEditTable(tableList.value[rowIndex]); }
      },
      {
        index: 3, icon: 'delete', color: 'red', permissionKey: 'tool:gen:remove',
        click: (rowIndex: number) => { handleDelete(tableList.value[rowIndex]); }
      },
      {
        index: 4, icon: 'refresh', color: 'yellow', permissionKey: 'tool:gen:edit',
        click: (rowIndex: number) => { handleSynchDb(tableList.value[rowIndex]); }
      },
      {
        index: 5, icon: 'download', color: 'green', permissionKey: 'tool:gen:code',
        click: (rowIndex: number) => { handleGenTable(tableList.value[rowIndex]); }
      }
    ]
  }
]);
const preview = ref<any>({
  data: {},
  activeName: 'domain.java'
})
const dialog = reactive<DialogOption>({
  visible: false,
  title: 'Code preview',
  width: '80%'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query multiple data source names */
const getDataNameList = async () => {
  const res = await getDataNames()
  dataNameList.value = res.data;
}

/** query table collection */
const getList = async () => {
  loading.value = true;
  const res = await listTable(proxy?.addDateRange(queryParams.value, dateRange.value));
  tableList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** generate code action */
const handleGenTable = async (row?: TableVO) => {
  const tbIds = row?.tableId || ids.value;
  if (tbIds == "") {
    proxy?.$modal.msgError('Please select the data to generate');
    return;
  }
  if (row?.genType === "1") {
    await genCode(row.tableId);
    proxy?.$modal.msgSuccess('Generated successfully to custom path: ' + row.genPath);
  } else {
    proxy?.$download.zip('/tool/gen/batchGenCode?tableIdStr=' + tbIds, 'eport_vict.zip');
  }
}
/** Synchronous database operations */
const handleSynchDb = async (row: TableVO) => {
  const tableId = row.tableId;
  await proxy?.$modal.confirmWarning('Are you sure you want to forcibly synchronize the "' + row.tableName + '" table structure?');
  await synchDb(tableId);
  proxy?.$modal.msgSuccess('Synchronization succeeded');
}
/** Open the import table popup */
const openImportTable = () => {
  importRef.value.show(queryParams.value.dataName);
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['', ''];
  handleQuery();
}
/** preview button */
const handlePreview = async (row: TableVO) => {
  const res = await previewTable(row.tableId);
  preview.value.data = res.data;
  dialog.visible = true;
  preview.value.activeName = 'domain.java';
}
/** Copy code successfully */
const copyTextSuccess = () => {
  proxy?.$modal.msgSuccess('Copy successfully');
}
/** Edit button action */
const handleEditTable = (row?: TableVO) => {
  const tableId = row?.tableId || ids.value[0];
  router.push({ path: '/tool/gen-edit/index/' + tableId, query: { pageNum: queryParams.value.pageNum } });
}
/** Delete button action */
const handleDelete = async (row?: TableVO) => {
  const tableIds = row?.tableId || ids.value;
  await proxy?.$modal.confirmDelete('Are you sure to delete the data item table number "' + tableIds + '"?');
  await delTable(tableIds);
  getList();
  proxy?.$modal.msgSuccess('Deleted successfully');
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onActivated(() => {
  const time = route.query.t;
  if (time != null && time != uniqueId.value) {
    uniqueId.value = time as string;
    queryParams.value.pageNum = Number(route.query.pageNum);
    dateRange.value = ['', ''];
    getList();
  }
})
onMounted(() => {
  getList();
  getDataNameList();
})
</script>
