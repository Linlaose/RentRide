import axios from 'axios';
import { defineStore } from 'pinia';

export default defineStore('shopStore', {
  state: () => ({
    originalBikes: [],
    VITE_URL: import.meta.env.VITE_URL,
    options: {
      type: null,
      make: null,
      displacement: null,
      year: null,
    },
    bikes: [],
    onSearch: false,
    onSaleBikes: [],
    shopBike: {},
  }),
  getters: {
    searchBike: ({ onSaleBikes, options }) => {
      return onSaleBikes.filter((bike) => {
        return Object.entries(options).every(([key, value]) => {
          if (key === 'displacement' && value !== null) {
            const newVal = JSON.parse(value);
            if (newVal.length <= 1) {
              // 1000 cc 以上的情況
              return bike[key] >= newVal[0] && bike[key] !== newVal[1];
            }
            return (
              bike[key] <= newVal[newVal.length - 1] && bike[key] >= newVal[0]
            );
          }
          if (key === 'year' && value !== null) {
            return bike[key] >= value;
          }
          return bike[key] === value || value === null;
        });
      });
    },
    searchOptions: ({ options }) => {
      return options;
    },
    bike: ({ shopBike }) => {
      return shopBike;
    },
    similarBikes: ({ originalBikes, shopBike }) => {
      return originalBikes.filter((item) => {
        return (
          item.type === shopBike.type &&
          item.on_sale === shopBike.on_sale &&
          item.model !== shopBike.model
        );
      });
    },
  },
  actions: {
    getBikes() {
      const VITE_PATH = 'motorcycles';
      const url = `${this.VITE_URL}/${VITE_PATH}`;

      axios
        .get(url)
        .then((res) => {
          const { data } = res;
          this.originalBikes = data;

          this.filterOnSale();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    search() {
      this.filterOnSale();
      this.onSaleBikes = this.searchBike;
      this.onSearch = true;
    },
    clearSearch() {
      this.options = {
        type: null,
        make: null,
        displacement: null,
        year: null,
      };
      this.onSearch = false;
      this.filterOnSale();
    },
    filterOnSale() {
      this.onSaleBikes = this.originalBikes.filter((bike) => {
        return bike.on_sale;
      });
    },
    getBike(id) {
      const VITE_PATH = 'motorcycles';
      const url = `${this.VITE_URL}/${VITE_PATH}/${id}`;

      axios
        .get(url)
        .then((res) => {
          const { data } = res;
          this.shopBike = data;
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
});
