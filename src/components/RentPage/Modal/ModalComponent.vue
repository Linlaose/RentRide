<script>
import { mapState } from 'pinia';
import RentStore from '@/stores/RentStore';
import LoginModalStore from '@/stores/LoginModalStore';

import { RouterLink } from 'vue-router';
import { debounce } from 'lodash';

export default {
  data() {
    return {
      isFavorite: false,
      data: {},
    };
  },
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(RentStore, ['tempBike', 'VITE_URL']),
    ...mapState(LoginModalStore, ['user']),
  },
  methods: {
    scrollVisible() {
      document.body.style.overflow = 'visible';
    },
    addFavorite() {
      this.isFavorite = !this.isFavorite;
      setTimeout(() => {
        // 當作切換 icon 與文字內容的樣式
        this.isFavorite = !this.isFavorite;
      }, 1000);
      this.debouncedFunc();
    },
  },
  mounted() {
    this.debouncedFunc = debounce(() => {
      // debouncedFunc 存在此元件內
      const VITE_PATH = 'favorites';
      const url = `${this.VITE_URL}/${VITE_PATH}`;
      const { make, type, year, model, grade, id, imgUrl } = this.tempBike;
      this.data = {
        bike_brand: make,
        bike_type: type,
        bike_year: year,
        bike_model: model,
        bike_grade: grade,
        bike_id: id,
        imgUrl,
        userId: this.user.id,
      };

      this.$http
        .post(url, this.data)
        .then(() => {
          this.$swal({
            title: '加入成功',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.$refs.rentModal.checked = false;
            document.body.style.overflow = 'visible';
          });
        })
        .catch((err) => {
          alert(err);
        });
    }, 1000);
  },
};
</script>

<template src="./template.html"></template>
