<template>
  <div class="container my-4">
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <div style="min-height: 140px;">
            <div class="d-block">
              <b-container>
                <b-row class="ml-5">
                  <b-col v-for="movie in movies" :key="movie.id" class="d-flex flex-column align-items-start film-item"
                    ><img style="height:243px;width: 160px;border-radius: 0.25rem" class="card-img-top" :src="movie.posterUrl" alt="Image" />
                    <div class="film-text">
                      <span class="bold-font"
                        ><strong>{{ movie.title }}</strong></span
                      >
                    </div>
                  </b-col>
                </b-row>
              </b-container>
            </div>
          </div>
        </div>
      </div>
      <button class="carousel-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon ml-4" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon mr-4" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref,onMounted} from 'vue';
import axios from 'axios';
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
}[];

const movies = ref<Movie[]>([])

const fetchData  = async () => {
  try {
  const response = await axios.get('https://65742768f941bda3f2af6a27.mockapi.io/api/mq/movie');
  movies.value = response.data;
} catch (error) {
  console.error('Error fetching data:', error);
}
};
onMounted(() => {
  fetchData();
})
</script>

<style scoped>
.carousel-next {
    right: -7.7%;
    height: 65px;
    width: 65px;
    border-radius: 50%;
    background: linear-gradient(to right, rgb(244, 244, 244) 50%, transparent 50%);
    position: absolute;
    top: 42%;
}
.carousel-prev {
  left: -7.7%;
    height: 65px;
    width: 65px;
    border-radius: 50%;
    background: linear-gradient(to left, rgb(244, 244, 244) 50%, transparent 50%);
    position: absolute;
    top: 42%;
}
.film-item {
  margin-bottom:35px;
}
.film-text {
  padding-left:10px;
  max-width: 120px;
  text-align: start;
}
.bold-font {

  font-size: 15px;
  font-weight: 700;
}
</style>
