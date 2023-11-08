<template>
  <LayoutHomepage>
    <template v-slot:content>
      <div class="search-container" id="search">
        <div class="search-row">
          <div class="search-detail-container">
            <div class="search-detail-title">{{ $t('homepage.searchEdoTt1') }}<br />{{ $t('homepage.searchEdoTt2') }}</div>
            <el-form ref="edoSearchRef" :model="edoSearchForm" :rules="rules" class="search-form">
              <el-form-item prop="containerNo" :label="$t('homepage.searchEdoContNoLb')" class="form-item-column">
                <el-input
                  v-model="edoSearchForm.containerNo"
                  type="text"
                  size="large"
                  auto-complete="off"
                  :placeholder="$t('homepage.searchEdoContNoPh')"
                />
              </el-form-item>
              <el-form-item prop="blNo" :label="$t('homepage.searchEdoBlNoLb')" class="form-item-column">
                <el-input v-model="edoSearchForm.blNo" type="text" size="large" auto-complete="off" :placeholder="$t('homepage.searchEdoBlNoPh')" />
              </el-form-item>
            </el-form>
            <div class="search-detail-button">
              <IrButton
                colorStyle="blue"
                type="primary"
                @onClick="handleSearch"
                buttonSize="large"
                :width="156"
                :title="$t('homepage.searchEdoBtn')"
                :loadingFlag="loading"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="table-container" v-show="total > 0">
        <div class="title-row">
          <div class="line"></div>
          <div class="title">Kết quả tra cứu</div>
          <div class="line"></div>
        </div>
        <IrButton colorStyle="green" type="secondary" title="Xuất Excel" leftIcon="excel" @onClick="handleExport" :iconColorUnchange="true" />
        <div class="datagrid-body">
          <IrGrid
            v-loading="loading"
            :columnSetting="columns"
            :rowData="edoList"
            :rowKey="rowKey"
            :checkboxCol="false"
            :reRender="false"
            :style="{
              height: 32 * (edoList.length + 2) + 'px',
            }"
          />
        </div>
        <div class="paging-footer">
          <div>
            <pagination
              v-if="edoSearchForm"
              :total="total"
              v-model:page="edoSearchForm.pageNum"
              v-model:limit="edoSearchForm.pageSize"
              @pagination="handleSearch"
            />
          </div>
        </div>
      </div>
    </template>
  </LayoutHomepage>
</template>

<script setup name="SearchEdo" lang="ts">
import { FormRules } from 'element-plus';
import {searchEdo} from '@/api/homepage'
import {EdoSearchParam, Edo} from '@/api/homepage/type'
import { ComponentInternalInstance } from "vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute()

const columns = ref([
{ prop: "blNo", name: 'Bill No', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
{ prop: "containerNo", name: 'Container No', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
{ prop: "oprCode", name: 'OPR', sortable: false, size: 50, show: true, readonly: true, align: 'left' },
{ prop: "gateInDate", name: 'In Date', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "gateOutDate", name: 'Out Date', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "expiredDem", name: 'Expired Day', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "detFreeTime", name: 'Detention Day', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "emptyContainerDepot", name: 'Empty Return Place', sortable: false, show: true, size: 250, readonly: true, align: 'left' },
{ prop: "status", name: 'Status', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "location", name: 'Location', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "remark", name: 'Remark', sortable: false, show: true, size: 250, readonly: true, align: 'left' },
]);
const edoList = ref<Edo[]>([]);
const rowKey = ref('etb');
const total = ref(0);

const edoSearchForm = ref<EdoSearchParam>({
  containerNo: '',
  blNo: '',
  pageNum: 1,
  pageSize: 50,
});
const validateAtLeastOneField = (_rule: any, _value: any, callback: any) => {
  if (!edoSearchForm.value.containerNo && !edoSearchForm.value.blNo) {
    console.log("Please");
    callback(new Error('Vui lòng nhập ít nhất một trong hai trường'));
  } else {
    callback();
  }
};

const rules = {
  containerNo: [
    { required: false, trigger: 'change', message: 'Vui lòng nhập số container' },
    { validator: validateAtLeastOneField, trigger: 'change' }
  ],
  blNo: [
    { required: false, trigger: 'change', message: 'Vui lòng nhập số bill' },
    { validator: validateAtLeastOneField, trigger: 'change' }
  ],
};
const edoSearchRef = ref(ElForm);
const loading = ref(false);

onMounted(() => {
  const containerNo = route.query.containerNo as string;
  const blNo = route.query.blNo as string;
  edoSearchForm.value.containerNo = containerNo ?? '';
  edoSearchForm.value.blNo = blNo ?? '';
  if (containerNo || blNo) handleSearch();
});

const handleSearch = () => {
  edoSearchRef.value.validate(async (valid:boolean) => {
    if (!valid) return;
    loading.value = true;
    const res = await searchEdo(edoSearchForm.value);
    loading.value = false;
    res.total == 0 && ElMessage({ message: 'Không có kết quả. Vui lòng chọn số container hoặc số bill khác!', type: 'warning', duration: 3000});
    edoList.value = res.rows;
    total.value = res.total;
  })
}

/** Export button action */
const handleExport = () => {
  proxy?.download('homepage/search/edo/export', {
    ...edoSearchForm.value
  }, `edo_${new Date().getTime()}.xlsx`);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.search-container {
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .search-row {
    display: flex;
    flex-direction: row;
    gap: 24px;
    justify-content: center;
    align-items: center;
    .search-detail-container {
      max-width: 652px;
      // min-height: 366px;
      display: flex;
      padding: 40px 0px;
      flex-direction: column;
      align-items: center;
      gap: 24px;
      border-left: 4px solid $blue-500;
      background: $gray-100;
      flex: 1;
      .search-detail-title {
        color: $gray-800;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 32px;
        margin-bottom: 8px;
      }
      .search-form {
        // height: 124px;
        width: 100%;
        padding: 0 90px;
      }
      .search-detail-button {
        display: flex;
        width: 100%;
        padding: 0 90px;
        justify-content: end;
        align-items: end;
      }
    }
  }
  @media (max-width:970px) {
  .search-row {
    flex-direction: column;
    .search-detail-container {
      width: 100%;
    }
  }
}
}

.table-container {
  padding: 0px  120px 100px 120px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
  .title-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    .title {
      color: $gray-800;
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      margin: 0px 24px 0px 24px
    }
    .line {
      height: 1px;
      flex:1;
      background-color: $gray-200;
    }
  }
  .datagrid-body {
    overflow: visible;
    border: 1px solid $gray-200;
    background: $gray-0;
    margin-top: 16px;
    width: 100%;
  }
  .paging-footer {
    width: 100%;
    height: 48px;
    padding: 8px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    .right-footer {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}
</style>

