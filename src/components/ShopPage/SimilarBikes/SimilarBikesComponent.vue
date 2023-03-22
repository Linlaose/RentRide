<script>
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper';
import { mapActions, mapState } from 'pinia';
import ShopStore from '@/stores/ShopStore';

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
  computed: {
    ...mapState(ShopStore, ['bike', 'similarBikes']),
  },
  methods: {
    ...mapActions(ShopStore, ['getBikes']),
  },
  mounted() {
    this.getBikes();
  },
};
</script>

<template src="./template.html"></template>

<style src="./style.css"></style>
