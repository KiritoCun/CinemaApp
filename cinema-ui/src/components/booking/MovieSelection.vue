<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <v-expansion-panel-title>Chọn vị trí</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div class="text-wrapper">
              <button class="py-2 px-3 border rounded text-[14px] font-normal text-black-10 transition-all duration-500 ease-in-out position-btn">
                TP Hồ Chí Minh
              </button>
              <button class="py-2 px-3 border rounded text-[14px] font-normal text-black-10 transition-all duration-500 ease-in-out position-btn">
                TP Đà Nẵng
              </button>
              <button class="py-2 px-3 border rounded text-[14px] font-normal text-black-10 transition-all duration-500 ease-in-out position-btn">
                TP Hải Phòng
              </button>
              <button class="py-2 px-3 border rounded text-[14px] font-normal text-black-10 transition-all duration-500 ease-in-out position-btn">
                TP Hà Nội
              </button>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>Chọn phim</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <MovieCarousel></MovieCarousel>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-title>Chọn suất</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <ShowTime></ShowTime>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="card-container">
      <b-card>
        <div class="d-flex flex-row" style="padding-bottom: 27px;">
          <img
            style="height:150px;width: 100px;border-radius: 0.25rem; margin-right: 12px"
            class="card-img-top"
            src="https://image.tmdb.org/t/p/original/yg7B62JJbJrkBwiQrRf8vMDogLB.jpg"
            alt="Image"
          />
          <div>
            <b-card-text class="mb-2"><strong>Chiếm Đoạt</strong></b-card-text>
            <b-card-text>2D Phụ Đề</b-card-text>
          </div>
        </div>

        <div class="text-justify ">
          <b-card-text class="mb-2"><strong>Galaxy Cà Mau</strong> - RAP 5</b-card-text>
          <b-card-text>Suất: <strong>19:15</strong> - Thứ Hai, <strong>27/11/2023</strong></b-card-text>
        </div>
        <hr class="hr" />
        <div class="row">
          <div class="col-sm-6 align-self-start text-start">
            <b-card-text class="bold-font">Tổng cộng:</b-card-text>
          </div>
          <div class="col-sm-6 align-self-end text-end">
            <b-card-text class="bold-font">140000đ</b-card-text>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MovieCarousel from '@/components/ExpansionPanels/MovieCarousel.vue';
import ShowTime from '@/components/ExpansionPanels/ShowTime.vue'
const panel=ref([0]);
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  display:flex;
}
.expansion-panels {
  flex:1;
}
.v-expansion-panel {
  margin-bottom:20px;
}
.v-expansion-panel-title {
  font-size: 19px;
  font-weight: 700;
  min-height: 53px;
}
.text-wrapper {
    display: flex;
    gap: 0.5rem;
}
.position-btn:hover {
  background-color: #5073af;
  color: #fff;
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
.card-container {
  flex: 1;
  max-width: 400px;
  padding-left:1rem;
  display:flex-column;
  justify-content: start;
  font-family: sans-serif
}
</style>
