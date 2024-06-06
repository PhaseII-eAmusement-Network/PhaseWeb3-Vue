<script setup>
import { useRoute, useRouter } from "vue-router";
import { mdiCounter, mdiBackburger, mdiHome } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import { getGameInfo } from "@/constants";

const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;

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

const profile = {
  id: 1,
  name: "TRMAZI",
};

const headers = [
  { text: "Timestamp", value: "timestamp", width: 180 },
  { text: "Song", value: "song.name", width: 200 },
  { text: "Artist", value: "song.artist", width: 150 },
  { text: "Chart", value: "song.chart", width: 100 },
  { text: "Difficulty", value: "song.difficulty", width: 100 },
  { text: "Grade", value: "grade" },
  { text: "Points", value: "points" },
  { text: "Combos", value: "combo" },
  { text: "Type", value: "type" },
];

const scores = [
  {
    timestamp: "2023.05.30 12:00:39 AM",
    song: {
      id: 10741,
      name: "100 Sec. Kitchen Battle!!",
      artist: "Orange Lounge",
      chart: "SP EXPERT",
      difficulty: 12,
    },
    grade: "B+",
    points: 787690,
    combo: 42,
    type: "Cab",
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="grid grid-cols-1 md:max-w-[150px] space-y-3 mb-5">
        <BaseButton
          :icon="mdiBackburger"
          :href="`/#/games/${gameID}/profiles/${profile.id}`"
          class="w-full md:w-auto"
          color="info"
          :label="`${profile.name}'s Profile`"
        />

        <BaseButton
          :icon="mdiHome"
          :href="`/#/games/${gameID}`"
          class="w-full md:w-auto"
          color="info"
          :label="`${
            thisGame.shortName ? thisGame.shortName : thisGame.name
          } Home`"
        />
      </div>

      <SectionTitleLine
        :icon="mdiCounter"
        :title="`${profile.name}'s ${
          thisGame.shortName ? thisGame.shortName : thisGame.name
        } Scores`"
        main
      />

      <CardBox has-table>
        <GeneralTable :headers="headers" :items="scores" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
