<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="main-container" style="margin-left: 50px;margin-top: 0;">
        <div class="d-flex mt-2">
          <h3 class="divider">{{ $t('homepage.topNav.film') }}</h3>
          <el-tabs class="mx-4 mb-3 mt-1" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('homepage.film.showTime')" name="1"><ShowTime></ShowTime></el-tab-pane>
            <el-tab-pane :label="$t('homepage.film.comingSoon')" name="2"><ComingSoon></ComingSoon></el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="CategoryMovie" lang="ts">
import { getDocuments } from '@/api/homepage';
import ShowTime from "@/layout/components/movie/showtime.vue";
import ComingSoon from "@/layout/components/movie/comingsoon.vue"
const activeName = ref('1')
const nowPlayingMovies = ref([]);
const upcomingMovies = ref([]);
const handleClick = (tab: any, event : Event) => {
    console.log(tab, event)
}
const getDocumentList = async () => {
  const res = await getDocuments();
  nowPlayingMovies.value = res.data.nowplayingmovies;
  upcomingMovies.value = res.data.upcommingmovies;
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";

.divider {
    display: flex;
    align-items: center;
    height: 24px;
    margin: 10px;
    border-left: 5px solid #034ea2;
}
</style>
