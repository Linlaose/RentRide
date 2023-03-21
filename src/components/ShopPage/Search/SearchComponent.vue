<script>
import VueDatePicker from '@vuepic/vue-datepicker';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@vuepic/vue-datepicker/dist/main.css';
import ShopStore from '@/stores/ShopStore';
import { mapActions, mapState } from 'pinia';

export default {
  data() {
    return {
      year: null,
    };
  },
  components: {
    VueDatePicker,
  },
  computed: {
    ...mapState(ShopStore, ['searchOptions']),
    yearFormat() {
      return this.year ? `${this.year} 年起` : null;
    },
  },
  methods: {
    ...mapActions(ShopStore, ['clearSearch', 'search']),
  },
  watch: {
    year(newVal) {
      this.searchOptions.year = newVal;
    },
  },
};
</script>

<template src="./template.html"></template>

<style src="./style.css"></style>
