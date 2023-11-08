<template>
  <Layout3
    v-loading="layoutLoading"
    :loadingLeft="edoLoading"
    :loadingRight="containerLoading"
    :queryParamsLeft="edoQueryParams"
    :queryParamsRight="containerQueryParams"
    :totalLeft="edoTotal"
    :totalRight="containerTotal"
    :rowDataLeft="edoList"
    :rowDataRight="containerList"
    :columnSettingLeft="edoColumns"
    :columnSettingRight="containerColumns"
    :rowKeyLeft="edoRowKey"
    :rowKeyRight="containerRowKey"
    :checkboxColLeft="false"
    :checkboxColRight="true"
    @onSelectedRowsRight="handleSeletectContainerRows"
    @onSelectCellLeft="handleSelectCellEdo"
    @onSearchLeft="handleQuery"
    @onSearchRight="getContainerList"
    @onResetLeft="resetQuery"
    @onPagingLeft="getEdoList"
    @onPagingRight="getContainerList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('shippinglineEdo.searchInput.oprCodeLb')" prop="oprCode" class="form-item-search">
        <el-input
          v-model="edoQueryParams.oprCode"
          :placeholder="$t('shippinglineEdo.searchInput.oprCodeLb')"
          clearable
          style="width: 80px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineEdo.searchInput.vesselNameLb')" prop="vesselName" class="form-item-search">
        <el-input
          v-model="edoQueryParams.vesselName"
          :placeholder="$t('shippinglineEdo.searchInput.vesselNameLb')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineEdo.searchInput.voyNoLb')" prop="voyNo" class="form-item-search">
        <el-input
          v-model="edoQueryParams.voyNo"
          :placeholder="$t('shippinglineEdo.searchInput.voyNoPh')"
          clearable
          style="width: 110px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineEdo.searchInput.consigneeLb')" prop="consignee" class="form-item-search">
        <el-input
          v-model="edoQueryParams.consignee"
          :placeholder="$t('shippinglineEdo.searchInput.consigneePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineEdo.searchInput.blNoLb')" prop="blNo" class="form-item-search">
        <el-input
          v-model="edoQueryParams.blNo"
          :placeholder="$t('shippinglineEdo.searchInput.blNoPh')"
          clearable
          style="width: 130px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineEdo.searchInput.containerNoLb')" prop="containerNo" class="form-item-search">
        <el-input
          v-model="edoQueryParams.containerNo"
          :placeholder="$t('shippinglineEdo.searchInput.containerNoPh')"
          clearable
          style="width: 130px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineEdo.searchInput.releaseDateLb')" style="width: 230px" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('shippinglineEdo.searchInput.releaseDateStartPh')"
          :end-placeholder="$t('shippinglineEdo.searchInput.releaseDateEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button-right>
      <IrButton
        colorStyle="yellow"
        type="secondary"
        :title="$t('shippinglineEdo.headerButtonRight.editTt')"
        v-hasPermi="['portShip:shippinglineEdo:edit']"
        :disabledFlag="!!!containerIds.length"
        leftIcon="edit"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :title="$t('shippinglineEdo.headerButtonRight.printTt')"
        v-hasPermi="['portShip:shippinglineEdo:print']"
        leftIcon="printer"
        @onClick="printEdoPdf"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="edoDetailDialog">
        <template v-slot:body>
          <!-- Add or Modify container Dialog -->
          <el-form ref="edoDetailFormRef" :model="edoDetailForm" label-width="160px" class="common-form">
            <el-form-item :label="$t('shippinglineEdo.dialog.expiredDemLb')" prop="expiredDem" class="form-item-row">
              <el-date-picker
                v-model="edoDetailForm.expiredDem"
                value-format="YYYY-MM-DD"
                format="DD/MM/YYYY"
                :placeholder="$t('shippinglineEdo.dialog.expiredDemPh')"
              />
            </el-form-item>
            <el-form-item :label="$t('shippinglineEdo.dialog.detFreeTimeLb')" prop="detFreeTime" class="form-item-row">
              <el-input v-model="edoDetailForm.detFreeTime" :placeholder="$t('shippinglineEdo.dialog.detFreeTimePh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineEdo.dialog.emptyContainerDepotLb')" prop="emptyContainerDepot" class="form-item-row">
              <el-input v-model="edoDetailForm.emptyContainerDepot" :placeholder="$t('shippinglineEdo.dialog.emptyContainerDepotPh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineEdo.dialog.consigneeLb')" prop="consignee" class="form-item-row">
              <el-input v-model="edoDetailForm.consignee" :placeholder="$t('shippinglineEdo.dialog.consigneePh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineEdo.dialog.remarkLb')" prop="remark" class="form-item-row">
              <el-input v-model="edoDetailForm.remark" type="textarea" :placeholder="$t('shippinglineEdo.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('shippinglineEdo.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('shippinglineEdo.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout3>
</template>
<script setup name="ShippinglineEdo" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import { listEdo, printPdf } from '@/api/portShip/shippinglineEdo/edo';
import { listContainer, updateContainer, getContainer } from '@/api/portShip/shippinglineEdo/detail';
// IMPORT TYPE
import { EdoMainVO, EdoMainQuery } from '@/api/portShip/shippinglineEdo/edo/types';
import { EdoDetailVO, EdoDetailQuery, EdoDetailForm } from '@/api/portShip/shippinglineEdo/detail/types';
import { DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const layoutLoading = ref(false);
const dateRange = ref<[DateModelType, DateModelType]>(['', '']);
const edoList = ref<EdoMainVO[]>([]);
const edoLoading = ref(true);
const edoTotal = ref(0);
const edoRowKey = ref("id");
// eslint-disable-next-line no-undef
const edoColumns = ref<GridColumn[]>(
  [
    { prop: "id", name: 'shippinglineEdo.edoColumns.idLb', sortable: true, size: 100, show: false, readonly: true, },
    { prop: "blNo", name: 'shippinglineEdo.edoColumns.blNoLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
    { prop: "vesselName", name: 'shippinglineEdo.edoColumns.vesselNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
    { prop: "voyNo", name: 'shippinglineEdo.edoColumns.voyNoLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
    { prop: "releaseDate", name: 'shippinglineEdo.edoColumns.releaseDateLb', sortable: true, size: 160, show: true, readonly: true,
      cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
        return proxy?.parseTime(colProps.model[colProps.prop]);
      }
    }
  ]
);
const edoDetailDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});
const initEdoDetailFormData: EdoDetailForm = {
  id: undefined,
  expiredDem: '',
  detFreeTime: '',
  emptyContainerDepot: '',
  consignee: '',
  remark: ''
}
const edoDetailForm = reactive<EdoDetailForm>({...initEdoDetailFormData});
const edoDetailFormRef = ref(ElForm);
const containerList = ref<EdoDetailVO[]>([]);
const containerLoading = ref(false);
const containerTotal = ref(0);
const containerRowKey = ref("id");
const containerIds = ref(<any>[]);
// eslint-disable-next-line no-undef
const containerColumns = ref<GridColumn[]>(
  [
    { prop: "id", name: 'shippinglineEdo.containerColumns.idLb', sortable: true, size: 100, show: false, readonly: true, },
    { prop: "containerNo", name: 'shippinglineEdo.containerColumns.containerNoLb', sortable: true, size: 130, show: true, readonly: true, pin: 'colPinStart' },
    { prop: "sztp", name: 'shippinglineEdo.containerColumns.sztpLb', sortable: true, size: 120, show: true, readonly: true },
    { prop: "businessUnit", name: 'shippinglineEdo.containerColumns.oprCodeLb', sortable: true, size: 110, show: true, readonly: true },
    { prop: "orderNumber", name: 'shippinglineEdo.containerColumns.orderNumberLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
    { prop: "consignee", name: 'shippinglineEdo.containerColumns.consigneeLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
    { prop: "expiredDem", name: 'shippinglineEdo.containerColumns.expiredDemLb', sortable: true, size: 160, show: true, readonly: true,
      cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
        return proxy?.parseTime(colProps.model[colProps.prop]);
      }
    },
    { prop: "detFreeTime", name: 'shippinglineEdo.containerColumns.detFreeTimeLb', sortable: true, size: 130, show: true, readonly: true, align: 'left' },
    { prop: "emptyContainerDepot", name: 'shippinglineEdo.containerColumns.emptyContainerDepotLb', sortable: true, size: 185, show: true, readonly: true, align: 'left' },
    { prop: "vesselName", name: 'shippinglineEdo.containerColumns.vesselNameLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
    { prop: "voyNo", name: 'shippinglineEdo.containerColumns.voyNoLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
    { prop: "pol", name: 'shippinglineEdo.containerColumns.polLb', sortable: true, size: 140, show: true, readonly: true, align: 'left' },
    { prop: "pod", name: 'shippinglineEdo.containerColumns.podLb', sortable: true, size: 140, show: true, readonly: true, align: 'left' },
    { prop: "remark", name: 'shippinglineEdo.containerColumns.remarkLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
    { prop: "operate", name: 'shippinglineEdo.containerColumns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
      buttonProps: [
        {
          index: 1, icon: 'edit', title: 'shippinglineEdo.containerColumns.operateEditLb', color: 'yellow', permissionKey: 'portShip:shippinglineEdo:edit',
          click: (rowIndex: number) => { handleUpdate(containerList.value[rowIndex]) }
        },
        {
          index: 2, icon: 'history', title: 'shippinglineEdo.containerColumns.operateHistoryLb', color: 'gray', permissionKey: 'portShip:shippinglineEdo:history',
          click: (rowIndex: number) => {  }
        }
      ]
    }
  ]
);
// eslint-disable-next-line no-undef
const edoQueryParams = reactive<EdoMainQuery>({
  pageNum: 1,
  pageSize: 20,
  blNo: '',
  consignee: '',
  containerNo: '',
  vesselName: '',
  oprCode: '',
  voyNo: '',
  orderByColumn: 'releaseDate',
  isAsc: 'descending'
});
// eslint-disable-next-line no-undef
const containerQueryParams = reactive<EdoDetailQuery>({
  pageNum: 1,
  pageSize: 20,
  blNo: '',
  containerNo: '',
  orderByColumn: 'containerNo',
  isAsc: 'ascending'
});

///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectContainerRows = (selectedIds: { value: (string | number)[]; }) => {
  containerIds.value = selectedIds.value;
}
/** Query EDO main table list */
const getEdoList = async () => {
  edoLoading.value = true;
  const res = await listEdo(proxy?.addDateRange(edoQueryParams, dateRange.value));
  edoList.value = res.rows;
  edoTotal.value = res.total;
  edoLoading.value = false;
  resetContainerList();
  if (edoList.value.length > 0) {
    containerQueryParams.blNo = edoList.value[0].blNo;
    getContainerList();
  }
}
const handleSelectCellEdo = (modal: any) => {
  resetContainerList();
  containerQueryParams.blNo = edoList.value[modal.rowIndex].blNo;
  getContainerList();
}
/** Query EDO Detail table list */
const getContainerList = async () => {
  containerLoading.value = true;
  const res = await listContainer(containerQueryParams);
  containerList.value = res.rows;
  containerTotal.value = res.total;
  containerLoading.value = false;
}
/** Reset container list */
const resetContainerList = () => {
  containerList.value = [];
  containerIds.value = [];
  containerTotal.value = 0;
  containerQueryParams.blNo = '';
}
/** Search button action */
const handleQuery = () => {
  edoQueryParams.pageNum = 1;
  getEdoList();
}
/** Reset button action */
const resetQuery = () => {
  dateRange.value = ['', ''];
  handleQuery();
}
/** Edit button action */
const handleUpdate = (row?: EdoDetailVO) => {
  edoDetailDialog.visible = true;
  const containerNo = row?.containerNo;
  edoDetailDialog.title = containerNo ? i18n.global.t('shippinglineEdo.dialog.editSingleTt', { containerNo : containerNo }) : i18n.global.t('shippinglineEdo.dialog.editMultiTt');
  nextTick(async () => {
    reset();
    if (row?.id) {
      const res = await getContainer(row?.id);
      Object.assign(edoDetailForm, res.data);
    }
  })
}
/** Form reset */
const reset = () => {
  Object.assign(edoDetailForm, {...initEdoDetailFormData});
  edoDetailFormRef.value.resetFields();
}
/** Submit button */
const submitForm = () => {
  edoDetailFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      const ids = edoDetailForm.id ? edoDetailForm.id : containerIds.value;
      await updateContainer(ids, edoDetailForm);
      proxy?.$modal.msgSuccess(i18n.global.t('shippinglineEdo.operationMsg.submitSuccess'));
      edoDetailDialog.visible = false;
      getContainerList();
    }
  });
}
/** Cancel button */
const cancel = () => {
  reset();
  edoDetailDialog.visible = false;
}
/** Print edo pdf */
const printEdoPdf = async () => {
  layoutLoading.value = true;
  const res = await printPdf(containerQueryParams.blNo);
  layoutLoading.value = false;
  if (res instanceof Blob) {
    const objectUrl = URL.createObjectURL(res);
    window.open(objectUrl, "_blank");
  }
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getEdoList();
});
</script>
