<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
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

const headers = [
  { text: "Player", value: "userId", width: 100 },
  { text: "Timestamp", value: "timestamp", width: 170 },
  { text: "Song", value: "song.name", width: 180 },
  { text: "Artist", value: "song.artist", width: 180 },
  { text: "Chart", value: "song.chart", width: 100 },
  { text: "Grade", value: "data.rank", width: 80 },
  { text: "Score", value: "points", width: 100 },
];

if (thisGame.scoreHeaders) {
  for (var header of thisGame.scoreHeaders) {
    headers.push(header);
  }
}

headers.push({ text: "Type", value: "type", width: 80 });

onMounted(async () => {
  try {
    const data = await mainStore.getAttemptData(gameID);
    scores.value = formatScores(data);
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }
});

function formatScores(scores) {
  var formattedItems = [];
  for (var item of scores) {
    if (item.timestamp) {
      const date = new Date(item.timestamp * 1000);
      item.timestamp = date.toLocaleString();
      if (item.newRecord) {
        item.timestamp = `${item.timestamp}\nNew High Score!`;
      }
    }

    if (item.points) {
      item.points = item.points
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    formattedItems.push(item);
  }
  return formattedItems;
}
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
