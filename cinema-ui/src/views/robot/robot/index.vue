<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="robotList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('robot.searchInput.robotNameLb')" prop="robotName" class="form-item-search">
        <el-input
          v-model="queryParams.robotName"
          :placeholder="$t('robot.searchInput.robotNamePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('robot.searchInput.projectNameLb')" prop="projectName" class="form-item-search">
        <el-input
          v-model="queryParams.projectName"
          :placeholder="$t('robot.searchInput.projectNamePh')"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('robot.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('robot.searchInput.statusPh')" clearable style="width: 130px">
          <el-option v-for="dict in rb_robot_status" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('robot.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['robot:robot:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('robot.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['robot:robot:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('robot.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['robot:robot:remove']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('robot.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['robot:robot:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or edit Robot information table dialog -->
          <el-form ref="robotFormRef" :model="form" :rules="rules" label-width="120px" class="common-form">
            <el-form-item :label="$t('robot.dialog.robotNameTt')" prop="robotName" class="form-item-row">
              <el-input v-model="form.robotName" :placeholder="$t('robot.dialog.robotNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.projectNameTt')" prop="projectName" class="form-item-row">
              <el-input v-model="form.projectName" :placeholder="$t('robot.dialog.projectNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.ipAddressTt')" prop="ipAddress" class="form-item-row">
              <el-input v-model="form.ipAddress" :placeholder="$t('robot.dialog.ipAddressPh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.statusTt')" prop="status" class="form-item-row">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in rb_robot_status" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.lockFlagTt')" prop="lockFlag" class="form-item-row">
              <el-radio-group v-model="form.lockFlag">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.appDirTt')" prop="appDir" class="form-item-row">
              <el-input v-model="form.appDir" :placeholder="$t('robot.dialog.appDirPh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.baseDirTt')" prop="baseDir" class="form-item-row">
              <el-input v-model="form.baseDir" :placeholder="$t('robot.dialog.baseDirPh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.versionNameTt')" prop="versionName" class="form-item-row">
              <el-input v-model="form.versionName" :placeholder="$t('robot.dialog.versionNamePh')" />
            </el-form-item>
            <el-form-item :label="$t('robot.dialog.endPointTt')" prop="endPoint" class="form-item-row">
              <el-input v-model="form.endPoint" :placeholder="$t('robot.dialog.endPointPh')" />
            </el-form-item>
            <el-row>
              <el-col :span="11">
                <el-form-item :label="$t('robot.dialog.defaultUsernameTt')" prop="defaultUsername" class="form-item-row">
                  <el-input v-model="form.defaultUsername" :placeholder="$t('robot.dialog.defaultUsernamePh')" />
                </el-form-item>
              </el-col>
              <el-col :span="2"></el-col>
              <el-col :span="11">
                <el-form-item :label="$t('robot.dialog.defaultPasswordTt')" prop="defaultPassword" class="form-item-row">
                  <el-input v-model="form.defaultPassword" :placeholder="$t('robot.dialog.defaultPasswordPh')" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="$t('robot.dialog.remarkTt')" prop="remark" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('robot.dialog.remarkPh')"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('robot.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton
            colorStyle="blue"
            type="primary"
            :title="$t('robot.dialog.footerSubmitTt')"
            :loadingFlag="buttonLoading"
            :width="100"
            @onClick="submitForm"
          />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="Robot" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { listRobot, getRobot, delRobot, addRobot, updateRobot, changeRobotLockStatus } from '@/api/robot/robot';
// IMPORT TYPE
import { RobotVO, RobotQuery, RobotForm } from '@/api/robot/robot/types';
import { ElForm } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from '@/lang';
import { ComponentInternalInstance } from 'vue';
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const router = useRouter();
// IMPORT DICTIONARY
const { sys_normal_disable, rb_robot_status } = toRefs<any>(proxy?.useDict("sys_normal_disable", "rb_robot_status"));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const robotList = ref<RobotVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const ids = ref<Array<string | number>>([]);
const total = ref(0);
const rowKey = ref("id");
const robotFormRef = ref(ElForm);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "id", name: 'robot.columns.idLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "robotName", name: 'robot.columns.robotNameLb', sortable: true, size: 170, show: true, readonly: true, align: 'left' },
  { prop: "projectName", name: 'robot.columns.projectNameLb', sortable: true, size: 170, show: true, readonly: true, align: 'left',
    click:  (rowIndex: number) => { openRobotJob(robotList.value[rowIndex]) }
  },
  { prop: "ipAddress", name: 'robot.columns.ipAddressLb', sortable: true, size: 120, show: true, readonly: true, align: 'left' },
  { prop: "status", name: 'robot.columns.statusLb', sortable: true, size: 110, show: true, readonly: true, dictData: rb_robot_status },
  { prop: "lockFlag", name: 'robot.columns.lockFlagLb', sortable: true, size: 130, show: true, readonly: true,
    switchFunc: (rowIndex: number) => { if (robotList.value) handleLockFlagChange(robotList.value[rowIndex]); }
  },
  { prop: "createTime", name: 'robot.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "remark", name: 'robot.columns.remarkLb', sortable: true, size: 200, show: true, readonly: true, align: 'left' },
  { prop: "operate", name: 'robot.columns.operateLb', size: 100, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', color: 'gray', title: 'robot.columns.editLb', permissionKey: 'robot:robot:edit',
        click: (rowIndex: number) => { robotList.value ? handleUpdate(robotList.value[rowIndex]) : () => { return } }
      },
      {
        index: 2, icon: 'delete', color: 'red', title: 'robot.columns.deleteLb', permissionKey: 'robot:robot:remove',
        click: (rowIndex: number) => { robotList.value ? handleDelete(robotList.value[rowIndex]) : () => { return } }
      },
    ]
  }
]);
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '700px'
});
const initFormData: RobotForm = {
  id: undefined,
  robotName: '',
  ipAddress: '',
  status: '0',
  projectName: '',
  retryLimit: 0,
  offCause: '',
  lockFlag: '0',
  remark: ''
}

// eslint-disable-next-line no-undef
const data = reactive<PageData<RobotForm, RobotQuery>>({
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
  rules: {
    robotName: [
      { required: true, message: i18n.global.t('robot.dialog.rules.robotNameRqMsg'), trigger: "blur" }
    ],
    projectName: [
      { required: true, message: i18n.global.t('robot.dialog.rules.projectNameRqMsg'), trigger: "blur" }
    ]
  }
});
const { queryParams, form, rules } = toRefs(data);
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/** Query Robot information table list */
const getList = async () => {
  loading.value = true;
  const res = await listRobot(queryParams.value);
  robotList.value = res.rows;
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
  robotFormRef.value.resetFields();
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
/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('robot.dialog.addTt');
  nextTick(() => {
    reset();
  });
}
/** Open robot job screen */
const openRobotJob = (row?: RobotVO) => {
  const projectName = row?.projectName;
  router.push("/monitor/robot-job/index/" + projectName);
}
/** Edit button action */
const handleUpdate = (row?: RobotVO) => {
  dialog.visible = true;
  dialog.title = i18n.global.t('robot.dialog.editTt');
  nextTick(async () => {
    reset();
    const _id = row?.id || ids.value[0]
    const res = await getRobot(_id);
    Object.assign(form.value, res.data);
  });
}
/** Submit button */
const submitForm = () => {
  robotFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateRobot(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addRobot(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess(i18n.global.t('robot.operationMsg.submitSuccess'));
      dialog.visible = false;
      await getList();
    }
  });
}
/** Robot Lock Flag Modification  */
const handleLockFlagChange = async (row: RobotVO) => {
  let text = row.lockFlag === "0" ? i18n.global.t('robot.operationMsg.unlock') : i18n.global.t('robot.operationMsg.lock');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('robot.operationMsg.lockChangeCf', { action : text, robotName : row.robotName }));
    await changeRobotLockStatus(row.id, row.lockFlag);
    proxy?.$modal.msgSuccess(text + i18n.global.t('robot.operationMsg.lockChangeSuccess'));
  } catch (err) {
    row.lockFlag = row.lockFlag === "0" ? "1" : "0";
  }
}
/** Delete button action */
const handleDelete = async (row?: RobotVO) => {
  const robotids = row?.id || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('robot.operationMsg.deleteCf', { robotName : (row ? ' "' + row.robotName + '"' : '') })).finally(() => loading.value = false);
  await delRobot(robotids);
  proxy?.$modal.msgSuccess(i18n.global.t('robot.operationMsg.deleteSuccess'));
  await getList();
}
/** Export button action */
const handleExport = () => {
  proxy?.download('robot/robot/export', {
    ...queryParams.value
  }, `robot_${new Date().getTime()}.xlsx`)
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
onMounted(() => {
  getList();
});
</script>
