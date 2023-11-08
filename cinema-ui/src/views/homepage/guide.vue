<template>
  <LayoutHomepage>
    <template v-slot:content>
      <div class="document-container" id="guideline">
        <div class="document-title">Hướng dẫn</div>
        <div class="document-items">
          <template v-for="guideline in guidelineList" :key="guideline.id">
            <div class="document-item">
              <img class="document-image" src="@/assets/images/document-template.jpg" />
              <a class="document-text" :href="guideline.docUrl" target="_blank">
                {{ guideline.docDescription }}
                <br />
                {{ guideline.docTitle }}
              </a>
              <div class="document-date">
                <svg-icon icon-class="calendar" />
                <span>{{ guideline.createTime }}</span>
              </div>
            </div>
          </template>
        </div>
        <div class="document-title"><svg-icon icon-class="video" />Video hướng dẫn</div>
        <div class="document-items">
          <template v-for="video in videoList" :key="video.id">
            <div class="document-item">
              <img class="document-image" src="@/assets/images/video-template.jpg" @click="playYoutube(video.docUrl)" />
              <img class="video-play-icon" src="@/assets/images/video-play.png" @click="playYoutube(video.docUrl)" />
              <a class="document-text" @click="playYoutube(video.docUrl)">
                {{ video.docDescription }}
                <br />
                {{ video.docTitle }}
              </a>
              <div class="document-date">
                <svg-icon icon-class="calendar" />
                <span>{{ video.createTime }}</span>
              </div>
            </div>
          </template>
        </div>
      </div>
      <IrDialog :dialog="dialog">
        <template v-slot:body>
          <YouTube :src="youtubeSrc" ref="youtube" width="100%" height="100%" style="height: calc(90vh - 111px)" @ready="onReady" />
        </template>
      </IrDialog>
    </template>
  </LayoutHomepage>
</template>

<script setup name="Guide" lang="ts">
import { getDocuments } from '@/api/homepage';
import { DocumentVO } from '@/api/system/document/types';
import YouTube from 'vue3-youtube';
const youtube = ref();
const youtubeSrc = ref('');
const dialog = reactive<DialogOption>({
  visible: false,
  title: '',
  width: '80%',
  fullscreen: false,
  footer: false
});
const guidelineList = ref<DocumentVO[]>([]);
const videoList = ref<DocumentVO[]>([]);
/** Play youtube popup */
const playYoutube = (url: string) => {
  youtubeSrc.value = url;
  dialog.visible = true;
}
const onReady = () => {
  youtube.value.playVideo();
}
const getDocumentList = async () => {
  const res = await getDocuments();
  guidelineList.value = res.data.guides;
  videoList.value = res.data.videos;
}
onMounted(() => {
  getDocumentList();
});
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
    height: 40px;
    .svg-icon {
      width: 40px;
      height: 40px;
      margin-right: 24px;
    }
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
      height: 401px;
      text-align: left;
      align-items: flex-start;
      margin-bottom: 40px;
      .document-image {
        width: 312px;
        height: 280px;
        margin-bottom: 16px;
        cursor: pointer;
      }
      .video-play-icon {
        width: 73.33px;
        height: 73.33px;
        margin: 100px 0 0 120px;
        position: absolute;
        cursor: pointer;
        &:hover {
          width: 75.33px;
          height: 75.33px;
        }
      }
      .document-text {
        color: $gray-800;
        font-size: 16px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        height: 77px;
        display: flex;
        text-align: left;
        align-items: flex-start;
        max-width: 312px;
        flex-direction: column;
        justify-content: space-around;
        &:hover {
          color: $blue-500;
        }
      }
      .document-date {
        margin-top: 12px;
        color: $gray-600;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        svg {
          filter: brightness(0) saturate(100%) invert(57%) sepia(33%) saturate(7495%) hue-rotate(192deg) brightness(100%) contrast(96%);
          width: 16px;
          height: 16px;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
