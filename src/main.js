import { createApp } from 'vue';
import { createPinia } from 'pinia';
import axios from 'axios';
import VueKinesis from 'vue-kinesis';

import App from './App.vue';
import router from './router';

import './assets/styles.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueKinesis);
app.config.globalProperties.$http = axios;

app.mount('#app');
