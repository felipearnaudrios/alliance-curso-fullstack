import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/bicicletas',
    name: 'bicicleta',
    component: () => import(/* webpackChunkName: "bicicletas" */ '../views/Bicicletas.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
