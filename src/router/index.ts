import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import HorizontalSearch from '../views/puzzle/PuzzleHorizontalView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/horizontal',
      name: 'horizontal',
      component: HorizontalSearch,
    },
  ],
});

export default router;
