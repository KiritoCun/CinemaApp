<template>
  <Layout4 ref="layout" v-loading="loading" v-model:rowData="containerList" :columnSetting="containerColumns" v-model:rowTotal="rowTotal">
    <template v-slot:header-left>
      <el-radio-group v-model="releaseFlag">
        <el-radio label="Y">{{ $t('edo.release.releaseOffical') }}</el-radio>
        <el-radio label="N">{{ $t('edo.release.releaseDraft') }}</el-radio>
      </el-radio-group>
    </template>
    <template v-slot:header-right>
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('edo.release.importExcelBtn')"
        leftIcon="excel"
        :iconColorUnchange="true"
        @onClick="handleImport"
      />
    </template>
    <template v-slot:right-footer>
      <IrButton colorStyle="gray" type="secondary" :title="$t('edo.release.closeBtn')" :width="100" @onClick="cancel" />
      <IrButton
        colorStyle="blue"
        type="primary"
        :loadingFlag="buttonLoading"
        :title="releaseFlag === 'N' ? $t('edo.release.releaseDraft') : $t('edo.release.releaseOffical')"
        :width="100"
        @onClick="submitForm"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="uploadDialog">
        <template v-slot:body>
          <!-- Edo Import Dialog -->
          <IrUpload ref="uploadRef" :uploadProp="uploadProp" @onFileSuccess="handleFileSuccess" @downloadTemplate="importTemplate" />
        </template>
        <template v-slot:footer>
          <IrButton
            colorStyle="gray"
            type="secondary"
            :title="$t('edo.release.importDialogCloseBtn')"
            :width="100"
            @onClick="uploadDialog.visible = false"
          />
          <IrButton colorStyle="blue" type="primary" :title="$t('edo.release.importDialogImportBtn')" :width="100" @onClick="submitFileForm" />
        </template>
      </IrDialog>
    </template>
  </Layout4>
</template>
<script setup lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import IrUpload from '@/components/IrUpload/index.vue';
// IMPORT API
import { getMasterDataForEdo } from '@/api/shpEdo/edo';
import { releaseEdo } from '@/api/shpEdo/detail';
// IMPORT TYPE
import { EdoDetailVO } from '@/api/shpEdo/detail/types';
import { EdoConsigneeVO } from '@/api/shpEdo/consignee/types';
// IMPORT GLOBAL TOOL (PROXY)
import { getToken } from "@/utils/auth";
import { containerValidate } from '@/utils/eportvict';
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////;
const releaseFlag = ref('Y');
const layout = ref();
const buttonLoading = ref(false);
const rowTotal = ref<number>(0);
const loading = ref(false);
const containerList = ref<EdoDetailVO[]>([]);
// eslint-disable-next-line no-undef
const consigneeSelect = ref<SelectProp>({
  dataSource: [],
  key: 'id',
  label: 'consigneeName',
  value: 'consigneeName'
});
// eslint-disable-next-line no-undef
const oprSelect = ref<SelectProp>({
  dataSource: [],
  key: 'oprKey',
  label: 'oprLabel',
  value: 'oprValue'
});
// eslint-disable-next-line no-undef
const containerValidateProp = ref<GridColumnValidate>({
  validateCondition: containerValidate,
  validateText: i18n.global.t('edo.release.validateConainer')
});
// eslint-disable-next-line no-undef
const containerColumns = ref<GridColumn[]>(
  [
    { prop: "businessUnit", name: 'edo.release.oprLb', size: 110, editor: 'select', selectProps: oprSelect.value, required: true },
    { prop: "blNo", name: 'edo.release.blNoLb', size: 110, align: 'left', required: true },
    { prop: "containerNo", name: 'edo.release.containerNoLb', size: 130, required: true, validate: containerValidateProp },
    { prop: "sztp", name: 'edo.release.sztpLb', size: 120, required: true },
    { prop: "orderNumber", name: 'edo.release.orderNumberLb', size: 150, align: 'left', required: true },
    { prop: "consignee", name: 'edo.release.consigneeLb', size: 200, align: 'left', editor: 'select', selectProps: consigneeSelect.value, required: true },
    { prop: "expiredDem", name: 'edo.release.expiredDemLb', size: 160, editor: 'datetime', required: true },
    { prop: "detFreeTime", name: 'edo.release.detFreeTimeLb', size: 130, align: 'left' },
    { prop: "emptyContainerDepot", name: 'edo.release.emptyContainerDepotLb', size: 185, align: 'left', required: true },
    { prop: "vesselName", name: 'edo.release.vesselNameLb', size: 120, align: 'left', required: true },
    { prop: "voyNo", name: 'edo.release.voyNoLb', size: 120, align: 'left', required: true },
    { prop: "pol", name: 'edo.release.polLb', size: 140, align: 'left' },
    { prop: "pod", name: 'edo.release.podLb', size: 160, align: 'left' },
    { prop: "remark", name: 'edo.release.remarkLb', size: 200, align: 'left' }
  ]
);
const uploadDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '400px'
});
const uploadRef = ref(IrUpload);
/*** User Import Parameters */
// eslint-disable-next-line no-undef
const uploadProp = reactive<ImportOption>({
  // Set the upload request header
  headers: { Authorization: import.meta.env.VITE_BEARER_KEY + getToken() },
  // upload address
  url: import.meta.env.VITE_APP_BASE_API + "/shippingline/shpEdo/edo/importEdo",
  type: "excel",
  accept: ".xlsx, .xls",
  templateName: 'edo_template.xlsx'
})
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const cancel = () => {
  const obj = { path: "/shpEdo/edo" };
  proxy?.$tab.closeOpenPage(obj);
}
const getListOpr = (oprs: string) => {
  const oprArr = oprs.split(',');
  let oprList = <any>[];
  oprArr.forEach(element => {
    oprList.push({oprLabel: element, oprKey: element, oprValue: element})
  });
  return oprList;
}
const getMasterData = async () => {
  loading.value = true;
  const res = await getMasterDataForEdo();
  consigneeSelect.value.dataSource = res.data.consignees;
  oprSelect.value.dataSource = getListOpr(res.data.oprs);
  if ('N' === res.data.domesticFlag) {
    containerColumns.value[5].editor = undefined;
    containerColumns.value[5].selectProps = undefined;
  }
  loading.value = false;
}
const handleConsigneeSelect = (rowIndex: number, selectedItem: EdoConsigneeVO) => {
  containerList.value[rowIndex].consigneeTaxCode = selectedItem.taxCode;
}
const submitForm = async () => {
  const valid = layout.value.validate();
  if (valid) {
    if (releaseFlag.value === 'Y') {
      await proxy?.$modal.confirmWarning(i18n.global.t('edo.release.releaseCf'));
    } else {
      await proxy?.$modal.confirmWarning(i18n.global.t('edo.release.draftCf'));
    }
    loading.value = true;
    buttonLoading.value = true;
    await releaseEdo(containerList.value, releaseFlag.value).finally(() => { buttonLoading.value = false; loading.value = false; });
    if (releaseFlag.value === 'Y') {
      proxy?.$modal.msgSuccess(i18n.global.t('edo.release.releaseSuccess'));
    } else {
      proxy?.$modal.msgSuccess(i18n.global.t('edo.release.draftSuccess'));
    }
    cancel();
  }
}
/** Download Template Action */
const importTemplate = () => {
  proxy?.download("shpEdo/edo/importTemplate", {
  }, `edo_template_${new Date().getTime()}.xlsx`);
}
/** Import button action */
const handleImport = () => {
  uploadDialog.title = i18n.global.t('edo.release.importDialogTt');
  uploadDialog.visible = true;
}
/** submit file upload */
function submitFileForm() {
  uploadRef.value.submit();
}
/** File upload successfully processed */
const handleFileSuccess = (response: any) => {
  uploadDialog.visible = false;
  proxy?.$modal.alertSuccess(i18n.global.t('edo.release.importFileSuccess'), response.msg);
  containerList.value = containerList.value.concat(response.data);
  rowTotal.value = containerList.value.length;
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getMasterData();
  consigneeSelect.value.selectFunc = handleConsigneeSelect;
});
</script>
