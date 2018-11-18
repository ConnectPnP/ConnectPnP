import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
import AirbnbStyleDatepicker from 'vue-airbnb-style-datepicker'
import 'vue-airbnb-style-datepicker/dist/vue-airbnb-style-datepicker.min.css'

Vue.config.productionTip = false

const datepickerOptions = {}

Vue.use(BootstrapVue)
Vue.use(AirbnbStyleDatepicker, datepickerOptions)

new Vue({
  render: h => h(App),
}).$mount('#app')
