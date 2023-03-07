<script>
import HeaderComponent from '@/components/Header/HeaderComponent.vue';
import FooterComponent from '@/components/Footer/FooterComponent.vue';
import PageLoadingComponent from '@/components/PageLoading/PageLoadingComponent.vue';

export default {
  components: {
    HeaderComponent,
    FooterComponent,
    PageLoadingComponent,
  },
};
</script>

<template>
  <page-loading-component :key="$route.fullPath" />
  <header-component />
  <router-view />
  <footer-component />
</template>
