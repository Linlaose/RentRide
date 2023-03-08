import { defineStore } from 'pinia';

import axios from 'axios';
import { format } from 'date-fns';

export default defineStore('newsStore', {
  state: () => ({
    selected: '',
    VITE_URL: import.meta.env.VITE_URL,
    VITE_PATH: 'news',
    news: [],
    article: {},
  }),
  getters: {
    selectedTag({ selected }) {
      return selected;
    },
    articles({ news }) {
      if (!this.selected || this.selected === '全部') {
        return news;
      }
      return news.filter((item) => item.tags.includes(this.selected));
    },
  },
  actions: {
    selectItem(title) {
      this.selected = title;
    },
    getNews() {
      const url = `${this.VITE_URL}/${this.VITE_PATH}`;

      axios
        .get(url)
        .then((res) => {
          const { data } = res;
          this.news = [];
          data.forEach((item) => {
            const date = item.created_at;

            const formattedDate = format(new Date(date), 'yyyy/MM/dd');

            let obj = {};
            obj = item;
            obj.created_at = formattedDate;
            this.news.push(obj);
          });
          this.news.reverse();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getArticle(id) {
      const url = `${this.VITE_URL}/${this.VITE_PATH}/${id}`;

      axios
        .get(url)
        .then((res) => {
          const { data } = res;
          this.article = data;
          this.article.created_at = format(
            new Date(this.article.created_at),
            'yyyy/MM/dd'
          );
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
});
