
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'


import index from '@/pages/index.vue'
import adminDashboard from '@/pages/adminDashboard.vue'
import userDashboard from '@/pages/userDashboard.vue'
import Test from '@/pages/test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/adminDashboard/:accessToken',
      name: 'adminDashboard',
      component: adminDashboard,
      props: true
    },
    {
      path: '/userDashboard/:accessToken',
      name: 'userDashboard',
      component: userDashboard,
      props: true
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    }

  ]
})

export default router
