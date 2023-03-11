<script>
import { mapState } from 'pinia';
import RentStore from '@/stores/RentStore';

import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(RentStore, ['tempBike']),
  },
};
</script>

<template src="./template.html"></template>
