import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons';
import 'vuesax/dist/vuesax.css'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'

Vue.use(Vuesax);
Vue.use(BootstrapVue);

// vue-cookie
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);

Vue.config.productionTip = false;

const datepickerOptions = {};

Vue.use(BootstrapVue);
Vue.use(AirbnbStyleDatepicker, datepickerOptions);

new Vue({
  el: '#app',
  router,
  render : h=> h(App),
});

