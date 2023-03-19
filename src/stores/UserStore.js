import { defineStore } from 'pinia';
import axios from 'axios';

export default defineStore('userStore', {
  state: () => ({
    VITE_URL: import.meta.env.VITE_URL,
    user: {},
    userBirth: null,
  }),
  actions: {
    getUser(id) {
      const VITE_PATH = 'users';
      const url = `${this.VITE_URL}/${VITE_PATH}/${id}`;

      axios
        .get(url)
        .then((res) => {
          const { data } = res;
          this.user = data;

          const f = new Intl.DateTimeFormat('zh-TW', {
            dateStyle: 'medium',
          });
          this.userBirth = f.format(this.user.date);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
