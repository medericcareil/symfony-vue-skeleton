import '@/statics/styles/app.scss';
import { createApp } from 'vue';
import router from '@/core/router/router';
import { key, store } from '@/core/store/store';
import App from '@/App.vue';

const app = createApp(App);
app.use(router);
app.use(store, key);
app.mount('#app');
