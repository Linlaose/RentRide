<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation],
      swiperOptions: {
        navigation: true,
        slidesPerView: 3,
        spaceBetween: 24,
      },
    };
  },
};
</script>

<template src="./template.html"></template>

<style src="./style.css"></style>
