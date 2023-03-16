<script>
import { mapActions, mapState } from 'pinia';
import RentStore from '@/stores/RentStore';
import LoginModalStore from '@/stores/LoginModalStore';

export default {
  data() {
    return {
      tempDate: {
        rent: null,
        return: null,
      },
      masks: {
        input: 'YYYY/MM/DD',
      },
      totalRent: null,
      data: {},
      updateData: {},
      dateSpan: null,
      formattedDate: {
        rent: null,
        return: null,
      },
    };
  },
  computed: {
    ...mapState(RentStore, ['orderBike', 'rentDate', 'returnDate', 'VITE_URL']),
    ...mapState(LoginModalStore, ['isLoggedIn', 'user']),
  },
  methods: {
    ...mapActions(RentStore, ['getBike']),
    renderDate() {
      const dateArr = [new Date(this.rentDate), new Date(this.returnDate)]; // timeStamp 轉換日期格式
      const f = new Intl.DateTimeFormat('zh-TW', {
        dateStyle: 'medium',
      });

      this.formattedDate.rent = f.format(dateArr[0]);
      this.formattedDate.return = f.format(dateArr[1]);
    },
    renderBirth() {
      const { date } = this.user;
      const birth = new Date(date);

      const f = new Intl.DateTimeFormat('zh-TW', {
        dateStyle: 'medium',
      });
      const birthFormatted = f.format(birth);
      this.user.birthFormatted = birthFormatted;
    },
    rentConfirm() {
      const rentTimestamp = new Date(this.tempDate.rent).getTime();
      const returnTimestamp = new Date(this.tempDate.return).getTime();
      if (!this.isLoggedIn) {
        this.$swal({
          title: '請登入後繼續',
          icon: 'error',
          confirmButtonText: '確定',
        });
      } else if (
        rentTimestamp > returnTimestamp &&
        rentTimestamp &&
        returnTimestamp
      ) {
        // tempDate 的 rent 和 return 都有被填寫的情況下才比較時間先後
        this.$swal({
          title: '取車日期不得晚過還車日期',
          icon: 'error',
          confirmButtonText: '確定',
        });
      } else if (!this.formattedDate.rent || !this.formattedDate.return) {
        // 欄位未填確實
        this.$swal({
          title: '請確實填寫日期',
          icon: 'error',
          confirmButtonText: '確定',
        });
      } else {
        const VITE_PATH = 'ordersRent';
        const VITE_PATH_UPDATE = 'motorcycles';
        const addOrderUrl = `${this.VITE_URL}/${VITE_PATH}`;
        const updateBikeUrl = `${this.VITE_URL}/${VITE_PATH_UPDATE}/${this.orderBike.id}`;

        if (this.rentDate && this.returnDate) {
          // 在租車頁面已經有選租車日期者
          if (this.tempDate.rent && !this.tempDate.return) {
            // 已選租車日期但只修改取車日期
            this.data = {
              userId: this.user.id,
              pick_up: new Date(this.tempDate.rent).getTime(),
              return: this.returnDate,
              price: this.totalRent,
              bike_year: this.orderBike.year,
              bike_model: this.orderBike.model,
            };
            this.updateData = {
              rent_date: new Date(this.tempDate.rent).getTime(),
              return_date: this.returnDate,
            };
            this.callAll(
              addOrderUrl,
              updateBikeUrl,
              this.data,
              this.updateData
            );
          } else if (this.tempDate.return && !this.tempDate.rent) {
            // 已選租車日期但只修改還車日期
            this.data = {
              userId: this.user.id,
              pick_up: this.rentDate,
              return: new Date(this.tempDate.return).getTime(),
              price: this.totalRent,
              bike_year: this.orderBike.year,
              bike_model: this.orderBike.model,
            };
            this.updateData = {
              rent_date: this.rentDate,
              return_date: new Date(this.tempDate.return).getTime(),
            };

            this.callAll(
              addOrderUrl,
              updateBikeUrl,
              this.data,
              this.updateData
            );
          } else {
            this.data = {
              userId: this.user.id,
              pick_up: this.rentDate,
              return: this.returnDate,
              price: this.totalRent,
              bike_year: this.orderBike.year,
              bike_model: this.orderBike.model,
            };
            this.updateData = {
              rent_date: this.rentDate,
              return_date: this.returnDate,
            };

            this.callAll(
              addOrderUrl,
              updateBikeUrl,
              this.data,
              this.updateData
            );
          }
        } else if (this.tempDate.rent && this.tempDate.return) {
          // 在租車頁面已經未選租車日期，而在訂單頁面才選定
          this.data = {
            userId: this.user.id,
            pick_up: new Date(this.tempDate.rent).getTime(),
            return: new Date(this.tempDate.return).getTime(),
            price: this.totalRent,
            bike_year: this.orderBike.year,
            bike_model: this.orderBike.model,
          };
          this.updateData = {
            rent_date: new Date(this.tempDate.rent).getTime(),
            return_date: new Date(this.tempDate.return).getTime(),
          };

          this.callAll(addOrderUrl, updateBikeUrl, this.data, this.updateData);
        }
      }
    },
    callAll(addUrl, updateUrl, addData, updateData) {
      const addOrderApi = this.$http.post(addUrl, addData);
      const updateBikeApi = this.$http.patch(updateUrl, updateData);

      Promise.all([addOrderApi, updateBikeApi])
        .then((res) => {
          const [{ data }] = res;
          const f = new Intl.DateTimeFormat('zh-TW', {
            dateStyle: 'medium',
          });
          this.$swal({
            position: 'center',
            title: '租車成功，請按時取車',
            text: `${f.format(data.pick_up)} ~ ${f.format(data.return)}`,
            icon: 'success',
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            this.$router.push('/rent');
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calcDateSpan(startDate, endDate) {
      const oneDay = 86400000; // 毫秒
      const diffDate = endDate - startDate;

      this.dateSpan = Math.round(diffDate / oneDay);
    },
    calcRent() {
      if (this.dateSpan) {
        this.totalRent = this.dateSpan * this.orderBike.rent_price;
      } else {
        this.totalRent = this.orderBike.rent_price;
      }
    },
  },
  mounted() {
    this.getBike(this.$route.params.id);

    if (this.rentDate && this.returnDate) {
      this.renderDate();
    }
    if (this.user.date) {
      this.renderBirth();
    }
    this.calcDateSpan(this.rentDate, this.returnDate);
  },
  watch: {
    user(newVal) {
      if (newVal.date) {
        this.renderBirth();
      }
    },
    tempDate: {
      handler(newVal) {
        const f = new Intl.DateTimeFormat('zh-TW', {
          dateStyle: 'medium',
        });
        if (newVal.rent && !newVal.return) {
          // 只修改 rent date
          this.formattedDate.rent = f.format(newVal.rent);
        }
        if (newVal.return && !newVal.rent) {
          // 只修改 return date
          this.formattedDate.return = f.format(newVal.return);
        }
        if (newVal.rent && newVal.return) {
          let start = new Date(newVal.rent);
          let end = new Date(newVal.return);
          start = start.setHours(0, 0, 0, 0);
          end = end.setHours(23, 59, 59, 999);

          this.formattedDate.rent = f.format(newVal.rent);
          this.formattedDate.return = f.format(newVal.return);

          if (start > end) {
            this.$swal({
              title: '取車日期不得晚過還車日期',
              icon: 'error',
              confirmButtonText: '確定',
            }).then(() => {
              this.dateSpan = null;
              this.calcRent();
            });
          }
          this.calcDateSpan(start, end);
          this.calcRent();
        }
        if (this.rentDate && this.returnDate && newVal.rent && !newVal.return) {
          // 從租車頁選定好日期，但在租車訂單頁才改 rent date
          const start = newVal.rent.setHours(0, 0, 0, 0);
          if (start > this.returnDate) {
            this.$swal({
              title: '取車日期不得晚過還車日期',
              icon: 'error',
              confirmButtonText: '確定',
            }).then(() => {
              this.formattedDate.rent = null;
              this.dateSpan = null;
              this.calcRent();
            });
          }
          this.calcDateSpan(start, this.returnDate);
          this.calcRent();
        }
        if (this.rentDate && this.returnDate && newVal.return && !newVal.rent) {
          // 從租車頁選定好日期，但在租車訂單頁才改 return date
          const end = newVal.return.setHours(23, 59, 59, 999);
          if (this.rentDate > end) {
            this.$swal({
              title: '取車日期不得晚過還車日期',
              icon: 'error',
              confirmButtonText: '確定',
            }).then(() => {
              this.formattedDate.return = null;
              this.dateSpan = null;
              this.calcRent();
            });
          }
          this.calcDateSpan(this.rentDate, end);
          this.calcRent();
        }
      },
      deep: true,
    },
    orderBike() {
      // 因為 mounted 的渲染在 store 之前，所以用監聽確認 orderBike 已被引入才執行
      this.calcRent();
    },
  },
};
</script>

<template src="./template.html"></template>
