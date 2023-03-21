<script>
import { mapActions, mapState } from 'pinia';
import ShopStore from '@/stores/ShopStore';
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(ShopStore, ['onSaleBikes', 'searchOptions', 'onSearch']),
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
