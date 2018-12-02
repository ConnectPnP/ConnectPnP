import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import axios from 'axios'
import VModal from 'vue-js-modal'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons';
import 'vuesax/dist/vuesax.css'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'

Vue.prototype.$http = Vue.prototype.axios = axios

Vue.use(Vuesax);
Vue.use(BootstrapVue);


Vue.config.productionTip = false;

const datepickerOptions = {};

Vue.use(BootstrapVue);
Vue.use(AirbnbStyleDatepicker, datepickerOptions);
Vue.use(VModal, {dynamic: true});

new Vue({
  el: '#app',
  router,
  render : h=> h(App),
});

