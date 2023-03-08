<script>
import BannerComponent from '@/components/NewsPage/Banner/BannerComponent.vue';
import ArticleComponent from '@/components/NewsPage/Article/ArticleComponent.vue';

export default {
  components: {
    BannerComponent,
    ArticleComponent,
  },
  data() {
    return {
      route: this.$route.params.id,
    };
  },
};
</script>

<template src="./template.html"></template>
