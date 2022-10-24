import { createApp } from 'vue'
import App from './App.vue'
import VueSession from "vue-session"
import router from './router'
import store from './store'
import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:8000/"

//Vue.use(VueSession);
//Vue.config.productionTip = false;
createApp(App).use(store, VueSession).use(router, axios).mount('#app')
