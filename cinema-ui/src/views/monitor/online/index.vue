<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="onlineList"
    :columnSetting="columns"
    :checkboxCol="false"
    :buttonHeader="false"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('online.searchInput.ipaddrLb')" prop="ipaddr" class="form-item-search">
        <el-input
          v-model="queryParams.ipaddr"
          :placeholder="$t('online.searchInput.ipaddrPh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('online.searchInput.userNameLb')" prop="userName" class="form-item-search">
        <el-input
          v-model="queryParams.userName"
          :placeholder="$t('online.searchInput.userNamePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
    </template>
  </Layout1>
</template>

<script setup name="Online" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { forceLogout, list as initData } from "@/api/monitor/online";
// IMPORT TYPE
import { OnlineQuery, OnlineVO } from "@/api/monitor/online/types";
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const onlineList = ref<OnlineVO[]>([]);
const loading = ref(true);
const total = ref(0);
const queryParams = ref<OnlineQuery>({
  pageNum: 1,
  pageSize: 20,
  ipaddr: '',
  userName: '',
  orderByColumn: 'loginTime',
  isAsc: 'descending'
});
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "tokenId", name: 'online.columns.tokenIdLb', sortable: true, size: 200, show: true, readonly: true, },
  { prop: "userName", name: 'online.columns.userNameLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "deptName", name: 'online.columns.deptNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "ipaddr", name: 'online.columns.ipaddrLb', sortable: true, size: 130, show: true, readonly: true, align: 'left' },
  { prop: "loginLocation", name: 'online.columns.loginLocationLb', sortable: true, size: 140, show: true, readonly: true, align: 'left' },
  { prop: "os", name: 'online.columns.osLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "browser", name: 'online.columns.browserLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
  { prop: "loginTime", name: 'online.columns.loginTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'online.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'delete', color: 'red', title: 'online.columns.operateForceLogoutLb', permissionKey: 'monitor:online:forceLogout',
        click: (rowIndex: number) => { handleForceLogout(onlineList.value[rowIndex]); }
      }
    ]
  }
]);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
/** Query the list of login logs */
const getList = async () => {
  loading.value = true;
  const res = await initData(queryParams.value);
  onlineList.value = res.rows;
  total.value = res.total;
  loading.value = false;
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
/** Force quit button operation */
const handleForceLogout = async (row: OnlineVO) => {
  await proxy?.$modal.confirmWarning(i18n.global.t('online.operationMsg.logoutCf', { username : row.userName }));
  await forceLogout(row.tokenId);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('online.operationMsg.logoutSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
})
</script>
