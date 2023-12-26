<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <Payment></Payment>
        </template>
        <template v-slot:btn-group>
          <button class="btn" @click="decrementStep()" :disabled="step === 1">Quay lại</button>
          <button class="btn btn--blue-1" @click="incrementStep" :disabled="step === 4">Tiếp tục</button>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import Payment from '@/components/booking/Payment.vue';
import { removeFromLocalStorage, getFromLocalStorage } from '@/utils/localStorage';
import { ref } from 'vue';
import router from '@/router';

interface SeatProp {
  uniqueId : string;
  id: number;
  columnCode: number;
  rowCode : string;
  price: number;
  status : number;
}

const step = ref(3);

const localStorageSeats = getFromLocalStorage<SeatProp[]>('selectedSeat') || [];

const incrementStep = () => {
  step.value += 1;
  router.push({path: '/booking/invoice'});
}

const decrementStep = () => {
  removeFromLocalStorage('selectedPromotion')
  step.value -= 1;

  const serializedSeats = localStorageSeats ? JSON.stringify(localStorageSeats) : '';
  router.push({path: '/booking/seatSelection', query: {seats: serializedSeats}});
}
</script>
