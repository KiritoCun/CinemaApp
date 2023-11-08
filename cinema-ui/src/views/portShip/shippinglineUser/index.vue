<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="userList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('shippinglineUser.searchInput.userNameLb')" prop="userName" class="form-item-search">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('shippinglineUser.searchInput.userNamePh')"
          clearable
          style="width: 130px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineUser.searchInput.phonenumberLb')" prop="phonenumber" class="form-item-search">
        <el-input
          v-model="queryParams.phonenumber"
          :placeholder="$t('shippinglineUser.searchInput.phonenumberPh')"
          clearable
          style="width: 160px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineUser.searchInput.operatorNameLb')" prop="operatorName" class="form-item-search">
        <el-input
          v-model="queryParams.operatorName"
          :placeholder="$t('shippinglineUser.searchInput.operatorNamePh')"
          clearable
          style="width: 170px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineUser.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('shippinglineUser.searchInput.statusPh')" clearable style="width: 120px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('shippinglineUser.searchInput.createTimeLb')" style="width: 230px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('shippinglineUser.searchInput.createTimeStartPh')"
          :end-placeholder="$t('shippinglineUser.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('shippinglineUser.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['portShip:shippinglineUser:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('shippinglineUser.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['portShip:shippinglineUser:add']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('shippinglineUser.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['portShip:shippinglineUser:delete']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('shippinglineUser.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['portShip:shippinglineUser:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Post Dialog -->
          <el-form ref="userFormRef" :model="form" :rules="rules" label-width="110px" class="common-form">
            <el-form-item :label="$t('shippinglineUser.dialog.shippinglineIdLb')" prop="shippinglineId" class="form-item-row">
              <el-select
                v-model="form.shippinglineId"
                :placeholder="$t('shippinglineUser.dialog.shippinglineIdPh')"
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
            <el-form-item :label="$t('shippinglineUser.dialog.oprLb')" prop="shippinglineOprs" class="form-item-row">
              <el-select v-model="form.shippinglineOprs" :placeholder="$t('shippinglineUser.dialog.oprPh')" multiple>
                <el-option v-for="item in oprOptions" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('shippinglineUser.dialog.nickNameLb')" prop="nickName" class="form-item-row">
              <el-input v-model="form.nickName" :placeholder="$t('shippinglineUser.dialog.nickNamePh')" maxlength="30" />
            </el-form-item>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('shippinglineUser.dialog.phonenumberLb')" prop="phonenumber" class="form-item-row">
                  <el-input v-model="form.phonenumber" :placeholder="$t('shippinglineUser.dialog.phonenumberPh')" maxlength="11" />
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item :label="$t('shippinglineUser.dialog.emailLb')" prop="email" class="form-item-row">
                  <el-input v-model="form.email" :placeholder="$t('shippinglineUser.dialog.emailPh')" maxlength="50" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item v-if="form.userId == undefined" :label="$t('shippinglineUser.dialog.userNameLb')" prop="userName" class="form-item-row">
                  <el-input v-model="form.userName" :placeholder="$t('shippinglineUser.dialog.userNamePh')" maxlength="30" />
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item v-if="form.userId == undefined" :label="$t('shippinglineUser.dialog.passwordLb')" prop="password" class="form-item-row">
                  <el-input
                    v-model="form.password"
                    :placeholder="$t('shippinglineUser.dialog.passwordPh')"
                    type="password"
                    maxlength="20"
                    show-password
                  />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('shippinglineUser.dialog.sexLb')" class="form-item-row">
                  <el-select v-model="form.sex" :placeholder="$t('shippinglineUser.dialog.sexPh')">
                    <el-option v-for="dict in sys_user_sex" :key="dict.value" :label="dict.label" :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="2" />
              <el-col :span="11">
                <el-form-item :label="$t('shippinglineUser.dialog.statusLb')" class="form-item-row">
                  <el-radio-group v-model="form.status">
                    <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
                    dict.label }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="$t('shippinglineUser.dialog.roleIdsLb')" class="form-item-row">
              <el-select v-model="form.roleIds" multiple :placeholder="$t('shippinglineUser.dialog.roleIdsPh')">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == '1'"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('shippinglineUser.dialog.remarkLb')" class="form-item-row">
                  <el-input v-model="form.remark" type="textarea" :placeholder="$t('shippinglineUser.dialog.remarkPh')"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('shippinglineUser.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('shippinglineUser.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>
<script setup name="ShippinglineUser" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import { DateModelType, ElForm } from 'element-plus';
// IMPORT API
import {
  changeUserStatus,
  listUser,
  resetUserPwd,
  delUser,
  getUser,
  updateUser,
  addUser
} from "@/api/portShip/shippinglineUser"
// IMPORT TYPE
import { UserForm, UserQuery, UserVO } from '@/api/portShip/shippinglineUser/types';
import { RoleVO } from "@/api/portShip/shippinglineRole/types";
import { ShippinglineVO } from "@/api/portShip/shippinglineList/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang/index';
import { ComponentInternalInstance } from "vue";
import { to } from "await-to-js";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
// IMPORT DICTIONARY
const { sys_normal_disable, sys_user_sex } = toRefs<any>(proxy?.useDict('sys_normal_disable', 'sys_user_sex'));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const loading = ref(true);
const userList = ref<UserVO[]>();
const ids = ref<Array<number | string>>([]);
const total = ref(0);
const rowKey = ref('userId');
const dateRange = ref<[DateModelType, DateModelType]>(['','']);
const initPassword = ref('123456');
const roleOptions = ref<RoleVO[]>([]);
const shippinglineOptions = ref<ShippinglineVO[]>([]);
const oprOptions = ref<string[]>([]);
const userFormRef = ref(ElForm);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '750px'
});
const initFormData: UserForm = {
  userId: undefined,
  deptId: undefined,
  userName: '',
  nickName: undefined,
  password: '',
  phonenumber: undefined,
  email: undefined,
  sex: undefined,
  status: "0",
  remark: '',
  roleIds: [],
  oprList: '',
  shippinglineOprs: [],
  shippinglineId: undefined
}
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "userId", name: 'shippinglineUser.columns.userIdLb', sortable: true, size: 100, show: false, readonly: true },
  { prop: "userName", name: 'shippinglineUser.columns.userNameLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
  { prop: "nickName", name: 'shippinglineUser.columns.nickNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left'},
  { prop: "operatorName", name: 'shippinglineUser.columns.operatorNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left'},
  { prop: "phonenumber", name: 'shippinglineUser.columns.phonenumberLb', sortable: true, size: 140, show: true, readonly: true },
  { prop: "status", name: 'shippinglineUser.columns.statusLb', sortable: true, size: 120, show: true, readonly: true,
    switchFunc: (rowIndex: number) => { if (userList.value) handleStatusChange(userList.value[rowIndex]); }
  },
  { prop: "createTime", name: 'shippinglineUser.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'shippinglineUser.columns.operateLb', size: 170, show: true, readonly: true, pin: 'colPinEnd',
      buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'shippinglineUser.columns.operateEditLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'portShip:shippinglineUser:edit',
        click: (rowIndex: number) => { if (userList.value) handleUpdate(userList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'shippinglineUser.columns.operateDeleteLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'portShip:shippinglineUser:remove',
        click: (rowIndex: number) => { if (userList.value) handleDelete(userList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'reset-pass', color: 'yellow', title: 'shippinglineUser.columns.operateResetPwdLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'portShip:shippinglineUser:resetPwd',
        click: (rowIndex: number) => { if (userList.value) handleResetPwd(userList.value[rowIndex]); }
      },
      {
        index: 2, icon: 'assign-role', color: 'green', title: 'shippinglineUser.columns.operateAuthRoleLb', onlyKeys: [1], key: rowKey.value, permissionKey: 'portShip:shippinglineUser:edit',
        click: (rowIndex: number) => { if (userList.value) handleAuthRole(userList.value[rowIndex]); }
      }
    ]
  }
]);
// eslint-disable-next-line no-undef
const data = reactive<PageData<UserForm, UserQuery>>({
  form: { ...initFormData },
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    userName: '',
    phonenumber: '',
    status: '',
    deptId: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    userName: [{ required: true, message: i18n.global.t('shippinglineUser.dialog.rules.userNameRqMsg'), trigger: "blur" }, { min: 2, max: 20, message: i18n.global.t('shippinglineUser.dialog.rules.userNameMinMaxMsg', { min: 2, max: 40 }), trigger: "blur" }],
    nickName: [{ required: true, message: i18n.global.t('shippinglineUser.dialog.rules.nickNameRqMsg'), trigger: "blur" }],
    shippinglineId: [{ required: true, message: i18n.global.t('shippinglineUser.dialog.rules.shippinglineIdRqMsg'), trigger: "blur" }],
    shippinglineOprs: [{ required: true, message: i18n.global.t('shippinglineUser.dialog.rules.shippinglineOprsRqMsg'), trigger: "blur" }],
    password: [{ required: true, message: i18n.global.t('shippinglineUser.dialog.rules.passwordRqMsg'), trigger: "blur" }, { min: 5, max: 20, message: i18n.global.t('shippinglineUser.dialog.rules.passwordMinMaxMsg', { min: 5, max: 255 }), trigger: "blur" }],
    email: [{ type: "email", message: i18n.global.t('shippinglineUser.dialog.rules.emailRqMsg'), trigger: ["blur", "change"] }],
    phonenumber: [{ pattern: /[0-9*]{10}$/, message: i18n.global.t('shippinglineUser.dialog.rules.phonenumberPtMsg'), trigger: "blur" }]
  }
})
// eslint-disable-next-line no-undef
const { queryParams, form, rules } = toRefs<PageData<UserForm, UserQuery>>(data)
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query user list */
const getList = async () => {
  loading.value = true;
  const res = await listUser(proxy?.addDateRange(queryParams.value, dateRange.value));
  loading.value = false;
  userList.value = res.rows;
  total.value = res.total;
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['','']
  queryParams.value.pageNum = 1;
  queryParams.value.deptId = undefined;
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('shippinglineUser.dialog.addTt');
  nextTick(async () => {
    reset();
    const { data } = await getUser();
    roleOptions.value = data.roles;
    shippinglineOptions.value = data.shippinglines;
    form.value.password = initPassword.value;
  });
}
/** Edit button action */
const handleUpdate = (row?: UserForm | UserVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('shippinglineUser.dialog.editTt');
  nextTick(async () => {
    reset();
    const userId = row?.userId || ids.value[0]
    const { data } = await getUser(userId)
    Object.assign(form.value, data.user);
    roleOptions.value = data.roles;
    shippinglineOptions.value = data.shippinglines;
    handleSelectShippingline(form.value.shippinglineId);
    form.value.roleIds = data.roleIds;
    form.value.shippinglineOprs = form.value.oprList.split(',');
    form.value.password = "";
  });
}
/** Handle select shipping line */
const handleSelectShippingline = (shippinglineId?: number) => {
  if (shippinglineId) {
    oprOptions.value = shippinglineOptions.value.filter(shippingline => {
      return shippingline.id === shippinglineId;
    })[0].oprList.split(',');
  } else {
    oprOptions.value = [];
  }
}
/** Submit button */
const submitForm = () => {
  userFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.oprList = form.value.shippinglineOprs.join(',');
      form.value.userId ? await updateUser(form.value) : await addUser(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('shippinglineUser.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: UserVO) => {
  const userIds = row?.userId || ids.value;
  const [err] = await to(proxy?.$modal.confirmDelete(i18n.global.t('shippinglineUser.operationMsg.deleteCf', { username: (row ? ' "' + row?.userName + '"' : '') })) as any);
  if (!err) {
    await delUser(userIds);
    await getList();
    proxy?.$modal.msgSuccess(i18n.global.t('shippinglineUser.operationMsg.deleteSuccess'));
  }
}
/** Reset action sheet */
const reset = () => {
  form.value = { ...initFormData };
  userFormRef.value.resetFields();
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** User Status Modification  */
const handleStatusChange = async (row: UserVO) => {
  let text = row.status === "0" ? i18n.global.t('shippinglineUser.operationMsg.statusEnable') : i18n.global.t('shippinglineUser.operationMsg.statusDisable');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('shippinglineUser.operationMsg.statusChangeCf', { action: text, username: row.userName }));
    await changeUserStatus(row.userId, row.status);
    proxy?.$modal.msgSuccess(text + i18n.global.t('shippinglineUser.operationMsg.submitSuccess'));
  } catch (err) {
    row.status = row.status === "0" ? "1" : "0";
  }
}
/** Export button action */
const handleExport = () => {
  proxy?.download("portShip/shippinglineUser/export", {
    ...queryParams.value,
  }, `user_${new Date().getTime()}.xlsx`);
};
/** Reset password button action */
const handleResetPwd = async (row: UserVO) => {
  const [err, res] = await to(ElMessageBox.prompt(i18n.global.t('shippinglineUser.operationMsg.resetPwdCf', { username: row.userName }), '', {
    confirmButtonText: i18n.global.t('shippinglineUser.operationMsg.resetPwdBtnSave'),
    cancelButtonText: i18n.global.t('shippinglineUser.operationMsg.resetPwdBtnClose'),
    closeOnClickModal: false,
    customClass: "custom-message-box",
    showClose: false,
    inputPattern: /^.{5,20}$/,
    inputErrorMessage: i18n.global.t('shippinglineUser.operationMsg.resetPwdMinMaxMsg', { min: '5', max: '20' }),
  }));
  if (!err) {
    await resetUserPwd(row.userId, res.value);
    proxy?.$modal.msgSuccess(i18n.global.t('shippinglineUser.operationMsg.resetPwdSuccess', { newPassword: res.value }));
  }
}
/** Jump role assignment */
const handleAuthRole = (row: UserVO) => {
  const userId = row.userId;
  router.push("/portShip/shippingline-user-auth/role/" + userId);
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList() // initialization list data
});
</script>
