import { defineStore } from 'pinia';

export default defineStore('headerStore', {
  state: () => ({
    isOpen: false,
  }),
  getters: {
    burgerIsOpen({ isOpen }) {
      return isOpen;
    },
  },
  actions: {
    switchBurger() {
      this.isOpen = !this.isOpen;
    },
  },
});
