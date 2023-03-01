<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Grid } from 'swiper';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      modules: [Navigation, Grid],
      rentBikeSwiper: null,
      bikes: [],
      VITE_URL: import.meta.env.VITE_URL,
      VITE_PATH: 'motorcycles',
    };
  },
  methods: {
    onSwiper(swiper) {
      this.rentBikeSwiper = { ...swiper };
      console.log(swiper);
    },
    onSlideChange() {
      console.log('Slide change');
    },
    getBikes() {
      const url = `${this.VITE_URL}/${this.VITE_PATH}`;

      this.$http
        .get(url)
        .then((res) => {
          this.bikes = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getBikes();
  },
};
</script>

<template src="./template.html"></template>

<style src="./style.css"></style>
