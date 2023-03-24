<script>
import Swal from 'sweetalert2';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, Thumbs, FreeMode } from 'swiper';
import { mapState } from 'pinia';
import ShopStore from '@/stores/ShopStore';
import LoginModalStore from '@/stores/LoginModalStore';

import { RouterLink } from 'vue-router';

export default {
  components: {
    Swiper,
    SwiperSlide,
    RouterLink,
  },
  data() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    return {
      modules: [Navigation, Thumbs, FreeMode],
      thumbsSwiper: null,
      swiperTopOptions: {
        loop: true,
        allowTouchMove: false,
      },
      swiperThumbsOptions: {
        spaceBetween: 24,
        slidesPerView: 3,
        loop: true,
        watchSlidesProgress: true,
        navigation: true,
        slideToClickedSlide: true,
        centeredSlides: true,
      },
      article: {},
      favoriteData: {},
      toast: Toast,
    };
  },
  computed: {
    ...mapState(ShopStore, ['bike', 'VITE_URL']),
    ...mapState(LoginModalStore, ['user', 'isLoggedIn']),
  },
  methods: {
    setThumbsSwiper(swiper) {
      this.thumbsSwiper = swiper;
    },
    getArticle(id) {
      const VITE_PATH = 'buyBikeArticles';
      const url = `${this.VITE_URL}/motorcycles/${id}/${VITE_PATH}`;

      this.$http
        .get(url)
        .then((res) => {
          const { data } = res;
          if (data.length <= 0) return;
          const [obj] = data;
          this.article = obj;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkUser(id) {
      if (!this.isLoggedIn) {
        this.$swal({
          title: '請登入後繼續',
          icon: 'error',
          confirmButtonText: '確定',
        });
      } else {
        this.$router.push(`/shop/shopOrder/${id}`);
      }
    },
    addFavorite() {
      const VITE_PATH = 'favorites';
      const url = `${this.VITE_URL}/${VITE_PATH}`;

      const { make, type, year, model, grade, id, imgUrl } = this.bike;
      this.favoriteData = {
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
        .post(url, this.favoriteData)
        .then(() => {
          this.toast.fire({
            position: 'bottom-end',
            icon: 'success',
            title: '收藏成功',
          });
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },
  },
  mounted() {
    this.getArticle(this.$route.params.id);
  },
  watch: {
    $route() {
      this.getArticle(this.$route.params.id);
    },
  },
};
</script>

<template src="./template.html"></template>
<style src="./style.css"></style>
