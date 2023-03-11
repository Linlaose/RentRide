<script>
import BannerComponent from '@/components/RentPage/Banner/BannerComponent.vue';
import FilterComponent from '@/components/RentPage/Filter/FilterComponent.vue';
import BikesComponent from '@/components/RentPage/Bikes/BikesComponent.vue';
import ModalComponent from '@/components/RentPage/Modal/ModalComponent.vue';

import { RouterView } from 'vue-router';

export default {
  components: {
    BannerComponent,
    FilterComponent,
    BikesComponent,
    ModalComponent,
    RouterView,
  },
};
</script>

<template src="./template.html"></template>
