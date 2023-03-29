import { defineStore } from 'pinia';

import axios from 'axios';

export default defineStore('rentStore', {
  state: () => ({
    VITE_URL: import.meta.env.VITE_URL,
    VITE_PATH: 'motorcycles',
    originalBikes: [],
    bikes: [],
    tempBike: {},
    orderBike: {},
    options: {
      grade: '',
      displacement: '',
      date: '',
      type: '',
      make: '',
    },
    rentDate: null,
    returnDate: null,
  }),
  getters: {
    getOption: ({ options }) => {
      return options;
    },
    searchBikes({ originalBikes, options }) {
      return originalBikes.filter((item) => {
        return Object.entries(options).every(([key, value]) => {
          if (key === 'date' && value !== '') {
            if (item.rent_date !== null && item.return_date !== null) {
              return item.rent_date > value[1] || item.return_date < value[0];
            }
            return item.rent_date === null && item.return_date === null;
          }
          if (key === 'displacement' && value !== '') {
            const newVal = JSON.parse(value);
            if (newVal.length <= 1) {
              // 1000 cc 以上的情況
              return item[key] >= newVal[0] && item[key] !== newVal[1];
            }
            return (
              item[key] <= newVal[newVal.length - 1] && item[key] >= newVal[0]
            );
          }
          return value === '' || item[key] === value;
        });
      });
    },
    hotBikes({ bikes }) {
      // sort 有改到所有相關的陣列，bikes、searchBikes
      return bikes.sort((a, b) => {
        if (a.rank && b.rank) {
          return a.rank - b.rank;
        }
        if (a.rank) {
          return -1;
        }
        if (b.rank) {
          return 1;
        }
        return 0;
      });
    },
  },
  actions: {
    getBikes() {
      const url = `${this.VITE_URL}/${this.VITE_PATH}`;

      axios
        .get(url)
        .then((res) => {
          const { data } = res;
          this.originalBikes = data;
          this.bikes = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBike(id) {
      const url = `${this.VITE_URL}/${this.VITE_PATH}/${id}`;

      axios
        .get(url)
        .then((res) => {
          const { data } = res;
          this.orderBike = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      this.bikes = this.searchBikes;
    },
    checkBike(bike) {
      this.tempBike = bike;
      document.body.style.overflow = 'hidden';
    },
    takeTime(start, end) {
      this.rentDate = new Date(start).getTime();
      this.returnDate = new Date(end).getTime();
    },
  },
});
