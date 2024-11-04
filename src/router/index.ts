import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HeuristicSearch from '../views/puzzle/PuzzleHeuristicView.vue'
import HorizontalSearch from '../views/puzzle/PuzzleHorizontalView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/heuristic',
      name: 'heuristic',
      component: HeuristicSearch,
    },
    {
      path: '/horizontal',
      name: 'horizontal',
      component: HorizontalSearch,
    },
  ],
})

export default router
