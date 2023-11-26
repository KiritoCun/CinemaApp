<template>
  <div class="mt-4">
    <div class="container my-1" v-for="data in props.billHistoryData" :key="data.id">
      <div class="card">
        <img style="height:160px;width: 120px;" class="card-img-top" :src="data.img" alt="Image" />
        <div class="card-body col col-md-6">
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="absolute-left" style="left:110px; top:30px;width: 30%;">
              <b-card-text class="bold-font">{{ data.title }}</b-card-text>
              <b-card-text>{{ data.genre }}</b-card-text>
            </div>
            <div class="absolute-right p-3" style="right:-50px; top:30px">
              <b-card-text class="d-inline-block">Star Cinema -</b-card-text
              ><b-card-text class="d-inline-block bold-font">{{ data.hall_name }}</b-card-text>
              <b-card-text v-html="formatDate(data.start_time)"></b-card-text>
            </div>
            <div class="absolute-left" style="left: 50rem; top: 50px;">
              <button class="accordion-button bold-font text-color" @click.prevent="openDetail(data)">Chi tiết</button>
              <BillHistoryDetail v-if="showDetail" @close="closeDetail" :bill="selectedBill" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import BillHistoryDetail from './Modal/BillHistoryDetail.vue';

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

interface BillHistoryProps {
  billHistoryData: BillProps[];
}

const showDetail = ref(false);
const selectedBill = ref<BillProps | null>(null);
const props = defineProps<BillHistoryProps>();

const openDetail = (billData: BillProps) => {
  selectedBill.value = billData;
  showDetail.value = true;
};

const closeDetail = () => {
  showDetail.value = false;
  selectedBill.value = null; // optional: clear the selectedBill when closing
};

const formatDate = (date: Date | string) => {
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

  return `<b>${hour}:${minute}</b> - ${day}/${month}/${year}`;
}
return '';
};

const selectedData = ref(null);
</script>

<style scoped>
.absolute-right {
  /* position: absolute; */
  right: 0;
  padding-right: 20rem;
}

.absolute-left {
  /* position: absolute; */
  left: 0;
}
.bold-font {
 font-weight:600 ;
 font-size: 1rem;
}
.text-color {
  color: #409EFF
}
.card{
  display: flex;
  flex-direction: row;
}
.card-img-top{
  border-top-left-radius:5px ;
  border-top-right-radius: 0;
  border-bottom-left-radius: 5px;
}
</style>
