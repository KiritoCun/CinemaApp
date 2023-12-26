<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <div class="my-4" style="width:100%;">
            <div class="seat-map mb-5">
              <div v-for="rowNumber in seatData" :key="rowNumber.id" class="seat-row">
                <h5 class="row-letter">{{ rowNumber.rowCode }}</h5>
                <div
                  v-for="seatNumber in rowNumber.seatList"
                  :key="seatNumber.columnCode"
                  class="seat"
                  :class="{ selected: isSelected(rowNumber, seatNumber), sold : isSold(rowNumber, seatNumber), readonly: isSold(rowNumber, seatNumber)}"
                  @click="toggleSeat(rowNumber, seatNumber)"
                >
                  {{ rowNumber.rowCode }}{{ seatNumber.columnCode }}
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
      <CardDetails :selectedSeat="seats"></CardDetails>
    </div>
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <img
          style="height:40px;width: 40px"
          class="align-self-center my-3"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/OOjs_UI_icon_alert-yellow.svg/2048px-OOjs_UI_icon_alert-yellow.svg.png"
        />
        <p class="text-lg font-bold my-2">Thông báo</p>
        <v-card-text> Số lượng ghế tối đa được đặt là 5 ghế </v-card-text>
        <v-card-actions>
          <v-btn block @click="dialog = false" color="orange darken-3">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { saveToLocalStorage, getFromLocalStorage} from '@/utils/localStorage';
import { ShowtimeVO } from '@/api/portCustomer/showtimeManagement/types';
import { getSeatOrders } from '@/api/homepage';

const panel = ref([1])
const dialog = ref(false);

interface Column {
  id: number;
  columnCode: number;
  status : number;
}

interface HallMap {
  id: number;
  rowCode: string;
  price: number;
  seatList: Column[];
}

interface SeatProp {
  uniqueId : string;
  id: number;
  columnCode: number;
  rowCode : string;
  price: number;
  status : string | number;
}

const hallMap = ref<HallMap[]>([]);

const seats = ref<SeatProp[]>([]);

const localStorageSeats = getFromLocalStorage<SeatProp[]>('selectedSeat') || [];

const getSeatOrderList = async () => {
  const showtimeSelected = getFromLocalStorage<ShowtimeVO>('selectedShowtime');
  console.log(showtimeSelected);
  const res = await getSeatOrders(showtimeSelected?.id);
  hallMap.value = res;
  seats.value = localStorageSeats;
  hallMap.value.map(row => {
    row.seatList.map(seat => {
      if (seat.status === 1) {
          // Check against Local Storage for selected seats
        if (seats.value.find(seatProp =>
          seatProp.rowCode === String(row.rowCode) && seatProp.columnCode === seat.columnCode
        ))
        {
          selectedSeats.value.push([row.id, seat.columnCode]);
        }
        else {
          soldSeats.value.push([row.id, seat.columnCode]);
        }
      }
      else if (seat.status === 2) {
        soldSeats.value.push([row.id, seat.columnCode]);
      }
    });
  });
};

const soldSeats = ref<number[][]>([]);

const isSold = (rowNumber: HallMap, seatNumber: Column): boolean => {
  return soldSeats.value.some(
    seat => seat[0] === rowNumber.id && seat[1] === seatNumber.columnCode
  );
};

const selectedSeats = ref<number[][]>([]);

const isSelected = (rowNumber: HallMap, seatNumber: SeatProp): boolean => {
  return selectedSeats.value.some(
    seat => seat[0] === rowNumber.id && seat[1] === seatNumber.columnCode
  );
};

const seatData = computed(() => {
  return hallMap.value.flatMap(hallMap => ({
    ...hallMap,
    seatList: hallMap.seatList
      .map(column => ({
        ...column,
        uniqueId: `${hallMap.id}${column.columnCode}`,
        rowCode : `${hallMap.id}`,
        price : hallMap.price
      }))
  })).filter(hallMap => hallMap.seatList.length > 0);
});

const toggleSeat = (rowNumber: HallMap,seatNumber: SeatProp): void => {
  const uniqueId = `${rowNumber.rowCode}${seatNumber.columnCode}`;
  const rowCode= `${rowNumber.rowCode}`;
  const limitedClick = 5;

  // Update status directly on the object
  seatNumber.status = seatNumber.status === 'N' ? 1 : 0;

  // Update selection lists based on new status
    if (seatNumber.status === 1) {
      if (selectedSeats.value.length < limitedClick) {
      selectedSeats.value.push([rowNumber.id, seatNumber.columnCode]);
      seats.value = [...(seats.value || []), {
        uniqueId: uniqueId,
        id: seatNumber.id,
        rowCode : rowCode,
        columnCode: seatNumber.columnCode,
        status: seatNumber.status,
        price: rowNumber.price
      }];
      saveToLocalStorage('selectedSeat', seats.value);
      }
      else {
        dialog.value = true;
      }
    }
    else {
    const index = selectedSeats.value.findIndex(
      seat => seat[0] === rowNumber.id && seat[1] === seatNumber.columnCode
      );
      if (index !== -1) {
        selectedSeats.value.splice(index, 1);
      }
      if (seats.value) {
        seats.value = seats.value.filter(seat => seat.uniqueId !== uniqueId);
        saveToLocalStorage('selectedSeat', seats.value);
      }
    }
};

onMounted(() => {
  getSeatOrderList();
});
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
.seat.sold {
  background-color: #ccc; /* color for sold seat */
  color: #fff;
  pointer-events: none; /* disables click events */
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
.v-card-text {
  font-family: sans-serif;
}
</style>
