<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  mdiAccountMultiple,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
} from "@mdi/js";
import { useMainStore } from "@/stores/main";
import { onMounted } from "vue";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GameTitleLine from "@/components/GameTitleLine.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import FormControl from "@/components/FormControl.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import { getGameInfo } from "@/constants";
import { dashCode } from "@/constants/userData";
import { getIIDXDan } from "@/constants/danClass";

const $route = useRoute();
const $router = useRouter();
const mainStore = useMainStore();
var gameID = null;
var thisGame = null;

const versionForm = reactive({
  currentVersion: null,
});

var profile = {
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
    skillPoints: 3723,
    jubility: 7690,
  },
};

gameID = $route.params.id;
thisGame = getGameInfo(gameID);

if (thisGame == null) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

const headers = [];
headers.push({
  text: "Player",
  value: "username",
  sortable: true,
  width: 120,
});

if (!thisGame.noRivals) {
  headers.push({ text: "Rival ID", value: "extid", width: 100 });
}

headers.push(
  { text: "Plays", value: "plays", sortable: true, width: 50 },
  { text: "Last Arcade", value: "last.arcade", sortable: true, width: 150 }
);

if (thisGame.playerHeaders) {
  for (var header of thisGame.playerHeaders) {
    headers.push(header);
  }
}

const items = [
  {
    username: "Trmazi",
    extid: 12345678,
    plays: 30,
    last: { arcade: "Ghettocade" },
    sp: { dan: 100, point: 2001 },
    dp: { dan: 200, point: 3000 },
  },
  {
    username: "Trmazi",
    extid: 12345678,
    plays: 31,
    last: { arcade: "Ghettocade" },
    sp: { dan: 1900, point: 2000 },
    dp: { dan: 1200, point: 3000 },
  },
  {
    username: "Trmazi",
    extid: 12345678,
    plays: 32,
    last: { arcade: "Ghettocade" },
    sp: { dan: 800, point: 2000 },
    dp: { dan: 900, point: 3000 },
  },
];

var formattedItems = [];
for (var item of items) {
  if (item.extid) {
    item.extid = dashCode(item.extid);
  }

  if (item.sp) {
    if (item.sp.dan !== undefined) {
      item.sp.dan = getIIDXDan(item.sp.dan).short;
    }
  }

  if (item.dp) {
    if (item.dp.dan !== undefined) {
      item.dp.dan = getIIDXDan(item.dp.dan).short;
    }
  }

  formattedItems.push(item);
}

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

var userVersions = {};
onMounted(() => {
  userVersions = mainStore.profiles[gameID];
  console.log(userVersions);
  if (userVersions != undefined) {
    versionForm.currentVersion = Math.max(...userVersions);
  }
});

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
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div :style="getCardStyle()" class="rounded-2xl mb-6">
        <div class="bg-white dark:bg-slate-900/90 rounded-2xl p-3">
          <div class="w-full">
            <div
              class="md:flex md:px-5 md:space-x-10 md:justify-between md:items-center"
            >
              <GameTitleLine :path="thisGame.icon" :title="thisGame.name" />
              <div
                v-if="
                  thisGame.versions &&
                  userVersions &&
                  gameID in mainStore.profiles
                "
                class="md:w-1/3 md:text-right"
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
          </div>
          <div v-if="gameID in mainStore.profiles" class="w-full pt-6">
            <ProfileCard :game="gameID" :profile="profile">
              <div class="grid grid-cols-2 gap-6 pt-6">
                <CardBoxWidget :number="3733" label="Scores" />
                <CardBoxWidget :number="1244" label="Plays" /></div
            ></ProfileCard>
          </div>
          <div v-else class="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <BaseButton
              v-if="!thisGame.noScores"
              :href="`/#/games/${gameID}/scores`"
              :icon="mdiPlaylistMusicOutline"
              :outline="false"
              color="info"
              label="Network Scores"
            />
            <BaseButton
              v-if="!thisGame.noRecords"
              :href="`/#/games/${gameID}/records`"
              :icon="mdiFormatListText"
              :outline="false"
              color="info"
              label="Network Records"
            />
          </div>
        </div>
      </div>

      <SectionTitleLine :icon="mdiAccountMultiple" title="All Players" main />
      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable :headers="headers" :items="formattedItems" />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
