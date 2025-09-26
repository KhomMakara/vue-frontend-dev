import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '../layouts/DashboardLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: DashboardLayout,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardOverview.vue'),
        },
        {
          path: '/users',
          name: 'users',
          component: () => import('../views/UsersView.vue'),
        },
        {
          path: '/user-roles',
          name: 'user-roles',
          component: () => import('../views/UserRoles.vue'),
        },
        {
          path: '/batch-list',
          name: 'batch-list',
          component: () => import('../views/BatchList.vue'),
        },
        {
          path: '/batch-executor',
          name: 'batch-executor',
          component: () => import('../views/BatchExecutor.vue'),
        },
        {
          path: '/transaction-reports',
          name: 'transaction-reports',
          component: () => import('../views/TransactionReports.vue'),
        },
        {
          path: '/user-activity',
          name: 'user-activity',
          component: () => import('../views/UserActivity.vue'),
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('../views/SettingsView.vue'),
        },
        {
          path: '/components',
          name: 'components',
          component: () => import('../views/ComponentShowcase.vue'),
        },
        {
          path: '/utilities',
          name: 'utilities',
          component: () => import('../views/UtilityTest.vue'),
        },
      ],
    },
  ],
})

export default router
