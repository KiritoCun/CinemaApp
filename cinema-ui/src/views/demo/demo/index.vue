<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="Department id" prop="deptId">
            <el-input v-model="queryParams.deptId" placeholder="Please enter the department id" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="User id" prop="userId">
            <el-input v-model="queryParams.userId" placeholder="Please enter user id" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="Order number" prop="orderNum">
            <el-input v-model="queryParams.orderNum" placeholder="Please enter the id" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="Key" prop="testKey">
            <el-input v-model="queryParams.testKey" placeholder="Please enter key" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="Value" prop="value">
            <el-input v-model="queryParams.value" placeholder="Please enter a value" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">Search</el-button>
            <el-button icon="Refresh" @click="resetQuery">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['demo:demo:add']">Add</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['demo:demo:edit']">Edit</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['demo:demo:remove']"
              >Delete</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['demo:demo:export']">Export</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="demoList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="Primary key" align="center" prop="id" v-if="true" />
        <el-table-column label="Department id" align="center" prop="deptId" />
        <el-table-column label="User id" align="center" prop="userId" />
        <el-table-column label="Order number" align="center" prop="orderNum" />
        <el-table-column label="Key" align="center" prop="testKey" />
        <el-table-column label="Value" align="center" prop="value" />
        <el-table-column label="Operate" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="Edit" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['demo:demo:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="Delete" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['demo:demo:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- Add or modify test order dialog -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="demoFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Department id" prop="deptId">
          <el-input v-model="form.deptId" placeholder="Please enter the department id" />
        </el-form-item>
        <el-form-item label="User id" prop="userId">
          <el-input v-model="form.userId" placeholder="Please enter user id" />
        </el-form-item>
        <el-form-item label="Order number" prop="orderNum">
          <el-input v-model="form.orderNum" placeholder="Please enter the order number" />
        </el-form-item>
        <el-form-item label="Key" prop="testKey">
          <el-input v-model="form.testKey" placeholder="Please enter key" />
        </el-form-item>
        <el-form-item label="Value" prop="value">
          <el-input v-model="form.value" placeholder="Please enter value" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">OK</el-button>
          <el-button @click="cancel">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Demo" lang="ts">
import { listDemo, getDemo, delDemo, addDemo, updateDemo } from '@/api/demo/demo';
import { DemoVO, DemoQuery, DemoForm } from '@/api/demo/demo/types';
import { ComponentInternalInstance } from 'vue';
import { ElForm } from 'element-plus';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const demoList = ref<DemoVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref(ElForm);
const demoFormRef = ref(ElForm);

const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '500px'
});

const initFormData: DemoForm = {
  id: undefined,
  deptId: undefined,
  userId: undefined,
  orderNum: undefined,
  testKey: undefined,
  value: undefined,
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<DemoForm, DemoQuery>>({
  form: {...initFormData},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    deptId: undefined,
    userId: undefined,
    orderNum: undefined,
    testKey: undefined,
    value: undefined,
    orderByColumn: '',
    isAsc: ''
  },
  rules: {
    id: [
      { required: true, message: "Primary key cannot be empty", trigger: "blur" }
    ],
    deptId: [
      { required: true, message: "Department id cannot be empty", trigger: "blur" }
    ],
    userId: [
      { required: true, message: "User id cannot be empty", trigger: "blur" }
    ],
    orderNum: [
      { required: true, message: "Order number cannot be empty", trigger: "blur" }
    ],
    testKey: [
      { required: true, message: "Key cannot be empty", trigger: "blur" }
    ],
    value: [
      { required: true, message: "Value cannot be empty", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** Query the list of test orders */
const getList = async () => {
  loading.value = true;
  const res = await listDemo(queryParams.value);
  demoList.value = res.rows;
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
  demoFormRef.value.resetFields();
}

/** Search button action */
const handleQuery = () => {
  queryParams.value.pageNum = 1;
  getList();
}

/** Reset button action */
const resetQuery = () => {
  queryFormRef.value.resetFields();
  handleQuery();
}

/** Multiple selection box select data */
const handleSelectionChange = (selection: DemoVO[]) => {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** Add button action */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = "Add test sheet";
  nextTick(() => {
    reset();
  });
}

/** Edit button action */
const handleUpdate = (row?: DemoVO) => {
  dialog.visible = true;
  dialog.title = "Edit the test sheet";
  nextTick(async () => {
    reset();
    const _id = row?.id || ids.value[0]
    const res = await getDemo(_id);
    Object.assign(form.value, res.data);
  });
}

/** Submit button */
const submitForm = () => {
  demoFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateDemo(form.value).finally(() =>  buttonLoading.value = false);
      } else {
        await addDemo(form.value).finally(() =>  buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("Edited successfully");
      dialog.visible = false;
      await getList();
    }
  });
}

/** Delete button action */
const handleDelete = async (row?: DemoVO) => {
  const _ids = row?.id || ids.value;
  await proxy?.$modal.confirm('Are you sure to delete the data item test order number "' + _ids + '"?').finally(() => loading.value = false);
  await delDemo(_ids);
  proxy?.$modal.msgSuccess("Deleted successfully");
  await getList();
}

/** Export button action */
const handleExport = () => {
  proxy?.download('demo/demo/export', {
    ...queryParams.value
  }, `demo_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
  getList();
});
</script>
