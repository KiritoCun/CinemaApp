<template>
  <div class="mt-4">
    <div class="input-group d-flex align-items-center mt-3 mb-1 w-80 row text-capitalize">
      <div class="col-sm-6 justify-content-center d-flex" style="width: 500px">
        <el-radio-group v-model="activeName" size="small">
          <el-radio-button v-for="tab in tabs" :key="tab.id" class="btn-showtime mx-4" :label="tab.id">
            <div style="white-space: pre-line;width: 80px;height: 34px; font-size: 16px; font-weight: 400;line-height: 20px;">
              {{ tab.label }}
            </div>
          </el-radio-button>
        </el-radio-group>
      </div>

      <div class="col-sm-4 d-flex" style="width: 350px;">
        <select class="form-select  rounded d-flex flex-end ms-2 fs-sm text-center" id="inputGroupSelect01" v-model="selectedCinema">
          <option selected>Tất cả rạp</option>
          <option v-for="(cinema) in showTimeInfo" :key="cinema.id" :value="cinema.cinema.cinemaName">{{cinema.cinema.cinemaName}}</option>
        </select>
      </div>
    </div>
    <el-divider style="width:840px;height: 4px;background-color: #034ea2;"></el-divider>
    <ul v-for="cinema in selectedCinemas" :key="cinema.id" class="list-group container d-flex flex-start m-3" style="width: 720px; margin-left: 0;">
      <li class="list-group-item row d-flex my-2">
        <div class="col col-sm-3">
          <h6>{{ cinema.cinema.cinemaName }}</h6>
          <span>{{ cinema.cinema.cinemaAddress }}</span>
        </div>
        <div class="col col-sm-9 row">
          <el-card
            v-for="item in cinema.showTimeList"
            :key="item.uniqueId"
            class="col-2 mx-2 my-1 btn btn-primary "
            @click="handleSelectShowTime(item)"
            >{{ cinemaHours(item.startTime) }}</el-card
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed } from 'vue';
import axios from 'axios';

interface ShowTime {
  id: number;
  startTime: string;
  endTime: string;
}

interface ShowTimeInfo {
  showTimeList: ShowTime[];
  cinema: {
    cinemaName: string;
    cinemaAddress: string;
  }
  id: number;
}

const showTimeInfo = ref<ShowTimeInfo[]>([]);

interface Tab {
  id: number;
  label: string;
}

const activeName = ref(0);

const props = defineProps({
  currentDate: {
    type: Date,
    required: true
  }
});

const tabs= ref<Tab[]>([]);

const createTabs = (date: Date) => {
  const newTabs : Tab[] = [];
  for (let i = 0; i < 4; i++) {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + i);
    const day = newDate.getDate().toString().padStart(2, '0');
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const year = newDate.getFullYear();
    newTabs.push({
      id : i,
      label : `${day}/${month}/${year}`,
    });
  }
  tabs.value = newTabs;
};

watchEffect(() => {
  createTabs(props.currentDate);
});

const cinemaHours = (startTime: string) => {
  const timeString = startTime.split(' ')[1];

  const [hours, minutes] = timeString.split(':');

  return `${hours}:${minutes}`;

};

const cinemaDays = (startTime: string) => {
  const timeString = startTime.split(' ')[0];

  const [day, month, year] = timeString.split('/');

  return `${day}/${month}`;

};

const selectedCinema = ref("Tất cả rạp");

const selectedCinemas = computed(() => {
  if (selectedCinema.value === "Tất cả rạp") {
      return selectedShowTimes.value;
  }
  else {
      return selectedShowTimes.value.filter(cinema => cinema.cinema.cinemaName === selectedCinema.value);
    }
  });


const selectedShowTimes = computed(() => {
  const activeTab = tabs.value.find(tab => tab.id === activeName.value);
  if (!activeTab) return [];
  const activeTabDayMonth = cinemaDays(activeTab.label);

  return showTimeInfo.value.flatMap(cinema => ({
    ...cinema,
    showTimeList: cinema.showTimeList
      .filter(showTime => cinemaDays(showTime.startTime) === activeTabDayMonth)
      .map(showTime => ({
        ...showTime,
        uniqueId: `${cinema.id}-${showTime.id}`,
        cinemaName: cinema.cinema.cinemaName,
        cinemaAddress: cinema.cinema.cinemaAddress
      }))
  })).filter(cinema => cinema.showTimeList.length > 0);
});

const emit = defineEmits(['selectShowTime','panel-toggle']);

interface CardDetailInfo {
  uniqueId: string;
  id: number;
  cinemaName: string;
  cinemaAddress: string;
  startTime: string;
  endTime: string;
}

const handleSelectShowTime = (cinema: CardDetailInfo) => {
  emit('selectShowTime', cinema);
  emit('panel-toggle');
};

onMounted(async () => {
  try {
    const response = await axios.get('https://6577fbb8197926adf62f331d.mockapi.io/api/showtime/showTimeInfoList ');
    showTimeInfo.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.button {
  text-transform: uppercase;
  padding: 6px 2px 6px 2px;
  font-family: Verdana, Arial, sans-serif;
  font-size: 14px;
  line-height: 19px;
  cursor: pointer;
}

.button + .button {
    margin-left: 5px;
}

.brief {
  margin-top: 10px;
  width: 900px;
}
.divider{
  display: flex ;
  align-items: center;
  height: 24px;
  margin: 10px 0;
  border-left: 5px solid #5073af;
}
.btn-showtime{
  width: 70px;
  height: 56px;
  white-space: pre-line;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
  height: 38px;
  width: 76px;
  align-items: center;
  display: flex;
  font-size:15px;
  justify-content: center;
}
</style>
