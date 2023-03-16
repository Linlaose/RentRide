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
  methods: {
    scrollVisible() {
      document.body.style.overflow = 'visible';
    },
  },
};
</script>

<template src="./template.html"></template>
