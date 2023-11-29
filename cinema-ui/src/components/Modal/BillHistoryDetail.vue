<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <span type="button" class="btn-close" @click="$emit('close')" aria-label="Close"></span>
          <div class="flex-column modal-header">
            <img :src="bill?.img" style="height:120px" />
            <div class="modal-title">{{ bill?.title }}</div>
            <p>{{ bill?.genre }}</p>
          </div>
          <div class="custom-dotted-line"></div>
          <div class="modal-body">
            <div class="time-info">
              <p class="bold-font mb-1">Star Cinema {{bill?.province}} - Rạp 6</p>
              <div class="d-inline-block">
                <p v-html="formatTime(bill?.start_time)"></p>
              </div>
              <div class="text-center">
                <img :src="bill?.booking_qr" style="height:116px; width:116px" />
              </div>
            </div>
            <div class="custom-dotted-line"></div>
            <div class="seat_info">
              <p>
                Ghế - <strong>{{ bill?.seat_id.join(', ') }}</strong>
              </p>
            </div>
            <div class="custom-dotted-line"></div>
            <div class="cost-info">
              <div class="grid-container">
                <div class="grid-item">Mã vé</div>
                <div class="grid-item">KM</div>
                <div class="grid-item">Giá</div>
                <div class="grid-item bold-font">{{ bill?.booking_id }}</div>
                <div class="grid-item bold-font">{{ bill?.promotion_id }}</div>
                <div class="grid-item bold-font">{{ bill?.price }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps, PropType } from 'vue';

interface BillProps {
    id: number;
    title: string;
    genre: string;
    province: string;
    hall_name: string;
    seat_id: string[];
    booking_id: string;
    promotion_id: string;
    booking_qr: string;
    img: string;
    price: number;
    start_time: Date;
}[];

const props = defineProps({
  bill: {
    type: Object as PropType<BillProps | null>,
    default: null
  }
})

const formatTime = (date?: Date | string) => {
  if (typeof date === 'string') {
    date = new Date(date);
  }

  if (date instanceof Date && !isNaN(date.getTime())) {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
};
  const intlDate = new Intl.DateTimeFormat('default', options).format(date);
  const [day, month, year, hour, minute] = intlDate.match(/\d+/g) || [];

  return `Suất: <b>${hour}:${minute} - ${day}/${month}/${year}</b>`;
}
return '';
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-wrapper {
  padding: 10px;
  width: 365px;
  height: 635px;
}
.modal-container {
  position: relative;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  border-radius: 20px;
  max-width: 700px;
  width: 100%;
  overflow: hidden;
}
.modal-header {
  justify-content: center;
  padding:  0px 10px 0px 10px ;
}
.modal-body {
  padding: 0px 23px;
}
.time-info {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  padding: 0px 10px;
}
.seat_info {
  padding: 0px 10px;
}
.cost-info {
 padding: 0px 0px 35px 0px;
}
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 0.8fr);
  grid-template-rows: repeat(2, 25px);
  gap: 5px;
}
.grid-item {
  padding: 2px;
  text-align: center;
}
.modal-title {
  text-align:center;
  margin: 15px 0px 5px 0px;
  padding: 0px 25px;
  font-size: 1.15em;
  font-weight: 650;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}
.btn-close {
  padding-right: 540px;
  margin: 15px;
}
.custom-dotted-line {
  margin:5px 0px;
  height:20px;
  background:
    repeating-linear-gradient(90deg,#000100 0 5px ,#0000 0 7px) top;
  background-size:280px 2px;
  background-repeat:no-repeat;
}
.bold-font {
 font-weight:600;
 font-size: 1rem;
}
</style>
