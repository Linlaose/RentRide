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
      path: '/user/:id',
      name: 'user',
      component: () => import('@/views/User/UserView.vue'),
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
    },
    {
      path: '/rentOrder/:id',
      name: 'rentBike',
      component: () => import('@/views/RentOrder/RentOrderView.vue'),
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('@/views/Shop/ShopView.vue'),
    },
    {
      path: '/shop/motorcycles/:id',
      name: 'shopBike',
      component: () => import('@/views/ShopBike/ShopBikeView.vue'),
    },
  ],
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
