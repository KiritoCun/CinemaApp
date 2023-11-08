<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="jobList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('robot.job.searchInput.robotNameLb')" prop="robotName" class="form-item-search">
        <el-input
          v-model="queryParams.robotName"
          :placeholder="$t('robot.job.searchInput.robotNamePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('robot.job.searchInput.projectNameLb')" prop="projectName" class="form-item-search">
        <el-input
          v-model="queryParams.projectName"
          :placeholder="$t('robot.job.searchInput.projectNamePh')"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('robot.job.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select
          v-model="queryParams.status"
          :placeholder="$t('robot.job.searchInput.statusPh')"
          clearable
          style="width: 130px"
          @change="handleQuery"
        >
          <el-option v-for="dict in rb_job_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('robot.job.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['robot:job:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('robot.job.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['robot:job:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('robot.job.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['robot:job:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('robot.job.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['robot:job:export']"
        @onClick="handleExport"
      />
      <IrButton colorStyle="gray" type="secondary" :title="$t('robot.job.headerButton.closeTt')" leftIcon="close" @onClick="handleClose" />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or edit Robot information table dialog -->
          <el-form ref="jobFormRef" :model="form" :rules="rules" label-width="120px" class="common-form">
            <el-form-item :label="$t('robot.job.dialog.robotNameTt')" prop="robotName" class="form-item-row">
              <el-input v-model="form.robotName" :placeholder="$t('robot.job.dialog.robotNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.job.dialog.projectNameTt')" prop="projectName" class="form-item-row">
              <el-input v-model="form.projectName" :placeholder="$t('robot.job.dialog.projectNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.job.dialog.ipAddressTt')" prop="ipAddress" class="form-item-row">
              <el-input v-model="form.ipAddress" :placeholder="$t('robot.job.dialog.ipAddressPh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.job.dialog.statusTt')" prop="status" class="form-item-row">
              <el-select v-model="form.status">
                <el-option v-for="item in rb_job_status" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('robot.job.dialog.reqJsonTt')" prop="reqJson" class="form-item-row">
              <el-link :underline="false" icon="DocumentCopy" v-copyText="JSON.stringify(form.reqJson)" v-copyText:callback="copyTextSuccess">
                &nbsp;Copy
              </el-link>
              <vue-json-pretty v-model:data="form.reqJson" :showDoubleQuotes="false" :showLineNumber="true" editableTrigger="dblclick" editable />
            </el-form-item>
            <el-form-item :label="$t('robot.job.dialog.resJsonTt')" prop="resJson" class="form-item-row">
              <el-input v-model="form.resJson" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('robot.job.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            type="primary"
            :title="$t('robot.job.dialog.footerSubmitTt')"
            :loadingFlag="buttonLoading"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
      <IrDialog class="only-grid" :dialog="histDialog">
        <template v-slot:body>
          <IrGrid v-loading="histLoading" :rowData="histList" :columnSetting="histColumns" :rowKey="histRowKey" :checkboxCol="false" />
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('robot.job.dialog.histFooterCancelTt')" :width="100" @onClick="cancelHist" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="RobotJob" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';
// IMPORT API
import { listJob, getJob, delJob, addJob, updateJob } from '@/api/robot/job';
import { listJobHist } from '@/api/robot/jobHist';
// IMPORT TYPE
import { JobVO, JobQuery, JobForm } from '@/api/robot/job/types';
import { JobHistVO, JobHistQuery } from '@/api/robot/jobHist/types';
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute();
// IMPORT DICTIONARY
const { rb_job_status } = toRefs<any>(proxy?.useDict("rb_job_status"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const jobList = ref<JobVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref('jobId');
const defaultProjectName = ref("");
const histLoading = ref(true);
const histRowKey = ref('id');
const histList = ref<JobHistVO[]>([]);
const histQueryParams = reactive<JobHistQuery>(
  {
    pageNum: 1,
    pageSize: 100,
    orderByColumn: 'stepOrder',
    isAsc: 'ascending'
  }
);
const jobFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "jobId", name: 'robot.job.columns.jobIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "refId", name: 'robot.job.columns.refIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "robotName", name: 'robot.job.columns.robotNameLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "projectName", name: 'robot.job.columns.projectNameLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "ipAddress", name: 'robot.job.columns.ipAddressLb', sortable: true, size: 120, show: false, readonly: true, align: 'left' },
  { prop: "status", name: 'robot.job.columns.statusLb', sortable: true, size: 140, show: true, readonly: true, dictData: rb_job_status },
  { prop: "createTime", name: 'robot.job.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'robot.job.columns.operateLb', size: 130, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'robot.job.columns.editLb', permissionKey: 'robot:job:edit',
        click: (rowIndex: number) => { jobList.value ? handleUpdate(jobList.value[rowIndex]) : () => { return } }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'robot.job.columns.deleteLb', permissionKey: 'robot:job:remove',
        click: (rowIndex: number) => { jobList.value ? handleDelete(jobList.value[rowIndex]) : () => { return } }
      },
      {
        index: 3, icon: 'view-grid', color: 'blue', title: 'robot.job.columns.viewHistLb', permissionKey: 'robot:jobHist:query',
        click: (rowIndex: number) => { jobList.value ? handleViewHist(jobList.value[rowIndex]) : () => { return } }
      }
    ]
  }
]);
// eslint-disable-next-line no-undef
const histColumns = ref<GridColumn[]>(
  [
    { prop: "createTime", name: 'robot.job.histColumns.createTimeLb', sortable: false, size: 160, show: true, readonly: true,
      cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
        return proxy?.parseTime(colProps.model[colProps.prop]);
      }
    },
    { prop: "stepOrder", name: 'robot.job.histColumns.stepOrderLb', sortable: false, size: 100, show: false, readonly: true, },
    { prop: "msg", name: 'robot.job.histColumns.msgLb', sortable: false, size: 200, show: true, readonly: false, align: 'left' },
    { prop: "errMsg", name: 'robot.job.histColumns.errMsgLb', sortable: false, size: 250, show: true, readonly: false, align: 'left' },
  ]
);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '700px'
});
const histDialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '700px'
});
const initFormData: JobForm = {
  jobId: undefined,
  refId: undefined,
  robotName: '',
  ipAddress: '',
  status: 'W',
  projectName: '',
  retryCount: 0,
  reqJson: '',
  resJson: '',
  remark: ''
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<JobForm, JobQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 20,
    robotName: '',
    status: '',
    projectName: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {}
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Robot job data table list */
const getList = async () => {
  loading.value = true;
  const res = await listJob(queryParams.value);
  jobList.value = res.rows;
  total.value = res.total;
  loading.value = false;
}
/** Cancel button */
const cancel = () => {
  reset();
  dialog.visible = false;
}
/** Form reset */
const reset = () => {
  form.value = {...initFormData};
  jobFormRef.value.resetFields();
}
/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}
/** back button action */
const handleClose = () => {
  const obj = { path: "/monitor/robot" };
  proxy?.$tab.closeOpenPage(obj);
}
/** Reset button action */
const resetQuery = () => {
  handleQuery();
}
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('robot.job.dialog.addTt');
  nextTick(() => {
    reset();
  });
}
/** Edit button action */
const handleUpdate = (row?: JobVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('robot.job.dialog.editTt');
  nextTick(async () => {
    reset();
    const jobId = row?.jobId || ids.value[0]
    const res = await getJob(jobId);
    Object.assign(form.value, {...res.data, reqJson: JSON.parse(res.data.reqJson)});
  });
}
/** Submit button */
const submitForm = () => {
  jobFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.jobId) {
        await updateJob({...form.value, reqJson: JSON.stringify(form.value.reqJson)}).finally(() =>  buttonLoading.value = false);
      } else {
        await addJob(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('robot.job.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Delete button action */
const handleDelete = async (row?: JobVO) => {
  const jobIds = row?.jobId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('robot.job.operationMsg.deleteCf', { projectName : (row ? ' "' + row.projectName + '"' : '') })).finally(() => loading.value = false);
  await delJob(jobIds);
  proxy?.$modal.msgSuccess(i18n.global.t('robot.job.operationMsg.deleteSuccess'));
  await getList();
}
/** Export button action */
const handleExport = () => {
  proxy?.download('robot/job/export', {
    ...queryParams.value
  }, `job_${new Date().getTime()}.xlsx`)
}
/** handleViewHist */
const handleViewHist = (row?: JobVO) => {
  histLoading.value = true;
  histDialog.title = i18n.global.t('robot.job.dialog.histTt');
  histDialog.visible = true;
  histQueryParams.jobId = row?.jobId;
  nextTick(async () => {
    const res = await listJobHist(histQueryParams);
    histLoading.value = false;
    histList.value = res.rows;
  });
}
/** Cancel view hist */
const cancelHist = () => {
  histDialog.visible = false;
  histList.value = [];
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  defaultProjectName.value = route.params && route.params.projectName as string;
  queryParams.value.projectName = defaultProjectName.value;
  getList();
});
/** Copy successfully */
const copyTextSuccess = () => {
  proxy?.$modal.msgSuccess(i18n.global.t('ShippinglineApi.operationMsg.copySuccess'));
}
</script>
