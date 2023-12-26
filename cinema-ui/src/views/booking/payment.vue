<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <LayoutBooking :step="step">
        <template v-slot:stepper-container>
          <Payment></Payment>
        </template>
        <template v-slot:btn-group>
          <router-link class="btn" @click="removeFromLocalStorage('selectedPromotion')" :to="decrementStep()" :disabled="step === 1">Quay lại</router-link>
          <router-link class="btn btn--blue-1" :to="submitVnpay()" :disabled="step === 4">Tiếp tục</router-link>
        </template>
      </LayoutBooking>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup lang="ts">
import Payment from '@/components/booking/Payment.vue';
import { removeFromLocalStorage } from '@/utils/localStorage';
import { Booking } from '@/api/homepage/type';
import { getVnpayUrl } from '@/api/homepage';
import { ref } from 'vue';

const step = ref(3);
const booking = ref(<Booking[]>([]))

const incrementStep = () => {
  step.value += 1;
  return `/booking`;
}

/** Payment vnpay */
const submitVnpay = async () => {
  const res = await getVnpayUrl(booking);
  const url = res.data;
  window.open(url, "_blank");
}

const decrementStep = () => {
    step.value -= 1;
    return `/booking/seatSelection`;
}
</script>
