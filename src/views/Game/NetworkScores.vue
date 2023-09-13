<script setup>
import { useRoute, useRouter } from "vue-router";
import { mdiCounter, mdiBackburger } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import TableScores from "@/components/Tables/TableScores.vue";
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

const scores = [
  {
    id: 1,
    player: "TRMAZI",
    playerId: 1,
    timestamp: "2023.05.30 12:00:39 AM",
    isHighScore: false,
    song: {
      id: 10741,
      name: "100 Sec. Kitchen Battle!!",
      artist: "Orange Lounge",
      chart: "SP EXPERT",
      difficulty: "12",
    },
    grade: "B+",
    points: 787690,
    combo: 42,
    location: {
      arcade: "Ho-House",
      type: "Cab",
    },
  },
  {
    id: 1,
    player: "BARRU",
    playerId: 2,
    timestamp: "2023.05.30 12:00:39 AM",
    isHighScore: false,
    song: {
      id: 10741,
      name: "100 Sec. Kitchen Battle!!",
      artist: "Orange Lounge",
      chart: "SP EXPERT",
      difficulty: "12",
    },
    grade: "B+",
    points: 787690,
    combo: 42,
    location: {
      arcade: "Ho-House",
      type: "Cab",
    },
  },
  {
    id: 1,
    player: "HO",
    playerId: 3,
    timestamp: "2023.05.30 12:00:39 AM",
    isHighScore: false,
    song: {
      id: 10741,
      name: "100 Sec. Kitchen Battle!!",
      artist: "Orange Lounge",
      chart: "SP EXPERT",
      difficulty: "12",
    },
    grade: "B+",
    points: 787690,
    combo: 42,
    location: {
      arcade: "Ho-House",
      type: "Cab",
    },
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
        <TableScores :game="gameID" :entries="scores" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
