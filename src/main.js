import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

//axios.defaults.baseURL = "http://44.203.134.65"
axios.defaults.baseURL = "http://127.0.0.1:8000/"

createApp(App).use(store).use(router, axios).mount('#app')
