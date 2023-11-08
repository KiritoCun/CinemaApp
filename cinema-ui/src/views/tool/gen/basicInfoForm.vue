<template>
  <el-form ref="basicInfoForm" :model="infoForm" :rules="rules" label-width="150px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="Table name" prop="tableName">
          <el-input placeholder="Please enter the table name" v-model="infoForm.tableName" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Table description" prop="tableComment">
          <el-input placeholder="Please enter" v-model="infoForm.tableComment" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Class name" prop="className">
          <el-input placeholder="Please enter" v-model="infoForm.className" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="Author" prop="functionAuthor">
          <el-input placeholder="Please enter" v-model="infoForm.functionAuthor" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item label="Remark" prop="remark">
          <el-input type="textarea" :rows="3" v-model="infoForm.remark"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const prop = defineProps({
    info: {
        type: Object as PropType<any>,
        default: () => {
            return {};
        }
    }
});

const infoForm = computed(() => prop.info)

// form validation
const rules = ref({
    tableName: [{ required: true, message: "Please enter table name", trigger: "blur" }],
    tableComment: [{ required: true, message: "Please enter table description", trigger: "blur" }],
    className: [{ required: true, message: "Please enter entity class name", trigger: "blur" }],
    functionAuthor: [{ required: true, message: "Please enter the author", trigger: "blur" }]
});
</script>
