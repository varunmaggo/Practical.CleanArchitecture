import Vue from 'vue'
import axios from 'axios'
import Vuelidate from 'vuelidate'
import { BootstrapVue } from 'bootstrap-vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import AuthService from "./auth/authService";
import env from "../environments"

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false;

Vue.filter("appendVersion", function (value) {
  return value + " " + Vue.version;
});
Vue.filter("appendCurrentDateTime", function (value) {
  return value + " " + new Date();
});
Vue.filter("uppercase", function (value) {
  return value?.toUpperCase();
});

Vue.use(Vuelidate)
Vue.use(BootstrapVue)

const authService = new AuthService();

axios.interceptors.request.use(config => {
  if (config.url.startsWith(env.ResourceServer.Endpoint)) {
    config.headers["Authorization"] = "Bearer " + authService.getAccessToken();
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (401 === error.response.status) {
      authService.login(window.location.href);
    } else {
      return Promise.reject(error);
    }
  }
);

authService.loadUser().then(user => {
  store.dispatch("tryAutoLogin", authService);
  if (authService.isAuthenticated()) {

  }
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});
