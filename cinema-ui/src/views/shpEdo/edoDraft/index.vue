<template>
  <Layout3
    ref="layout"
    v-loading="layoutLoading"
    :loadingLeft="edoLoading"
    :loadingRight="containerLoading"
    :queryParamsLeft="edoQueryParams"
    :queryParamsRight="containerQueryParams"
    :totalLeft="edoTotal"
    :totalRight="containerTotal"
    :rowDataLeft="edoList"
    v-model:rowDataRight="containerList"
    :columnSettingLeft="edoColumns"
    :columnSettingRight="containerColumns"
    :rowKeyLeft="edoRowKey"
    :rowKeyRight="containerRowKey"
    :checkboxColLeft="true"
    :checkboxColRight="false"
    :rowDeleteRight="true"
    v-model:rowTotalRight="rowTotal"
    @onSelectedRowsLeft="handleSelectEdoRows"
    @onSelectCellLeft="handleSelectCellEdo"
    @onSearchLeft="handleQuery"
    @onSearchRight="getContainerList"
    @onResetLeft="resetQuery"
    @onPagingLeft="getEdoList"
    @onPagingRight="getContainerList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('edoDraft.searchInput.vesselNameLb')" prop="vesselName" class="form-item-search">
        <el-input
          v-model="edoQueryParams.vesselName"
          :placeholder="$t('edoDraft.searchInput.vesselNameLb')"
          clearable
          style="width: 120px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('edoDraft.searchInput.voyNoLb')" prop="voyNo" class="form-item-search">
        <el-input
          v-model="edoQueryParams.voyNo"
          :placeholder="$t('edoDraft.searchInput.voyNoPh')"
          clearable
          style="width: 110px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('edoDraft.searchInput.consigneeLb')" prop="consignee" class="form-item-search">
        <el-input
          v-model="edoQueryParams.consignee"
          :placeholder="$t('edoDraft.searchInput.consigneePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('edoDraft.searchInput.blNoLb')" prop="blNo" class="form-item-search">
        <el-input
          v-model="edoQueryParams.blNo"
          :placeholder="$t('edoDraft.searchInput.blNoPh')"
          clearable
          style="width: 130px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('edoDraft.searchInput.containerNoLb')" prop="containerNo" class="form-item-search">
        <el-input
          v-model="edoQueryParams.containerNo"
          :placeholder="$t('edoDraft.searchInput.containerNoPh')"
          clearable
          style="width: 130px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button-left>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('edoDraft.btn.add')"
        v-hasPermi="['shpEdo:edo:release']"
        leftIcon="plus"
        @onClick="goToReleaseEdo"
      />
      <IrButton
        colorStyle="green"
        type="primary"
        :title="$t('edoDraft.btn.release')"
        :disabledFlag="!!!edoIds.length"
        v-hasPermi="['shpEdo:edoDraft:release']"
        leftIcon="flag"
        @onClick="handleRelease"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!edoIds.length"
        :title="$t('edoDraft.btn.delete')"
        leftIcon="delete"
        v-hasPermi="['shpEdo:edoDraft:remove']"
        @onClick="handleDelete"
      />
    </template>
    <template v-slot:header-button-right>
      <IrButton
        colorStyle="green"
        type="primary"
        :title="$t('edoDraft.btn.save')"
        :loadingFlag="editButtonLoading"
        v-hasPermi="['shpEdo:edoDraft:edit']"
        leftIcon="save"
        @onClick="handleSave"
      />
    </template>
  </Layout3>
</template>
<script setup name="Edo" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listEdoDraft, listContainerDraft, updateEdoDraft, delEdoDraft, releaseEdoDraft } from '@/api/shpEdo/draft';
import { getMasterDataForEdo } from '@/api/shpEdo/edo';
// IMPORT TYPE
import { EdoMainVO, EdoMainQuery } from '@/api/shpEdo/edo/types';
import { EdoDetailVO, EdoDetailQuery } from '@/api/shpEdo/detail/types';
import { EdoConsigneeVO } from '@/api/shpEdo/consignee/types';
// IMPORT GLOBAL TOOL (PROXY)
import { containerValidate } from '@/utils/eportvict';
import i18n from '@/lang';
import { ComponentInternalInstance } from "vue";
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const layout = ref();
const layoutLoading = ref(false);
const edoList = ref<EdoMainVO[]>([]);
const edoIds = ref(<any>[]);
const edoLoading = ref(true);
const edoTotal = ref(0);
const edoRowKey = ref("id");
// eslint-disable-next-line no-undef
const edoColumns = ref<GridColumn[]>(
  [
    { prop: "id", name: 'edoDraft.edoColumns.idLb', sortable: true, size: 100, show: false, readonly: true, },
    { prop: "blNo", name: 'edoDraft.edoColumns.blNoLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
    { prop: "vesselName", name: 'edoDraft.edoColumns.vesselNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
    { prop: "voyNo", name: 'edoDraft.edoColumns.voyNoLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
    { prop: "createTime", name: 'edoDraft.edoColumns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
      cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
        return proxy?.parseTime(colProps.model[colProps.prop]);
      }
    }
  ]
);
const editButtonLoading = ref(false);
const containerList = ref<EdoDetailVO[]>([]);
const containerLoading = ref(false);
const containerTotal = ref(0);
const rowTotal = ref<number>(0);
const containerRowKey = ref("id");
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
  validateText: i18n.global.t('edoDraft.containerColumns.validateConainer')
});
// eslint-disable-next-line no-undef
const containerColumns = ref<GridColumn[]>(
  [
    { prop: "businessUnit", name: 'edoDraft.containerColumns.oprCodeLb', size: 110, editor: 'select', selectProps: oprSelect.value, required: true },
    { prop: "containerNo", name: 'edoDraft.containerColumns.containerNoLb', size: 130, required: true, validate: containerValidateProp },
    { prop: "sztp", name: 'edoDraft.containerColumns.sztpLb', size: 120, required: true },
    { prop: "orderNumber", name: 'edoDraft.containerColumns.orderNumberLb', size: 150, align: 'left', required: true },
    { prop: "consignee", name: 'edoDraft.containerColumns.consigneeLb', size: 200, align: 'left', editor: 'select', selectProps: consigneeSelect.value, required: true },
    { prop: "expiredDem", name: 'edoDraft.containerColumns.expiredDemLb', size: 160, editor: 'datetime', required: true },
    { prop: "detFreeTime", name: 'edoDraft.containerColumns.detFreeTimeLb', size: 130, align: 'left' },
    { prop: "emptyContainerDepot", name: 'edoDraft.containerColumns.emptyContainerDepotLb', size: 185, align: 'left', required: true },
    { prop: "vesselName", name: 'edoDraft.containerColumns.vesselNameLb', size: 120, align: 'left', required: true },
    { prop: "voyNo", name: 'edoDraft.containerColumns.voyNoLb', size: 120, align: 'left', required: true },
    { prop: "pol", name: 'edoDraft.containerColumns.polLb', size: 140, align: 'left' },
    { prop: "pod", name: 'edoDraft.containerColumns.podLb', size: 160, align: 'left' },
    { prop: "remark", name: 'edoDraft.containerColumns.remarkLb', size: 200, align: 'left' }
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
const handleSelectEdoRows = (selectedIds: { value: (string | number)[]; }) => {
  edoIds.value = selectedIds.value;
}
const handleSelectCellEdo = (modal: any) => {
  resetContainerList();
  containerQueryParams.blNo = edoList.value[modal.rowIndex].blNo;
  getContainerList();
}
const handleConsigneeSelect = (rowIndex: number, selectedItem: EdoConsigneeVO) => {
  containerList.value[rowIndex].consigneeTaxCode = selectedItem.taxCode;
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
  layoutLoading.value = true;
  const res = await getMasterDataForEdo();
  consigneeSelect.value.dataSource = res.data.consignees;
  oprSelect.value.dataSource = getListOpr(res.data.oprs);
  if ('N' === res.data.domesticFlag) {
    containerColumns.value[4].editor = undefined;
    containerColumns.value[4].selectProps = undefined;
  }
  layoutLoading.value = false;
}
/** Query EDO main table list */
const getEdoList = async () => {
  edoLoading.value = true;
  const res = await listEdoDraft(edoQueryParams);
  edoList.value = res.rows;
  edoTotal.value = res.total;
  edoLoading.value = false;
  resetContainerList();
  if (edoList.value.length > 0) {
    containerQueryParams.blNo = edoList.value[0].blNo;
    getContainerList();
  }
}
/** Query EDO Detail table list */
const getContainerList = async () => {
  containerLoading.value = true;
  const res = await listContainerDraft(containerQueryParams);
  containerList.value = res.rows;
  containerTotal.value = res.total;
  rowTotal.value = res.rows.length;
  containerLoading.value = false;
}
/** Reset container list */
const resetContainerList = () => {
  containerList.value = [];
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
  handleQuery();
}
/** Add new edo draft or offical */
const goToReleaseEdo = () => {
  router.push("/shpEdo/edo-release/index");
}
/** Delete button action */
const handleDelete = async () => {
  await proxy?.$modal.confirmDelete(i18n.global.t('edoDraft.msg.confirmDelete'));
  await delEdoDraft(edoIds.value);
  getEdoList();
  proxy?.$modal.msgSuccess(i18n.global.t('edoDraft.msg.deleteSuccess'));
}
/** Edit current edo draft */
const handleSave = async () => {
  const valid = layout.value.validate();
  if (valid) {
    await proxy?.$modal.confirmWarning(i18n.global.t('edoDraft.msg.confirmSave'));
    containerLoading.value = true;
    await updateEdoDraft(containerList.value, containerQueryParams.blNo).finally(() => { editButtonLoading.value = false; containerLoading.value = false; });
    proxy?.$modal.msgSuccess(i18n.global.t('edoDraft.msg.saveSuccess'));
    getContainerList();
  }
}
/** Release button action */
const handleRelease = async () => {
  await proxy?.$modal.confirmWarning(i18n.global.t('edoDraft.msg.confirmRelease'));
  await releaseEdoDraft(edoIds.value);
  getEdoList();
  proxy?.$modal.msgSuccess(i18n.global.t('edoDraft.msg.releaseSuccess'));
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getMasterData();
  consigneeSelect.value.selectFunc = handleConsigneeSelect;
  getEdoList();
});
</script>
