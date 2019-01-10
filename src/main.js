import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import zh_TW from './validate/zh_TW'
import VeeValidate, { Validator } from 'vee-validate'
import snowCalendar from 'snow-calendar'
import okaTool from './okaTool'
import './registerServiceWorker'

Vue.config.productionTip = false

Vue.use(okaTool)
Vue.use(VueAxios, axios)
Vue.use(VueCookie)
Vue.use(snowCalendar)
Vue.use(VeeValidate, {
    events: 'blur|change'
});

Validator.localize('zh_TW', zh_TW);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

import './sass/global.scss'
