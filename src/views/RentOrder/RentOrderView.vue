<script>
import RentStore from '@/stores/RentStore';
import { mapState } from 'pinia';

import BannerComponent from '@/components/RentPage/Banner/BannerComponent.vue';
import OrderComponent from '@/components/RentPage/Order/OrderComponent.vue';

export default {
  components: {
    BannerComponent,
    OrderComponent,
  },
  computed: {
    ...mapState(RentStore, ['tempBike']),
  },
};
</script>

<template src="./template.html"></template>
