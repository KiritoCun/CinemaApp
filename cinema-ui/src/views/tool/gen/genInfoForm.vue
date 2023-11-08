<template>
  <el-form ref="genInfoForm" :model="infoForm" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item prop="tplCategory">
          <template #label>Generate template</template>
          <el-select v-model="infoForm.tplCategory" @change="tplSelectChange">
            <el-option label="Single table (add, delete, edit, check)" value="crud" />
            <el-option label="Tree table (addition, deletion, modification and query)" value="tree" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="packageName">
          <template #label>
            Generate package path
            <el-tooltip content="Under which java package is generated, for example vn.udn.dut.cinema" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="infoForm.packageName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="moduleName">
          <template #label>
            Generate module name
            <el-tooltip content="It can be understood as a subsystem name, such as system" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="infoForm.moduleName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="businessName">
          <template #label>
            Generate business name
            <el-tooltip content="It can be understood as the English name of the function, such as user" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="infoForm.businessName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="functionName">
          <template #label>
            Generate function name
            <el-tooltip content="Use as a class description, e.g. User" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="infoForm.functionName" />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item>
          <template #label>
            Parent menu
            <el-tooltip content="Assign to a specific menu, e.g. System administration" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-tree-select
            v-model="infoForm.parentMenuId"
            :data="menuOptions"
            :props="{ value: 'menuId', label: 'menuName', children: 'children' }"
            value-key="menuId"
            node-key="menuId"
            placeholder="Select parent menu"
            check-strictly
            filterable
            clearable
            highlight-current
          />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item prop="genType">
          <template #label>
            Code generation method
            <el-tooltip
              content="The default is to download the zip compressed package, and you can also customize the generation path"
              placement="top"
            >
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-radio v-model="infoForm.genType" label="0">Zip archive</el-radio>
          <el-radio v-model="infoForm.genType" label="1">Custom path</el-radio>
        </el-form-item>
      </el-col>

      <el-col :span="24" v-if="infoForm.genType == '1'">
        <el-form-item prop="genPath">
          <template #label>
            Custom path
            <el-tooltip content="Fill in the absolute path of the disk, if not, it will be generated under the current web project" placement="top">
              <el-icon><question-filled /></el-icon>
            </el-tooltip>
          </template>
          <el-input v-model="infoForm.genPath">
            <template #append>
              <el-dropdown>
                <el-button type="primary">
                  Quick selection of nearest path
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item @click="infoForm.genPath = '/'">Restore default build base path</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <template v-if="info.tplCategory == 'tree'">
      <h4 class="form-header">Other information</h4>
      <el-row v-show="info.tplCategory == 'tree'">
        <el-col :span="12">
          <el-form-item>
            <template #label>
              Tree encoding field
              <el-tooltip content="The encoded field name displayed by the tree, such as: dept_id" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="infoForm.treeCode" placeholder="Please choose">
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              Tree parent encoding field
              <el-tooltip content="The parent code field name displayed by the tree, such as: parent_Id" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="infoForm.treeParentCode" placeholder="Please choose">
              <el-option
                v-for="(column, index) in infoForm.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              Tree name field
              <el-tooltip content="The display name field name of the tree node, such as: dept_name" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="infoForm.treeName" placeholder="Please choose">
              <el-option
                v-for="(column, index) in info.columns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </template>

    <template v-if="info.tplCategory == 'sub'">
      <h4 class="form-header">Associated information</h4>
      <el-row>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              The table name of the associated child table
              <el-tooltip content="The table name of the associated child table, such as: sys_user" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="infoForm.subTableName" placeholder="Please select" @change="subSelectChange">
              <el-option v-for="(t, index) in table" :key="index" :label="t.tableName + '：' + t.tableComment" :value="t.tableName"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item>
            <template #label>
              The name of the foreign key associated with the child table
              <el-tooltip content="The foreign key name associated with the child table, such as: user_id" placement="top">
                <el-icon><question-filled /></el-icon>
              </el-tooltip>
            </template>
            <el-select v-model="infoForm.subTableFkName" placeholder="Please select">
              <el-option
                v-for="(column, index) in subColumns"
                :key="index"
                :label="column.columnName + '：' + column.columnComment"
                :value="column.columnName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </template>
  </el-form>
</template>

<script setup lang="ts">
import { listMenu } from '@/api/system/menu';
import { ComponentInternalInstance, PropType } from 'vue';

interface MenuOptionsType {
  menuId: number | string;
  menuName: string;
  children: MenuOptionsType[] | undefined;
}

const subColumns = ref<any>([]);
const menuOptions = ref<Array<MenuOptionsType>>([]);
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const props = defineProps({
  info: {
    type: Object as PropType<any>,
    default: null
  },
  tables: {
    type: Array as PropType<any[]>,
    default: null
  }
});

const infoForm = computed(() => props.info);

const table = computed(() => props.tables);

// form validation
const rules = ref({
  tplCategory: [{required: true, message: "Please select a template to generate", trigger: "blur"}],
  packageName: [{required: true, message: "Please enter build package path", trigger: "blur"}],
  moduleName: [{required: true, message: "Please enter the generated module name", trigger: "blur"}],
  businessName: [{required: true, message: "Please enter the generated business name", trigger: "blur"}],
  functionName: [{required: true, message: "Please enter the generated function name", trigger: "blur"}]
});
const subSelectChange = () => {
  infoForm.value.subTableFkName = "";
}
const tplSelectChange = (value: string) => {
  if (value !== "sub") {
    infoForm.value.subTableName = "";
    infoForm.value.subTableFkName = "";
  }
}
const setSubTableColumns = (value: string) => {
  table.value.forEach(item => {
    const name = item.tableName;
    if (value === name) {
      subColumns.value = item.columns;
      return;
    }
  })
}

/** Query menu drop-down tree structure */
const getMenuTreeselect = async () => {
  const res = await listMenu();
  res.data.forEach(m => m.menuId = m.menuId.toString());
  const data = proxy?.handleTree<MenuOptionsType>(res.data, "menuId");
  if (data) {
    menuOptions.value = data
  }
}

watch(() => props.info.subTableName, val => {
  setSubTableColumns(val);
});

onMounted(() => {
  getMenuTreeselect();
})
</script>
