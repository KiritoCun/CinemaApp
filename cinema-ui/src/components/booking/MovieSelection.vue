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
      <CardDetails></CardDetails>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MovieCarousel from '@/components/ExpansionPanels/MovieCarousel.vue';
import ShowTime from '@/components/ExpansionPanels/ShowTime.vue';
import CardDetails from '@/components/ExpansionPanels/CardDetails.vue';
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
