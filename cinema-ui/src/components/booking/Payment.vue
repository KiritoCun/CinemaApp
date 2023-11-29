<template>
  <div class="container my-3">
    <div class="card" style="width: 60%;">
      <div class="card-body">
        <h4 class="card-title">Khuyến mãi</h4>
        <div class="card-subtitle text-muted my-4">
          <h6>Mã khuyến mãi</h6>
          <div class="d-flex mb-1">
            <input type="text" class="form-control me-4" style="width: 40%;" />
            <button class="btn-promotion btn btn-outline">Áp Dụng</button>
          </div>
          <span style="font-size: 14px;color: #ccc;">Lưu ý : Có thể áp dụng nhiều vouchers vào 1 lần thanh toán</span>
        </div>
        <div class="card-subtitle text-muted my-4 container">
          <h6>Khuyến mãi của bạn</h6>
          <div v-for="code in codes" :key="code.id" class="card" style="width: 100%;">
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
    <div class="card my-4" style="width: 60%;">
      <div class="card-body">
        <h4 class="card-title">Phương thức thanh toán</h4>
        <div class="card-subtitle text-muted my-4">
          <h6>Mã khuyến mãi</h6>
          <div class="d-flex mb-4">
            <input type="text" class="form-control me-4" style="width: 40%;" />
            <button class="btn-promotion btn btn-outline">Áp Dụng</button>
          </div>
          <span style="display: flex; font-size: 14px;color: #000; align-items: center;">
            <p style="margin-right: 4px;color: #ff646e;">(*)</p>
            Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhận hiểu rõ các Quy Định Giao Dịch Trực Tuyến của Galaxy Cinema. Xem thêm tại:
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup name="pay" lang="ts">

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
</style>
