<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhMusicNote, PhRanking, PhMedal } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";

import { APIGetTopScore } from "@/stores/api/music";
import { getGameInfo } from "@/constants";
const $route = useRoute();
const $router = useRouter();
var gameId = $route.params.game;
var songId = $route.params.songId;
const thisGame = getGameInfo(gameId);
var songData = ref({});

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

onMounted(async () => {
  try {
    const data = await APIGetTopScore(gameId, songId);
    songData.value = data;
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }
});

const headers = [
  { text: "Player", value: "username", width: 120 },
  { text: "Timestamp", value: "timestamp", width: 140 },
  { text: "Grade", value: "data.rank", width: 80 },
  { text: "Score", value: "points", width: 120 },
];

if (thisGame.scoreHeaders) {
  for (var header of thisGame.scoreHeaders) {
    headers.push(header);
  }
}

const chartSelector = reactive({
  currentChart: 0,
});

const chartOptions = computed(() => {
  if (!songData.value.charts) return [];
  return (
    songData.value.charts
      .filter(
        (chart) =>
          chart.data?.difficulty !== 0 && chart.data?.difficulty != null,
      )
      // eslint-disable-next-line no-unused-vars
      .map((chart, index) => {
        const label = `${thisGame.chartTable[chart.chart]} - ${
          chart.data?.difficulty ?? "?"
        }`;
        return { id: chart.chart, label };
      })
  );
});

const selectedChartRecords = computed(() => {
  if (!songData.value.charts || songData.value.charts.length === 0) return [];
  const chart = JSON.parse(
    JSON.stringify(songData.value.charts[chartSelector.currentChart]),
  );
  return formatScores(chart?.records ?? []);
});

function formatScores(scores) {
  var formattedItems = [];
  for (var rawItem of scores) {
    const item = { ...rawItem };
    if (item.timestamp) {
      const date = new Date(item.timestamp * 1000);
      item.timestamp = date.toLocaleString();
    }

    if (item.points != undefined) {
      item.points = item.points
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if (item.data?.stats?.score != undefined) {
      item.exscore = item.points.toString();
      item.points = item.data?.stats?.score
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if (item.song?.chart != undefined && thisGame.chartTable) {
      item.song.chart = thisGame.chartTable[item.song?.chart];
    }

    if (item.data?.halo != undefined && thisGame.haloTable) {
      item.data.halo = thisGame.haloTable[item.data?.halo];
    }

    if (item.data?.medal != undefined && thisGame.medalTable) {
      item.data.medal = thisGame.medalTable[item.data?.medal];
    }

    if (item.data?.clear_status != undefined && thisGame.medalTable) {
      item.data.medal = thisGame.medalTable[item.data?.clear_status];
    }

    if (item.data?.rank != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.rank];
    }

    if (item.data?.result_rank != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.result_rank];
    }

    if (item.data?.grade != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.grade];
    }

    if (item.data?.skill_perc > 0) {
      item.data.skill_perc = `${item.data?.skill_perc / 100}%`;
    } else {
      item.data.skill_perc = "0%";
    }

    if (item.data?.skill_points) {
      item.data.skill_points = item.data?.skill_points / 10;
    }

    if (item.data?.perc > 0) {
      item.data.perc = `${item.data?.perc / 100}%`;
    } else {
      item.data.perc = "0%";
    }

    if (item.data?.new_skill) {
      item.data.new_skill = item.data?.new_skill / 10;
    }

    if (item.data?.music_rate) {
      item.data.music_rate = item.data?.music_rate / 10;
    }

    if (item.data?.excellent) {
      item.medal = "EX FC";
    } else if (item.data?.fullcombo) {
      item.medal = "FC";
    } else if (item.data?.clear) {
      item.medal = "CLEARED";
    } else {
      item.medal = "FAILED";
    }

    formattedItems.push(item);
  }
  return formattedItems;
}

const navigateToProfile = (item) => {
  const userId = item.userId;
  $router.push(`/games/${gameId}/profiles/${userId}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain v-if="songData">
      <GameHeader :game="thisGame" />
      <SectionTitleLine :icon="PhMusicNote" title="Song Overview" main />
      <CardBox class="mb-6" has-table>
        <div class="grid gap-4 bg-slate-900/90 card-content">
          <div>
            <h1 class="text-3xl font-bold">{{ songData.name }}</h1>
            <h2 class="text-2xl">{{ songData.artist }}</h2>
            <h2 class="text-xl font-light italic">{{ songData.genre }}</h2>
          </div>

          <div class="grid grid-cols-3 sm:flex gap-2">
            <template v-for="chart of songData.charts" :key="chart.db_id">
              <PillTag
                v-if="chart.data?.difficulty != 0"
                color="info"
                :label="`${thisGame.chartTable[chart.chart]} - ${
                  chart.data?.difficulty
                }`"
              />
            </template>
          </div>
        </div>
      </CardBox>

      <SectionTitleLine :icon="PhRanking" title="Top Records" main />
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <template v-for="chart of songData.charts" :key="chart.db_id">
          <CardBoxWidget
            v-if="chart.data?.difficulty != 0"
            :label="`${thisGame.chartTable[chart.chart]}`"
            small-content
            >{{
              chart.records[0]
                ? `${
                    chart.records[0]?.username
                  } - ${chart.records[0].points?.toLocaleString()}`
                : "Unclaimed"
            }}</CardBoxWidget
          >
        </template>
      </div>

      <div class="flex place-content-between mb-2">
        <SectionTitleLine :icon="PhMedal" title="All Scores" main />
        <div class="md:w-1/3 md:text-right">
          <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
            Select Chart
          </h2>
          <FormControl
            v-model="chartSelector.currentChart"
            :options="chartOptions"
          />
        </div>
      </div>

      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="selectedChartRecords"
              @row-clicked="navigateToProfile"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
