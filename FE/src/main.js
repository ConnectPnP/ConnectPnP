import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import axios from 'axios'
import VModal from 'vue-js-modal'
import VueAxios from 'vue-axios'
import VueSession from 'vue-session'
import VueCookies from 'vue-cookies'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-awesome/icons';
import 'vuesax/dist/vuesax.css'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'
import VueSocketIO from 'vue-socket.io';


const VueResource = require('vue-resource')
Vue.use(Vuesax);
Vue.use(BootstrapVue);
// vue-cookie
var VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

Vue.use(VueSession);
const datepickerOptions = {};

Vue.use(BootstrapVue);
Vue.use(AirbnbStyleDatepicker, datepickerOptions);
Vue.use(VModal, {dynamic: true});

Vue.use(VueCookies);

Vue.use(new VueSocketIO({
    debug: true,
    connection:'http://localhost:3000'
}))

new Vue({
    el: '#app',
    router,
    render: h => h(App),
});

