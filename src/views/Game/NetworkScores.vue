<script setup>
import { useRoute, useRouter } from "vue-router";
import { mdiCounter, mdiBackburger } from "@mdi/js";
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

const headers = [
  { text: "Player", value: "username", width: 120 },
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
    username: "TRMAZI",
    userId: 1,
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
  {
    username: "TRMAZI",
    userId: 1,
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
  {
    username: "TRMAZI",
    userId: 1,
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
  {
    username: "TRMAZI",
    userId: 1,
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
  {
    username: "TRMAZI",
    userId: 1,
    timestamp: "2023.05.30 12:00:39 AM",
    song: {
      id: 10741,
      name: "100 Sec. Kitchen Battle!!",
      artist: "Orange Lounge",
      chart: "SP EXPERT",
      difficulty: 12,
    },
    grade: "B+",
    points: 78769330,
    combo: 42,
    type: "Cab",
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <BaseButton
        :icon="mdiBackburger"
        :href="`/#/games/${gameID}`"
        class="w-full md:w-auto mb-6"
        color="info"
        :label="`${
          thisGame.shortName ? thisGame.shortName : thisGame.name
        } Home`"
      />

      <SectionTitleLine
        :icon="mdiCounter"
        :title="`All ${
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
