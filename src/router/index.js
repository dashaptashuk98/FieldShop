import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

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
    component: () => import('../views/ShopView.vue'),
    meta: {
      requiresAuth: true,
      bodyColor: '#ffffff'
    }
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
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters['auth/isAuthenticated']) {
      next({ name: 'home' })
      return
    }
  }
  const bodyColor = to.meta.bodyColor || '#ffffff'
  document.body.style.backgroundColor = bodyColor

  next()
})

export default router
