<template>
  <LayoutCustomerHomepage>
    <template v-slot:content>
      <div class="main-container">
        <div class="page-title">
          <h1>{{ $t('homepage.topNav.filmLabel') }}</h1>
        </div>
        <div class="film-content">
          <div class="thumbnail">
            <img src="https://ocwckgy6c1obj.vcdn.cloud/media/catalog/product/cache/1/image/c5f0a1eff4c394a251036189ccddaacd/7/0/700x1000_13_1_.jpg">
          </div>
          <div class="product-shop">
            <div class="product-name">
              <span class="h1">NGƯỜI VỢ CUỐI CÙNG</span>
            </div>
            <div class="movie-info">
              <label>Đạo diễn: </label>
              <div>&nbsp;Victor Vũ</div>
            </div>
            <div class="movie-info">
              <label>Diễn viên: </label>
              <div>&nbsp;Kaity Nguyễn - Thuận Nguyễn - NSƯT Quang Thắng - NSƯT Kim Oanh - Đinh Ngọc Diệp - Anh Dũng - Quốc Huy - Bé Lưu Ly</div>
            </div>
            <div class="movie-info">
              <label>Thể loại: </label>
              <div>&nbsp;Tâm Lý, Tình cảm</div>
            </div>
            <div class="movie-info">
              <label>Khởi chiếu: </label>
              <div>&nbsp;03/11/2023</div>
            </div>
            <div class="movie-info">
              <label>Thời lượng: </label>
              <div>&nbsp;132 phút</div>
            </div>
            <div class="movie-info">
              <label>Ngôn ngữ: </label>
              <div>&nbsp;Tiếng Việt - Phụ đề Tiếng Anh</div>
            </div>
            <div class="movie-info">
              <label>Rated: </label>
              <div>&nbsp;T18 - PHIM ĐƯỢC PHỔ BIẾN ĐẾN NGƯỜI XEM TỪ ĐỦ 18 TUỔI TRỞ LÊN (18+)</div>
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
            Lấy cảm hứng từ tiểu thuyết Hồ Oán Hận, của nhà văn Hồng Thái, Người Vợ Cuối Cùng là một bộ phim tâm lý cổ trang, lấy bối cảnh Việt Nam vào triều Nguyễn. LINH - Người vợ bất đắc dĩ của một viên quan tri huyện, xuất thân là con của một gia đình nông dân nghèo khó, vì không thể hoàn thành nghĩa vụ sinh con nối dõi nên đã chịu sự chèn ép của những người vợ lớn trong gia đình. Sự gặp gỡ tình cờ của cô và người yêu thời thanh mai trúc mã của mình - NH N đã dẫn đến nhiều câu chuyện bất ngờ xảy ra khiến cuộc sống cô hoàn toàn thay đổi.
          </span>
        </div>
      </div>
      <div>
        <button type="button" class="btn btn-primary">Primary Button</button>
      </div>
    </template>
  </LayoutCustomerHomepage>
</template>

<script setup name="SearchEdo" lang="ts">
import { FormRules } from 'element-plus';
import {searchEdo} from '@/api/homepage'
import {EdoSearchParam, Edo} from '@/api/homepage/type'
import { ComponentInternalInstance } from "vue";

const { proxy } = getCurrentInstance() as ComponentInternalInstance;
const route = useRoute()

const columns = ref([
{ prop: "blNo", name: 'Bill No', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
{ prop: "containerNo", name: 'Container No', sortable: false, size: 150, show: true, readonly: true, align: 'left' },
{ prop: "oprCode", name: 'OPR', sortable: false, size: 50, show: true, readonly: true, align: 'left' },
{ prop: "gateInDate", name: 'In Date', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "gateOutDate", name: 'Out Date', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "expiredDem", name: 'Expired Day', sortable: false, size: 180, show: true, readonly: true, align: 'left' },
{ prop: "detFreeTime", name: 'Detention Day', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "emptyContainerDepot", name: 'Empty Return Place', sortable: false, show: true, size: 250, readonly: true, align: 'left' },
{ prop: "status", name: 'Status', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "location", name: 'Location', sortable: false, show: true, size: 150, readonly: true, align: 'left' },
{ prop: "remark", name: 'Remark', sortable: false, show: true, size: 250, readonly: true, align: 'left' },
]);
const edoList = ref<Edo[]>([]);
const rowKey = ref('etb');
const total = ref(0);

const edoSearchForm = ref<EdoSearchParam>({
  containerNo: '',
  blNo: '',
  pageNum: 1,
  pageSize: 50,
});
const validateAtLeastOneField = (_rule: any, _value: any, callback: any) => {
  if (!edoSearchForm.value.containerNo && !edoSearchForm.value.blNo) {
    console.log("Please");
    callback(new Error('Vui lòng nhập ít nhất một trong hai trường'));
  } else {
    callback();
  }
};

const rules = {
  containerNo: [
    { required: false, trigger: 'change', message: 'Vui lòng nhập số container' },
    { validator: validateAtLeastOneField, trigger: 'change' }
  ],
  blNo: [
    { required: false, trigger: 'change', message: 'Vui lòng nhập số bill' },
    { validator: validateAtLeastOneField, trigger: 'change' }
  ],
};
const edoSearchRef = ref(ElForm);
const loading = ref(false);

onMounted(() => {
  const containerNo = route.query.containerNo as string;
  const blNo = route.query.blNo as string;
  edoSearchForm.value.containerNo = containerNo ?? '';
  edoSearchForm.value.blNo = blNo ?? '';
  if (containerNo || blNo) handleSearch();
});

const handleSearch = () => {
  edoSearchRef.value.validate(async (valid:boolean) => {
    if (!valid) return;
    loading.value = true;
    const res = await searchEdo(edoSearchForm.value);
    loading.value = false;
    res.total == 0 && ElMessage({ message: 'Không có kết quả. Vui lòng chọn số container hoặc số bill khác!', type: 'warning', duration: 3000});
    edoList.value = res.rows;
    total.value = res.total;
  })
}

/** Export button action */
const handleExport = () => {
  proxy?.download('homepage/search/edo/export', {
    ...edoSearchForm.value
  }, `edo_${new Date().getTime()}.xlsx`);
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.main-container {
  position: relative;
  top: -62px;
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
</style>

