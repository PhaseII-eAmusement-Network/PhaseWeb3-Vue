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
  { text: "Timestamp", value: "timestamp", width: 150 },
  { text: "Song", value: "song.title", width: 180 },
  { text: "Artist", value: "song.artist", width: 180 },
  { text: "Chart", value: "song.chart", width: 100 },
  { text: "Grade", value: "grade", width: 80 },
  { text: "¥ Score", value: "points", width: 100 },
];

if (thisGame.scoreHeaders) {
  for (var header of thisGame.scoreHeaders) {
    headers.push(header);
  }
}

headers.push({ text: "Type", value: "type", width: 80 });

const scores = [
  {
    timestamp: 1649542921,
    song: {
      id: 10741,
      title: "Colorful Days ~NEWラブプラス メインテーマ~",
      artist: "高嶺愛花＆小早川凛子＆姉ヶ崎寧々",
      chart: "SP EXPERT\n★12",
      difficulty: 12,
    },
    grade: "AAA",
    points: "1,000,000",
    exscore: 1000,
    combo: 1000,
    halo: "MFC",
    type: "Cab",
    raised: true,
  },
];

var formattedItems = [];
for (var item of scores) {
  if (item.timestamp) {
    const date = new Date(item.timestamp * 1000);
    item.timestamp = date.toLocaleString();
    if (item.raised) {
      item.timestamp = `${item.timestamp}\nNew High Score!`;
    }
  }

  formattedItems.push(item);
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="grid grid-cols-1 md:max-w-[180px] space-y-3 mb-5">
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
        <GeneralTable :headers="headers" :items="formattedItems" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
