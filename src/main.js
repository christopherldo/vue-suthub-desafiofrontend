import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTheMask from 'vue-the-mask'
import money from 'v-money'
import store from './store'
import VueSwal from 'vue-swal'

Vue.config.productionTip = false
Vue.use(VueTheMask)
Vue.use(money, {precision: 4})
Vue.use(VueSwal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
