import { createRouter, createWebHistory } from 'vue-router'
import MenuPage from '@/pages/MenuPage.vue'

const routes = [{ path: '/', name: 'menu', component: MenuPage, meta: { title: 'Menu' } }]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) => {
  if (to.meta?.title) document.title = `Restaurant • ${to.meta.title as string}`
})
