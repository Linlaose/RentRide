<script>
import { mapActions, mapState } from 'pinia';
import NewsStore from '@/stores/NewsStore';

export default {
  data() {
    return {
      titles: ['全部', '公告', '新車', '租賃', '特價'],
    };
  },
  computed: {
    ...mapState(NewsStore, ['selectedTag']),
  },
  methods: {
    ...mapActions(NewsStore, ['selectItem']),
  },
};
</script>

<template src="./template.html"></template>
