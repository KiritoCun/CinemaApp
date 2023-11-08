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
      <el-form-item :label="$t('shippinglineRole.authUser.searchInput.userNameLb')" prop="userName" class="form-item-search">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('shippinglineRole.authUser.searchInput.userNamePh')"
          style="width: 200px"
          @keyup.enter="handleQuery"
          clearable
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineRole.authUser.searchInput.phonenumberLb')" prop="phonenumber" class="form-item-search">
        <el-input
          v-model="queryParams.phonenumber"
          :placeholder="$t('shippinglineRole.authUser.searchInput.phonenumberPh')"
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
        :title="$t('shippinglineRole.authUser.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:role:add']"
        @onClick="openSelectUser"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!userIds.length"
        :title="$t('shippinglineRole.authUser.headerButton.deauthorizeTt')"
        leftIcon="close-circle"
        v-hasPermi="['system:role:remove']"
        @onClick="cancelAuthUserAll"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :title="$t('shippinglineRole.authUser.headerButton.closeTt')"
        leftIcon="close"
        @onClick="handleClose"
      />
    </template>
    <template v-slot:dialog>
      <select-user ref="selectRef" :roleId="queryParams.roleId" @ok="handleQuery" />
    </template>
  </Layout1>
</template>

<script setup name="ShippinglineAuthUser" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import SelectUser from "./selectUser.vue";
// IMPORT API
import { allocatedUserList, authUserCancel, authUserCancelAll } from "@/api/portShip/shippinglineRole";
// IMPORT TYPE
import { UserQuery, UserVO } from "@/api/portShip/shippinglineUser/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from "@/lang";
import { ComponentInternalInstance } from "vue";
// import { ElForm, ElSelect} from 'element-plus';
const route = useRoute();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict("sys_normal_disable"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const userList = ref<UserVO[]>([]);
const loading = ref(true);
const total = ref(0);
const rowKey = ref('userId');
const userIds = ref<Array<string | number>>([]);
const selectRef = ref(SelectUser);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "userName", name: 'shippinglineRole.authUser.columns.userNameLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "nickName", name: 'shippinglineRole.authUser.columns.nickNameLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "email", name: 'shippinglineRole.authUser.columns.emailLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "phonenumber", name: 'shippinglineRole.authUser.columns.phonenumberLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "status", name: 'shippinglineRole.authUser.columns.statusLb', sortable: true, size: 120, show: true, readonly: true, dictData: sys_normal_disable },
  { prop: "createTime", name: 'shippinglineRole.authUser.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'shippinglineRole.authUser.columns.operateLb', size: 80, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'close-circle', title: 'shippinglineRole.authUser.columns.operateAuthUserLb', color: 'red', permissionKey: 'system:role:remove',
        click: (rowIndex: number) => { cancelAuthUser(userList.value[rowIndex]); }
      }
    ]
  }
]);
const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 20,
  roleId: route.params.roleId as string,
  userName: undefined,
  phonenumber: undefined,
  orderByColumn: 'createTime',
  isAsc: 'descending'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  userIds.value = selectedIds.value;
}
/** Query the list of authorized users */
const getList = async () => {
  loading.value = true;
  const res = await allocatedUserList(queryParams);
  userList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
// back button
const handleClose = () => {
  const obj = { path: "/portShip/shippinglineRole" };
  proxy?.$tab.closeOpenPage(obj);
}
/** Search button action */
const handleQuery=() => {
  queryParams.pageNum = 1;
  getList();
}
/** Reset button action */
const resetQuery=() =>{
  handleQuery();
}
/** Open the authorized user form popup */
const openSelectUser = () => {
    selectRef.value.show();
}
/** Deauthorize button action */
const cancelAuthUser = async (row: UserVO) => {
  await proxy?.$modal.confirmWarning(i18n.global.t('shippinglineRole.authUser.operationMsg.cancelAuthCf', { username: row.userName }));
  await authUserCancel({ userId: row.userId, roleId: queryParams.roleId });
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('shippinglineRole.authUser.operationMsg.cancelAuthSuccess'));
}
/** Batch deauthorize button actions */
const cancelAuthUserAll = async () => {
  const roleId = queryParams.roleId;
  const uIds = userIds.value.join(",");
  await proxy?.$modal.confirmWarning(i18n.global.t('shippinglineRole.authUser.operationMsg.cancelAuthUserAllCf'));
  await authUserCancelAll({ roleId: roleId, userIds: uIds });
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('shippinglineRole.authUser.operationMsg.cancelAuthUserAllSuccess'));
}

onMounted(() => {
  getList();
});
</script>

<style lang="scss" scoped></style>
