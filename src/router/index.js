import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      title: "Dashboard",
    },
    path: "/",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      title: "News",
    },
    path: "/news",
    name: "news",
    component: () => import("@/views/NewsView.vue"),
  },
  {
    meta: {
      title: "News Post",
    },
    path: "/news/:id",
    name: "news_post",
    component: () => import("@/views/PostView.vue"),
  },
  {
    meta: {
      title: "Login",
    },
    path: "/auth/login",
    name: "login",
    component: () => import("@/views/Auth/LoginView.vue"),
  },
  {
    meta: {
      title: "Register",
    },
    path: "/auth/register",
    name: "register",
    component: () => import("@/views/Auth/RegisterView.vue"),
  },
  {
    meta: {
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile/ProfileView.vue"),
  },
  {
    meta: {
      title: "Customizations",
    },
    path: "/profile/customize",
    name: "profile_customizations",
    component: () => import("@/views/Profile/CustomizeView.vue"),
  },
  {
    meta: {
      title: "Integrations",
    },
    path: "/profile/integrate",
    name: "profile_integrations",
    component: () => import("@/views/Profile/IntegrationView.vue"),
  },
  {
    meta: {
      title: "View Profile",
    },
    path: "/profiles/:id",
    name: "profile_viewer",
    component: () => import("@/views/Profile/PublicView.vue"),
  },
  {
    meta: {
      title: "Test Arcade",
    },
    path: "/arcade/:id",
    name: "arcade",
    component: () => import("@/views/ArcadeView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

export default router;
