<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <MovieSelection></MovieSelection>
        </template>
        <template v-slot:btn-group>
          <router-link class="btn" :to="decrementStep()" :disabled="step === 1">Quay lại</router-link>
          <router-link class="btn btn--blue-1" :to="incrementStep()" :disabled="step === 4">Tiếp tục</router-link>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MovieSelection from '@/components/booking/MovieSelection.vue';

const step = ref(1);

const incrementStep = () => {
  step.value += 1;
  return `/booking/seatSelection`;
}

const decrementStep = () => {
  step.value -= 1;
  return `/homepage`;
}
</script>
