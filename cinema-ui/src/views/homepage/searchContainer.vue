<template>
  <LayoutHomepage>
    <template v-slot:content>
      <div class="search-container">
        <div class="search-row">
          <div class="search-detail-container">
            <div class="search-detail-title">Tra cứu thông tin container</div>
            <el-form ref="searchRef" :model="containerSearchForm" :rules="rules" class="search-form" @submit.prevent>
              <el-form-item prop="containerNo" label="Số Container" class="form-item-column">
                <el-input
                  v-model="containerSearchForm.containerNo"
                  type="text"
                  size="large"
                  auto-complete="off"
                  placeholder="Nhập số container"
                  @keyup.enter="handleSearch"
                  v-on:keyup.enter="$event.target.blur()"
                />
              </el-form-item>
            </el-form>
            <div class="search-detail-button">
              <IrButton
                colorStyle="blue"
                type="primary"
                buttonSize="large"
                size="large"
                :width="156"
                title="Tìm kiếm"
                @onClick="handleSearch"
                :loadingFlag="loading"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="content" v-show="containerInfo">
        <div class="center">
          <div class="title-row">
            <div class="line"></div>
            <div class="title">Kết quả tra cứu</div>
            <div class="line"></div>
          </div>

          <div class="container-info">
            <div class="info-row" v-for="(item, index) in renderInfo" :key="item.name">
              <div class="info-title info-text" :class="{ 'end-item': index == renderInfo.length - 1, 'red-text': index == 0}">{{ item.name }}</div>
              <div class="info-value info-text" :class="{ 'end-item': index == renderInfo.length - 1, 'red-text': index == 0}">
                {{ containerInfo && containerInfo[item.key] }}
              </div>
            </div>
          </div>

          <div class="note">
            <div class="row">
              <div class="icon-container"><svg-icon icon-class="info" class="icon" /></div>
              <div class="note-content">
                <div class="note-title mb-16">Lưu ý:</div>
                <div class="text mb-16">
                  Khi phần Thanh lý HQ: thể hiện thông tin là: &lt;Yes&gt;, kèm số tờ khai của container có nghĩa là container đã được thông quan.
                </div>
                <div class="row mb-8">
                  <div class="icon-container"><svg-icon icon-class="check" class="icon" /></div>
                  <div class="text">Đối với cntr nhập: Quý Khách hàng có thể lấy cont về.</div>
                </div>
                <div class="row mb-8">
                  <div class="icon-container"><svg-icon icon-class="check" class="icon" /></div>
                  <div class="text">Đối với cntr xuất: Cảng đã vào sổ tàu chờ xuất theo lệnh của Hãng tàu.</div>
                </div>
                <div class="row mb-16">
                  <div class="icon-container"><svg-icon icon-class="check" class="icon" /></div>
                  <div class="text">Nếu không thể xem được kết quả TQ, vui lòng l/h 02838.725.790.</div>
                </div>
                <div class="text">
                  *** công chức HQ sẽ quét bổ sung tờ khai thiếu vào chiều T6 hàng tuần, nếu sau thời gian này vẫn không thấy đủ tất cả các TK, quí KH
                  vui lòng gửi email theo đia chỉ HQ: HQ@vict-vn.com & crinbound@vict-vn.com hoặc ĐT: 02838.729.999 (bấm số: 474) báo số Cntr, số TK
                  và mã HQ mở TK để HQ xử lý.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </LayoutHomepage>
</template>

<script setup name="SearchContainer" lang="ts">
import { FormRules } from 'element-plus';
import {searchContainerInfo} from '@/api/homepage'
import {ContainerInfo} from '@/api/homepage/type'
const route = useRoute()

const renderInfo = ref<{name:string, key: keyof ContainerInfo}[]>([
  {name: 'Số container', key: 'containerNo'},
  {name: 'Số Bill', key: 'activityNo'},
  {name: 'Tên tàu/chuyến', key: 'vessel'},
  {name: 'Ngày cập cảng', key: 'vdate'},
  {name: 'Vị trí trong bãi', key: 'location'},
  {name: 'Số Seal', key: 'sealNo'},
  {name: 'Trọng lượng', key: 'weight'},
  {name: 'Ngày cắm điện', key: 'plugin'},
  {name: 'Thanh lý HQ', key: 'customDescription'},
  {name: 'Ngày giao cont', key: 'activityDate'},
  {name: 'Tình trạng', key: 'condition'},
])

const containerSearchForm = ref({
  containerNo: ''
});
const rules: FormRules = {
  containerNo: [{required: true, trigger: "blur", message: "Vui lòng nhập số container", }, {min: 4, trigger: "blur", message: "Số container không hợp lệ", }],
};
const searchRef = ref(ElForm);
const loading = ref(false);

const containerInfo = ref<ContainerInfo>();

onMounted(() => {
  const containerNo = route.query.containerNo as string;
  containerSearchForm.value.containerNo = containerNo ?? '';
  if (containerNo) handleSearch();
});

const handleSearch = async () => {
  searchRef.value.validate(async (valid:boolean) => {
    if (!valid) return;
    loading.value = true;
    const res = await searchContainerInfo(containerSearchForm.value.containerNo);
    loading.value = false;
    !res.data && ElMessage({ message: 'Container không tồn tại!', type: 'warning', duration: 3000});
    containerInfo.value = res.data;
  })
}
</script>

<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.search-container {
  margin-top: 40px;
  margin-bottom: 40px;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .search-row {
    display: flex;
    flex-direction: row;
    gap: 24px;
    justify-content: center;
    align-items: center;
    .search-detail-container {
      max-width: 652px;
      display: flex;
      padding: 40px 0px;
      flex-direction: column;
      align-items: center;
      gap: 24px;
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

.content {
  margin-top: 40px;
  margin-bottom: 100px;
  padding: 0 60px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .center {
    display: flex;
    align-items: center;
    flex-direction: column;
    .title-row {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      margin-bottom: 24px;
      max-width: 652px;
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

    .container-info {
      display: flex;
      margin-bottom: 40px;
      flex-direction: column;
      width: 100%;
      max-width: 652px;
      .info-row {
        width: 100%;
        display: flex;
        flex-direction: row;
      }
      .info-title {
        border: 1px solid $gray-200;
        border-right-width: 0px;
        border-bottom-width: 0px;
        width: 100%;
        max-width: 200px;
        padding: 8px;
        min-width: 150px;
      }
      .info-value {
        border: 1px solid $gray-200;
        border-bottom-width: 0px;
        width: 100%;
        max-width: 452px;
        padding: 8px;
        min-width: 150px;
      }
      .info-text {
        color: $gray-600;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 16px;
      }
      .red-text {
        color: $red-500;
      }
      .end-item {
        border-bottom-width: 1px;
      }
    }
    .note {
      display: flex;
      background-color: $violet-50;
      border: 1px solid $violet-500;
      border-radius: 8px;
      max-width: 652px;
      width: 100%;
      padding: 12px 16px 12px 16px;
      .row {
        display: flex;
        flex-direction: row;
      }
      .icon-container {
          height:16px;
          width: 16px;
          margin-right: 12px;
          .icon {
            filter: invert(57%) sepia(9%) saturate(3065%) hue-rotate(217deg) brightness(93%) contrast(101%);
          }
      }
      .note-content {
        display: flex;
        flex-direction: column;
        .note-title {
          color: $violet-600;
          font-size: 14px;
          font-style: normal;
          font-weight: 600;
          line-height: 16px;
        }
        .text {
          color: $gray-700;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: 16px;
        }
        .mb-16 {
          margin-bottom: 16px;
        }
        .mb-8 {
          margin-bottom: 8px;
        }
      }
    }
  }
}
</style>
