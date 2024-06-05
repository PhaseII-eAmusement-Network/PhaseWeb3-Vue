<script setup>
import { mdiForwardburger, mdiBackburger, mdiMenu } from "@mdi/js";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import menuAside from "@/menuAside.js";
import menuNavBar from "@/menuNavBar.js";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import LoadingModal from "@/components/LoadingModal.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import NavBar from "@/components/NavBar.vue";
import NavBarItemPlain from "@/components/NavBarItemPlain.vue";
import AsideMenu from "@/components/Menus/AsideMenu.vue";
import FooterBar from "@/components/FooterBar.vue";

useMainStore().setUser({
  name: "Trmazi",
  email: "sex@sex.com",
  avatar:
    "https://cdn.discordapp.com/avatars/372530806628941824/a2d1b66d0e2100a571305b8281c26f8b",
});

const layoutAsidePadding = "xl:pl-60";

const styleStore = useStyleStore();

const router = useRouter();
const route = useRoute();

const isAsideMobileExpanded = ref(false);
const isAsideLgActive = ref(false);

router.beforeEach(() => {
  isAsideMobileExpanded.value = false;
  isAsideLgActive.value = false;
});

const menuClick = (event, item) => {
  if (item.isLogout) {
    //
  }
};

const active = false;
const isSave = true;
</script>

<template>
  <div
    :key="route.fullPath"
    :class="{
      dark: styleStore.darkMode,
      'overflow-hidden lg:overflow-visible': isAsideMobileExpanded,
    }"
  >
    <LoadingModal
      :active="active"
      :is-save="isSave"
      class="transition-opacity duration-300 ease-out"
      :class="{ 'opacity-100': active, 'opacity-0': !active }"
    />
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen lg:w-auto bg-gradient-to-b from-slate-900 from-5% via-slate-800 via-10% to-slate-800 to-85% dark:text-slate-100"
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
</style>
