
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'


import index from '@/pages/index.vue'
import dashboard from '@/pages/dashboard.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/dashboard/:accessToken',
      name: 'dashboard',
      component: dashboard,
      props: true
    }
  ]
})

export default router
