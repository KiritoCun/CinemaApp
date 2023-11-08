<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="Tree node name" prop="treeName">
            <el-input v-model="queryParams.treeName" placeholder="Please enter tree node name" clearable @keyup.enter="handleQuery" />
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
            <el-button type="primary" plain icon="Plus" @click="handleAdd()" v-hasPermi="['demo:tree:add']">Add</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="info" plain icon="Sort" @click="handleToggleExpandAll">Expand/Collapse</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>
      <el-table
        v-loading="loading"
        :data="treeList"
        row-key="id"
        :default-expand-all="isExpandAll"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        ref="treeTableRef"
      >
        <el-table-column label="Parent id" align="center" prop="parentId" />
        <el-table-column label="Department id" align="center" prop="deptId" />
        <el-table-column label="User id" align="center" prop="userId" />
        <el-table-column label="Tree node name" align="center" prop="treeName" />
        <el-table-column label="Operate" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="Edit" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['demo:tree:edit']" />
            </el-tooltip>
            <el-tooltip content="Add" placement="top">
              <el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['demo:tree:add']" />
            </el-tooltip>
            <el-tooltip content="Delete" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['demo:tree:remove']" />
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- Add or Modify Test Tree Dialog -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="treeFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Parent id" prop="parentId">
          <el-tree-select
            v-model="form.parentId"
            :data="treeOptions"
            :props="{ value: 'id', label: 'treeName', children: 'children' }"
            value-key="id"
            placeholder="Please select parent id"
            check-strictly
          />
        </el-form-item>
        <el-form-item label="Department id" prop="deptId">
          <el-input v-model="form.deptId" placeholder="Please enter the department id" />
        </el-form-item>
        <el-form-item label="User id" prop="userId">
          <el-input v-model="form.userId" placeholder="Please enter user id" />
        </el-form-item>
        <el-form-item label="Value" prop="treeName">
          <el-input v-model="form.treeName" placeholder="Please enter value" />
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

<script setup name="Tree" lang="ts">
import { listTree, getTree, delTree, addTree, updateTree } from "@/api/demo/tree";
import { TreeVO, TreeQuery, TreeForm } from '@/api/demo/tree/types';
import { ComponentInternalInstance } from 'vue';
import { ElForm, ElTable } from 'element-plus';


type TreeOption = {
  id: number;
  treeName: string;
  children?: TreeOption[];
}

const { proxy } = getCurrentInstance() as ComponentInternalInstance;;


const treeList = ref<TreeVO[]>([]);
const treeOptions = ref<TreeOption[]>([]);
const buttonLoading = ref(false);
const showSearch = ref(true);
const isExpandAll = ref(true);
const loading = ref(false);

const queryFormRef = ref(ElForm);
const treeFormRef = ref(ElForm);
const treeTableRef = ref(ElTable)

const dialog = reactive<DialogOption>({
    visible: false,
    title: '',
    width: '500px'
});


const initFormData: TreeForm = {
    id: undefined,
    parentId: undefined,
    deptId: undefined,
    userId: undefined,
    treeName: undefined,
}

// eslint-disable-next-line no-undef
const data = reactive<PageData<TreeForm, TreeQuery>>({
  form: {...initFormData},
  queryParams: {
    parentId: undefined,
    deptId: undefined,
    userId: undefined,
    treeName: undefined,
  },
  rules: {
    id: [
      { required: true, message: "Primary key cannot be empty", trigger: "blur" }
    ],
    parentId: [
      { required: true, message: "Parent id cannot be empty", trigger: "blur" }
    ],
    deptId: [
      { required: true, message: "Department id cannot be empty", trigger: "blur" }
    ],
    userId: [
      { required: true, message: "User id cannot be empty", trigger: "blur" }
    ],
    treeName: [
      { required: true, message: "Value cannot be empty", trigger: "blur" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** Query the list of test trees */
const getList = async () => {
  loading.value = true;
  const res = await listTree(queryParams.value);
  const data = proxy?.handleTree<TreeVO>(res.data, "id", "parentId");
  if (data) {
    treeList.value = data;
    loading.value = false;
  }
}

/** Query the test tree drop-down tree structure */
const getTreeselect = async () => {
  const res = await listTree();
  treeOptions.value = [];
  const data: TreeOption = { id: 0, treeName: 'Top node', children: [] };
  data.children = proxy?.handleTree<TreeOption>(res.data, "id", "parentId");
  treeOptions.value.push(data);
}

// Cancel button
const cancel = () => {
  reset();
  dialog.visible = false;
}

// Form reset
const reset = () => {
  form.value = {...initFormData}
  treeFormRef.value.resetFields();
}

/** Search button action */
const handleQuery = () => {
  getList();
}

/** Reset button action */
const resetQuery = () => {
  queryFormRef.value.resetFields();
  handleQuery();
}

/** Add button action */
const handleAdd = (row?: TreeVO) => {
  dialog.visible = true;
  dialog.title = "Add test tree";
  nextTick(() => {
    reset();
    getTreeselect();
    if (row != null && row.id) {
      form.value.parentId = row.id;
    } else {
      form.value.parentId = 0;
    }
  });
}

/** Expand/Collapse operation */
const handleToggleExpandAll = () => {
  isExpandAll.value = !isExpandAll.value;
  toggleExpandAll(treeList.value, isExpandAll.value)
}

/** Expand/Collapse operation */
const toggleExpandAll = (data: TreeVO[], status: boolean) => {
  data.forEach((item) => {
    treeTableRef.value.toggleRowExpansion(item, status)
    if (item.children && item.children.length > 0) toggleExpandAll(item.children, status)
  })
}

/** Edit button action */
const handleUpdate = (row: TreeVO) => {
  loading.value = true;
  dialog.visible = true;
  dialog.title = "Edit test tree";
  nextTick(async () => {
    reset();
    await getTreeselect();
    if (row != null) {
      form.value.parentId = row.id;
    }
    const res = await getTree(row.id);
    loading.value = false;
    Object.assign(form.value, res.data);
  });
}

/** Submit button */
const submitForm = () => {
  treeFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      buttonLoading.value = true;
      if (form.value.id) {
        await updateTree(form.value).finally(() => buttonLoading.value = false);
      } else {
        await addTree(form.value).finally(() => buttonLoading.value = false);
      }
      proxy?.$modal.msgSuccess("Successful operation");
      dialog.visible = false;
      getList();
    }
  });
}

/** Delete button action */
const handleDelete = async (row: TreeVO) => {
  await proxy?.$modal.confirm('Are you sure to delete the data item test tree number "' + row.id + '"? ');
  loading.value = true;
  await delTree(row.id).finally(() => loading.value = false);
  await getList();
  proxy?.$modal.msgSuccess("Deleted successfully");
}

onMounted(() => {
  getList();
});
</script>
