<script>
import { mapActions, mapState } from 'pinia';
import UserStore from '@/stores/UserStore';

export default {
  computed: {
    ...mapState(UserStore, ['user', 'userBirth']),
  },
  methods: {
    ...mapActions(UserStore, ['getUser']),
  },
  mounted() {
    this.getUser(this.$route.params.id);
  },
};
</script>

<template src="./template.html"></template>
