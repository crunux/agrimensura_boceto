import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'Home',
      path: '/',
      component: () => import('@/views/HomeView.vue')
    },
    {
      name: 'Agrimensura',
      path: '/agrimensura',
      component: () => import('@/views/AgrimensuraView.vue')
    }
  ],
})

export default router
