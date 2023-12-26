<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <SeatSelection @exit="handleExit" @confirm="handleConfirm" :dialogAgeLimitation="dialogAgeLimitation"></SeatSelection>
        </template>
        <template v-slot:btn-group>
          <button class="btn" @click="decrementStep" :disabled="step === 1">Quay lại</button>
          <button class="btn btn--blue-1"  @click="incrementStep" :disabled="step === 4">Tiếp tục</button>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import SeatSelection from '@/components/booking/SeatSelection.vue';
import { removeAllFromLocalStorage } from '@/utils/localStorage';
import router from '@/router';
import { getFromLocalStorage } from '@/utils/localStorage';

import { ref } from 'vue';

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

const step = ref(2);

const localStorageMovie = getFromLocalStorage<Movie>('selectedMovie') || null;

const movie = ref<Movie | null>(localStorageMovie);

const incrementStep = () => {
  if(movie.value?.rated === 'K')
  {
    step.value += 1;
    router.push({path:'/booking/payment'});
  }
  else
    dialogAgeLimitation.value = true;
    console.log(dialogAgeLimitation.value);
}

const decrementStep = () => {
  removeAllFromLocalStorage();
  step.value -= 1;
  router.push({path:'/booking/movieSelection'});
}

const dialogAgeLimitation = ref(false);

const handleExit = () => {
  dialogAgeLimitation.value = false;
}

const handleConfirm = () => {
  router.push({path:'/booking/payment'});
}
</script>
