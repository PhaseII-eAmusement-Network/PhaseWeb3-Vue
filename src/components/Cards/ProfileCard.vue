<script setup>
import {
  mdiCog,
  mdiAccountDetails,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
} from "@mdi/js";
import { dashCode } from "@/constants/userData";
import { getGameInfo } from "@/constants";
import BaseButton from "@/components/BaseButton.vue";
import { getGitadoraColor, getJubilityColor } from "@/constants/skillColor.js";

const props = defineProps({
  game: {
    type: String,
    default: null,
  },
  profile: {
    type: Object,
    required: true,
  },
  useSmall: {
    type: Boolean,
    default: false,
  },
});

function colorText() {
  if (props.profile.stats) {
    const stats = props.profile.stats;
    if (stats.jubility) {
      return getJubilityColor(stats.jubility);
    } else if (stats.skillPoints) {
      return getGitadoraColor(stats.skillPoints);
    }
  }
}

const thisGame = getGameInfo(props.game);
</script>

<template>
  <div class="flex content-center justify-center items-center">
    <img v-if="profile.avatar" class="h-40" :src="profile.avatar" />
    <div class="space-y-2 text-center md:text-left lg:mx-12 p-2">
      <h1 :class="colorText()" class="text-3xl md:text-4xl font-bold">
        {{ profile.name }}
      </h1>
      <p class="text-xl font-mono">{{ dashCode(profile.extid) }}</p>
      <p class="text-md md:text-lg">
        Last played at <b>{{ profile.last.arcade }}</b> on
        <b>{{ profile.last.date }}</b>
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <BaseButton
          v-if="!useSmall && game"
          :icon="mdiAccountDetails"
          :href="`/#/games/${game}/profiles/${profile.id}`"
          color="info"
          label="View Profile"
        />
        <BaseButton
          v-if="!useSmall && game"
          :icon="mdiCog"
          :href="`/#/games/${game}/profiles/${profile.id}/edit`"
          color="info"
          label="Edit Profile"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noScores"
          :href="`/#/games/${game}/scores/${profile.id}`"
          :icon="mdiPlaylistMusicOutline"
          color="info"
          label="My Scores"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noRecords"
          :href="`/#/games/${game}/records/${profile.id}`"
          :icon="mdiFormatListText"
          color="info"
          label="My Records"
        />
      </div>
    </div>
  </div>
  <slot />
</template>
