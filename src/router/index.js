import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About/AboutView.vue"),
    },
  ],
});

export default router;
