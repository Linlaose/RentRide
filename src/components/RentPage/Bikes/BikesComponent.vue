<script>
import { mapState, mapActions } from 'pinia';
import RentStore from '@/stores/RentStore';

export default {
  computed: {
    ...mapState(RentStore, ['bikes', 'searchBikes', 'hotBikes']),
  },
  methods: {
    ...mapActions(RentStore, ['getBikes', 'checkBike']),
  },
  mounted() {
    this.getBikes();
  },
};
</script>

<template src="./template.html"></template>
