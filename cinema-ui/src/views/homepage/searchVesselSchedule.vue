<template>
  <LayoutHomepage>
    <template v-slot:content>
      <div class="search-container" id="search">
        <div class="search-row">
          <div class="search-detail-container">
            <div class="search-detail-title">Tra cứu lịch tàu</div>
            <el-form ref="searchRef" :model="vesselScheduleSearchForm" :rules="rules" class="search-form">
              <el-row>
                <el-col :span="11">
                  <el-form-item prop="fromDate" label="Từ ngày" class="form-item-column">
                    <el-date-picker
                      v-model="vesselScheduleSearchForm.fromDate"
                      value-format="YYYY-MM-DD"
                      format="DD/MM/YYYY"
                      size="large"
                      type="date"
                      placeholder="DD/MM/YYYY"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="2"></el-col>
                <el-col :span="11">
                  <el-form-item prop="toDate" label="Đến ngày" class="form-item-column">
                    <el-date-picker
                      v-model="vesselScheduleSearchForm.toDate"
                      value-format="YYYY-MM-DD"
                      format="DD/MM/YYYY"
                      size="large"
                      type="date"
                      placeholder="DD/MM/YYYY"
                    ></el-date-picker>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div class="search-detail-button">
              <IrButton
                colorStyle="blue"
                type="primary"
                @onClick="handleSearch"
                buttonSize="large"
                :width="156"
                title="Tìm kiếm"
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
            :rowData="vesselScheduleList"
            :rowKey="rowKey"
            :checkboxCol="false"
            :reRender="false"
            :style="{
              height: 32 * (vesselScheduleList.length + 2) + 'px',
            }"
          />
        </div>
        <div class="paging-footer">
          <div>
            <pagination
              v-if="vesselScheduleSearchForm"
              :total="total"
              v-model:page="vesselScheduleSearchForm.pageNum"
              v-model:limit="vesselScheduleSearchForm.pageSize"
              @pagination="handleSearch"
            />
          </div>
        </div>
      </div>
    </template>
  </LayoutHomepage>
</template>

<script setup name="SearchVesselSchedule" lang="ts">
import { FormRules } from 'element-plus';
import {VesselScheduleSearchParam, VesselSchedule} from '@/api/homepage/type'
import {searchVesselSchedule} from '@/api/homepage'
import IrGrid from '@/components/IrGrid/index.vue';
import IrButton from '@/components/IrButton/index.vue';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute()

const columns = ref([
  { prop: "fullName", name: 'Vessel', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "voyage", name: 'Voyage', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "description", name: 'Shipping Line', sortable: false, size: 250, show: true, readonly: true, align: 'left' },
  { prop: "etb", name: 'ETB', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
  { prop: "etu", name: 'ETU', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
  { prop: "vesselRoute", name: 'Route', sortable: false, size: 253, show: true, readonly: true, align: 'left' },
  { prop: "country", name: 'Country', sortable: false, show: true, size: 300, readonly: true, align: 'left' },
]);
const vesselScheduleList = ref<VesselSchedule[]>([]);
const rowKey = ref('etb');
const total = ref(0);


const vesselScheduleSearchForm = ref<VesselScheduleSearchParam>({
  fromDate: '',
  toDate: '',
  pageNum: 1,
  pageSize: 50,
});
const rules: FormRules = {
  fromDate: [{required: true, trigger: "change", message: "Vui lòng chọn ngày", }],
  toDate: [{ required: true, trigger: 'change', message: "Vui lòng chọn ngày" }],
};
const searchRef = ref(ElForm);
const loading = ref(false);


onMounted(() => {
  const fromDate = route.query.fromDate as string;
  const toDate = route.query.toDate as string;
  vesselScheduleSearchForm.value.fromDate = fromDate ?? '';
  vesselScheduleSearchForm.value.toDate = toDate ?? '';
  if (fromDate && toDate) handleSearch();
});

const handleSearch = () => {
  searchRef.value.validate(async (valid:boolean) => {
    if (!valid) return;
    loading.value = true;
    const res = await searchVesselSchedule(vesselScheduleSearchForm.value);
    loading.value = false;
    res.total == 0 && ElMessage({ message: 'Không có kết quả. Vui lòng chọn thời gian khác!', type: 'warning', duration: 3000});
    vesselScheduleList.value = res.rows;
    total.value = res.total;
  })
}

/** Export button action */
const handleExport = () => {
  proxy?.download('homepage/search/vesselSchedules/export', {
    ...vesselScheduleSearchForm.value
  }, `vesselSchedule_${new Date().getTime()}.xlsx`);
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
