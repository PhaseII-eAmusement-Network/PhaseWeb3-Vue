<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { dashCode } from "@/constants/userData";
import { GameConstants, getGameInfo } from "@/constants";
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
const TitlePartSettings = ref([]);
const fullyLoaded = ref(false);

async function loadAkanameSettings() {
  try {
    const response = await axios.get(
      `/data-sources/sdvx/akaname/${version.value}.json`,
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

async function loadTitlePartSettings() {
  try {
    const response = await axios.get(
      `/data-sources/jubeat-title/${version.value}.json`,
    );
    if (response.data) {
      TitlePartSettings.value = response.data;
    }
  } catch (error) {
    console.error("Error loading TitleParts settings:", error.message);
  } finally {
    fullyLoaded.value = true;
  }
}

onMounted(async () => {
  if (thisGame.id === GameConstants.SDVX) {
    await loadAkanameSettings();
  } else if (thisGame.id === GameConstants.JUBEAT) {
    await loadTitlePartSettings();
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
        v-if="
          game == GameConstants.JUBEAT && version >= 10 && profile.last?.emblem
        "
        :version="version"
        :profile="profile"
        class="place-self-center pb-6 md:pb-0"
      />
      <UserQpro
        v-if="game == GameConstants.IIDX && version >= 20 && profile.qpro"
        :version="version"
        :profile="profile"
        class="place-self-center md:mt-10 mb-10 md:mb-0"
      />
      <div class="drop-shadow-2xl">
        <p
          v-if="profile.title && game != GameConstants.JUBEAT"
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

          <p
            v-if="
              (profile.title || profile.parts) && game == GameConstants.JUBEAT
            "
            class="text-2xl tracking-widest font-light my-1"
          >
            {{
              TitlePartSettings.find((item) => item.id === profile.title)?.label
            }}
          </p>
        </template>
        <p class="text-xl font-mono">{{ dashCode(profile.extid) }}</p>
      </div>
    </div>
  </div>
  <slot />
</template>
