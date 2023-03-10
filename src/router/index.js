import { createRouter, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home/HomeView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('@/views/News/NewsView.vue'),
    },
    {
      path: '/news/:id',
      name: 'articleNews',
      component: () => import('@/views/ArticleNews/ArticleNewsView.vue'),
    },
    {
      path: '/rent',
      name: 'rent',
      component: () => import('@/views/Rent/RentView.vue'),
      children: [
        {
          path: 'rent/:id',
          name: 'rentBike',
          component: () => import('@/views/RentBike/RentBikeView.vue'),
        },
      ],
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/views/Shop/ShopView.vue'),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
