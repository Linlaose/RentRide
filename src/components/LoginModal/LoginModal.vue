<script>
import { mapActions, mapState } from 'pinia';
import LoginModalStore from '@/stores/LoginModalStore';

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
    return {
      schema: {
        email: 'required|email',
        password: 'required|min:8',
        name: 'required',
        tel: this.isPhone,
        date: this.isDate,
      },
      loginSchema: {
        email: 'required|email',
        password: 'required',
      },
      masks: {
        input: 'YYYY/MM/DD',
      },
      date: new Date(),
      VITE_URL: import.meta.env.VITE_URL,
      isRegistered: true,
    };
  },
  computed: {
    ...mapState(LoginModalStore, ['isLoggedIn', 'screenWidth']),
  },
  methods: {
    ...mapActions(LoginModalStore, ['login']),
    scrollVisible() {
      document.body.style.overflowY = 'visible';
    },
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
      return this.date ? this.date : '生日 為必填';
    },
    signUp(values) {
      const VITE_PATH = 'register';
      const data = {
        ...values,
      };
      data.date = this.date.getTime();

      const url = `${this.VITE_URL}/${VITE_PATH}`;
      let position = 0;

      if (this.screenWidth >= 360) {
        position = 'center';
      }
      if (this.screenWidth >= 991) {
        position = 'top-end';
      }

      this.$http
        .post(url, data)
        .then(() => {
          this.$swal({
            position,
            icon: 'success',
            title: '註冊完成',
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            this.isRegistered = true;
          });
        })
        .catch((err) => {
          const { status } = err.response;
          if (status === 400) {
            this.$swal({
              title: 'Email 已存在!',
              icon: 'error',
              confirmButtonText: '確定',
            });
          }
          console.log(err);
        });
    },
    toggleForm() {
      this.isRegistered = !this.isRegistered;
    },
  },
  watch: {
    isLoggedIn() {
      this.$refs.loginModal.checked = false; // 關閉 modal
      this.scrollVisible();
    },
  },
};
</script>

<template src="./template.html"></template>
