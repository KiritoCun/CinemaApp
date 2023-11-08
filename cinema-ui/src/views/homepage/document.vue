<template>
  <LayoutHomepage>
    <template v-slot:content>
      <div class="document-container" id="document">
        <div class="document-title">Download biểu mẫu</div>
        <div class="document-items">
          <template v-for="document in documentList" :key="document.id">
            <div class="document-item">
              <img class="background-image" src="@/assets/images/document-bg.png" />
              <img class="document-image" :src="getImgUrl(document.imageType)" />
              <div class="document-content">
                <div class="target-name">[{{ document.docTarget }}]</div>
                <div class="title">{{ document.docTitle }}</div>
                <IrButton colorStyle="blue" type="primary" title="Download" leftIcon="download-solid" @onClick="downloadDocument(document.docUrl)" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </LayoutHomepage>
</template>

<script setup name="Document" lang="ts">
import { getDocuments } from '@/api/homepage';
import { DocumentVO } from '@/api/system/document/types';
const documentList = ref<DocumentVO[]>([]);
/** */
const getImgUrl = (imageName: string) => {
  return new URL(`../../assets/images/${imageName}.png`, import.meta.url).href;
}
const getDocumentList = async () => {
  const res = await getDocuments();
  documentList.value = res.data.documents;
}
onMounted(() => {
  getDocumentList();
});
/** */
const downloadDocument = (link: string) => {
  window.open(link);
}
</script>
<style lang="scss" scoped>
@import "@/assets/styles/mixin.scss";
@import "@/assets/styles/variables.module.scss";
.document-container {
  display: flex;
  flex-direction: column;
  gap: 40px;
  justify-content: center;
  align-items: center;
  padding: 0 60px;

  .document-title {
    color: $gray-800;
    font-size: 40px;
    font-style: normal;
    font-weight: 600;
    line-height: 40px;
  }
  .document-items {
    display: flex;
    flex-wrap: wrap;
    max-width: 1320px;
    .document-item {
      flex: 1 1 25%;
      display: flex;
      flex-direction: column;
      width: 312px;
      height: 336px;
      text-align: left;
      align-items: center;
      margin-bottom: 40px;
      .background-image {
        height: 196px;
        width: 265px;
      }
      .document-image {
        position: absolute;
        margin: 66px 80px 0 0;
      }
      .document-content {
        display: flex;
        padding: 16px;
        flex-direction: column;
        align-items: center;
        height: 140px;
        width: 312px;
        border-radius: 8px;
        background: $blue-900;
        .target-name {
          color: $yellow-400;
          text-align: center;
          font-size: 14px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
        }
        .title {
          color: $gray-0;
          text-align: center;
          font-size: 16px;
          font-style: normal;
          font-weight: 600;
          line-height: normal;
          height: 38px;
          margin-bottom: 16px;
        }
      }
    }
  }
}
</style>
