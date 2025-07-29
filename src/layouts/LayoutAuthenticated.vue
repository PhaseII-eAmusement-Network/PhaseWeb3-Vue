<script setup>
import {
  mdiForwardburger,
  mdiBackburger,
  mdiMenu,
  mdiMonitor,
  mdiStoreCog,
  mdiStorePlus,
  mdiGamepad,
  mdiSecurity,
  mdiMultimedia,
} from "@mdi/js";
import { ref, watch, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import menuNavBar from "@/menuNavBar.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import LoadingModal from "@/components/Modal/LoadingModal.vue";
// import EmailModal from "@/components/Modal/EmailModal.vue";
import UpdateModal from "@/components/Modal/UpdateModal.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/Menus/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";
import { loadUserAuthKey, deleteUserAuthKey } from "@/stores/auth";
import { gameData } from "@/constants";

const router = useRouter();
const route = useRoute();
const userKey = loadUserAuthKey();

if (!userKey) {
  router.push({
    name: "login",
  });
}

const mainStore = useMainStore();
onMounted(async () => {
  try {
    const validSession = await mainStore.loadUser();
    if (!validSession) {
      mainStore.deleteUserSession();
      deleteUserAuthKey();
      router.push({
        name: "login",
      });
    }
  } catch (error) {
    console.error("Failed to check SessionID:", error);
    mainStore.deleteUserSession();
    deleteUserAuthKey();
    router.push({
      name: "login",
    });
  }
});

const loading = ref(mainStore.loadingPool.length !== 0);
const saving = ref(mainStore.savingPool.length !== 0);
const errorCode = ref(mainStore.errorCode);
const userLoaded = ref(mainStore.userLoaded);
const userArcades = ref(mainStore.userArcades);

watch(
  () => mainStore.loadingPool.length !== 0,
  (newValue) => {
    loading.value = newValue;
  },
);

watch(
  () => mainStore.savingPool.length !== 0,
  (newValue) => {
    saving.value = newValue;
  },
);

watch(
  () => mainStore.errorCode,
  (newValue) => {
    errorCode.value = newValue;
  },
);

watch(
  () => mainStore.userLoaded,
  (newValue) => {
    userLoaded.value = newValue;
  },
);

watch(
  () => mainStore.userArcades,
  (newValue) => {
    userArcades.value = newValue;
  },
);

const layoutAsidePadding = "xl:pl-60";

const styleStore = useStyleStore();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isLogout) {
    mainStore.deleteUserSession();
    deleteUserAuthKey();
    router.push({
      name: "login",
    });
  }
};

const menuAside = computed(() => {
  const sortedGames = gameData
    .filter((game) => !game.skip)
    .map((game) => ({
      label: game.shortName || game.name,
      to: `/games/${game.id}`,
    }));

  const sortedArcades = mainStore.userArcades.map((arcade) => ({
    label: arcade.name,
    to: `/arcade/${arcade.id}`,
  }));

  const adminMenu = [
    {
      label: "Dashboard",
      to: "/admin",
    },
    {
      label: "Onboarding",
      to: "/admin/onboarding",
    },
    {
      label: "Network Maintenance",
      to: "/admin/maint",
    },
    {
      label: "Events",
      to: "/admin/events",
    },
    {
      label: "API",
      to: "/admin/api",
    },
    {
      label: "Arcades",
      to: "/admin/arcades",
    },
    {
      label: "Users",
      to: "/admin/users",
    },
    {
      label: "News",
      to: "/admin/news",
    },
    {
      label: "OTA Updates",
      to: "/admin/ota",
    },
  ];

  var sideMenu = [{ to: "/", icon: mdiMonitor, label: "Dashboard" }];

  if (mainStore.userAdmin) {
    sideMenu.push({
      label: "Admin",
      icon: mdiSecurity,
      menu: adminMenu,
    });
  }

  if (sortedGames.length) {
    sideMenu.push({
      label: "Games",
      icon: mdiGamepad,
      menu: sortedGames,
    });
  }

  sideMenu.push({
    label: "My Content",
    icon: mdiMultimedia,
    menu: [
      {
        label: "Play Videos",
        to: `/profile/videos`,
      },
      {
        label: "Game Images",
        to: `/profile/content`,
      },
    ],
  });

  if (sortedArcades.length) {
    sideMenu.push({
      label: "My Arcades",
      icon: mdiStoreCog,
      menu: sortedArcades,
    });
  }

  sideMenu.push({
    label: "Claim Arcade",
    icon: mdiStorePlus,
    to: `/arcade/claim`,
  });

  return sideMenu;
});
</script>

<template>
  <div
    :key="route.fullPath"
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <template v-if="userLoaded">
      <UpdateModal class="transition-opacity duration-300 ease-out" />
      <!-- <EmailModal class="transition-opacity duration-300 ease-out" /> -->
    </template>
    <LoadingModal
      :active="loading || saving"
      :is-save="saving"
      :error-code="errorCode"
      class="transition-opacity duration-300 ease-out"
      :class="{
        'opacity-100': loading || saving,
        'opacity-0': !loading && !saving,
      }"
    />
    <div
      v-if="userLoaded"
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen lg:w-auto bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[
          layoutAsidePadding,
          { 'ml-60 lg:ml-0': isAsideMobileExpanded },
          'opacity-95',
        ]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="isAsideMobileExpanded = !isAsideMobileExpanded"
        >
          <BaseIcon
            :path="isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="isAsideLgActive = true"
        >
          <BaseIcon :path="mdiMenu" size="24" />
        </NavBarItemPlain>
        <NavBarItemPlain use-margin> </NavBarItemPlain>
      </NavBar>
      <AsideMenu
        :is-aside-mobile-expanded="isAsideMobileExpanded"
        :is-aside-lg-active="isAsideLgActive"
        :menu="menuAside"
        @menu-click="menuClick"
        @aside-lg-close-click="isAsideLgActive = false"
      />
      <div class="animated animatedFadeInUp fadeInUp">
        <slot />
        <FooterBar />
      </div>
    </div>
  </div>
</template>

<style>
/* Animation */

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 10px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes fadeInUp {
  from {
    transform: translate3d(0, 10px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

.animated {
  animation-duration: 0.7s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.7s;
  -webkit-animation-fill-mode: both;
}

.animatedFadeInUp {
  opacity: 0;
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}

.arrow {
  color: white;
}

.next-page__click-button {
  color: white;
}
</style>
