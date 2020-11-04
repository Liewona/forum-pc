import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from 'element-ui'
import axios from "axios"
import $ from "jquery"
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

Vue.use(ElementUI);

axios.defaults.withCredentials = true;
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.prototype.$ = $;
Vue.prototype.$store = store;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
