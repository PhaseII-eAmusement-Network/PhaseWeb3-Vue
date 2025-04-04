<script setup>
import axios from "axios";
import {
  mdiCog,
  mdiAccountDetails,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
  mdiAxeBattle,
} from "@mdi/js";
import { ref, onMounted } from "vue";
import { dashCode } from "@/constants/userData";
import { GameConstants, getGameInfo, getRivalInfo } from "@/constants";
import BaseButton from "@/components/BaseButton.vue";
import UserEmblem from "@/components/UserEmblem.vue";
import UserQpro from "@/components/UserQpro.vue";
import { getGitadoraColor, getJubilityColor } from "@/constants/skillColor.js";

const props = defineProps({
  game: {
    type: String,
    default: null,
  },
  version: {
    type: Number,
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
const version = ref(props.version);
const AkanameSettings = ref([]);
const fullyLoaded = ref(false);

async function loadAkanameSettings() {
  try {
    const response = await axios.get(
      `/data-sources/sdvx/akaname/${version.value}.json`
    );
    if (response.data) {
      AkanameSettings.value = response.data;
    }
  } catch (error) {
    console.error("Error loading Akaname settings:", error.message);
  } finally {
    fullyLoaded.value = true;
  }
}

onMounted(async () => {
  if (thisGame.id === GameConstants.SDVX) {
    await loadAkanameSettings();
  } else {
    fullyLoaded.value = true;
  }
});
</script>

<template>
  <div class="content-center justify-center items-center">
    <div
      class="md:flex md:space-x-12 md:justify-center md:items-center grid grid-cols-1 text-center"
    >
      <UserEmblem
        v-if="game == 'jubeat' && version >= 10 && profile.last?.emblem"
        :version="version"
        :profile="profile"
        class="place-self-center pb-6 md:pb-0"
      />
      <UserQpro
        v-if="game == 'iidx' && version >= 20 && profile.qpro"
        :version="version"
        :profile="profile"
        class="place-self-center md:mt-10 mb-10 md:mb-0"
      />
      <div class="drop-shadow-2xl">
        <p
          v-if="profile.title"
          :class="colorText()"
          class="text-2xl tracking-widest font-light -mb-1"
        >
          {{ profile.title }}
        </p>
        <h1 :class="colorText()" class="text-4xl md:text-5xl font-bold">
          {{ profile.username }}
        </h1>
        <template v-if="fullyLoaded">
          <p
            v-if="profile.akaname"
            class="text-2xl tracking-widest font-light my-1"
          >
            {{
              AkanameSettings.find((item) => item.id === profile.akaname)?.label
            }}
          </p>
        </template>
        <p class="text-xl font-mono">{{ dashCode(profile.extid) }}</p>
      </div>
    </div>
    <div class="space-y-2 text-center md:text-left lg:mx-12 p-2">
      <div
        class="pt-6 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-3"
      >
        <BaseButton
          v-if="!useSmall && game"
          :icon="mdiAccountDetails"
          :href="`/#/games/${game}/profiles/${profile.userId}`"
          :outline="false"
          color="info"
          label="View Profile"
        />
        <BaseButton
          v-if="!useSmall && game"
          :icon="mdiCog"
          :href="`/#/games/${game}/edit`"
          :outline="false"
          color="info"
          label="Edit Profile"
        />
        <BaseButton
          v-if="!useSmall && game && getRivalInfo(game, version)"
          :icon="mdiAxeBattle"
          :href="`/#/games/${game}/rivals`"
          :outline="false"
          color="info"
          label="Rivals"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noScores"
          :href="`/#/games/${game}/scores/${profile.userId}`"
          :icon="mdiPlaylistMusicOutline"
          :outline="false"
          color="info"
          label="My Scores"
        />
        <BaseButton
          v-if="!useSmall && !thisGame.noRecords"
          :href="`/#/games/${game}/records/${profile.userId}`"
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
