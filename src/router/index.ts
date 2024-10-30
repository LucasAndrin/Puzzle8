import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HeuristicSearch from '@/views/Search/HeuristicView.vue'
import HorizontalSearch from '@/views/Search/HorizontalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/heuristic',
      name: 'heuristic',
      component: HeuristicSearch
    },
    {
      path: '/horizontal',
      name: 'horizontal',
      component: HorizontalSearch
    }
  ]
})

export default router
