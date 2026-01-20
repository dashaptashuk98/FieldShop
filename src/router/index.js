import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      bodyColor: 'rgba(240, 254, 226, 1)'
    }
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
router.beforeEach((to, from, next) => {
  const bodyColor = to.meta.bodyColor || '#ffffff'
  document.body.style.backgroundColor = bodyColor
  next()
})
export default router
