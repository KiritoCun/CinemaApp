<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <b-container justify-content="space-between" fluid class="h-100 d-flex flex-row" :style="{ backgroundColor: '#F9F9F9', padding: '10%' }">
        <b-card style="flex: 1; max-width: 30%; margin-right: 10%; margin-bottom: 35px; height: 100%; display: flex">
          <div class="basic-avatar"><userAvatar :user="state.user" /></div>
          <hr class="hr" />
          <div style="padding-bottom: 110px;">
            <p class="bold-font" style="margin-bottom: 80px;">Tổng chi tiêu năm 2023</p>
            <div class="block">
              <el-slider v-model="value" range :marks="marks"> </el-slider>
            </div>
          </div>
          <div>
            <span class="bold-font d-inline">HOTLINE hỗ trợ: </span>
            <span class="bold-font d-inline" style="color: #034EA2;"> 19002224 (9:00 - 22:00) </span>
          </div>
          <hr class="hr" />
          <span class="bold-font d-inline">Email:</span>
          <span class="bold-font d-inline" style="color: #034EA2;"> hotro@starcinema.vn</span>
          <hr class="hr" />
          <span class="bold-font d-inline">Câu hỏi thường gặp:</span>
        </b-card>
        <div style="flex:1">
          <b-tabs content-class="mt-3">
            <b-tab title="Lịch sử giao dịch"
              ><p><BillHistory :billHistoryData="billHistoryData"></BillHistory></p
            ></b-tab>
            <b-tab title="Thông tin cá nhân"
              ><p><UserInfo :userInfoData="userInfoData[0]"></UserInfo></p
            ></b-tab>
            <b-tab title="Chính sách"
              ><p><Policy></Policy></p
            ></b-tab>
          </b-tabs>
        </div>
      </b-container>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="Profile" lang="ts">
import { VNode,h,ref } from 'vue';
import useCustomerUserStore from '@/store/modules/customer';
import userAvatar from "../system/user/profile/userAvatar.vue";
import { getUserProfile, getBookingHistorys } from "@/api/system/user";

const state = ref<{ user: any; roleGroup: string;  postGroup: string}>({
    user: {},
    roleGroup: '',
    postGroup: ''
});

const userForm = ref({});

const getUser = async () => {
    const res = await getUserProfile();
    state.value.user = res.data.user;
    userForm.value = { ...res.data.user }
    state.value.roleGroup = res.data.roleGroup;
    state.value.postGroup = res.data.postGroup;
};

// const appStore = useAppStore()
const userStore = useCustomerUserStore();
const value = ref<number[]>([0, 100]);

const marks= {
        0: {
          style: {
            color: '#1174C2'
          },
          label: h('strong', '0 đ') as VNode
        },
        50: {
          style: {
            color: '#1174C2'
          },
          label: h('strong', '2.000.000 đ') as VNode
        },
        85: {
          style: {
            color: '#1174C2'
          },
          label: h('strong', '4.000.000 đ') as VNode
        },
      };

const userInfoData = [
  {
      id:1,
      user_name : "Nguyen Ngoc Phu",
      email: "phunguyen291002@gmail.com",
      birthday: new Date('2002-10-29T00:00:00.000Z'),
      phonenumber: "0775545294",
      sex: 0,
      password: "Phu291002@11",
  }
];

const billHistoryData = ref(<any[]>([]));

const getBookingHistoryList = async () => {
  const bookingHistoryList = await getBookingHistorys();
  console.log(bookingHistoryList);
  billHistoryData.value = bookingHistoryList.data;
}

onMounted(() => {
  getUser();
  getBookingHistoryList();
})
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.container-fluid {
  padding: 2% 10% !important;
}
.vertical-divider {
 width: 1px;
 background-color: #181818;
 margin: 0 10px;
}
.bold-font {
 font-weight:700 ;
 font-size: 1rem;
}


.basic-avatar {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
