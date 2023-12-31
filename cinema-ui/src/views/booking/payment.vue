<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <Payment></Payment>
        </template>
        <template v-slot:btn-group>
          <button class="btn" @click="decrementStep()" :disabled="step === 1">Quay lại</button>
          <button class="btn btn--blue-1" @click="submitVnpay" :disabled="step === 4">Tiếp tục</button>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import Payment from '@/components/booking/Payment.vue';
import { getFromLocalStorage, removeFromLocalStorage } from '@/utils/localStorage';
import { getVnpayUrl } from '@/api/homepage';
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
  return `/booking`;
}

/** Payment vnpay */
const submitVnpay = async () => {
  const localStoragePromotion = getFromLocalStorage<any>('selectedPromotion') || null;
  const localStorageSeats = getFromLocalStorage<any>('selectedSeat') || null;
  const promotionId = localStoragePromotion === null ? 0 : localStoragePromotion.id;
  const res = await getVnpayUrl(localStorageSeats.map((obj: { id: any; }) => obj.id), promotionId);
  const url = res.data;
  window.open(url, "_blank");
}

const decrementStep = () => {
  removeFromLocalStorage('selectedPromotion')
  step.value -= 1;

  const serializedSeats = localStorageSeats ? JSON.stringify(localStorageSeats) : '';
  router.push({path: '/booking/seatSelection', query: {seats: serializedSeats}});
}
onMounted(() => {
  console.log("before");
  window.addEventListener('storage', (event) => {
    console.log("after");
    if (event.key === 'redirectBeforePaymentSuccess' && event.newValue === 'true') {
      router.push({path: '/profile', query: {}});
      localStorage.setItem('redirectBeforePaymentSuccess', 'false');
    }
  });
});
</script>
