<template>
  <Layout1
    :loading="loading"
    :queryParams="queryParams"
    :total="total"
    :rowData="roleList"
    :columnSetting="columns"
    :rowKey="rowKey"
    :checkboxCol="true"
    @onSearch="handleQuery"
    @onReset="resetQuery"
    @onSelectedRows="handleSeletectRows"
    @onPaging="getList"
  >
    <template v-slot:search-input>
      <el-form-item :label="$t('shippinglineRole.searchInput.roleNameLb')" prop="roleName" class="form-item-search">
        <el-input
          v-model="queryParams.roleName"
          :placeholder="$t('shippinglineRole.searchInput.roleNamePh')"
          clearable
          style="width: 150px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineRole.searchInput.roleKeyLb')" prop="roleKey" class="form-item-search">
        <el-input
          v-model="queryParams.roleKey"
          :placeholder="$t('shippinglineRole.searchInput.roleKeyPh')"
          clearable
          style="width: 180px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item :label="$t('shippinglineRole.searchInput.statusLb')" prop="status" class="form-item-search">
        <el-select v-model="queryParams.status" :placeholder="$t('shippinglineRole.searchInput.statusPh')" clearable style="width: 100px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('shippinglineRole.searchInput.createTimeLb')" style="width: 230px;" class="form-item-search">
        <el-date-picker
          v-model="dateRange"
          value-format="YYYY-MM-DD"
          format="DD/MM/YYYY"
          type="daterange"
          range-separator="-"
          :start-placeholder="$t('shippinglineRole.searchInput.createTimeStartPh')"
          :end-placeholder="$t('shippinglineRole.searchInput.createTimeEndPh')"
          @change="handleQuery"
        />
      </el-form-item>
    </template>
    <template v-slot:header-button>
      <IrButton
        colorStyle="blue"
        type="primary"
        :title="$t('shippinglineRole.headerButton.addTt')"
        leftIcon="plus"
        v-hasPermi="['system:role:add']"
        @onClick="handleAdd"
      />
      <IrButton
        colorStyle="gray"
        type="secondary"
        :disabledFlag="ids.length !== 1 ? true : false"
        :title="$t('shippinglineRole.headerButton.editTt')"
        leftIcon="edit"
        v-hasPermi="['system:role:edit']"
        @onClick="handleUpdate"
      />
      <IrButton
        colorStyle="red"
        type="secondary"
        :disabledFlag="!!!ids.length"
        :title="$t('shippinglineRole.headerButton.deleteTt')"
        leftIcon="delete"
        v-hasPermi="['system:role:delete']"
        @onClick="handleDelete"
      />
      <IrButton
        colorStyle="green"
        type="secondary"
        :title="$t('shippinglineRole.headerButton.exportTt')"
        leftIcon="download"
        v-hasPermi="['system:role:export']"
        @onClick="handleExport"
      />
    </template>
    <template v-slot:dialog>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <!-- Add or Modify Role Dialog -->
          <el-form ref="roleFormRef" :model="form" :rules="rules" label-width="120px" class="common-form">
            <el-form-item :label="$t('shippinglineRole.dialog.roleNameLb')" prop="roleName" class="form-item-row">
              <el-input v-model="form.roleName" :placeholder="$t('shippinglineRole.dialog.roleNamePh')" />
            </el-form-item>
            <el-form-item prop="roleKey" class="form-item-row">
              <template #label>
                <span>
                  <el-tooltip :content="$t('shippinglineRole.dialog.roleKeyTooltip')" placement="top">
                    <el-icon><question-filled /></el-icon>
                  </el-tooltip>
                  {{ $t('shippinglineRole.dialog.roleKeyLb') }}
                </span>
              </template>
              <el-input v-model="form.roleKey" :placeholder="$t('shippinglineRole.dialog.roleKeyPh')" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineRole.dialog.roleSortLb')" prop="roleSort" class="form-item-row">
              <el-input-number v-model="form.roleSort" controls-position="right" :min="0" />
            </el-form-item>
            <el-form-item :label="$t('shippinglineRole.dialog.statusLb')" class="form-item-row">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{
                dict.label
                }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('shippinglineRole.dialog.menuPermissionLb')" class="form-item-row">
              <el-checkbox v-model="menuExpand" @change="handleCheckedTreeExpand($event, 'menu')">
                {{ $t('shippinglineRole.dialog.menuPermissionExpand') }}
              </el-checkbox>
              <el-checkbox v-model="menuNodeAll" @change="handleCheckedTreeNodeAll($event, 'menu')">
                {{ $t('shippinglineRole.dialog.menuPermissionAll') }}
              </el-checkbox>
              <el-checkbox v-model="form.menuCheckStrictly" @change="handleCheckedTreeConnect($event, 'menu')">
                {{ $t('shippinglineRole.dialog.menuPermissionLink') }}
              </el-checkbox>
              <el-tree
                class="tree-border"
                :data="menuOptions"
                show-checkbox
                ref="menuRef"
                node-key="id"
                :check-strictly="!form.menuCheckStrictly"
                :empty-text="$t('shippinglineRole.dialog.menuPermissionLoadingLb')"
                :props="{ label: 'label', children: 'children' }"
              >
                <template #default="{ node }">
                  {{ getRouteTitle(node.label) }}
                </template>
              </el-tree>
            </el-form-item>
            <el-form-item :label="$t('shippinglineRole.dialog.remarkLb')" class="form-item-row">
              <el-input v-model="form.remark" type="textarea" :placeholder="$t('shippinglineRole.dialog.remarkPh')" />
            </el-form-item>
          </el-form>
        </template>
        <template v-slot:footer>
          <IrButton colorStyle="gray" type="secondary" :title="$t('shippinglineRole.dialog.footerCancelTt')" :width="100" @onClick="cancel" />
          <IrButton colorStyle="blue" type="primary" :title="$t('shippinglineRole.dialog.footerSubmitTt')" :width="100" @onClick="submitForm" />
        </template>
      </IrDialog>
    </template>
  </Layout1>
</template>

<script setup name="ShippinglineRole" lang="ts">
///////////////////////////////////////////////////////////////////////////////
// IMPORT SECTION
///////////////////////////////////////////////////////////////////////////////
// IMPORT COMPONENT
// IMPORT API
import { addRole, changeRoleStatus, delRole, getRole, listRole, updateRole } from "@/api/portShip/shippinglineRole";
import { roleMenuTreeselect, treeselect as menuTreeselect } from '@/api/portShip/shippinglineMenu/index';
// IMPORT TYPE
import { RoleVO, RoleForm, RoleQuery, DeptTreeOption } from '@/api/portShip/shippinglineRole/types';
import { MenuTreeOption, RoleMenuTree } from '@/api/portShip/shippinglineMenu/types';
import { ElTree, ElForm, DateModelType } from 'element-plus';
// IMPORT GLOBAL TOOL (PROXY)
import i18n from "@/lang";
import { getRouteTitle } from "@/utils/i18n";
import { ComponentInternalInstance } from 'vue';
const router = useRouter();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// IMPORT DICTIONARY
const { sys_normal_disable } = toRefs<any>(proxy?.useDict('sys_normal_disable'));
///////////////////////////////////////////////////////////////////////////////
// VARIABLE SECTION
///////////////////////////////////////////////////////////////////////////////
const roleList = ref<RoleVO[]>();
const loading = ref(true)
const ids = ref<Array<string | number>>([])
const total = ref(0)
const rowKey = ref('roleId');
const dateRange = ref<[DateModelType, DateModelType]>(['', ''])
const menuOptions = ref<MenuTreeOption[]>([])
const menuExpand = ref(false)
const menuNodeAll = ref(false)
const deptExpand = ref(true)
const deptNodeAll = ref(false)
const deptOptions = ref<DeptTreeOption[]>([])
const roleFormRef = ref(ElForm);
const menuRef = ref(ElTree);
const deptRef = ref(ElTree);
// eslint-disable-next-line no-undef
const columns = ref<GridColumn[]>([
  { prop: "roleId", name: 'shippinglineRole.columns.roleIdLb', sortable: true, size: 100, show: false, readonly: true, },
  { prop: "roleName", name: 'shippinglineRole.columns.roleNameLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "roleKey", name: 'shippinglineRole.columns.roleKeyLb', sortable: true, size: 150, show: true, readonly: true, align: 'left' },
  { prop: "roleSort", name: 'shippinglineRole.columns.roleSortLb', sortable: true, size: 80, show: true, readonly: true },
  { prop: "status", name: 'shippinglineRole.columns.statusLb', sortable: true, size: 120, show: true, readonly: true,
    switchFunc: (rowIndex: number) => { if (roleList.value) handleStatusChange(roleList.value[rowIndex]); }
  },
  { prop: "createTime", name: 'shippinglineRole.columns.createTimeLb', sortable: true, size: 160, show: true, readonly: true,
    cellTemplate: (createElement: any, colProps: { model: { [x: string]: any; }; prop: string | number; }) => {
      return proxy?.parseTime(colProps.model[colProps.prop]);
    }
  },
  { prop: "operate", name: 'shippinglineRole.columns.operateLb', size: 170, show: true, readonly: true, pin: 'colPinEnd',
    buttonProps: [
      {
        index: 1, icon: 'edit', title: 'shippinglineRole.columns.operateEditLb', color: 'gray', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:role:edit',
        click: (rowIndex: number) => { roleList.value ? handleUpdate(roleList.value[rowIndex]) : () => { return } }
      },
      {
        index: 2, icon: 'delete', title: 'shippinglineRole.columns.operateDeleteLb', color: 'red', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:role:remove',
        click: (rowIndex: number) => { roleList.value ? handleDelete(roleList.value[rowIndex]) : () => { return } }
      },
      {
        index: 3, icon: 'people', title: 'shippinglineRole.columns.operateAuthUserLb', color: 'green', onlyKeys: [1], key: rowKey.value, permissionKey: 'system:role:edit',
        click: (rowIndex: number) => { if (roleList.value) handleAuthUser(roleList.value[rowIndex]); }
      }
    ]
  }
]);
const initForm: RoleForm = {
  roleId: undefined,
  roleSort: 1,
  status: '0',
  roleName: '',
  roleKey: '',
  menuCheckStrictly: true,
  deptCheckStrictly: true,
  remark: '',
  dataScope: '1',
  menuIds: [],
  deptIds: [],
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<RoleForm, RoleQuery>>({
  form: {...initForm},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    roleName: '',
    roleKey: '',
    status: '',
    orderByColumn: 'createTime',
    isAsc: 'descending'
  },
  rules: {
    roleName: [{ required: true, message: i18n.global.t('shippinglineRole.dialog.rules.roleNameRqMsg'), trigger: "blur" }],
    roleKey: [{ required: true, message: i18n.global.t('shippinglineRole.dialog.rules.roleKeyRqMsg'), trigger: "blur" }],
    roleSort: [{ required: true, message: i18n.global.t('shippinglineRole.dialog.rules.roleSortRqMsg'), trigger: "blur" }]
  }
})
const { form, queryParams, rules } = toRefs(data)
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '700px'
});
///////////////////////////////////////////////////////////////////////////////
// METHOD SECTION
///////////////////////////////////////////////////////////////////////////////
const handleSeletectRows = (selectedIds: { value: (string | number)[]; }) => {
  ids.value = selectedIds.value;
}
/**
 * Query role list
 */
const getList = () => {
  loading.value = true
  listRole(proxy?.addDateRange(queryParams.value, dateRange.value)).then(res => {
    roleList.value = res.rows
    total.value = res.total
    loading.value = false
  })
}
/**
 * Search button action
 */
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
}
/** reset */
const resetQuery = () => {
  dateRange.value = ['', '']
  handleQuery();
}
/** add role */
const handleAdd = () => {
  dialog.visible = true;
  dialog.title = i18n.global.t('shippinglineRole.dialog.addTt');
  nextTick(() => {
    reset();
    getMenuTreeselect();
  })
}
/** modify role */
const handleUpdate = async (row?: RoleVO) => {
  const roleId = row?.roleId || ids.value[0]
  const roleMenu = getRoleMenuTreeselect(roleId)
  const { data } = await getRole(roleId);
  dialog.visible = true;
  dialog.title = i18n.global.t('shippinglineRole.dialog.editTt');
  nextTick(() => {
    reset();
    Object.assign(form.value, data);
    form.value.roleSort = Number(form.value.roleSort);
    nextTick(async () => {
      const res = await roleMenu;
      let checkedKeys = res.checkedKeys;
      checkedKeys.forEach((v) => {
        nextTick(() => {
          menuRef.value.setChecked(v, true, false);
        })
      })
    })
  })
}
/** delete button action */
const handleDelete = async (row?: RoleVO) => {
  const roleids = row?.roleId || ids.value;
  await proxy?.$modal.confirmDelete(i18n.global.t('shippinglineRole.operationMsg.deleteCf', { roleName: (row ? ' "' + row?.roleName + '"' : '') }));
  await delRole(roleids);
  getList();
  proxy?.$modal.msgSuccess(i18n.global.t('shippinglineRole.operationMsg.deleteSuccess'));
}
/** Export button action */
const handleExport = () => {
  proxy?.download("portShip/shippinglineRole/export", {
    ...queryParams.value,
  }, `role_${new Date().getTime()}.xlsx`)
}
/** Character Status Modification */
const handleStatusChange = async (row: RoleVO) => {
  let text = row.status === "0" ? i18n.global.t('shippinglineRole.operationMsg.statusEnable') : i18n.global.t('shippinglineRole.operationMsg.statusDisable');
  try {
    await proxy?.$modal.confirmWarning(i18n.global.t('shippinglineRole.operationMsg.statusChangeCf', { action: text, roleName: row.roleName }));
    await changeRoleStatus(row.roleId, row.status);
    proxy?.$modal.msgSuccess(text + i18n.global.t('shippinglineRole.operationMsg.statusChangeSuccess'));
  } catch {
    row.status = row.status === "0" ? "1" : "0";
  }
}

/** assign users */
const handleAuthUser = (row: RoleVO) => {
  router.push("/portShip/shippingline-role-auth/user/" + row.roleId);
}

/** Query menu tree structure */
const getMenuTreeselect = async () => {
  const res = await menuTreeselect();
  menuOptions.value = res.data;
}
/** Reset newly added forms and other data  */
const reset = () => {
  menuRef.value.setCheckedKeys([]);
  menuExpand.value = false
  menuNodeAll.value = false
  deptExpand.value = true
  deptNodeAll.value = false
  form.value = { ...initForm };
  roleFormRef.value.resetFields();
}
/** Query the menu tree structure according to the role ID */
const getRoleMenuTreeselect = (roleId: string | number) => {
  return roleMenuTreeselect(roleId).then((res): RoleMenuTree => {
    menuOptions.value = res.data.menus;
    return res.data;
  })
}
/** Tree Permissions (Expand/Collapse) */
const handleCheckedTreeExpand = (value: any, type: string) => {
  if (type == "menu") {
    let treeList = menuOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      menuRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  } else if (type == "dept") {
    let treeList = deptOptions.value;
    for (let i = 0; i < treeList.length; i++) {
      deptRef.value.store.nodesMap[treeList[i].id].expanded = value;
    }
  }
}
/** Tree permissions (select all/unselect all) */
const handleCheckedTreeNodeAll = (value: any, type: string) => {
  if (type == "menu") {
    menuRef.value.setCheckedNodes(value ? menuOptions.value : []);
  } else if (type == "dept") {
    deptRef.value.setCheckedNodes(value ? deptOptions.value : []);
  }
}
/** Tree permissions (parent-child linkage) */
const handleCheckedTreeConnect = (value: any, type: string) => {
  if (type == "menu") {
    form.value.menuCheckStrictly = value;
  } else if (type == "dept") {
    form.value.deptCheckStrictly = value;
  }
}
/** All menu node data */
const getMenuAllCheckedKeys = () => {
  // The currently selected menu node
  let checkedKeys = menuRef.value.getCheckedKeys();
  // Half-selected menu node
  let halfCheckedKeys = menuRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
}
/** Submit button */
const submitForm = () => {
  roleFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      form.value.menuIds = getMenuAllCheckedKeys()
      form.value.roleId ? await updateRole(form.value) : await addRole(form.value);
      proxy?.$modal.msgSuccess(i18n.global.t('shippinglineRole.operationMsg.submitSuccess'))
      dialog.visible = false
      getList()
    }
  })
}
/** Cancel button */
const cancel = () => {
  reset()
  dialog.visible = false;
}
///////////////////////////////////////////////////////////////////////////////
// INIT SECTION
///////////////////////////////////////////////////////////////////////////////
/** Filter department tree by name */
onMounted(() => {
  getList();
});
</script>
