<script>
import { RouterLink } from 'vue-router';
import { mapState, mapActions } from 'pinia';
import HeaderStore from '@/stores/HeaderStore';
import LoginModalStore from '@/stores/LoginModalStore';

export default {
  components: {
    RouterLink,
  },
  computed: {
    ...mapState(HeaderStore, ['burgerIsOpen']),
    ...mapState(LoginModalStore, ['isLoggedIn', 'user']),
  },
  methods: {
    ...mapActions(HeaderStore, ['switchBurger']),
    ...mapActions(LoginModalStore, ['refreshLoggedIn', 'logOut']),
    scrollHidden() {
      document.body.style.overflow = 'hidden';
    },
  },
  mounted() {
    this.refreshLoggedIn();
  },
};
</script>

<template src="./template.html"></template>

<style src="./styles.css" scoped></style>
