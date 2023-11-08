<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="shippinglineList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('shippinglineList.searchInput.operatorCodeLb')" prop="operatorCode" class="form-item-search">
        <el-input
          v-model="queryParams.operatorCode"
          :placeholder="$t('shippinglineList.searchInput.operatorCodePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineList.searchInput.operatorNameLb')" prop="operatorName" class="form-item-search">
        <el-input
          v-model="queryParams.operatorName"
          :placeholder="$t('shippinglineList.searchInput.operatorNamePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineList.searchInput.domesticFlagLb')" prop="domesticFlag" class="form-item-search">
        <el-select
          v-model="queryParams.domesticFlag"
          :placeholder="$t('shippinglineList.searchInput.domesticFlagPh')"
          clearable
          style="width: 200px"
          @change="handleQuery"
        >
          <el-option v-for="dict in shp_shipping_domestic" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('shippinglineList.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portShip:shippinglineList:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('shippinglineList.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portShip:shippinglineList:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('shippinglineList.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portShip:shippinglineList:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('shippinglineList.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['portShip:shippinglineList:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Shipping Line Dialog -->
          <el-form ref="shippinglineFormRef" :model="form" :rules="rules" label-width="150px" class="common-form">
            <el-form-item :label="$t('shippinglineList.dialog.operatorCodeTt')" prop="operatorCode" class="form-item-row">
              <el-input v-model="form.operatorCode" :placeholder="$t('shippinglineList.dialog.operatorCodePh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineList.dialog.operatorNameTt')" prop="operatorName" class="form-item-row">
              <el-input v-model="form.operatorName" :placeholder="$t('shippinglineList.dialog.operatorNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineList.dialog.oprListTt')" prop="oprList" class="form-item-row">
              <el-input v-model="form.oprList" :placeholder="$t('shippinglineList.dialog.oprListPh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineList.dialog.emailTt')" prop="email" class="form-item-row">
              <el-input v-model="form.email" :placeholder="$t('shippinglineList.dialog.emailPh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineList.dialog.phonenumberTt')" prop="phonenumber" class="form-item-row">
              <el-input v-model="form.phonenumber" :placeholder="$t('shippinglineList.dialog.phonenumberPh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineList.dialog.taxcodeTt')" prop="taxcode" class="form-item-row">
              <el-input v-model="form.taxcode" :placeholder="$t('shippinglineList.dialog.taxcodePh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineList.dialog.domesticFlagTt')" prop="domesticFlag" class="form-item-row">
              <el-radio-group v-model="form.domesticFlag">
                <el-radio v-for="dict in shp_shipping_domestic" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('shippinglineList.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('shippinglineList.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('shippinglineList.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('shippinglineList.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="ShippinglineList" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listShippingline, getShippingline, delShippingline, addShippingline, updateShippingline } from '@/api/portShip/shippinglineList';
// IMPORT TYPE
import { ShippinglineVO, ShippinglineQuery, ShippinglineForm } from '@/api/portShip/shippinglineList/types';
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { shp_shipping_domestic } = toRefs<any>(proxy?.useDict("shp_shipping_domestic"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const shippinglineList = ref<ShippinglineVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const shippinglineFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'shippinglineList.columns.idLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "operatorCode", name: 'shippinglineList.columns.operatorCodeLb', sortable: true, size: 150, show: true, readonly: true },
  { prop: "operatorName", name: 'shippinglineList.columns.operatorNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "oprList", name: 'shippinglineList.columns.oprListLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "email", name: 'shippinglineList.columns.emailLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "phonenumber", name: 'shippinglineList.columns.phonenumberLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "domesticFlag", name: 'shippinglineList.columns.domesticFlagLb', sortable: true, size: 130, show: true, readonly: true, dictData: shp_shipping_domestic },
  { prop: "createTime", name: 'shippinglineList.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'shippinglineList.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'shippinglineList.columns.editLb', permissionKey: 'portShip:shippinglineList:edit',
        click: (rowIndex: number) => { handleUpdate(shippinglineList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'shippinglineList.columns.deleteLb', permissionKey: 'portShip:shippinglineList:remove',
        click: (rowIndex: number) => { handleDelete(shippinglineList.value[rowIndex]); }
      }
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const initFormData: ShippinglineForm = {
  id: undefined,
  operatorCode: '',
  operatorName: '',
  oprList: '',
  email: '',
  phonenumber: '',
  taxcode: '',
  domesticFlag: 'N',
  apiFlag: 'N',
  apiPublicKey: '',
  apiPrivateKey: '',
  remark: ''
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<ShippinglineForm, ShippinglineQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    operatorCode: '',
    operatorName: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    operatorCode: [{ required: true, message: i18n.global.t('shippinglineList.dialog.rules.operatorCodeRqMsg'), trigger: "blur" }, { max: 20, message: "Length must be less than or equal 20", trigger: "blur" }],
    operatorName: [{ required: true, message: i18n.global.t('shippinglineList.dialog.rules.operatorNameRqMsg'), trigger: "blur" }, { max: 255, message: "Length must be less than or equal 255", trigger: "blur" }],
    oprList: [{ required: true, message: i18n.global.t('shippinglineList.dialog.rules.oprListRqMsg'), trigger: "blur" }, { max: 100, message: "Length must be less than or equal 100", trigger: "blur" }],
    email: [{ type: "email", message: i18n.global.t('shippinglineList.dialog.rules.emailPtMsg'), trigger: ["blur", "change"] }],
    phonenumber: [{ pattern: /^[0-9]\d{9}$/, message: i18n.global.t('shippinglineList.dialog.rules.phonenumberPtMsg'), trigger: "blur" }],
  }
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Shipping line information list */
const getList = async () => {
  loading.value = true;
  const res = await listShippingline(queryParams.value);
  shippinglineList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  shippinglineFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('shippinglineList.dialog.addTt');
  nextTick(() => {
    reset();
  });
}
/** Edit button action */
const handleUpdate = (row?: ShippinglineVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('shippinglineList.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const res = await getShippingline(id);
    Object.assign(form.value, res.data);
  });
}
/** Submit button */
const submitForm = () => {
  shippinglineFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateShippingline(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addShippingline(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('shippinglineList.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: ShippinglineVO) => {
  const shippinglineIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('shippinglineList.operationMsg.deleteCf', { shippinglineCode : (row ? ' "' + row.operatorCode + '"' : '') })).finally(() => loading.value = false);
  await delShippingline(shippinglineIds);
  proxy?.$modal.msgSuccess(i18n.global.t('shippinglineList.operationMsg.deleteSuccess'));
  await getList();
}
/** Export button action */
const handleExport = () => {
  proxy?.download('portShip/shippinglineList/export', {
    ...queryParams.value
  }, `shippingline_${new Date().getTime()}.xlsx`)
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
