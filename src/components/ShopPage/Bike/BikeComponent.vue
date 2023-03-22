<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs, FreeMode } from 'swiper';
import { mapState } from 'pinia';
import ShopStore from '@/stores/ShopStore';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Thumbs, FreeMode],
      thumbsSwiper: null,
      // images: [
      //   'https://storage.googleapis.com/vue-course-api.appspot.com/ryantsai/1678152898416.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=fabVl2ai8YFKGkTvvk23X1sTF5p7bGsiKJ4fVo%2B9QFUpuLxtkzNYNuHMHrPsPgjO4geRuFlNnEfJDCtYgojgDH7aJnvtMhG2wWluJnjjcyz6F8ehTivEZF%2Bon6Qhh%2FPa%2Bra92qW%2FhtLx8ZATXTV3oEodG9dSX1AcwIBlif9gDRM4OYEhZ36vcYOUK%2B4nf2ia2eU2la469cNCJckKKIrCBN8qZdiMpNFRozci0Mg7R%2BnpsoRlamfYTrRJtgBXDbjua2KyfyW1vIorlcBB6qLa1OIQO8NP22fdmJMtlI4WJLYiqZ45yxquahakTaX%2FZ0BFM7%2Fa74z5caAC%2BKH7F3vk2A%3D%3D',
      //   'https://storage.googleapis.com/vue-course-api.appspot.com/ryantsai/1678152937292.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=G0pb6CFlfvYvfpGy6UdI%2FWeTMksuuXV07eUCpIrvRhFzin4UBwCi3n2GHEkebVnkrpgru%2BuGtxXZdS3MHeGD%2Fk63gylbzsSnG4vd%2F5DPkbal9L1Dq4m%2FlZijVcKngZ06lBgypX9f%2B0Ucvr%2FyV%2B0ra4MuFJaNJrnlHtBOUJ4pmAXcBnkReuII56i6n55y%2Fwbos%2F5EkzTwRQGDWB4%2B6A5is224qD8Oe9xpxXLhMOCoP0cTbhzPT7f%2BmbmCeAcirWH3Nx11NZ2C74Q0GI644uKtBdFIIdwDqSqvgE%2BlYFLMSN3T4emCwmDpzHR5nsI8jQRnQw97T84a6c%2F8r335IY0vLA%3D%3D',
      //   'https://storage.googleapis.com/vue-course-api.appspot.com/ryantsai/1678152957999.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=nkNFrqByDA8cUUNAMHPKLZDrqrbODlKVmbuSAJlD5tZxz3DFZjgulHb78XepsxBWfstS2bun4WLfbR8EUIjkAnTviPXsBlJf4UeUNlqX5eM6kbZxKOL0M0v4XijZXJKwYv%2F3Y24WLSa6LHAUoU38nWu7837ZhlAwOxUNRWHdySmmKHgClnwe2Bv5yudwpXtjccUkbwr21KW08stY01bK3WwDsUpwdXzx7J0CmsqTgrxu3HC8Ga3W%2FV8G5WNSW1Z5idOc9qia2KwN4d1pqzvU9VmvjrgNL1cidqa7zDOoAg%2FFNPzGgXtidcWt662MuN8UXoAMMqt%2FH%2Bv8Jw7MG2xIyQ%3D%3D',
      //   'https://storage.googleapis.com/vue-course-api.appspot.com/ryantsai/1678152974054.jpeg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=UR%2FFIDaAzFcw11dZkmtIu%2B8ON0l5pytgen8JCo0vvgcyE73scFRz%2FPBrpry7Hma%2BzSG9RGdQ6xOnjsb22gxNaEgIyFu89%2B831o%2BuKnYfhfiTHmaXax8ynFBViTWaNGDU2Pyg9azodRYnn2n3BI54QANCpzLAUEqYsJ14CtuAvxRydFgLkgUXrp4AHlqt5mw3nKYsmuJiBGJCThindZvnFW%2Bw72rrr0cxfm4qaSVX2dWsS%2Bs%2BD%2Bvi9BaXVIxXsrcbxpCDS8w2SOY4GxFGsT0ObdT9Ea%2Bsbl2MAP7mxenM77Zb%2BI%2F%2Bkrk3m9dPW%2Fi6U42qIi9dtyjq3KebnWa5GWTwuw%3D%3D',
      //   'https://storage.googleapis.com/vue-course-api.appspot.com/ryantsai/1679372153451.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=XX73T5G1BW9feKxitVPIRGGrYzKuspUUq5sCj3%2FcGhkARi0TwsugjKnhORGHhAZgCZ%2FUMgp830AnfwIi%2FB90hg7syO3zwnFwdnanwrg61pjfs2dRm3MXWWV%2Btrm0%2B%2Fo%2FaiVwkbEAF1XYsNIZWz62fLnLuKB30E5mIYclv6lbjqVYANNaFBgl7x9qogIaEdPHvsG%2FDSg0S7uCBZLrRSF%2FYPcFEXEX8zIXQ0cl8DNaWZ554KpOgRlR0BRP8IBmaK1Gz%2FJAt8tgpVLZiVv2dMwGKAJG82dopBeCc7S30FVhCbGo4xCCAal2rCFpkqJSeXYrY3dAlxoTlz4vcldaReTnTQ%3D%3D',
      //   'https://storage.googleapis.com/vue-course-api.appspot.com/ryantsai/1679363696269.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BZNvQZqs%2FWv2NzJRHXF9ZP10YN%2BqbFnyMBDoMn6MxOWrZ5ZBD1wHJjaPbuqBydwKleXu5RTx00ERsONqFki7HenecjSp0DJfR%2BMyoR9EN1c6gJElxOpm8eNYQEBKZSCPA%2FWNrJcqwcw3CJZWJ7teXofZEZX%2BBZbk%2FsKFla3RdCbIMgWADsbzmS%2F1CzUoPcRZin9pEXbdVoGPRrvwsMqtOFtW56KhYjxsHtkKuBFnA8w%2F9byazqkbZf3nK2JidYPkfzUZOdwm4Ecq4Dqid%2B3clumpoxB%2BaFki6Jhb8Q1LYIwtSR%2Bx9ofKwhfAis%2F5E2DG%2BXHO3A1SBbeiW4zWpsRX0w%3D%3D',
      // ],
      swiperTopOptions: {
        loop: true,
        allowTouchMove: false,
      },
      swiperThumbsOptions: {
        spaceBetween: 24,
        slidesPerView: 3,
        loop: true,
        watchSlidesProgress: true,
        navigation: true,
        slideToClickedSlide: true,
        centeredSlides: true,
      },
      article: {},
    };
  },
  computed: {
    ...mapState(ShopStore, ['bike', 'VITE_URL']),
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    getArticle(id) {
      const VITE_PATH = 'buyBikeArticles';
      const url = `${this.VITE_URL}/motorcycles/${id}/${VITE_PATH}`;

      this.$http
        .get(url)
        .then((res) => {
          const { data } = res;
          const [obj] = data;
          this.article = obj;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css"></style>
