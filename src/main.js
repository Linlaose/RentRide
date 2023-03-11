import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueKinesis from 'vue-kinesis';
import VCalendar from 'v-calendar';

import App from './App.vue';
import router from './router';

import './assets/styles.css';
import 'v-calendar/dist/style.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueKinesis);
app.use(VCalendar, {});
app.config.globalProperties.$http = axios;

app.mount('#app');
