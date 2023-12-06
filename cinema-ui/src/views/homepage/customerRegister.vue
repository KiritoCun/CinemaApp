<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="login-form-container">
        <el-form ref="loginRef" :model="registerForm" :rules="registerRules" class="login-form-customer">
          <el-form-item prop="username" :label="$t('homepage.register.usernameLb')">
            <el-input v-model="registerForm.username" type="text" size="large" auto-complete="off" :placeholder="$t('homepage.login.usernamePh')">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" :label="$t('homepage.register.passwordLb')">
            <el-input
              v-model="registerForm.password"
              type="password"
              size="large"
              auto-complete="off"
              :placeholder="$t('homepage.register.passwordPh')"
              @keyup.enter=""
              show-password
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword" :label="$t('homepage.register.rePasswordLb')">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              size="large"
              auto-complete="off"
              :placeholder="$t('homepage.register.rePasswordPh')"
              @keyup.enter=""
              show-password
              clearable
            >
            </el-input>
          </el-form-item>
          <el-form-item style="width:100%;">
            <IrButton
              colorStyle="blue"
              type="primary"
              buttonSize="large"
              :title="$t('homepage.register.registerBtnTt')"
              widthPercent="100%"
              @onClick="handleRegister"
              style="width:100%;"
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

<script setup name="RegisterCustomer" lang="ts">
import { FormRules } from 'element-plus';
import { ComponentInternalInstance } from "vue";
import { useCustomerUserStore } from '@/store/modules/customer';
import { RegisterData, TenantVO } from '@/api/types';
import i18n from '@/lang';
import { to } from 'await-to-js';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute()
const router = useRouter();
const userStore = useCustomerUserStore();

const activeLogin = ref('')
const codeUrl = ref('customer');
// Captcha switch
const captchaEnabled = ref(true);
// registration switch
const register = ref(false);

const registerForm = ref<RegisterData>({
  tenantId: "000000",
  username: '',
  password: '',
  confirmPassword: '',
  code: '',
  uuid: 'nb'
});

const registerRules: FormRules = {
  tenantId: [{ required: true, trigger: "blur", message: "Please enter your tenant number" }],
  username: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.usernameRqMsg') }],
  password: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.passwordRqMsg') }],
  confirmPassword: [{ required: true, trigger: 'blur', message: i18n.global.t('homepage.login.rules.passwordRqMsg') }],
  code: [{ required: true, trigger: 'change', message: 'Please enter verification code' }]
};

const loading = ref(false);
const redirect = ref(undefined);

const handleRegister = async () => {
  const [err] = await to(userStore.register(registerForm.value));
  if (!err) {
    await router.push({ path: redirect.value || '/homepage/customer-login' });
  } else {
    loading.value = false;
  }
};

onMounted(() => {
});
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
      color: white;
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
  height: 470px;
  width: 526px;
  margin: 30px auto 30px auto;
  padding: 40px 60px 0px 60px;
  background: rgba(17, 25, 39, 0.8);
}

.login-form-customer .el-checkbox .el-checkbox__label  {
  color: $gray-0 !important;
}

.title {
  color: white;
  text-align: center;
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
  margin: 0px 24px 0px 24px;
}

.nav-login{
    height: 42px;
    background: unset !important;
    border-bottom: none;
    width: 100%;
}

.nav-login li.el-menu-item span {
    color: #D2D6DB !important;
    font-size: 17px;
    font-weight: 600;
    line-height: 24px;
}

.nav-login li.el-menu-item {
    padding: 8px 16px 10px 16px;
    gap: 12px;
    background: unset !important;
    flex: 1;
}

.remember-pass-text {
  color: $gray-0;
}

.svg-icon {
  width: 24px;
  height: 24px;
  color: white !important;
  position: relative;
  fill: currentColor;
  filter: brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(136%) hue-rotate(174deg) brightness(89%) contrast(93%);
  vertical-align: -2px;
}
</style>

