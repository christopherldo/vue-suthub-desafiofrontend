import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import About from '../views/About.vue'
import Countries from '../views/Countries.vue'
import TradeBlocs from '../views/TradeBlocs.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/countries',
    name: 'Countries',
    component: Countries
  },
  {
    path: '/trade-blocs',
    name: 'TradeBlocs',
    component: TradeBlocs,
  }
]

const router = new VueRouter({
  routes
})

export default router
