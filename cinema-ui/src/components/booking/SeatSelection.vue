<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <div class="my-4" style="width:100%;">
            <div class="seat-map mb-5">
              <div v-for="rowNumber in 12" :key="rowNumber" class="seat-row">
                <h5 class="row-letter">{{ String.fromCharCode(77 - rowNumber) }}</h5>
                <div
                  v-for="seatNumber in 12"
                  :key="seatNumber"
                  class="seat"
                  :class="{ selected: isSelected(rowNumber, seatNumber) }"
                  @click="toggleSeat(rowNumber, seatNumber)"
                >
                  {{ String.fromCharCode(77 - rowNumber) }}{{ seatNumber }}
                </div>
              </div>
            </div>
            <div style="margin-bottom: 4px;display: flex;justify-content: center;">MÀN HÌNH</div>
            <el-divider style="margin-top: -4px ;padding: 2px; background-color: #ff5e19;"></el-divider>
            <div class="note">
              <div class="note-details">
                <div class="seat-selected"></div>
                <h6>Ghế đã bán</h6>
              </div>
              <div class="note-details">
                <div class="seat-selecting"></div>
                <h6>Ghế đang chọn</h6>
              </div>
            </div>
          </div>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div class="card-container">
      <CardDetails></CardDetails>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const panel = ref([1])

interface SeatProp {
  rowCode: string;
  columnCode: number;
  price: number;
  seatTypeName: string;

}
const seats = ref<SeatProp[]>([]);

const fetchData = async () => {
  try {
    const response = await axios.get('https://65780c1c197926adf62f617a.mockapi.io/seat');
    seats.value = response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

onMounted(() => {
  fetchData();
});

const selectedSeats = ref<number[][]>([]);

const isSelected = (rowNumber: number, seatNumber: number): boolean => {
  return selectedSeats.value.some(
    seat => seat[0] === rowNumber && seat[1] === seatNumber
  );
};

const toggleSeat = (rowNumber: number, seatNumber: number): void => {
  const index = selectedSeats.value.findIndex(
    seat => seat[0] === rowNumber && seat[1] === seatNumber
  );

  if (index === -1) {
    selectedSeats.value.push([rowNumber, seatNumber]);
  } else {
    selectedSeats.value.splice(index, 1);
  }
};
</script>
<style lang="scss" scoped>
.seat-map {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0px;
  margin-right: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 120px;
}

.seat-row {
  margin: 4px;
  display: grid;
  grid-template-columns: repeat(14, 1fr); /* 10 ghế trên mỗi hàng */
}

.seat {
  width: 10px;
  height: 10px;
  padding: 14px;
  border-radius: 4px;
  background-color: #fff;
  border: 2px solid #ccc;
  color:#fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  cursor: pointer;
  box-shadow: 0 0 4px 0 sloid #000;
}

.seat.selected,
.seat:hover {
  background-color: #87f079;
  color: #fff;
}
.row-letter{
  margin-left: -200px;
  font-size: 20px;
}
.note,.note-details{
  display: flex;
  justify-content: center;
  margin: 4px 12px 8px 12px;
}
.seat-selected{
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: #ccc;
  border: 1px solid #ccc;
  cursor: default;
}
.seat-selecting{
  width: 10px;
  height: 10px;
  padding: 10px;
  border-radius: 4px;
  margin-right: 4px;
  background-color: #87f079;
  border: 1px solid #87f079;
  cursor: default;
}
.btn{
  height: 38px;
  width: 76px;
  align-items: center;
  display: flex;
  font-size:15px;
  justify-content: center;
}
.showtime-selected {
    background-color: #3498db;
    color: #fff;
  }
  .main-container {
  position: relative;
  display:flex;
}
.expansion-panels {
  flex:1;
}
.v-expansion-panel {
  margin-bottom:20px;
}
.v-expansion-panel-title {
  font-size: 19px;
  font-weight: 700;
  min-height: 53px;
}
.text-wrapper {
    display: flex;
    gap: 0.5rem;
}
.position-btn:hover {
  background-color: #5073af;
  color: #fff;
}
.vertical-divider {
 width: 1px;
 background-color: #181818;
 margin: 0 10px;
}
.bold-font {
 font-weight:700 ;
 font-size: 1rem;
}
.card-container {
  flex: 1;
  max-width: 400px;
  padding-left:1rem;
  display:flex-column;
  justify-content: start;
  font-family: sans-serif
}
</style>
