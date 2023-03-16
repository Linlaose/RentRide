<script>
import { mapState, mapActions } from 'pinia';
import RentStore from '@/stores/RentStore';

export default {
  data() {
    return {
      masks: {
        input: ['YYYY/MM/DD'],
      },
      range: null,
    };
  },
  computed: {
    ...mapState(RentStore, ['getOption', 'rentDate', 'returnDate']),
  },
  methods: {
    ...mapActions(RentStore, ['search', 'takeTime']),
  },
  watch: {
    range(newVal) {
      const { start, end } = newVal;
      this.getOption.date = [
        start.setHours(0, 0, 0, 0),
        end.setHours(23, 59, 59, 999),
      ];
      this.takeTime(start, end);
    },
  },
};
</script>

<template src="./template.html"></template>
