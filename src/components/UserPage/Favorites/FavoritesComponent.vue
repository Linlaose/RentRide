<script>
import { mapState } from 'pinia';
import UserStore from '@/stores/UserStore';

export default {
  data() {
    return {
      favorites: {},
      VITE_PATH: 'favorites',
    };
  },
  computed: {
    ...mapState(UserStore, ['VITE_URL']),
  },
  methods: {
    getFavorites() {
      const url = `${this.VITE_URL}/users/${this.$route.params.id}/${this.VITE_PATH}`;

      this.$http
        .get(url)
        .then((res) => {
          const { data } = res;
          this.favorites = data;
        })
        .catch((err) => {
          alert(err);
        });
    },
    delFavorite(id) {
      const url = `${this.VITE_URL}/${this.VITE_PATH}/${id}`;

      this.$http
        .delete(url)
        .then(() => {
          this.$swal({
            position: 'bottom-end',
            title: '已刪除',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.getFavorites();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getFavorites();
  },
};
</script>

<template src="./template.html"></template>
