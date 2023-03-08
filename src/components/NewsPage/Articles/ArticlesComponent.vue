<script>
import { mapActions, mapState } from 'pinia';
import NewsStore from '@/stores/NewsStore';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(NewsStore, ['articles']),
  },
  methods: {
    ...mapActions(NewsStore, ['getNews']),
  },
  mounted() {
    this.getNews();
  },
};
</script>

<template src="./template.html"></template>
