<script>
import { mapActions, mapState } from 'pinia';
import ShopStore from '@/stores/ShopStore';

export default {
  computed: {
    ...mapState(ShopStore, ['bike']),
  },
  methods: {
    ...mapActions(ShopStore, ['getBike']),
  },
  mounted() {
    if (this.$route.params.id) {
      this.getBike(this.$route.params.id);
    }
  },
  watch: {
    $route() {
      this.getBike(this.$route.params.id);
    },
  },
};
</script>

<template src="./template.html"></template>
