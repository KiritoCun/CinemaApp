<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="login-form-container">
        <el-form ref="loginRef" :model="loginForm" :rules="loginRules" class="login-form-customer">
          <h3 class="title">{{ $t('homepage.login.tt') }}</h3>
          <el-form-item prop="username" :label="$t('homepage.login.usernameLb')">
            <el-input v-model="loginForm.username" type="text" size="large" auto-complete="off" :placeholder="$t('homepage.login.usernamePh')">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :label="$t('homepage.login.passwordLb')">
            <el-input
              v-model="loginForm.password"
              type="password"
              size="large"
              auto-complete="off"
              :placeholder="$t('homepage.login.passwordPh')"
              @keyup.enter="handleLogin"
              show-password
              clearable
            >
            </el-input>
          </el-form-item>
          <el-checkbox v-model="loginForm.rememberMe">
            <span class="remember-pass-text">{{ $t('homepage.login.rememberPassLb') }}</span>
          </el-checkbox>
          <el-form-item style="width:100%;">
            <IrButton
              colorStyle="blue"
              type="primary"
              buttonSize="large"
              :title="$t('homepage.login.loginBtnTt')"
              :loadingFlag="loading"
              widthPercent="100%"
              @onClick="handleLogin"
              style="width:100%; margin-top: 40px;"
            />
            <div style="float: right;" v-if="register">
              <router-link class="link-type" :to="'/register'">Sign up now</router-link>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="SearchEdo" lang="ts">
import { FormRules } from 'element-plus';
import {searchEdo} from '@/api/homepage'
import {EdoSearchParam, Edo} from '@/api/homepage/type'
import { ComponentInternalInstance } from "vue";
import Cookies from 'js-cookie';
import { encrypt, decrypt } from '@/utils/jsencrypt';
import { useUserStore } from '@/store/modules/user';
import { LoginData, TenantVO } from '@/api/types';
import { getCodeImg, getTenantList } from '@/api/login';
import { to } from 'await-to-js';
import i18n from '@/lang';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute()
const router = useRouter();
const userStore = useUserStore();

const activeLogin = ref('')
const codeUrl = ref('logistics');
// Captcha switch
const captchaEnabled = ref(true);
// registration switch
const register = ref(false);

const loginForm = ref<LoginData>({
  tenantId: "000000",
  username: '',
  password: '',
  rememberMe: false,
  code: '',
  uuid: 'nb'
});

const loginRules: FormRules = {
  tenantId: [{ required: true, trigger: "blur", message: "Please enter your tenant number" }],
  username: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.usernameRqMsg') }],
  password: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.passwordRqMsg') }],
  code: [{ required: true, trigger: 'change', message: 'Please enter verification code' }]
};

const columns = ref([
{ prop: "blNo", name: 'Bill No', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
{ prop: "containerNo", name: 'Container No', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
{ prop: "oprCode", name: 'OPR', sortable: false, size: 50, show: true, readonly: true, align: 'left' },
{ prop: "gateInDate", name: 'In Date', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "gateOutDate", name: 'Out Date', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "expiredDem", name: 'Expired Day', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "detFreeTime", name: 'Detention Day', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "emptyContainerDepot", name: 'Empty Return Place', sortable: false, show: true, size: 250, readonly: true, align: 'left' },
{ prop: "status", name: 'Status', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "location", name: 'Location', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "remark", name: 'Remark', sortable: false, show: true, size: 250, readonly: true, align: 'left' },
]);
const edoList = ref<Edo[]>([]);
const rowKey = ref('etb');
const total = ref(0);
const loginRef = ref(ElForm);
const redirect = ref(undefined);

const handleLogin = () => {
  loginRef.value.validate(async (valid:boolean, fields: any) => {
    if (valid) {
      loading.value = true;
      // Checked the need to remember the password setting to set the remember username and password in the cookie
      if (loginForm.value.rememberMe) {
        Cookies.set("tenantId", loginForm.value.tenantId, { expires: 30 });
        Cookies.set('username', loginForm.value.username, { expires: 30 });
        Cookies.set('password', String(encrypt(loginForm.value.password)), { expires: 30 });
        Cookies.set('rememberMe', String(loginForm.value.rememberMe), { expires: 30 });
      } else {
        // otherwise remove
        Cookies.remove("tenantId");
        Cookies.remove('username');
        Cookies.remove('password');
        Cookies.remove('rememberMe');
      }
      // Call the login method of action
      // prittier-ignore
      const [err] = await to(userStore.login(loginForm.value));
      if (!err) {
        await router.push({ path: redirect.value || '/' });
      } else {
        loading.value = false;
        // Get verification code again
        if (captchaEnabled.value) {
            await getCode();
        }
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

/**
 * get verification code
 */
 const getCode = async () => {
  const res = await getCodeImg();
  const { data } = res;
  captchaEnabled.value = data.captchaEnabled === undefined ? true : data.captchaEnabled;
  if (captchaEnabled.value) {
    codeUrl.value = 'data:image/gif;base64,' + data.img;
    loginForm.value.uuid = data.uuid;
  }
};

const getCookie = () => {
  const tenantId = Cookies.get("tenantId");
  const username = Cookies.get('username');
  const password = Cookies.get('password');
  const rememberMe = Cookies.get('rememberMe');
  loginForm.value = {
    tenantId: tenantId === undefined ? loginForm.value.tenantId : tenantId,
    username: username === undefined ? loginForm.value.username : username,
    password: password === undefined ? loginForm.value.password : (decrypt(password) as string),
    rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
  };
}

const handleNavigateLogin = (key: string) => {
  localStorage.setItem('system-type', key);
  activeLogin.value = key;
}

const edoSearchForm = ref<EdoSearchParam>({
  containerNo: '',
  blNo: '',
  pageNum: 1,
  pageSize: 50,
});
const validateAtLeastOneField = (_rule: any, _value: any, callback: any) => {
  if (!edoSearchForm.value.containerNo && !edoSearchForm.value.blNo) {
    console.log("Please");
    callback(new Error('Vui lòng nhập ít nhất một trong hai trường'));
  } else {
    callback();
  }
};

const rules = {
  containerNo: [
    { required: false, trigger: 'change', message: 'Vui lòng nhập số container' },
    { validator: validateAtLeastOneField, trigger: 'change' }
  ],
  blNo: [
    { required: false, trigger: 'change', message: 'Vui lòng nhập số bill' },
    { validator: validateAtLeastOneField, trigger: 'change' }
  ],
};
const edoSearchRef = ref(ElForm);
const loading = ref(false);

onMounted(() => {
  const containerNo = route.query.containerNo as string;
  const blNo = route.query.blNo as string;
  edoSearchForm.value.containerNo = containerNo ?? '';
  edoSearchForm.value.blNo = blNo ?? '';
});

/** Export button action */
const handleExport = () => {
  proxy?.download('homepage/search/edo/export', {
    ...edoSearchForm.value
  }, `edo_${new Date().getTime()}.xlsx`);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.main-container {
  position: relative;
  top: -62px;
  display: flex;
  flex-direction: column;
  .search-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .search-detail-container {
      max-width: 652px;
      // min-height: 366px;
      display: flex;
      padding: 40px 0px;
      flex-direction: column;
      align-items: center;
      border-left: 4px solid $blue-500;
      background: $gray-100;
      flex: 1;
      .search-detail-title {
        color: $gray-800;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 32px;
        margin-bottom: 8px;
      }
      .search-form {
        // height: 124px;
        width: 100%;
        padding: 0 90px;
      }
      .search-detail-button {
        display: flex;
        width: 100%;
        padding: 0 90px;
        justify-content: end;
        align-items: end;
      }
    }
  }
  @media (max-width:970px) {
  .search-row {
    flex-direction: column;
    .search-detail-container {
      width: 100%;
    }
  }
}
}

.table-container {
  padding: 0px  120px 100px 120px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
  .title-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    .title {
      color: $gray-800;
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      margin: 0px 24px 0px 24px
    }
    .line {
      height: 1px;
      flex:1;
      background-color: $gray-200;
    }
  }
  .datagrid-body {
    overflow: visible;
    border: 1px solid $gray-200;
    background: $gray-0;
    margin-top: 16px;
    width: 100%;
  }
  .paging-footer {
    width: 100%;
    height: 48px;
    padding: 8px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    .right-footer {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}

.login-form-customer {
  height: 480px;
  width: 526px;
  margin: 0px auto 20px auto;
  padding: 20px 60px 56px 60px;
  background-color: #FFDAB9;
}
</style>

