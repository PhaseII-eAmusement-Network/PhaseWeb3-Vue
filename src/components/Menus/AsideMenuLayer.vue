<script setup>
import { mdiLogout, mdiClose } from "@mdi/js";
import { computed } from "vue";
import { useStyleStore } from "@/stores/style.js";
import AsideMenuList from "@/components/Menus/AsideMenuList.vue";
import AsideMenuItem from "@/components/Menus/AsideMenuItem.vue";

defineProps({
  menu: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["menu-click", "aside-lg-close-click"]);

const styleStore = useStyleStore();

const logoutItem = computed(() => ({
  label: "Log out",
  icon: mdiLogout,
  color: "info",
  isLogout: true,
}));

const closeItem = computed(() => ({
  label: "Close",
  icon: mdiClose,
  color: "danger",
}));

const menuClick = (event, item) => {
  emit("menu-click", event, item);
};

const asideLgCloseClick = (event) => {
  emit("aside-lg-close-click", event);
};
</script>

<template>
  <aside
    id="aside"
    class="w-60 xl:w-62 fixed flex z-40 top-0 h-screen transition-position duration-150 ease-in-out shadow-xl shadow-gray-900"
  >
    <div
      :class="styleStore.asideStyle"
      class="rounded-br-2xl md:rounded-none flex-1 flex flex-col pt-2 overflow-hidden dark:bg-slate-900"
    >
      <div class="dark:bg-slate-900 flex flex-col gap-4 my-2 pb-4 border-b-2">
        <div class="flex items-center gap-3 mx-2">
          <img class="rounded-full shadow-xl" src="/favicon.png" />
          <h2 class="text-md">
            <samp class="tracking-tighter">PhaseII</samp> eAmusement Network
          </h2>
        </div>
      </div>
      <div
        :class="
          styleStore.darkMode
            ? 'aside-scrollbars-[slate]'
            : styleStore.asideScrollbarsStyle
        "
        class="flex-1 overflow-y-auto overflow-x-hidden"
      >
        <AsideMenuList :menu="menu" @menu-click="menuClick" />
      </div>

      <ul class="invisible lg:visible">
        <AsideMenuItem
          class="hidden lg:block xl:hidden w-full"
          :item="closeItem"
          @menu-click="asideLgCloseClick"
        />
        <AsideMenuItem :item="logoutItem" @menu-click="menuClick" />
      </ul>
    </div>
  </aside>
</template>
