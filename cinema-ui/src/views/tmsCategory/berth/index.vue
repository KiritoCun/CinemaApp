<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="berthList"
    :columnSetting="columns"
    :checkboxCol="false"
    :buttonHeader="false"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('berth.searchInput.berthIdLb')" prop="berthId" class="form-item-search">
        <el-input
          v-model="queryParams.berthId"
          :placeholder="$t('berth.searchInput.berthIdPh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('berth.searchInput.vesselCodeLb')" prop="vesselCode" class="form-item-search">
        <el-input
          v-model="queryParams.vesselCode"
          :placeholder="$t('berth.searchInput.vesselCodePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('berth.searchInput.voyageLb')" prop="voyage" class="form-item-search">
        <el-input
          v-model="queryParams.voyage"
          :placeholder="$t('berth.searchInput.voyagePh')"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
    </template>
  </Layout1>
</template>
  
<script setup name="Berth" lang="ts">
  ///////////////////////////////////////////////////////////////////////////////
  // IMPORT SECTION
  ///////////////////////////////////////////////////////////////////////////////
  // IMPORT COMPONENT
  // IMPORT API
  import { list as initData } from "@/api/tmsCategory/berth";
  // IMPORT TYPE
  import { BerthQuery, BerthVO } from "@/api/tmsCategory/berth/types";
  // IMPORT GLOBAL TOOL (PROXY)
  import { ComponentInternalInstance } from "vue";
  const { proxy } = getCurrentInstance() as ComponentInternalInstance;
  ///////////////////////////////////////////////////////////////////////////////
  // VARIABLE SECTION
  ///////////////////////////////////////////////////////////////////////////////
  const berthList = ref<BerthVO[]>([]);
  const loading = ref(true);
  const total = ref(0);
  const queryParams = ref<BerthQuery>({
    pageNum: 1,
    pageSize: 20,
    berthId: '',
    vesselCode: '',
    voyage: '',
  });
  // eslint-disable-next-line no-undef
  const columns = ref<GridColumn[]>([
    { prop: "berthId", name: 'berth.columns.berthIdLb', sortable: false, size: 120, show: true, readonly: true, },
    { prop: "vesselCode", name: 'berth.columns.vesselCodeLb', sortable: false, size: 530, show: true, readonly: true, align: 'left' },
    { prop: "voyage", name: 'berth.columns.voyageLb', sortable: false, size: 705, show: true, readonly: true, align: 'left' }
  ]);
  ///////////////////////////////////////////////////////////////////////////////
  // METHOD SECTION
  ///////////////////////////////////////////////////////////////////////////////
  /** Query the list of login logs */
  const getList = async () => {
    loading.value = true;
    const res = await initData(queryParams.value);
    berthList.value = res.rows;
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