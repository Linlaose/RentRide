<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';
import PageLoadingComponent from '@/components/PageLoading/PageLoadingComponent.vue';
import LoginModal from '@/components/LoginModal/LoginModal.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    PageLoadingComponent,
    LoginModal,
  },
};
</script>

<template>
  <login-modal />
  <page-loading-component :key="$route.fullPath" />
  <header-component />
  <router-view />
  <footer-component />
</template>
