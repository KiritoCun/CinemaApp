<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="main-container">
        <div class="page-title">
          <h1>{{ $t('homepage.topNav.filmLabel') }}</h1>
        </div>
        <div class="film-content">
          <div class="thumbnail">
            <img :src="route.query.posterUrl">
          </div>
          <div class="product-shop">
            <div class="product-name">
              <span class="h1">{{ route.query.title }}</span>
            </div>
            <div class="movie-info">
              <label>Đạo diễn: </label>
              <div>&nbsp;{{ route.query.director }}</div>
            </div>
            <div class="movie-info">
              <label>Diễn viên: </label>
              <div>&nbsp;{{ route.query.actor }}</div>
            </div>
            <div class="movie-info">
              <label>Thể loại: </label>
              <div>&nbsp;{{ route.query.genre }}</div>
            </div>
            <div class="movie-info">
              <label>Khởi chiếu: </label>
              <div>&nbsp;{{ formattedDate }}</div>
            </div>
            <div class="movie-info">
              <label>Thời lượng: </label>
              <div>&nbsp;{{ route.query.duration }}&nbsp;phút</div>
            </div>
            <div class="movie-info">
              <label>Ngôn ngữ: </label>
              <div>&nbsp;{{ route.query.language }}</div>
            </div>
            <div class="movie-info">
              <label>Rated: </label>
              <div>&nbsp;{{ route.query.rated }}</div>
            </div>
            <div class="movie-technology-icons">
              <span class="movie-rating-detail t18">Rated : T18</span>
              <button type="button" title="Mua vé" class="button btn-booking" onclick="Quickbooking('23020300');">
                <span>Mua vé</span>
              </button>
            </div>
          </div>
        </div>
        <div class="brief">
          <span>
            {{ route.query.movieDescription }}
          </span>
        </div>

        <div class="mt-4">
          <h4 class="divider px-2">Lịch Chiếu</h4>
          <el-divider style="width:840px"></el-divider>
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

            <div class="col-sm-4 d-flex" style="width: 360px;">
              <select class="form-select  rounded flex-start fs-sm" id="inputGroupSelect01">
                <option selected>Toàn quốc</option>
                <option v-for="(province) in provinces" :key="province.id" :value="province.label">{{province.label}}</option>
              </select>
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
                <el-card v-for="item in itemData" :key="item.id" class="col-2 mx-2 my-1 btn btn-primary ">{{ item.title }}</el-card>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="MovieDetail" lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

const provinces = [
  {
    id:1,
    label: "TP.Hồ Chí Minh"
  },
  { id:2 ,
    label: "Đà Nẵng" },
  { id: 3,
    label: "Hải Phòng" },
  {
    id:4,
    label: "Hà Nội"
  },
  {

    id: 5,
    label: "Vinh",
  }

];

const cinemas = [
  {
    id:1,
    label: "Galaxy Trần Phú "
  },
  { id:2 ,
    label: "Galaxy Đà Nẵng" },
  { id: 3,
    label: "Galaxy Hà Đông" },
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

const handleClick = (tab: any,e : Event) => {
  console.log(tab, e);
}
const tabs = [
  { id:1,label: 'Hôm nay 05/11' },
  { id:2,label: 'Thứ Hai 06/11' },
  { id:3,label: 'Thứ Ba 07/11' },
  { id:4,label: 'Thứ Tư 08/11' },
];

const formattedDate = formatDate(route.query.releaseDate);

function formatDate(dateTime:any) {
  const year = dateTime.substring(0, 4);
  const month = dateTime.substring(5, 7);
  const day = dateTime.substring(9, 11);

  return `${day}/${month}/${year}`;
}

onMounted(() => {
});
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.main-container {
  position: relative;
  top: -50px;
  display: flex;
  flex-direction: column;
  .search-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .search-detail-container {
      max-width: 652px;
      // min-height: 366px;
      display: flex;
      padding: 40px 0px;
      flex-direction: column;
      align-items: center;
      border-left: 4px solid $blue-500;
      background: $gray-100;
      flex: 1;
      .search-detail-title {
        color: $gray-800;
        text-align: center;
        font-size: 24px;
        font-style: normal;
        font-weight: 600;
        line-height: 32px;
        margin-bottom: 8px;
      }
      .search-form {
        // height: 124px;
        width: 100%;
        padding: 0 90px;
      }
      .search-detail-button {
        display: flex;
        width: 100%;
        padding: 0 90px;
        justify-content: end;
        align-items: end;
      }
    }
  }
  @media (max-width:970px) {
  .search-row {
    flex-direction: column;
    .search-detail-container {
      width: 100%;
    }
  }
}
}

.table-container {
  padding: 0px  120px 100px 120px;
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: visible;
  .title-row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 16px;
    width: 100%;
    .title {
      color: $gray-800;
      text-align: center;
      font-size: 24px;
      font-style: normal;
      font-weight: 600;
      line-height: 32px;
      margin: 0px 24px 0px 24px
    }
    .line {
      height: 1px;
      flex:1;
      background-color: $gray-200;
    }
  }
  .datagrid-body {
    overflow: visible;
    border: 1px solid $gray-200;
    background: $gray-0;
    margin-top: 16px;
    width: 100%;
  }
  .paging-footer {
    width: 100%;
    height: 48px;
    padding: 8px 24px;
    border: 1px solid $gray-200;
    background: $gray-0;
    display: flex;
    flex-direction: row;
    gap: 12px;
    justify-content: space-between;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    .right-footer {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}
.page-title {
  border-bottom: 2px solid #222;
  margin-bottom: 20px;
  width: 900px;
}

.thumbnail img{
  height: 259px;
  width: 181px;
  margin-right: 30px;
}

.film-content {
  display: flex;
  width: 900px;
}

.product-shop {
  display: flex;
  flex-direction: column;
}

.movie-info {
  display: flex;
  font-size: 14px;
  line-height: 22px;
}

.product-name {
  border-bottom: 1px solid #d9d6c8;
  margin-bottom: 10px;
  padding-bottom: 15px;
  span.h1 {
    color: #1a1919;
    font-weight: normal;
    font-size: 24px;
  }
}

.movie-technology-icons {
  margin-top: 7px;
}

.movie-rating-detail {
    float: left;
    font-size: 0px;
    display: block;
    height: 30px;
    width: 45px;
    background-position: -330px 0px;
    background-image: url('	https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cgv/rating-sprite.png');
}

.btn-booking {
  margin-left: 10px;
  padding: 5px;
  background: none no-repeat scroll 0 0 #e71a0f;
  border-radius: 5px;
  border: unset;
}

.btn-booking > span {
  color:white;
  border: 1px solid #f07469;
  font-weight: bold;
  padding: 5px;
  padding-left: 25px;
  background: url('https://www.cgv.vn/skin/frontend/cgv/default/images/bg-cate-booking.png') no-repeat scroll left center rgba(0, 0, 0, 0);
  border-radius: 5px;
}

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
  border-left: 5px solid #034ea2;
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
