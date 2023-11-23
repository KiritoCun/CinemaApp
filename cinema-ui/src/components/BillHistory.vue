<template>
  <div class="mt-4">
    <div v-for="data in props.billHistoryData" :key="data.id">
      <hr class="hr" />
      <b-card :img-src="decodeURIComponent(data.img)" img-alt="Card image" img-left style="height:120px;">
        <div class="flex align-items-center">
          <div class="absolute-left" style="left:110px; top:30px">
            <b-card-text class="bold-font">{{ data.title }}</b-card-text>
            <b-card-text>{{ data.genre }}</b-card-text>
          </div>
          <div class="absolute-right" style="right:-50px; top:30px">
            <b-card-text class="d-inline-block">Star Cinema -</b-card-text><b-card-text class="d-inline-block bold-font">{{ data.hall_name }}</b-card-text>
            <b-card-text v-html="formatDate(data.start_time)"></b-card-text>
          </div>
          <div class="absolute-left" style="left: 50rem; top: 50px;">
            <button class="accordion-button bold-font text-color" @click.prevent="showDetail=true">Chi tiết</button>
            <BillHistoryDetail v-if="showDetail" @close="showDetail = false" />
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import BillHistoryDetail from './Modal/BillHistoryDetail.vue';

interface BillHistoryProps {
  billHistoryData: {
    id: number;
    title: string;
    genre: string,
    hall_name: string
    start_time: Date;
    img: string;
}[];
}

const showDetail = ref(false);

const props = defineProps<BillHistoryProps>();

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
</script>

<style scoped>
.absolute-right {
  position: absolute;
  right: 0;
  padding-right: 20rem;
}

.absolute-left {
  position: absolute;
  left: 0;
}
.bold-font {
 font-weight:600 ;
 font-size: 1rem;
}
.text-color {
  color: #409EFF
}
</style>
