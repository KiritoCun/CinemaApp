3<template>
  <Layout3
    ref="layout"
    v-loading="layoutLoading"
    :loadingLeft="hallLoading"
    :loadingRight="containerLoading"
    :queryParamsLeft="hallQueryParams"
    :queryParamsRight="containerQueryParams"
    :totalLeft="hallTotal"
    :rowDataLeft="hallList"
    v-model:rowDataRight="containerList"
    :columnSettingLeft="hallColumns"
    :columnSettingRight="containerColumns"
    :rowKeyLeft="hallRowKey"
    :rowKeyRight="containerRowKey"
    :checkboxColLeft="true"
    :checkboxColRight="true"
    @onSelectedRowsLeft="handleSelectHallRows"
    @onSelectedRowsRight="handleSelectContainerRows"
    @onSelectCellLeft="handleSelectCellHall"
    @onSearchLeft="handleQuery"
    @onResetLeft="resetQuery"
    @onPagingLeft="getHallList"
    @onPagingRight="getContainerList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('pickupFull.searchInput.hallIdLb')" class="form-item-search">
        <el-input
          v-model="hallQueryParams.id"
          :placeholder="$t('pickupFull.searchInput.hallIdPh')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('pickupFull.searchInput.billBooking1Lb')" prop="billBooking1" class="form-item-search">
        <el-input
          v-model="hallQueryParams.billBooking1"
          :placeholder="$t('pickupFull.searchInput.billBooking1Ph')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('pickupFull.searchInput.containerNoLb')" prop="containerNo" class="form-item-search">
        <el-input
          v-model="hallQueryParams.containerNo"
          :placeholder="$t('pickupFull.searchInput.containerNoPh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('pickupFull.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select
          v-model="hallQueryParams.status"
          :placeholder="$t('pickupFull.searchInput.statusPh')"
          clearable
          style="width: 150px"
          @change="handleQuery"
        >
          <el-option v-for="dict in lg_hall_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button-left>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('pickupFull.btn.add')"
        v-hasPermi="['logService:pickupFull:edit']"
        leftIcon="plus"
        @onClick="handleHallAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="hallIds.length !== 1 ? true : false"
        :title="$t('pickupFull.btn.edit')"
        leftIcon="edit"
        v-hasPermi="['logService:pickupFull:edit']"
        @onClick="handleHallUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!hallIds.length"
        :title="$t('pickupFull.btn.delete')"
        leftIcon="delete"
        v-hasPermi="['logService:pickupFull:edit']"
        @onClick="handleDeleteHall"
      />
    </template>
    <template v-slot:header-button-right>
      <HallTitle :hallId="hallId" :billBooking="billBooking" />
      <IrButton
        colorStyle="green"
        type="secondary"
        title="Lưu"
        leftIcon="save"
        @onClick="handleContainerUpdate"
        :disabledFlag="!!!containerIds.length"
      />
        </template>
      </MoreButton>
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="hallDialog">
        <template v-slot:body>
          <el-form
            ref="hallFormRef"
            :rules="hallFormRules"
            :model="hallForm"
            label-width="150px"
            class="common-form"
            v-loading="layoutHallFormLoading"
          >
            <el-form-item label="B/L no" prop="billBooking1" class="form-item-row">
              <el-input v-model="hallForm.billBooking1" placeholder="Nhập" :disabled="hallForm.id !== undefined" />
            </el-form-item>
            <el-form-item label="Mã nhận container" prop="orderNumber" class="form-item-row">
              <el-input v-model="hallForm.orderNumber" placeholder="Nhập" :disabled="hallForm.id !== undefined" />
            </el-form-item>
            <el-form-item label="Số lượng container" prop="containerAmount" class="form-item-row">
              <el-input v-model="hallForm.containerAmount" placeholder="" disabled />
            </el-form-item>
            <el-form-item label="Ghi chú" prop="remark" class="form-item-row">
              <el-input v-model="hallForm.remark" type="textarea" placeholder="Nhập" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" title="Đóng" :width="100" @onClick="cancelHallDialog" />
          <IrButton colorStyle="blue" type="primary" :title="$t('user.dialog.footerSubmitTt')" :width="100" @onClick="submitHallForm" />
        </template>
      </IrDialog>
    </template>
  </Layout3>
</template>
<script setup name="PickupFull" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
// IMPORT TYPE
// IMPORT GLOBAL TOOL (PROXY)
import { ComponentInternalInstance, reactive } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { lg_hall_status, lg_hall_detail_customs, lg_hall_detail_order, lg_hall_detail_payment, lg_hall_detail_finish, lg_extra_service, lg_lop_status} = toRefs<any>(proxy?.useDict("lg_hall_status", "lg_hall_detail_customs", "lg_hall_detail_order", "lg_hall_detail_payment", "lg_hall_detail_finish", "lg_extra_service", "lg_lop_status"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const paymentInfo = ref<PaymentVo>();
const hallId = ref<any>('');
const billBooking = ref<any>('');
const layout = ref();
const layoutLoading = ref(false);
const layoutHallFormLoading = ref(false);
const fileUploadRef = ref();
const hallList = ref<HallVO[]>([]);
const hallIds = ref(<any>[]);
const hallLoading = ref(true);
const hallTotal = ref(0);
const hallRowKey = ref("id");
const hallColumns = ref<GridColumn[]>([
  { prop: "id", name: 'pickupFull.hallColumns.idLb', sortable: true, size: 100, readonly: true, },
  { prop: "status", name: 'pickupFull.hallColumns.statusLb', show: false, size: 100, dictData: lg_hall_status, changeRowColor: true },
  { prop: "billBooking1", name: 'pickupFull.hallColumns.billBooking1Lb', sortable: true, size: 150, readonly: true, align: 'left' },
  { prop: "containerAmount", name: 'pickupFull.hallColumns.containerAmountLb', sortable: true, size: 120, readonly: true },
  { prop: "createTime", name: 'pickupFull.hallColumns.createTimeLb', sortable: true, size: 160, readonly: true, formatter: 'datetime' }
]);
const containerIds = ref(<any>[]);
const containerList = ref<HallDetailVO[]>([]);
const containerLoading = ref(false);
const containerRowKey = ref("id");
const iconStatusProps = ref<GridIconStatus[]>([
  { isCustom: true, icon: 'block', color: 'green', tooltip: 'Dịch vụ đi kèm', visible: (row: any) => {
      return row.extraMovement === '1' || row.cutSeal === '1' || row.barge === '1' || row.weighing === '1' || row.mtDeliveryBack === '1';
    }
  },
  { prop: 'orderFlag', dictData: lg_hall_detail_order, icon: 'window' },
  { prop: 'paymentFlag', dictData: lg_hall_detail_payment, icon: 'wallet' },
  { prop: 'lopStatus', dictData: lg_lop_status, icon: 'lop' },
  { prop: 'customsFlag', dictData: lg_hall_detail_customs, icon: 'customs' },
  { prop: 'finishFlag', dictData: lg_hall_detail_finish, icon: 'truck' },
]);
const containerColumns = ref<GridColumn[]>([
  { prop: "iconStatus", name: 'Trạng thái', size: 150, readonly: true, pin: 'colPinStart', iconStatusProps: iconStatusProps.value },
  { prop: "containerNo", name: 'pickupFull.containerColumns.containerNoLb', size: 130, readonly: true },
  { prop: "consignee", name: 'edo.containerColumns.consigneeLb', sortable: true, size: 200, readonly: true, align: 'left' },
  { prop: "expiredDem", name: 'edo.containerColumns.expiredDemLb', sortable: true, size: 160, readonly: true, formatter: 'date' },
  { prop: "detFreeTime", name: 'edo.containerColumns.detFreeTimeLb', sortable: true, size: 130, readonly: true, align: 'left' },
  { prop: "emptyContainerDepot", name: 'edo.containerColumns.emptyContainerDepotLb', sortable: true, size: 185, readonly: true, align: 'left' },
  { prop: "vesselName", name: 'edo.containerColumns.vesselNameLb', sortable: true, size: 120, readonly: true, align: 'left' },
  { prop: "voyNo", name: 'edo.containerColumns.voyNoLb', sortable: true, size: 120, readonly: true, align: 'left' },
  { prop: "pol", name: 'edo.containerColumns.polLb', sortable: true, size: 140, readonly: true, align: 'left' },
  { prop: "pod", name: 'edo.containerColumns.podLb', sortable: true, size: 160, readonly: true, align: 'left' },
  { prop: "extraMovement", name: 'Kiểm hoá', sortable: true, size: 160, readonly: true, dictData: lg_extra_service },
  { prop: "cutSeal", name: 'Cắt seal', sortable: true, size: 160, readonly: true, dictData: lg_extra_service },
  { prop: "barge", name: 'Sà lan', sortable: true, size: 160, readonly: true, dictData: lg_extra_service },
  { prop: "weighing", name: 'Cân', sortable: true, size: 160, readonly: true, dictData: lg_extra_service },
  { prop: "mtBackDate", name: 'Ngày trả rỗng', sortable: true, size: 160, readonly: true, formatter: 'date' },
  { prop: "deliveryPlan", name: 'Ngày rút điện', sortable: true, size: 200, editor: 'datetime', datePickerProps: {
      pickerType: 'datetime',
      valueFormat: 'YYYY-MM-DD HH:mm:ss',
      format: 'DD/MM/YYYY HH:mm',
      placeholder: 'DD/MM/YYYY HH:mm',
    },
  },
  { prop: "remark", name: 'pickupFull.containerColumns.remarkLb', size: 200, align: 'left' }
]);
const hallQueryParams = reactive<HallQuery>({
  pageNum: 1,
  pageSize: 20,
  billBooking1: '',
  containerNo: '',
  status: '',
  orderByColumn: 'createTime',
  isAsc: 'descending'
});
const containerQueryParams = reactive<HallDetailQuery>({
  hallId: undefined
});
const customsList = ref<CustomsVO[]>([])
const customsRef = ref();
const extraServiceRef = ref();
const confirmPaymentRef = ref();
const lops = ref<LopVO[]>([]);
const confirmOrderRef = ref();
const confirmLopExtendRef = ref();
const confirmOtpRef = ref();
const hallFormRef = ref(ElForm);
const initHallFormData: HallForm = {
  id: undefined,
  remark: undefined
}
const hallDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '600px'
});
const hallForm = ref<HallForm>({...initHallFormData});
const hallFormRules: FormRules = {
  billBooking1: [{required: true, trigger: "blur", message: "B/L no không được trống", }],
  orderNumber: [{ required: true, trigger: "blur", message: "Mã nhận container không được trống" }]
};
const orderForm = ref<HallDetailForm>({});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSelectHallRows = (selectedIds: { value: (string | number)[]; }) => {
  hallIds.value = selectedIds.value;
}
const handleSelectContainerRows = (selectedIds: { value: (string | number)[]; }) => {
  containerIds.value = selectedIds.value;
}
const handleSelectCellHall = (modal: any) => {
  containerIds.value = [];
  resetContainerList();
  containerQueryParams.hallId = hallList.value[modal.rowIndex].id;
  hallId.value = hallList.value[modal.rowIndex].id;
  billBooking.value = hallList.value[modal.rowIndex].billBooking1;
  getContainerList();
}
/** Query hall list */
const getHallList = async () => {
  hallLoading.value = true;
  const res = await listHall(hallQueryParams);
  hallList.value = res.rows;
  hallTotal.value = res.total;
  hallLoading.value = false;
  resetContainerList();
  if (hallList.value.length > 0) {
    containerQueryParams.hallId = hallList.value[0].id;
    hallId.value = hallList.value[0].id;
    billBooking.value = hallList.value[0].billBooking1;
    getContainerList();
  }
}
/** Query hall detail list */
const getContainerList = async () => {
  containerLoading.value = true;
  const res = await listHallDetail(containerQueryParams);
  containerList.value = res.data;
  containerLoading.value = false;
}
/** Reset container list */
const resetContainerList = () => {
  hallId.value = '';
  billBooking.value = '';
  containerList.value = [];
  hallIds.value = [];
  containerQueryParams.hallId = undefined;
}
/** Search button action */
const handleQuery = () => {
  hallQueryParams.pageNum = 1;
  getHallList();
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Add button action */
const handleHallAdd = () => {
  hallDialog.visible = true;
  hallDialog.title = 'Tạo lô';
  nextTick(() => {
    resetHallForm();
  })
}
/** Edit button action */
const handleHallUpdate = () => {
  hallDialog.visible = true;
  hallDialog.title = 'Sửa lô';
  nextTick(async () => {
    resetHallForm();
    const _id = hallIds.value[0]
    const res = await getHall(_id);
    Object.assign(hallForm.value, res.data);
  })
}
/** Form reset */
const resetHallForm = () => {
  hallForm.value = {...initHallFormData};
  hallFormRef.value.resetFields();
}
/** Submit button */
const submitHallForm = () => {
    if (hallForm.value.id && isProcessingHall(hallList.value, hallIds.value)) {
      proxy?.$modal.msgError(`Lô ${containerList.value[0].billBooking1} đã khai hải quan hoặc đã làm lệnh, không thể cập nhật thông tin`);
      return;
    }
  hallFormRef.value.validate(async (valid: boolean) => {
    if (valid && (fileUploadRef.value ? fileUploadRef.value.submitFile() : true)) {
      layoutHallFormLoading.value = true;
      if (hallForm.value.id) {
        await updateHall(hallForm.value).finally(() => layoutHallFormLoading.value = false);
      } else {
        await addHall(hallForm.value).finally(() => layoutHallFormLoading.value = false);
      }
      proxy?.$modal.msgSuccess('Lưu thành công');
      hallDialog.visible = false;
      await getHallList();
    }
  });
}
/** Save list container */
const handleContainerUpdate = async () => {
  if (!isOrderReadyProcess(containerList.value, containerIds.value)) {
    proxy?.$modal.alertWarning('Không thể cập nhật thông tin, container đã làm lệnh!', 'Cảnh báo');
    return;
  }
  layoutLoading.value = true;
  let listShipmenDetail = containerList.value.filter((contaner) => containerIds.value.includes(parseInt(contaner.id + '')))
  await updateHallDetails(listShipmenDetail).finally(() => layoutLoading.value = false);
  getContainerList();
}


/** Validate delete */
const handleDeleteHall = async () => {
  if (isProcessingHall(hallList.value, hallIds.value)) {
    proxy?.$modal.msgError("Lô đã hoặc đang được xử lý");
    return
  }
  const ids = hallIds.value
  await proxy?.$modal.confirmDelete("Xác nhận xóa lô?").then(action => {
    layoutLoading.value = true;
    if (action === 'cancel') return;
    deleteContainer(ids).finally(() => layoutLoading.value = false);
  })
  getHallList();
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getHallList();
});
</script>
