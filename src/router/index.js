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
      title: "Reset Password",
    },
    path: "/auth/reset",
    name: "reset_pass",
    component: () => import("@/views/Auth/ResetView.vue"),
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
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      title: "Public Arcades",
    },
    path: "/arcades",
    name: "arcade_list",
    component: () => import("@/views/ArcadesView.vue"),
  },
  {
    meta: {
      title: "Arcade Overview",
    },
    path: "/arcade/:id",
    name: "arcade",
    component: () => import("@/views/Arcade/ArcadeView.vue"),
  },
  {
    meta: {
      title: "Event Settings",
    },
    path: "/arcade/:id/events",
    name: "arcade_events",
    component: () => import("@/views/Arcade/EventView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      title: "Machine List",
    },
    path: "/arcade/:id/machines",
    name: "arcade_machines",
    component: () => import("@/views/Arcade/MachinesView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      title: "PASELI Transactions",
    },
    path: "/arcade/:id/paseli",
    name: "arcade_paseli",
    component: () => import("@/views/Arcade/PaseliView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      title: "Error",
    },
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: () => import("@/views/ErrorView.vue"),
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
