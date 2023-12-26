<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <MovieSelection></MovieSelection>
        </template>
        <template v-slot:btn-group>
          <button class="btn" @click="decrementStep()" :disabled="step === 1">Quay lại</button>
          <button class="btn btn--blue-1" @click="incrementStep()" :disabled="step === 4">Tiếp tục</button>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MovieSelection from '@/components/booking/MovieSelection.vue';
import { removeFromLocalStorage } from '@/utils/localStorage';
import router from '@/router';

const step = ref(1);

const incrementStep = () => {
  step.value += 1;
  router.push({path:'/booking/seatSelection'});
}

const decrementStep = () => {
  step.value -= 1;
  router.push({path:'/homepage'});
}
</script>
