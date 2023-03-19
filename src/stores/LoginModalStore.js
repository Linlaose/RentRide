import { defineStore } from 'pinia';

import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import Swal from 'sweetalert2';

export default defineStore('loginModalStore', {
  state: () => ({
    loginStatus: false,
    registerStatus: true,
    VITE_URL: import.meta.env.VITE_URL,
    userObj: {},
    screenWidth: window.innerWidth,
  }),
  getters: {
    isLoggedIn({ loginStatus }) {
      return loginStatus;
    },
    user({ userObj }) {
      return userObj;
    },
    date({ inputDate }) {
      return inputDate;
    },
  },
  actions: {
    login(values) {
      // 拉到 store 做是因為要修改 loginStatus 的值
      const VITE_PATH = 'login';
      const url = `${this.VITE_URL}/${VITE_PATH}`;
      let position = 0;

      if (this.screenWidth >= 360) {
        position = 'center';
      }
      if (this.screenWidth >= 991) {
        position = 'top-end';
      }

      axios
        .post(url, values)
        .then((res) => {
          const { accessToken } = res.data;

          const now = new Date().getTime();
          const expiredDate = now + 86400000; // 過期日為當下時間 +24hr
          document.cookie = `token=${accessToken};expires=${new Date(
            expiredDate
          ).toUTCString()};path=/`;

          this.loginStatus = true;
          this.getUser();
          Swal.fire({
            position,
            icon: 'success',
            title: '登入成功',
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          const { status, data } = err.response;
          if (status === 400) {
            if (data === 'Incorrect password') {
              Swal.fire({
                title: '密碼錯誤！請重新輸入密碼',
                icon: 'error',
                confirmButtonText: '確定',
              });
            } else if (data === 'Cannot find user') {
              Swal.fire({
                title: '找不到該帳號！請確認帳號無誤',
                icon: 'error',
                confirmButtonText: '確定',
              });
            }
          }
        });
    },
    getUser() {
      const token = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      if (token) {
        const decoded = jwt_decode(token); // 解碼
        const { sub } = decoded;

        const VITE_PATH = 'users';
        const url = `${this.VITE_URL}/${VITE_PATH}/${sub}`;

        axios
          .get(url, token)
          .then((res) => {
            const { data } = res;
            this.userObj = data;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.userObj = {};
      }
    },
    refreshLoggedIn() {
      const token = document.cookie.replace(
        // eslint-disable-next-line no-useless-escape
        /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      if (token) {
        this.getUser();
        this.loginStatus = true;
      }
    },
    logOut() {
      this.loginStatus = false;
      document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/';
      this.getUser();
    },
  },
});
