<template>
  <div class="container">
    <div class="row">
      <div v-for="movie in movies" :key="movie.id" class="col-md-3 mb-4">
        <div class="card">
          <img class="card-img-top" :src="movie.img" alt="Image" />
          <div class="votes">
            <svg xmlns="http://www.w3.org/2000/svg" style="margin-right: 12px;" fill="#fde047" height="1em" viewBox="0 0 576 512">
              <path
                d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
              />
            </svg>
            {{ movie.vote }}
          </div>
          <div class="age__limit">
            <span>{{ movie.age_limit }}</span>
          </div>
          <div class="card-overlay d-flex align-items-center flex-column">
            <button class="overlay-button btn btn-buy my-2">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" style="margin-right: 4px;" fill="#fff" viewBox="0 0 576 512">
                <path
                  d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"
                /></svg
              >Mua Vé
            </button>
            <button class="overlay-button btn btn-trailer" @click="playYoutube(movie.docUrl)">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512" style="margin-right: 4px;" fill="#000">
                <path
                  d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zM188.3 147.1c7.6-4.2 16.8-4.1 24.3 .5l144 88c7.1 4.4 11.5 12.1 11.5 20.5s-4.4 16.1-11.5 20.5l-144 88c-7.4 4.5-16.7 4.7-24.3 .5s-12.3-12.2-12.3-20.9V168c0-8.7 4.7-16.7 12.3-20.9z"
                /></svg
              >Trailer
            </button>
          </div>
        </div>
        <h6 class="my-2 d-flex justify-content-center">{{ movie.title }}</h6>
      </div>
    </div>
    <IrDialog :dialog="dialog">
      <template v-slot:body>
        <YouTube :src="youtubeSrc" ref="youtube" width="100%" height="100%" style="height: calc(90vh - 111px)" @ready="onReady" />
      </template>
    </IrDialog>
  </div>
</template>

<script setup lang="ts">
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
const onReady = () => {
  youtube.value.playVideo();
}

const playYoutube = (url: string) => {
  youtubeSrc.value = `https://www.youtube.com/watch?v=${url}`;
  dialog.visible = true;
}
    const movies = ref<any[]>(
    [
    {
        id: '1', title: 'Cầu Hồn',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F17%2Fcau-hon-500_1700211553708.jpg&w=640&q=75',
        vote: '8.2',
        age_limit: 'T16',
        docUrl: 'qz0_9ITGwws&t=3s'
    },
    {
        id: '2', title: 'Cô Giáo Em Là Số 1',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F9%2F500x750_1699500910364.jpg&w=640&q=75',
        vote: '9.7',
        age_limit: 'T16',
        docUrl: 'qz0_9ITGwws&t=3s'

    },
    {
        id: '3', title: 'Oán Linh',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F13%2Fol-500_1699868096655.jpg&w=640&q=75',
        vote: '8.2',
        age_limit: 'T16',
        docUrl: 'qz0_9ITGwws&t=3s'
    },
    {
        id: '4', title: 'Điều Ước',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F10%2F30%2Fwish-500_1698658410148.jpg&w=640&q=75',
        vote: '9',
        age_limit: 'K'
    },
    {
        id: '5', title: 'Vòng Tròn Đỏ',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F6%2Fthe-red-circle-500_1699257489571.jpg&w=640&q=75',
        vote: '7.8',
        age_limit: 'T16'
    },
    {
        id: '6', title: 'Thiếu Niên Và Chim Diệc',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F20%2Fposter-thieu-nen--chim-diec-500_1700475993619.jpg&w=640&q=75',
        vote: '10',
        age_limit: 'K'
    },
    {
        id: '7', title: 'Bạn Không Thân',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F17%2Fbkt-500_1700212659518.jpg&w=640&q=75',
        vote: '10',
        age_limit: 'K'
    },
    {
        id: '8', title: 'Nước Xuôi Biển Lớn',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F16%2Fthe-water-flows-to-the-sea_1700115775892.jpg&w=640&q=75',
        vote: '0',
        age_limit: 'T16'
    },
    {
        id: '9', title: 'Bỗng Dưng Trúng Mánh',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F16%2Fgj-500_1700106291302.jpg&w=640&q=75',
        vote: '7',
        age_limit: 'K'
    },
    {
        id: '10', title: 'Napoleon',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F16%2Fnapoleon-500_1700127400263.jpg&w=640&q=75',
        vote: '8.5',
        age_limit: 'K'
    },
    {
        id: '11', title: 'Những Nét Bút Diệu Kỳ',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F16%2Fthe-lines-that-define-me_1700127827774.jpg&w=640&q=75',
        vote: '0',
        age_limit: 'K'
    },
    {
        id: '12', title: 'Người Cha Của Xe Lửa Dải Ngân Hà',
        img: 'https://www.galaxycine.vn/_next/image/?url=https%3A%2F%2Fcdn.galaxycine.vn%2Fmedia%2F2023%2F11%2F16%2Ffather-of-the-milky-way-railroad_1700126212349.jpg&w=640&q=75',
        vote: '0',
        age_limit: 'K'
    },
]
)
</script>

<style lang="scss" scoped>
.image-container {
    width: 240px;
    position: relative;
    height: auto;
}

.card {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    height: auto;
    width: 260px;
}

.card-image {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.3s ease-in-out;
}

.card-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.overlay-button {
    width: 120px;
    padding: 10px 20px;
    background-color: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
}
.btn-buy{
    font-size: 16px;
    background-color: #ff5e19;
    opacity: 0.9;
    display: flex;
    align-items: center;
}
.btn-buy:hover{
    opacity: 1;
}
.btn-trailer{
    font-size: 16px;
    background-color: #fff;
    opacity: 0.9;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
}
.btn-trailer:hover{
    opacity: 1;
}

.card:hover {
    .card-overlay {
        opacity: 1;
    }

    .card-image {
        transform: scale(1.1);
    }
}

.votes{
    display: flex;
    padding: 2px 20px;
    align-items: center;
    flex-direction: row;
    color: #fff;
    font-weight: bold;
    content: "";
    position: absolute;
    bottom: 40px;
    right: -10px;
    background: rgba(0, 0, 0, .4);
    // transform: skewX(-25deg);
}
.age__limit{
    position: absolute;
    display: flex;
    border-radius: 5px;
    font-weight: 600;
    color: #fff;
    padding: 2px 6px;
    bottom:5px;
    right:5px;
    min-width: 36px;
    justify-content: center;
    background-color: #f58020;
}
</style>
