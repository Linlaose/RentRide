<script>
import { RouterLink } from 'vue-router';

export default {
  components: {
    RouterLink,
  },
  data() {
    return {
      innerWidth: window.innerWidth,
      cors: 'https://cors-anywhere.herokuapp.com/',
      VITE_URL: import.meta.env.VITE_URL,
      VITE_PATH: 'news',
      news: [],
    };
  },
  methods: {
    getNews(apiUrl, apiPath) {
      const url = `${apiUrl}/${apiPath}`;

      this.$http
        .get(url)
        .then((res) => {
          const { data } = res;
          const index = data.length - 3;
          this.news = data.slice(index);
        })
        .catch(() => {
          alert('Oops ! 有點狀況');
        });
    },
    testId(id) {
      console.log(id);
    },
  },
  mounted() {
    this.getNews(this.VITE_URL, this.VITE_PATH);
  },
};
</script>

<template src="./template.html"></template>
