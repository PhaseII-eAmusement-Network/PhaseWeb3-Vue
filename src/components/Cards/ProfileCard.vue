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
  if (props.profile.jubility) {
    return getJubilityColor(props.profile.jubility);
  } else if (props.profile.records) {
    return getGitadoraColor(props.profile.records.skill);
  }
}

const thisGame = getGameInfo(props.game);
</script>

<template>
  <div class="md:flex content-center justify-center items-center">
    <!-- <img v-if="profile.avatar" class="h-40" :src="profile.avatar" /> -->
    <div class="grid grid-cols-1 text-center">
      <h1 :class="colorText()" class="text-4xl md:text-5xl font-bold">
        {{ profile.username }}
      </h1>
      <p class="text-xl font-mono">{{ dashCode(profile.extid) }}</p>
    </div>
    <div class="space-y-2 text-center md:text-left lg:mx-12 p-2">
      <!-- <p class="text-md md:text-lg">
        Last played at <b>{{ profile.last.arcade }}</b> on
        <b>{{ profile.last.date }}</b>
      </p> -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <BaseButton
          v-if="!useSmall && game"
          :icon="mdiAccountDetails"
          :href="`/#/games/${game}/profiles/${profile.id}`"
          :outline="false"
          color="info"
          label="View Profile"
        />
        <BaseButton
          v-if="!useSmall && game"
          :icon="mdiCog"
          :href="`/#/games/${game}/profiles/${profile.id}/edit`"
          :outline="false"
          color="info"
          label="Edit Profile"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noScores"
          :href="`/#/games/${game}/scores/${profile.id}`"
          :icon="mdiPlaylistMusicOutline"
          :outline="false"
          color="info"
          label="My Scores"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noRecords"
          :href="`/#/games/${game}/records/${profile.id}`"
          :icon="mdiFormatListText"
          :outline="false"
          color="info"
          label="My Records"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noScores"
          :href="`/#/games/${game}/scores`"
          :icon="mdiPlaylistMusicOutline"
          :outline="false"
          color="info"
          label="Network Scores"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noRecords"
          :href="`/#/games/${game}/records`"
          :icon="mdiFormatListText"
          :outline="false"
          color="info"
          label="Network Records"
        />
      </div>
    </div>
  </div>
  <slot />
</template>
