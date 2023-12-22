<template>
  <div class="container my-4">
    <div id="carouselExampleDark" class="carousel carousel-dark slide">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <div>
            <div class="d-block">
              <b-container>
                <!-- First Row -->
                <b-row v-for="(row, index) in movieRows" :key="index" class="justify-content-center my-7">
                  <b-col v-for="movie in row" :key="movie.id" class="d-flex flex-column align-items-start film-item mx-5" cols="3">
                    <button @click="handleSelectMovie(movie)">
                      <div :class="{ 'initial': selectedMovieId == null, 'selected': selectedMovieId == movie.id }" class="image-wrapper">
                        <img class="card-img-top" :src="movie.posterUrl" alt="image" />
                      </div>
                      <div class="film-text">
                        <span class="bold-font"
                          ><strong>{{ movie.title }}</strong></span
                        >
                      </div>
                    </button>
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
import { ref, defineEmits } from 'vue';
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
};

const movieRows = ref<Movie[][]>([]);

const rowSize = 3;

const emit = defineEmits(['selectMovie','panel-toggle']);

const selectedMovieId = ref<number | null>(null);

const handleSelectMovie = (movie: Movie) => {
  selectedMovieId.value = movie.id;
  emit('selectMovie', movie);
  emit('panel-toggle');

  axios.post('/api/movieSelection/', { movieId: movie.id })
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });
};

onMounted(async () => {
  try {
    const response = await axios.get('https://65742768f941bda3f2af6a27.mockapi.io/api/mq/movie', {
      headers: {
        'ngrok-skip-browser-warning': 'any'
      }
    });

    const movies: Movie[] = response.data;

    const rowCount = Math.ceil(movies.length / rowSize);
    
    for (let i = 0; i < rowCount; i++) {
      movieRows.value.push(movies.slice(i * rowSize, (i + 1) * rowSize));
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style>
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
  margin-bottom:20px;

}
.film-text {
  padding-left:10px;
  text-align: start;
}
.bold-font {
  font-size: 15px;
  font-weight: 700;
}
.initial {
  background-color: transparent;
}
.selected {
  background-color: rgba(3, 78, 162, 0.43);
}
.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
.image-wrapper {
  position: relative;
  height: 280px;
  width: 200px;
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>
