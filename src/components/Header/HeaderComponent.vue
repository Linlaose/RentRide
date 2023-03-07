<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import HeaderStore from '@/stores/HeaderStore';

export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(HeaderStore, ['burgerIsOpen']),
  },
  methods: {
    ...mapActions(HeaderStore, ['switchBurger']),
  },
};
</script>

<template src="./template.html"></template>

<style src="./styles.css" scoped></style>
