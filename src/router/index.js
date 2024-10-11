import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/HomePage.vue'
import Menu from '@/views/MenuPage.vue'
import Cart from '@/views/CartPage.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router