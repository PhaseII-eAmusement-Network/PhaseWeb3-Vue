<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  mdiAccountOutline,
  mdiBackburger,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import BaseButton from "@/components/BaseButton.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import { getGameInfo } from "@/constants";
import { getIIDXDan } from "@/constants/danClass.js";
import { getGitadoraColor, getJubilityColor } from "@/constants/skillColor";

const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;

const versionForm = reactive({
  currentVersion: null,
});

const profile = {
  id: 1,
  name: "Trmazi",
  extid: 12345678,
  avatar:
    "https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/",
  last: {
    arcade: "GhettoCade",
    date: "7/16/2023",
  },
  stats: {
    firstPlay: "1/14/2021",
    singlePlays: 165,
    singleDan: 1900,
    singlePoint: 1877,
    doublePlays: 15,
    doubleDan: 0,
    doublePoint: 187,
    skillPoints: 193090,
    jubility: 7600,
  },
};

const loadStats = [
  {
    id: 0,
    label: "Register Date",
    type: String,
    span: "md:col-span-2",
    key: "firstPlay",
  },
  {
    id: 1,
    label: "Single Plays",
    type: Number,
    key: "singlePlays",
  },
  {
    id: 2,
    label: "Single Dan",
    type: String,
    key: "singleDan",
    isIIDXDan: true,
  },
  {
    id: 3,
    label: "Single DJ POINT",
    type: Number,
    key: "singlePoint",
  },
  {
    id: 4,
    label: "Double Plays",
    type: Number,
    key: "doublePlays",
  },
  {
    id: 5,
    label: "Double Dan",
    type: String,
    key: "doubleDan",
    isIIDXDan: true,
  },
  {
    id: 6,
    label: "Double DJ POINT",
    type: Number,
    key: "doublePoint",
  },
  {
    id: 7,
    label: "SKILL Points",
    type: Number,
    key: "skillPoints",
    isSkill: true,
  },
  {
    id: 8,
    label: "Jubility",
    type: Number,
    key: "jubility",
    isJubility: true,
  },
];

gameID = $route.params.game;
thisGame = getGameInfo(gameID);

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

function getSources() {
  var sources = null;
  if (!versionForm.currentVersion) {
    sources = thisGame.cardBG;
  } else {
    sources = `/assets/games/${thisGame.id}/card/${versionForm.currentVersion}.png`;
  }
  return sources;
}

function getCardStyle() {
  return `
      background-image: url('${getSources()}');
      background-size: cover;
      background-repeat: no-repeat;
    `;
}

function returnNumber(stat) {
  if (stat.isSkill) {
    return profile.stats[stat.key] / 100;
  } else if (stat.isJubility) {
    return profile.stats[stat.key] / 10;
  }

  return profile.stats[stat.key];
}

function colorText(stat) {
  if (stat.isSkill) {
    return getGitadoraColor(profile.stats[stat.key]);
  } else if (stat.isJubility) {
    return getJubilityColor(profile.stats[stat.key]);
  }
  return "";
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="md:flex pb-6 md:justify-between md:items-center">
        <BaseButton
          :icon="mdiBackburger"
          :href="`/#/games/${gameID}`"
          class="w-full md:w-auto"
          color="info"
          label="Go Back"
        />
        <div
          v-if="thisGame.versions"
          class="mt-2 md:mt-0 md:w-1/3 md:text-right"
        >
          <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
            Select Version
          </h2>
          <FormControl
            v-model="versionForm.currentVersion"
            :options="thisGame.versions"
          />
        </div>
      </div>
      <SectionTitleLine :icon="mdiAccountOutline" title="View Profile" main />
      <div
        v-if="versionForm.currentVersion"
        :style="getCardStyle()"
        class="rounded-2xl mb-6"
      >
        <div class="bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3">
          <div class="w-full">
            <ProfileCard use-small :profile="profile">
              <div class="my-4 w-full flex gap-2 justify-center">
                <BaseButton
                  :href="`/#/games/${gameID}/scores/${profile.id}`"
                  :icon="mdiPlaylistMusicOutline"
                  class="w-full md:w-auto"
                  color="info"
                  label="View Scores"
                />

                <BaseButton
                  :href="`/#/games/${gameID}/records/${profile.id}`"
                  :icon="mdiFormatListText"
                  class="w-full md:w-auto"
                  color="info"
                  label="View Records"
                />
              </div>
              <div class="my-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <CardBoxWidget
                  v-for="stat in loadStats"
                  :key="stat.id"
                  :class="stat.span"
                  :label="stat.label"
                  :number="stat.type == Number ? returnNumber(stat) : None"
                  :num-color="colorText(stat)"
                >
                  {{
                    stat.type == String && !stat.isIIDXDan && !stat.isSkill
                      ? profile.stats[stat.key]
                      : None
                  }}
                  {{
                    stat.type == String && stat.isIIDXDan
                      ? getIIDXDan(profile.stats[stat.key]).label
                      : None
                  }}
                </CardBoxWidget>
              </div>
            </ProfileCard>
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
