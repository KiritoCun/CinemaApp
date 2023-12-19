<template>
  <b-card>
    <div class="d-flex flex-row" style="max-height: 600px ;padding-bottom: 20px;">
      <img
        style="height:150px;width: 100px;border-radius: 0.25rem; margin-right: 12px"
        class="card-img-top"
        :src="processedMovie?.posterUrl"
        alt="Image"
      />
      <div>
        <b-card-text class="text-start"
          ><strong>{{ processedMovie?.title }}</strong></b-card-text
        >
        <b-card-text class="text-start">{{ processedMovie?.genre }}</b-card-text>
      </div>
    </div>

    <div class="text-justify ">
      <b-card-text class="mb-2"
        ><strong>{{ processedShowTime?.cinemaName }}</strong> - RAP 5</b-card-text
      >
      <b-card-text v-html="showDate(processedShowTime?.startTime || '')"></b-card-text>
    </div>
    <hr class="hr" />
    <div class="row" style="font-size: 14px;">
      <div class="col-sm-6 align-self-start text-start">
        <!-- <b-card-text class="mb-0"><strong>2x</strong> Ghế đơn</b-card-text> -->
        <!-- <b-card-text class="bold-font">Ghế: <strong>H11, H10</strong></b-card-text> -->
      </div>
      <div class="col-sm-6 align-self-end text-end">
        <!-- <b-card-text class="bold-font">280.000đ</b-card-text> -->
      </div>
    </div>
    <hr class="hr" />
    <div class="row">
      <div class="col-sm-6 align-self-start text-start">
        <b-card-text class="bold-font">Tổng cộng:</b-card-text>
      </div>
      <div class="col-sm-6 align-self-end text-end">
        <!-- <b-card-text class="bold-font"><strong>280.000đ</strong></b-card-text> -->
      </div>
    </div>
  </b-card>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';
import { getFromLocalStorage } from '@/utils/localStorage';

interface Movie {
    id: number;
    title: string;
    movieDescription: string;
    releaseDate: string;
    endDate: string;
    duration: number;
    language: string;
    rated: string;
    genre: string;
    director: string;
    actor: string;
    rating: string;
    posterUrl: string;
    trailerUrl: string;
    remark: string
}

interface ShowTimeInfo {
  uniqueId: string;
  id: number;
  cinemaName: string;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
}

const props = defineProps({
  selectedMovie: {
    type: Object as PropType<Movie | null>,
    default:null
  },
  selectedShowTime: {
    type: Object as PropType<ShowTimeInfo | null>,
    default:null
  }
});

const retrievedMovie = getFromLocalStorage<Movie>('selectedMovie');

const retrievedShowTime = getFromLocalStorage<ShowTimeInfo>('selectedShowTime');

const showDate = (startTime?: string) => {
  if (!startTime) return '';

  const timeStringDays = startTime.split(' ')[0];

  const timeStringHours = startTime.split(' ')[1];

  const [day, month, year] = timeStringDays.split('/');

  const [hours, minutes] = timeStringHours.split(':');

  return `Suất: <strong>${hours}:${minutes}</strong> - Ngày: <strong>${day}/${month}/${year}</strong>`;
};

const processedMovie = computed(() => {
  if (props.selectedMovie) {
    return props.selectedMovie;
  }
  return retrievedMovie;
});

const processedShowTime = computed(() => {
  if (props.selectedShowTime) {
    return props.selectedShowTime;
  }
  return retrievedShowTime;
});

onMounted(() => {
});
</script>
