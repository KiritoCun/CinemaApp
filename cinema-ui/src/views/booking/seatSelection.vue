<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <SeatSelection></SeatSelection>
        </template>
        <template v-slot:btn-group>
          <router-link class="btn" @click="removeAllFromLocalStorage" :to="decrementStep()" :disabled="step === 1">Quay lại</router-link>
          <router-link class="btn btn--blue-1"  :to="incrementStep()" :disabled="step === 4">Tiếp tục</router-link>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import SeatSelection from '@/components/booking/SeatSelection.vue';
import { removeAllFromLocalStorage } from '@/utils/localStorage';

import { ref } from 'vue';

const step = ref(2);

const incrementStep = () => {
    step.value += 1;
    return `/booking/payment`;
  }

const decrementStep = () => {
    step.value -= 1;
    return `/booking/movieSelection`;
  }
</script>
