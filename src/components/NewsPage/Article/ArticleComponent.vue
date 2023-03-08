<script>
import { mapActions, mapState } from 'pinia';
import NewsStore from '@/stores/NewsStore';

export default {
  computed: {
    ...mapState(NewsStore, ['article']),
  },
  methods: {
    ...mapActions(NewsStore, ['getArticle']),
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
};
</script>

<template src="./template.html"></template>
