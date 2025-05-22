<script setup>
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import {
  mdiHome,
  mdiCog,
  mdiAccountDetails,
  mdiPlaylistMusicOutline,
  mdiSwordCross,
} from "@mdi/js";
import BaseButton from "@/components/BaseButton.vue";
import GameTitleLine from "@/components/GameTitleLine.vue";
import { getVideoSource, getCardStyle } from "@/constants/sources";

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
const $route = useRoute();
const userProfiles = ref(mainStore.userProfiles);
watch(
  () => mainStore.userProfiles,
  (newValue) => {
    userProfiles.value = newValue;
  }
);

const props = defineProps({
  game: {
    type: Object,
    required: true,
  },
  version: {
    type: Number,
    default: null,
  },
});

function loadRoutes() {
  const navigationData = [
    {
      label: `${
        props.game.shortName ? props.game.shortName : props.game.name
      } Home`,
      icon: mdiHome,
      path: `/#/games/${props.game.id}/`,
      route: "game_page",
      color: "success",
    },
    // {
    //   label: "Network Records",
    //   icon: mdiFormatListText,
    //   path: `/#/games/${props.game.id}/records`,
    //   route: "",
    //   color: "success",
    // },
  ];

  if (userProfiles.value.some((profile) => profile.game === props.game.id)) {
    navigationData.push({
      label: "My Profile",
      icon: mdiAccountDetails,
      path: `/#/games/${props.game.id}/profiles/${mainStore.userId}`,
      route: "game_profile",
      color: "info",
    });

    navigationData.push({
      label: "Edit Profile",
      icon: mdiCog,
      path: `/#/games/${props.game.id}/edit`,
      route: "edit_profile",
      color: "warning",
    });

    if (!props.game.noRivals) {
      navigationData.push({
        label: "Rivals",
        icon: mdiSwordCross,
        path: `/#/games/${props.game.id}/rivals`,
        route: "game_rivals",
        color: "danger",
      });
    }

    if (!props.game.noScores) {
      navigationData.push({
        label: "My Scores",
        icon: mdiPlaylistMusicOutline,
        path: `/#/games/${props.game.id}/scores/${mainStore.userId}`,
        color: "info",
      });
    }

    // navigationData.push({
    //   label: "My Records",
    //   icon: mdiFormatListText,
    //   path: `/#/games/${props.game.id}/`,
    //   route: "game_page",
    //   color: "success",
    // });
  }

  if (!props.game.noScores) {
    navigationData.push({
      label: "Network Scores",
      icon: mdiPlaylistMusicOutline,
      path: `/#/games/${props.game.id}/scores`,
      route: "all_scores",
      color: "info",
    });
  }

  return navigationData;
}
</script>

<template>
  <div
    v-if="game"
    :style="getCardStyle(game, version)"
    class="rounded-2xl mb-6 card-container"
  >
    <video
      autoplay
      muted
      loop
      playsinline
      :src="getVideoSource(game, version)"
      class="background-video"
    ></video>
    <div class="bg-white dark:bg-slate-900/90 rounded-2xl card-content">
      <GameTitleLine :path="game.icon" :title="game.name">
        <div class="w-full">
          <div class="w-full">
            <slot />
          </div>
          <div
            class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:flex gap-3"
          >
            <template v-for="item of loadRoutes()" :key="item.path">
              <BaseButton
                v-if="item.route != $route.name"
                :href="item.path"
                :icon="item.icon"
                :label="item.label"
                :color="item.color"
              />
            </template>
          </div>
        </div>
      </GameTitleLine>
    </div>
  </div>
</template>
