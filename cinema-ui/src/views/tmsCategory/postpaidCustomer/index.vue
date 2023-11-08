<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="postpaidCustomerList"
    :columnSetting="columns"
    :checkboxCol="false"
    :buttonHeader="false"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('postpaidCustomer.searchInput.accountNoLb')" prop="accountNo" class="form-item-search">
        <el-input
          v-model="queryParams.accountNo"
          :placeholder="$t('postpaidCustomer.searchInput.accountNoPh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('prepaidCustomer.searchInput.fullNameLb')" prop="fullName" class="form-item-search">
        <el-input
          v-model="queryParams.fullName"
          :placeholder="$t('prepaidCustomer.searchInput.fullNamePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('prepaidCustomer.searchInput.addressLb')" prop="address" class="form-item-search">
        <el-input
          v-model="queryParams.address"
          :placeholder="$t('prepaidCustomer.searchInput.addressPh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
    </template>
  </Layout1>
</template>
  
<script setup name="PostpaidCustomer" lang="ts">
  ///////////////////////////////////////////////////////////////////////////////
  // IMPORT SECTION
  ///////////////////////////////////////////////////////////////////////////////
  // IMPORT COMPONENT
  // IMPORT API
  import { list as initData } from "@/api/tmsCategory/postpaidCustomer";
  // IMPORT TYPE
  import { PostpaidCustomerQuery, PostpaidCustomerVO } from "@/api/tmsCategory/postpaidCustomer/types";
  // IMPORT GLOBAL TOOL (PROXY)
  import { ComponentInternalInstance } from "vue";
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  ///////////////////////////////////////////////////////////////////////////////
  // VARIABLE SECTION
  ///////////////////////////////////////////////////////////////////////////////
  const postpaidCustomerList = ref<PostpaidCustomerVO[]>([]);
  const loading = ref(true);
  const total = ref(0);
  const queryParams = ref<PostpaidCustomerQuery>({
    pageNum: 1,
    pageSize: 20,
    accountNo: '',
    fullName: '',
    address: '',
  });
  // eslint-disable-next-line no-undef
  const columns = ref<GridColumn[]>([
    { prop: "accountNo", name: 'postpaidCustomer.columns.accountNoLb', sortable: false, size: 120, show: true, readonly: true, },
    { prop: "fullName", name: 'postpaidCustomer.columns.fullNameLb', sortable: false, size: 530, show: true, readonly: true, align: 'left' },
    { prop: "address", name: 'postpaidCustomer.columns.addressLb', sortable: false, size: 705, show: true, readonly: true, align: 'left' }
  ]);
  ///////////////////////////////////////////////////////////////////////////////
  // METHOD SECTION
  ///////////////////////////////////////////////////////////////////////////////
  /** Query the list of login logs */
  const getList = async () => {
    loading.value = true;
    const res = await initData(queryParams.value);
    postpaidCustomerList.value = res.rows;
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
  ///////////////////////////////////////////////////////////////////////////////
  // INIT SECTION
  ///////////////////////////////////////////////////////////////////////////////
  onMounted(() => {
    getList();
  })
</script>