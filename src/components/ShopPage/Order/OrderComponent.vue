<script>
import { mapState, mapActions } from 'pinia';
import ShopStore from '@/stores/ShopStore';
import LoginModalStore from '@/stores/LoginModalStore';

import Swal from 'sweetalert2';

import {
  Form as VForm,
  Field as VField,
  defineRule,
  configure,
} from 'vee-validate';
import AllRules from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import tw from '@vee-validate/i18n/dist/locale/zh_TW.json';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

localize({ tw });

configure({
  generateMessage: localize('zh_TW', tw),
});

export default {
  components: {
    VForm,
    VField,
  },
  data() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      customClass: {
        popup: 'colored-toast',
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
    });

    return {
      orderSchema: {
        name: 'required',
        tel: this.isPhone,
        date: this.isDate,
      },
      /* 86400000ms = 1 day 
      先將 today 加上 1 天，確保錯誤訊息不會跑出來
      再用 new Date 包起來，是因為讓 this.date 的顯示更統一，這樣在 addBooking 比較容易轉換資料 */
      date: new Date(),
      masks: {
        inputDateTime24hr: 'YYYY/MM/DD HH:mm',
      },
      toast: Toast,
    };
  },
  computed: {
    ...mapState(ShopStore, ['bike', 'VITE_URL']),
    ...mapState(LoginModalStore, ['user', 'isLoggedIn']),
    todayTimestamp() {
      return new Date().getTime();
    },
    bookDate() {
      const f = new Intl.DateTimeFormat('zh-TW', {
        dateStyle: 'long',
        timeStyle: 'short',
      });

      return f.format(this.date);
    },
  },
  methods: {
    ...mapActions(ShopStore, ['getBike']),
    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      if (phoneNumber.test(value)) {
        return true;
      }
      if (typeof value !== 'number' && value) {
        return '請輸入正確格式，例如：09xx-xxx-xxx';
      }
      return '電話號碼 為必填';
    },
    isDate() {
      // 7200000ms = 2hr
      return this.date <= this.todayTimestamp + 7200000
        ? '預約賞車時間必須大於 2 小時以後'
        : true;
    },
    addBooking(userId, name, phone, bike) {
      const VITE_PATH = 'ordersBook';
      const url = `${this.VITE_URL}/${VITE_PATH}`;
      const data = {
        userId,
        name,
        phone,
        bike_year: this.bike.year,
        bike,
        date_take_a_look: this.date.getTime(),
      };

      this.$http
        .post(url, data)
        .then(() => {
          this.toast
            .fire({
              icon: 'success',
              title: '即將回到重機商城頁面',
            })
            .then(() => {
              this.$router.push('/shop/');
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkUser() {
      if (!this.isLoggedIn) {
        this.$swal({
          title: '請登入後繼續',
          icon: 'error',
          confirmButtonText: '確定',
        }).then(() => {
          this.$router.push(`/shop/`);
        });
      }
    },
    onSubmit(values) {
      this.$swal({
        icon: 'warning',
        title: '請確認基本資訊',
        html: `
        姓名: ${values.name}<br />
        電話: ${values.tel}<br />
        賞車時間: ${this.bookDate}<br />
        車款: ${this.bike.model}`,
        showDenyButton: true,
        confirmButtonText: '確認',
        denyButtonText: `取消`,
        reverseButtons: true,
      }).then((result) => {
        if (!result.isConfirmed) return;

        this.addBooking(this.user.id, values.name, values.tel, this.bike.model);
      });
    },
  },
  mounted() {
    this.getBike(this.$route.params.id);
    this.checkUser();
  },
};
</script>

<template src="./template.html"></template>

<style src="./style.css"></style>
