<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="edoConsigneeList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('edoConsignee.searchInput.consigneeNameLb')" prop="consigneeName" class="form-item-search">
        <el-input
          v-model="queryParams.consigneeName"
          :placeholder="$t('edoConsignee.searchInput.consigneeNamePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('edoConsignee.searchInput.taxCodeLb')" prop="taxCode" class="form-item-search">
        <el-input
          v-model="queryParams.taxCode"
          :placeholder="$t('edoConsignee.searchInput.taxCodePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('edoConsignee.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['shpEdo:consignee:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('edoConsignee.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['shpEdo:consignee:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('edoConsignee.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['shpEdo:consignee:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('edoConsignee.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['shpEdo:consignee:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify EdoConsignee Dialog -->
          <el-form ref="edoConsigneeFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-form-item :label="$t('edoConsignee.dialog.consigneeNameLb')" prop="consigneeName" class="form-item-row">
              <el-input v-model="form.consigneeName" :placeholder="$t('edoConsignee.dialog.consigneeNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('edoConsignee.dialog.taxCodeLb')" prop="taxCode" class="form-item-row">
              <el-input v-model="form.taxCode" :placeholder="$t('edoConsignee.dialog.taxCodePh')" />
            </el-form-item>
            <el-form-item :label="$t('edoConsignee.dialog.addressLb')" prop="address" class="form-item-row">
              <el-input v-model="form.address" :placeholder="$t('edoConsignee.dialog.addressPh')" />
            </el-form-item>
            <el-form-item :label="$t('edoConsignee.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('edoConsignee.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('edoConsignee.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            type="primary"
            :loadingFlag="buttonLoading"
            :title="$t('edoConsignee.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>
<script setup name="EdoConsignee" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listEdoConsignee, addEdoConsignee, delEdoConsignee, getEdoConsignee, updateEdoConsignee } from "@/api/shpEdo/consignee";
// IMPORT TYPE
import { EdoConsigneeForm, EdoConsigneeQuery, EdoConsigneeVO } from "@/api/shpEdo/consignee/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(true);
const buttonLoading = ref(false);
const edoConsigneeList = ref<EdoConsigneeVO[]>([]);
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('id');
const edoConsigneeFormRef = ref(ElForm);
const initFormData: EdoConsigneeForm = {
  id: undefined,
  shippinglineId: undefined,
  consigneeName: undefined,
  taxCode: undefined,
  address: undefined,
  remark: undefined
}
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'edoConsignee.columns.idLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "consigneeName", name: 'edoConsignee.columns.consigneeNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "taxCode", name: 'edoConsignee.columns.taxCodeLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "address", name: 'edoConsignee.columns.addressLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "remark", name: 'edoConsignee.columns.remarkLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "createTime", name: 'post.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'edoConsignee.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', title: 'edoConsignee.columns.operateEditLb', color: 'gray', permissionKey: 'shpEdo:consignee:edit',
        click: (rowIndex: number) => { handleUpdate(edoConsigneeList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', title: 'edoConsignee.columns.operateDeleteLb', color: 'red', permissionKey: 'shpEdo:consignee:remove',
        click: (rowIndex: number) => { handleDelete(edoConsigneeList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});
// eslint-disable-next-line no-undef
const data = reactive<PageData<EdoConsigneeForm, EdoConsigneeQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    shippinglineId: undefined,
    consigneeName: undefined,
    taxCode: undefined,
    address: undefined,
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    consigneeName: [{ required: true, message: i18n.global.t('edoConsignee.dialog.rules.consigneeNameRqMsg'), trigger: "blur" }],
    taxCode: [{ required: true, message: i18n.global.t('edoConsignee.dialog.rules.taxCodeRqMsg'), trigger: "blur" }],
  }
});
// eslint-disable-next-line no-undef
const { queryParams, form, rules } = toRefs<PageData<EdoConsigneeForm, EdoConsigneeQuery>>(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Edo Consignee list */
const getList = async () => {
  loading.value = true;
  const res = await listEdoConsignee(queryParams.value);
  edoConsigneeList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1
  getList()
}
/** Reset button action */
const resetQuery = () => {
  queryParams.value.pageNum = 1;
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('edoConsignee.dialog.addTt');
  nextTick(() => {
    reset();
  })
}
/** Edit button action */
const handleUpdate = (row?: EdoConsigneeVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('edoConsignee.dialog.editTt');
  nextTick(async () => {
    reset();
    const _id = row?.id || ids.value[0]
    const res = await getEdoConsignee(_id);
    Object.assign(form.value, res.data);
  })
}
/** Delete button action */
const handleDelete = async (row?: EdoConsigneeVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('edoConsignee.operationMsg.deleteCf', { consigneeName: (row ? ' "' + row?.consigneeName + '"' : '') })).finally(() => loading.value = false);
  await delEdoConsignee(_ids);
  proxy?.$modal.msgSuccess(i18n.global.t('edoConsignee.operationMsg.deleteSuccess'));
  await getList();
}
/** Export button action */
const handleExport = () => {
  proxy?.download('shippingline/edoConsignee/export', {
    ...queryParams.value
  }, `edoConsignee_${new Date().getTime()}.xlsx`);
}
/** Submit button */
const submitForm = () => {
  edoConsigneeFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateEdoConsignee(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addEdoConsignee(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('edoConsignee.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  edoConsigneeFormRef.value.resetFields();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
