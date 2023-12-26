<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel value="MovieCarousel">
          <v-expansion-panel-title>Chọn phim</v-expansion-panel-title>
          <v-expansion-panel-text>
            <div>
              <MovieCarousel @selectMovie="handleSelectMovie" @panel-toggle="togglePanelMovie"></MovieCarousel>
            </div>
          </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="Showtime">
          <v-expansion-panel-title>Chọn suất</v-expansion-panel-title>
          <v-expansion-panel-text>
              <Showtime v-if="selectedMovie" :currentDate = "currentDate" @selectShowtime="handleSelectShowtime" @panel-toggle="togglePanelShowtime"></Showtime>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="card-container">
      <CardDetails :selectedMovie="selectedMovie" :selectedShowtime="selectedShowtime"></CardDetails>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref} from 'vue';
import MovieCarousel from '@/components/ExpansionPanels/MovieCarousel.vue';
import Showtime from '@/components/ExpansionPanels/Showtime.vue';
import CardDetails from '@/components/ExpansionPanels/CardDetails.vue';
import { saveToLocalStorage, removeFromLocalStorage } from '@/utils/localStorage';

const panel=ref<string[]>([]);

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

interface ShowtimeInfo {
  uniqueId: string;
  id: number;
  cinemaName: string;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
}

const selectedMovie = ref<Movie | null>(null);

const selectedShowtime = ref<ShowtimeInfo | null>(null);

const currentDate = ref<Date>(new Date());

const handleSelectMovie = (movie: Movie) => {
  selectedMovie.value = movie;
  selectedShowtime.value = null;
  saveToLocalStorage('selectedMovie', movie);
  removeFromLocalStorage('selectedShowtime');
  currentDate.value = new Date();
};

const togglePanelMovie = () => {
  panel.value = ['Showtime'];
}

const handleSelectShowtime = (showtime: ShowtimeInfo) => {
  console.log(222);
  selectedShowtime.value = showtime;
 console.log(selectedShowtime.value);
  saveToLocalStorage('selectedShowtime', showtime);
};

const togglePanelShowtime = () => {
  panel.value = [''];
}
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
}
</style>
