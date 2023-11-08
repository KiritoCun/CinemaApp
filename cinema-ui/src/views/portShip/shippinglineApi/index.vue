<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="shippinglineApiList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('shippinglineApi.searchInput.operatorCodeLb')" prop="operatorCode" class="form-item-search">
        <el-input
          v-model="queryParams.operatorCode"
          :placeholder="$t('shippinglineApi.searchInput.operatorCodePh')"
          style="width: 150px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineApi.searchInput.operatorNameLb')" prop="operatorName" class="form-item-search">
        <el-input
          v-model="queryParams.operatorName"
          :placeholder="$t('shippinglineApi.searchInput.operatorNamePh')"
          style="width: 150px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineApi.searchInput.oprCodeLb')" prop="oprCode" class="form-item-search">
        <el-input
          v-model="queryParams.oprCode"
          :placeholder="$t('shippinglineApi.searchInput.oprCodePh')"
          style="width: 120px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineApi.searchInput.blockFlagLb')" prop="blockFlag" class="form-item-search">
        <el-select
          v-model="queryParams.blockFlag"
          :placeholder="$t('shippinglineApi.searchInput.blockFlagPh')"
          clearable
          style="width: 120px"
          @change="handleQuery"
        >
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('shippinglineApi.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portShip:shippinglineApi:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('shippinglineApi.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portShip:shippinglineApi:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('shippinglineApi.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portShip:shippinglineApi:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('shippinglineApi.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['portShip:shippinglineApi:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Shipping Line Api Dialog -->
          <el-form ref="shippinglineApiFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('shippinglineApi.dialog.shippinglineIdTt')" prop="shippinglineId" class="form-item-row">
              <el-select
                v-model="form.shippinglineId"
                :placeholder="$t('shippinglineApi.dialog.shippinglineIdPh')"
                @change="handleSelectShippingline"
              >
                <el-option
                  v-for="item in shippinglineOptions"
                  :key="item.id"
                  :label="item.operatorCode + ': ' + item.operatorName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('shippinglineApi.dialog.oprCodeTt')" prop="oprCode" class="form-item-row">
              <el-select 
                v-model="form.oprCode" 
                :placeholder="$t('shippinglineApi.dialog.oprCodePh')"
                @change="handleSelectOprCode"
              >
                <el-option v-for="item in oprOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('shippinglineApi.dialog.usernameTt')" prop="userId" class="form-item-row">
              <el-select v-model="form.userId" 
              :placeholder="$t('shippinglineApi.dialog.usernamePh')"
              @change="handleSelectUsername"
              >
                <el-option v-for="item in usernameOptions" :key="item.userId" :label="item.userName" :value="item.userId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('shippinglineApi.dialog.blockFlagTt')" prop="blockFlag" class="form-item-row">
              <el-radio-group v-model="form.blockFlag">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('shippinglineApi.dialog.apiPrivateKeyTt')" prop="apiPrivateKey" class="form-item-row">
              <el-link :underline="false" icon="DocumentCopy" v-copyText="form.apiPrivateKey" v-copyText:callback="copyTextSuccess">
                &nbsp;Copy
              </el-link>
              <el-input v-model="form.apiPrivateKey" type="textarea" rows="5" disabled />
            </el-form-item>
            <el-form-item :label="$t('shippinglineApi.dialog.apiPublicKeyTt')" prop="apiPublicKey" class="form-item-row">
              <el-link :underline="false" icon="DocumentCopy" v-copyText="form.apiPublicKey" v-copyText:callback="copyTextSuccess">
                &nbsp;Copy
              </el-link>
              <el-input v-model="form.apiPublicKey" type="textarea" rows="5" disabled />
            </el-form-item>
            <el-form-item :label="$t('shippinglineApi.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('shippinglineApi.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('shippinglineApi.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            :loadingFlag="buttonLoading"
            type="primary"
            :title="$t('shippinglineApi.dialog.footerSubmitTt')"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="ShippinglineApi" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listShippinglineApi, getShippinglineApi, getShippinglineUserList, delShippinglineApi, addShippinglineApi, updateShippinglineApi, refreshShippinglineApiKey } from '@/api/portShip/shippinglineApi';
// IMPORT TYPE
import { ShippinglineApiVO, ShippinglineApiQuery, ShippinglineApiForm } from '@/api/portShip/shippinglineApi/types';
import { ShippinglineVO } from '@/api/portShip/shippinglineList/types';
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
import { UserVO } from '@/api/system/user/types';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const shippinglineApiList = ref<ShippinglineApiVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('id');
const shippinglineOptions = ref<ShippinglineVO[]>([]);
const oprOptions = ref<string[]>([]);
const usernameOptions = ref<UserVO[]>([]);
const shippinglineApiFormRef = ref(ElForm);
let opr:any;
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'shippinglineApi.columns.idLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "operatorCode", name: 'shippinglineApi.columns.operatorCodeLb', sortable: true, size: 170, show: true, readonly: true },
  { prop: "operatorName", name: 'shippinglineApi.columns.operatorNameLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "oprCode", name: 'shippinglineApi.columns.oprCodeLb', sortable: true, size: 150, show: true, readonly: true},
  { prop: "blockFlag", name: 'shippinglineApi.columns.blockFlagLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_normal_disable },
  { prop: "createTime", name: 'shippinglineApi.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'shippinglineApi.columns.operateLb', size: 120, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'shippinglineApi.columns.editLb', permissionKey: 'portShip:shippinglineApi:edit',
        click: (rowIndex: number) => { handleUpdate(shippinglineApiList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'refresh', color: 'yellow', title: 'shippinglineApi.columns.refreshLb', permissionKey: 'portShip:shippinglineApi:refreshKey',
        click: (rowIndex: number) => { handleRefreshKey(shippinglineApiList.value[rowIndex]); }
      },
      {
        index: 3, icon: 'delete', color: 'red', title: 'shippinglineApi.columns.deleteLb', permissionKey: 'portShip:shippinglineApi:remove',
        click: (rowIndex: number) => { handleDelete(shippinglineApiList.value[rowIndex]); }
      }
    ]
  }
]);
const initFormData: ShippinglineApiForm = {
  id: undefined,
  shippinglineId: undefined,
  oprCode: '',
  userId: undefined,
  deptId: undefined,
  blockFlag: '0',
  apiPublicKey: '',
  apiPrivateKey: '',
  remark: ''
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<ShippinglineApiForm, ShippinglineApiQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    operatorCode: '',
    operatorName: '',
    oprCode: '',
    blockFlag: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    shippinglineId: [
      { required: true, message: i18n.global.t('shippinglineApi.dialog.rules.shippinglineIdRqMsg'), trigger: "blur" }
    ],
    oprCode: [
      { required: true, message: i18n.global.t('shippinglineApi.dialog.rules.oprCodeoperatorNameRqMsg'), trigger: "blur" }
    ],
    userId: [
      { required: true, message: i18n.global.t('ShippinglineApi.dialog.rules.usernameRqMsg'), trigger: "blur" }
    ],
  }
});
const { queryParams, form, rules} = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Shipping line api list */
const getList = async () => {
  loading.value = true;
  const res = await listShippinglineApi(queryParams.value);
  shippinglineApiList.value = res.rows;
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
  shippinglineApiFormRef.value.resetFields();
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
  dialog.title = i18n.global.t('shippinglineApi.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getShippinglineApi();
    shippinglineOptions.value = data.shippinglines;
  });
}
/** Edit button action */
const handleUpdate = (row?: ShippinglineApiVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('shippinglineApi.dialog.editTt');
  nextTick(async () => {
    reset();
    const id = row?.id || ids.value[0]
    const { data } = await getShippinglineApi(id);
    shippinglineOptions.value = data.shippinglines;
    // Get list business unit and username
    const shippinglineOption = shippinglineOptions.value.filter(shippingline => {
      return shippingline.id === data.shippinglineApi.shippinglineId;
    })[0];
    oprOptions.value = shippinglineOption.oprList.split(',');
    opr = shippinglineOption.operatorCode;
    nextTick(async () => {
      const { data:dataShippinglineUserList } = await getShippinglineUserList(opr, data.shippinglineApi.oprCode);
      usernameOptions.value = dataShippinglineUserList;
    });
    Object.assign(form.value, data.shippinglineApi);
  });
}
/** Handle select shipping line */
const handleSelectShippingline = (shippinglineId: number) => {
  if (shippinglineId) {
    const shippinglineOption = shippinglineOptions.value.filter(shippingline => {
      return shippingline.id === shippinglineId;
    })[0];
    oprOptions.value = shippinglineOption.oprList.split(',');
    opr = shippinglineOption.operatorCode;
  } else {
    oprOptions.value = [];
  }
  form.value.oprCode = undefined;
  form.value.userId = undefined;
  usernameOptions.value = [];
}
/** Handle select opr code */
const handleSelectOprCode = (businessUnit: string) => {
  if (businessUnit) {
    nextTick(async () => {
      const { data } = await getShippinglineUserList(opr, businessUnit);
      usernameOptions.value = data;
      form.value.userId = undefined;
    });
  } else {
    usernameOptions.value = [];
  }
}
/** Handle select username */
const handleSelectUsername = (userId: number) => {
  if (userId) {
    form.value.deptId = usernameOptions.value.filter(user => {
      return user.userId === userId;
    })[0].deptId;
  } else {
    form.value.deptId = undefined;
  }
}
/** Submit button */
const submitForm = () => {
  shippinglineApiFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateShippinglineApi(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addShippinglineApi(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('shippinglineApi.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: ShippinglineApiVO) => {
  const apiIds = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('shippinglineApi.operationMsg.deleteCf')).finally(() => loading.value = false);
  await delShippinglineApi(apiIds);
  proxy?.$modal.msgSuccess(i18n.global.t('shippinglineApi.operationMsg.deleteSuccess'));
  await getList();
}
/** Handle refresh api key */
const handleRefreshKey = async (row: ShippinglineApiVO) => {
  const id = row.id;
  await proxy?.$modal.confirmWarning(i18n.global.t('shippinglineApi.operationMsg.refreshCf', { opr : row.oprCode }));
  await refreshShippinglineApiKey(id);
  proxy?.$modal.msgSuccess(i18n.global.t('shippinglineApi.operationMsg.refreshSuccess'));
}
/** Export button action */
const handleExport = () => {
  proxy?.download('portShip/shippinglineApi/export', {
    ...queryParams.value
  }, `shippingline_api_${new Date().getTime()}.xlsx`)
}
/** Copy successfully */
const copyTextSuccess = () => {
  proxy?.$modal.msgSuccess(i18n.global.t('shippinglineApi.operationMsg.copySuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
