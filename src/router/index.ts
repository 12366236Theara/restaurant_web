// src/router/index.ts
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/:customerId([A-Za-z]{2}\\d{3})', // e.g., AA001
    name: 'menu',
    component: () => import('@/pages/MenuPage.vue'), // lazy-load
    props: true,
    meta: { title: 'Menu' },
  },

  // Optional 404:
  // { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/pages/NotFound.vue') },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  const base = 'Restaurant'
  // const section = (to.meta?.title as string | undefined) ?? ''
  // const id = (to.params?.customerId as string | undefined) ?? ''
  // document.title = [[base, id].filter(Boolean).join(' '), section].filter(Boolean).join(' • ')
  document.title = base
})
