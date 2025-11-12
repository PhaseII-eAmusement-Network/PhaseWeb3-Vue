<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { PhMedal } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import CardBox from "@/components/CardBox.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import { getGameInfo } from "@/constants";
import { formatScoreTable, scoreHeaders } from "@/constants/table/scores";

const $route = useRoute();
const $router = useRouter();
const mainStore = useMainStore();

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

const scores = ref([]);
onMounted(async () => {
  try {
    const data = await mainStore.getAttemptData(gameID);
    scores.value = formatScoreTable(thisGame, data);
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }
});

const navigateToSong = (item) => {
  const songId = item.song.id;
  $router.push(`/games/${gameID}/song/${songId}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <GameHeader :game="thisGame" />

      <SectionTitleLine
        :icon="PhMedal"
        :title="`All ${
          thisGame.shortName ? thisGame.shortName : thisGame.name
        } Scores`"
        main
      />

      <CardBox has-table>
        <GeneralTable
          :headers="scoreHeaders(thisGame)"
          :items="scores"
          @row-clicked="navigateToSong"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
