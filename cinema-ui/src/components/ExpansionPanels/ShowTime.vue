<template>
  <div class="mt-4">
    <div class="input-group d-flex align-items-center mt-3 mb-1 w-80 row text-capitalize">
      <div class="col-sm-6 justify-content-center d-flex" style="width: 500px">
        <el-radio-group v-for="tab in tabs" :key="tab.id" v-model="activeName" size="small">
          <el-radio-button class="btn-showtime mx-4" :label="tab.id">
            <div style="white-space: pre-line;width: 80px;height: 34px; font-size: 16px; font-weight: 400;line-height: 20px;">
              {{ tab.label }}
            </div>
          </el-radio-button>
        </el-radio-group>
      </div>

      <div class="col-sm-4 d-flex" style="width: 350px;">
        <select class="form-select  rounded d-flex flex-end ms-2 fs-sm text-center" id="inputGroupSelect01">
          <option selected>Tất cả rạp</option>
          <option v-for="(cinema) in cinemas" :key="cinema.id" :value="cinema.label">{{cinema.label}}</option>
        </select>
      </div>
    </div>
    <el-divider style="width:840px;height: 4px;background-color: #034ea2;"></el-divider>
    <ul v-for="cinema in cinemas" :key="cinema.id" class="list-group container d-flex flex-start m-3" style="width: 720px; margin-left: 0;">
      <li class="list-group-item row d-flex my-2">
        <div class="col col-sm-3">
          <h6>{{ cinema.label }}</h6>
          <span>2D Phụ Đề</span>
        </div>
        <div class="col col-sm-9 row">
          <el-card v-for="item in itemData" :key="item.id" class="col-2 mx-2 my-3 btn btn-primary ">{{ item.title }}</el-card>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup name="MovieDetail" lang="ts">

const cinemas = [
  {
    id:1,
    label: "Galaxy Trần Phú "
  },
  { id:2 ,
    label: "Galaxy Đà Nẵng"
  },
  { id: 3,
    label: "Galaxy Hà Đông"
  },
  {
    id:4,
    label: "Galaxy Hà Nội"
  }
];

const itemData = [
  {
    id: "1",
    title: "20:15",
  },
  {
    id: "2",
    title: "20:15",
  },
  {
    id: "3",
    title: "20:15",
  },
  {
    id: "4",
    title: "20:15",
  },
  {
    id: "5",
    title: "20:15",
  },
  {
    id: "6",
    title: "20:15",
  },
  {
    id: "7",
    title: "20:15",
  },
  {
    id: "1",
    title: "20:15",
  },
  {
    id: "2",
    title: "20:15",
  },
  {
    id: "3",
    title: "20:15",
  },
  {
    id: "4",
    title: "20:15",
  },
  {
    id: "5",
    title: "20:15",
  },
  {
    id: "6",
    title: "20:15",
  },
  {
    id: "7",
    title: "20:15",
  },
];


onMounted(() => {

});

const activeName = ref("1")

const tabs = [
  { id:1,label: 'Hôm nay 05/11' },
  { id:2,label: 'Thứ Hai 06/11' },
  { id:3,label: 'Thứ Ba 07/11' },
  { id:4,label: 'Thứ Tư 08/11' },
];

onMounted(() => {
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
