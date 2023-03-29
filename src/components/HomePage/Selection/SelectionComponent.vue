<script>
import { RouterLink } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Grid } from 'swiper';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';

export default {
  components: {
    Swiper,
    SwiperSlide,
    RouterLink,
  },
  data() {
    return {
      modules: [Navigation, Grid],
      rentBikeSwiper: null,
      bikes: [],
      VITE_URL: import.meta.env.VITE_URL,
      VITE_PATH: 'motorcycles',
      swiperOptions: {
        navigation: true,
        slidesPerView: 1,
        spaceBetween: 30,
        grid: {
          rows: 1,
        },
        breakpoints: {
          1024: {
            slidesPerView: 3,
            grid: {
              rows: 2,
            },
          },
        },
      },
    };
  },
  methods: {
    onSwiper(swiper) {
      this.rentBikeSwiper = { ...swiper };
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
