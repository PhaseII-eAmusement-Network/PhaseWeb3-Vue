<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mdiAccountMultiple } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GameTitleLine from "@/components/GameTitleLine.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import FormControl from "@/components/FormControl.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import TablePlayers from "@/components/Tables/TablePlayers.vue";
import { getGameInfo } from "@/constants";

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
};

gameID = $route.params.id;
thisGame = getGameInfo(gameID);

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
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
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div :style="getCardStyle()" class="rounded-2xl mb-6">
        <div class="bg-white dark:bg-slate-900/90 rounded-2xl p-3">
          <div class="w-full">
            <div
              class="md:flex pb-6 md:px-5 md:space-x-10 md:justify-between md:items-center"
            >
              <GameTitleLine :path="thisGame.icon" :title="thisGame.name" />
              <div v-if="thisGame.versions" class="md:w-1/3 md:text-right">
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
          <div class="w-full">
            <ProfileCard :game="gameID" :profile="profile">
              <div class="grid grid-cols-1 gap-6 lg:grid-cols-4 pt-6">
                <CardBoxWidget :number="3733" label="Scores (All Versions)" />
                <CardBoxWidget :number="1244" label="Plays (All Versions)" />
                <CardBoxWidget
                  prefix="#"
                  :number="43"
                  suffix=" / 300"
                  label="Ranking (All Versions)"
                />
                <CardBoxWidget :number="2" label="Rivals" /></div
            ></ProfileCard>
          </div>
        </div>
      </div>

      <SectionTitleLine :icon="mdiAccountMultiple" title="All Players" main />
      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <TablePlayers />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
