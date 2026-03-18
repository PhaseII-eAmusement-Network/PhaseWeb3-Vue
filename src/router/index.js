import { createRouter, createWebHistory } from "vue-router";
import { useMainStore } from "@/stores/main";
import Home from "@/views/HomeView.vue";

const routes = [
  {
    meta: {
      requiresAuth: true,
      title: "Dashboard",
    },
    path: "/",
    name: "dashboard",
    component: Home,
  },
  {
    meta: {
      requiresAuth: true,
      title: "News Archive",
    },
    path: "/news",
    name: "news_board",
    component: () => import("@/views/NewsView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "News Post",
    },
    path: "/news/:id",
    name: "news_post",
    component: () => import("@/views/PostView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "WebUI Changelog",
    },
    path: "/changelog",
    name: "changelog",
    component: () => import("@/views/ChangelogView.vue"),
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
      requiresAuth: true,
      title: "Authorize an App",
    },
    path: "/profile/authorize",
    name: "authorize_service",
    component: () => import("@/views/Auth/AuthorizeView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Profile",
    },
    path: "/profile",
    name: "profile",
    component: () => import("@/views/Profile/ProfileView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Customizations",
    },
    path: "/profile/customize",
    name: "profile_customizations",
    component: () => import("@/views/Profile/CustomizeView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Integrations",
    },
    path: "/profile/integrate",
    name: "profile_integrations",
    component: () => import("@/views/Profile/IntegrationView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Integration Callback",
    },
    path: "/profile/integrate/:service",
    name: "profile_integration_callback",
    component: () => import("@/views/Profile/IntegrationView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Login Cards",
    },
    path: "/profile/cards",
    name: "profile_cards",
    component: () => import("@/views/Profile/CardsView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Claim a Profile",
    },
    path: "/profile/claim",
    name: "profile_claim",
    component: () => import("@/views/Profile/ClaimView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Data Export",
    },
    path: "/profile/export",
    name: "data_export",
    component: () => import("@/views/Profile/ExportView.vue"),
  },
  // {
  //   meta: {
  //     title: "Goals",
  //   },
  //   path: "/goals",
  //   name: "profile_goals",
  //   component: () => import("@/views/Profile/GoalsView.vue"),
  // },
  {
    meta: {
      requiresAuth: true,
      title: "Play Videos",
    },
    path: "/profile/videos",
    name: "profile_videos",
    component: () => import("@/views/Profile/VideoView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Game Images",
    },
    path: "/profile/content",
    name: "profile_content",
    component: () => import("@/views/Profile/ContentView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "View User",
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
      requiresAuth: true,
      requiresAdmin: true,
      title: "Admin Dashboard",
    },
    path: "/admin",
    name: "admin_dashboard",
    component: () => import("@/views/Admin/DashboardView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Onboarding",
    },
    path: "/admin/onboarding",
    name: "onboarding",
    component: () => import("@/views/Admin/OnboardingView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Auto-Onboarding",
    },
    path: "/admin/onboarding/:data",
    name: "auto-onboarding",
    component: () => import("@/views/Admin/OnboardingView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Network Maintenance",
    },
    path: "/admin/maint",
    name: "admin_maint",
    component: () => import("@/views/Admin/MaintView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Events",
    },
    path: "/admin/events",
    name: "admin_events",
    component: () => import("@/views/Admin/EventsView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Data API",
    },
    path: "/admin/api",
    name: "data_api",
    component: () => import("@/views/Admin/APIView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Arcades",
    },
    path: "/admin/arcades",
    name: "admin_arcades",
    component: () => import("@/views/Admin/ArcadesView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "Users",
    },
    path: "/admin/users",
    name: "admin_users",
    component: () => import("@/views/Admin/UsersView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "News",
    },
    path: "/admin/news",
    name: "admin_news",
    component: () => import("@/views/Admin/NewsView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      title: "OTA Updates",
    },
    path: "/admin/ota",
    name: "admin_ota",
    component: () => import("@/views/Admin/OTAView.vue"),
  },
  // {
  //   meta: {
  //     title: "Public Arcades",
  //   },
  //   path: "/arcades",
  //   name: "arcade_list",
  //   component: () => import("@/views/ArcadesView.vue"),
  // },
  {
    meta: {
      requiresAuth: true,
      title: "Arcade Overview",
    },
    path: "/arcade/:id",
    name: "arcade",
    component: () => import("@/views/Arcade/ArcadeView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
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
      requiresAuth: true,
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
      requiresAuth: true,
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
      requiresAuth: true,
      title: "Claim an Arcade",
    },
    path: "/arcade/claim",
    name: "arcade_claim",
    component: () => import("@/views/Arcade/ClaimView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "Game Overview",
    },
    path: "/games/:id/",
    name: "game_page",
    component: () => import("@/views/Game/GameView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "View Profile",
    },
    path: "/games/:game/profiles/:userId/",
    name: "game_profile",
    component: () => import("@/views/Game/PlayerView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "Edit Profile",
    },
    path: "/games/:game/edit",
    name: "edit_profile",
    component: () => import("@/views/Game/EditView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "Rivals",
    },
    path: "/games/:game/rivals",
    name: "game_rivals",
    component: () => import("@/views/Game/RivalsView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "Song Overview",
    },
    path: "/games/:game/song/:songId",
    name: "song_overview",
    component: () => import("@/views/Game/SongView.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "View Scores",
    },
    path: "/games/:game/scores/:userId",
    name: "personal_scores",
    component: () => import("@/views/Game/PersonalScores.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "Network Scores",
    },
    path: "/games/:game/scores",
    name: "all_scores",
    component: () => import("@/views/Game/NetworkScores.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "Error",
    },
    path: "/:catchAll(.*)",
    name: "ErrorPage",
    component: () => import("@/views/ErrorView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      title: "View Records",
    },
    path: "/games/:game/records/:userId",
    name: "personal_records",
    component: () => import("@/views/Game/PersonalRecords.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      title: "Network Records",
    },
    path: "/games/:game/records",
    name: "all_records",
    component: () => import("@/views/Game/NetworkRecords.vue"),
    options: {
      hotReload: true, // disables Hot Reload
    },
  },
  {
    meta: {
      requiresAuth: true,
      requiresDev: true,
      title: "Developer Portal",
    },
    path: "/developer",
    name: "Developer Portal",
    component: () => import("@/views/Developer/PortalView.vue"),
  },
  {
    meta: {
      requiresAuth: true,
      requiresDev: true,
      title: "App Registration",
    },
    path: "/developer/register",
    name: "App Registration",
    component: () => import("@/views/Developer/RegisterView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 };
  },
});

router.beforeEach(async (to) => {
  const mainStore = useMainStore();
  mainStore.errorCode = null;

  if (to.meta.requiresAuth) {
    const validSession = await mainStore.loadUser();

    if (!validSession) {
      mainStore.deleteUserSession();

      return {
        name: "login",
        query: { redirect: to.fullPath },
      };
    }
  }

  if (to.meta.requiresAdmin) {
    const validSession = await mainStore.loadUser();

    if (!validSession || !mainStore.userAdmin) {
      console.log("You're not an admin!");
      window.alert("You're not an admin!");
      return {
        name: "dashboard",
      };
    }
  }

  if (to.meta.requiresDev) {
    const validSession = await mainStore.loadUser();

    if (!validSession || !mainStore.userAdmin) {
      console.log("You're not a dev!");
      window.alert("You're not a dev!");
      return {
        name: "dashboard",
      };
    }
  }

  return true;
});

export default router;
