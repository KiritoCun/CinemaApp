<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <b-container justify-content="space-between" fluid class="h-100 d-flex flex-row" :style="{ backgroundColor: '#F9F9F9', padding: '10%' }">
        <b-card style="flex: 1; max-width: 30%; margin-right: 10%; margin-bottom: 35px; height: 100%; display: flex">
          <div class="d-flex flex-row justify-content-center">
            <i class="bi bi-camera p-2 border p-1" style="font-size: 2rem; border-radius: 100%;"></i>
            <div>
              <b-card-text class="bold-font">{{ userInfoData[0].user_name }}</b-card-text>
              <b-card-text>6 Stars</b-card-text>
            </div>
          </div>
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
          <span class="bold-font d-inline" style="color: #034EA2;"> hotro@galaxystudio.vn</span>
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

const billHistoryData = [
  {
    id:1,
    title:'Oppenheimer',
    genre: '2D Phụ Đề',
    hall_name: 'Rạp 6',
    start_time: new Date(2023, 4, 13, 10, 15, 0),
    img: 'https://image.tmdb.org/t/p/original/yg7B62JJbJrkBwiQrRf8vMDogLB.jpg'
  },
  {
    id:2,
    title:'Chiến Binh Báo Đen: Wakanda Bất Diệt',
    genre: '2D Phụ Đề',
    hall_name: 'Rạp 6',
    start_time: new Date(2023, 4, 11, 15, 30, 0),
    img: 'https://upload.wikimedia.org/wikipedia/vi/3/3b/Black_Panther_Wakanda_Forever_poster.jpg'
  },
  {
    id:3,
    title:'Phù Thủy Tối Thượng Trong Đa Vũ Trụ Hỗn Loạn',
    genre: '2D Phụ Đề',
    hall_name: 'Rạp 6',
    start_time: new Date(2023, 2, 7, 8, 0, 0),
    img: 'https://www.cgv.vn/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/d/r/dr-strange-payoff-poster_1_.jpg'
  },
]

const billDetail = [
  {
    
  },
]
</script>

<style lang="scss" scoped>
@use 'sass:math';
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";


.vertical-divider {
 width: 1px;
 background-color: #181818;
 margin: 0 10px;
}
.bold-font {
 font-weight:700 ;
 font-size: 1rem;
}
</style>
