<script>
import HeaderStore from "@/stores/HeaderStore.js";

import { mapState, mapActions } from "pinia";

export default {
  computed: {
    ...mapState(HeaderStore, ["burgerIsOpen"]),
  },
  methods: {
    ...mapActions(HeaderStore, ["switchBurger"]),
  },
};
</script>

<template src="./template.html"></template>

<style src="./styles.css" scoped></style>
