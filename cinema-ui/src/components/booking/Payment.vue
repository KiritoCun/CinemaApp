<template>
  <div class="main-container">
    <div class="expansion-panels">
      <v-expansion-panels v-model="panel" multiple>
        <v-expansion-panel>
          <div class="px-4 py-2" style="width: 100%;">
            <div class="card-body">
              <h4 class="card-title">Khuyến mãi</h4>
              <div class="card-subtitle text-muted my-4">
                <h6 class="d-flex flex-start">Mã khuyến mãi</h6>
                <div class="d-flex mb-1">
                  <input type="text" class="form-control me-4" style="width: 60%;" />
                  <button class="btn-promotion btn btn-outline">Áp Dụng</button>
                </div>
                <span class="d-flex flex-start" style="font-size: 14px;color: #ccc;">Lưu ý : Có thể áp dụng nhiều vouchers vào 1 lần thanh toán</span>
              </div>
              <div class="card-subtitle text-muted my-4 container">
                <h6 class="d-flex flex-start my-3">Khuyến mãi của bạn</h6>
                <div v-for="code in codes" :key="code.id" class="card my-1" style="width: 100%;">
                  <img :src="code.img" class="card-img-top image" alt="..." style="width: 20%;" />
                  <div class="card-body d-flex justify-content-between align-items-center" style="100%">
                    <h6 class="card-title">{{code.title}}</h6>
                    <p class="card-title ml-1">Hạn sử dụng : {{code.expiry}}</p>
                    <a href="#" class="btn btn-outline btn-apply">Dùng ngay</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </v-expansion-panel>
        <v-expansion-panel>
          <div class="px-4 py-2 my-4" style="width: 100%;">
            <div class="card-body">
              <!-- <h4 class="card-title">Phương thức thanh toán</h4> -->

              <v-select :items="[ 'VNPAY','Thanh toán bằng tiền mặt']" label="Phương Thức Thanh Toán "></v-select>
              <div class="card-subtitle text-muted my-4">
                <h6 class="d-flex flex-start">Mã khuyến mãi</h6>
                <div class="d-flex mb-4">
                  <input type="text" class="form-control me-4" style="width: 60%;" />
                  <button class="btn-promotion btn btn-outline">Áp Dụng</button>
                </div>
                <span style="display: flex; font-size: 14px;color: #000; align-items: center;">
                  <p class="flex-start" style="margin-right: 4px;color: #ff646e;">(*)</p>
                  Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhận hiểu rõ các Quy Định Giao Dịch Trực Tuyến của Galaxy Cinema. Xem thêm
                  tại:
                </span>
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

<script setup name="pay" lang="ts">
import { ref } from 'vue';
const panel = ref([2])

const currentDate = new Date()
const codes = [
{
  id: 1,
  title: 'Giáng sinh an lành',
  img: 'https://www.gocbao.com/wp-content/uploads/2020/04/thiep-chuc-giang-sinh_092358931.jpg',
  expiry: '13/12/2023'
},
{
  id: 2,
  title: 'Phim mới',
  img: 'https://www.gocbao.com/wp-content/uploads/2020/04/thiep-chuc-giang-sinh_092358931.jpg',
  expiry: '13/12/2023'
},
{
  id: 3,
  title: 'Giáng sinh an lành',
  img: 'https://www.gocbao.com/wp-content/uploads/2020/04/thiep-chuc-giang-sinh_092358931.jpg',
  expiry: '13/12/2023'
},
]
</script>
<style lang="scss" scoped>
.btn-promotion{
  width: 15%;
  border-radius: 4px;
  color:#fff;
  background-color: #ff5e19;
  opacity: 1;
}
.btn-promotion:hover{
  opacity: 0.7;
}
.btn-apply{
  border-radius: 4px;
  color:#fff;
  background-color: #ff5e19;
  opacity: 1;
  margin-right: 10px;
  margin-left: 100px;
}
.btn-apply:hover{
  opacity: 0.7;
}
.time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 10%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }

  .card{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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
