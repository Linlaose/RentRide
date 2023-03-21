<script>
import SearchComponent from '@/components/ShopPage/Search/SearchComponent.vue';
import SearchResultComponent from '@/components/ShopPage/SearchResult/SearchResultComponent.vue';
import { mapState } from 'pinia';
import ShopStore from '@/stores/ShopStore';

export default {
  components: {
    SearchComponent,
    SearchResultComponent,
  },
  computed: {
    ...mapState(ShopStore, ['searchOptions']),
  },
};
</script>

<template src="./template.html"></template>
