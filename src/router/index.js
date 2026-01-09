import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },

  {
    path: '/shop',
    name: 'shop',
    component: () => import('../views/ShopView.vue')
  },

  {
    path: '/locations',
    name: 'locations',
    component: () => import('../views/LocationsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
