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
    path: '/ativos',
    name: 'ativo',
    component: () => import(/* webpackChunkName: "ativos" */ '../views/ativos.vue')
  },
  {
    path: '/carteira',
    name: 'carteira',
    component: () => import(/* webpackChunkName: "carteira" */ '../views/carteira.vue')
  },
  {
    path: '/performance',
    name: 'performance',
    component: () => import(/* webpackChunkName: "performance" */ '../views/performance.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
