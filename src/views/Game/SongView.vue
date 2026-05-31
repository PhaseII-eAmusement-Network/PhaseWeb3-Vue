<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  PhMusicNote,
  PhRanking,
  PhMedal,
  PhListStar,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";

import { useMainStore } from "@/stores/main.js";
import { APIGetTopScore, APIGetRecordData } from "@/stores/api/music";
import { getGameInfo, GameConstants } from "@/constants";
import { formatDifficulty } from "@/constants/scoreDataFilters";
import { getNestedValue } from "@/constants/values";
import { hydrateScoreData } from "@/helpers/score";
import { formatIIDXScore } from "@/helpers/score/iidx";
import { topScoreHeaders, formatScoreTable } from "@/constants/table/scores";
const mainStore = useMainStore();
const $route = useRoute();
const $router = useRouter();
var gameId = $route.params.game;
var songId = $route.params.songId;
const thisGame = getGameInfo(gameId);
var songData = ref({});
var anyRecords = ref(false);
var personalRecords = ref({});

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
    songData.value = hydrateScoreData(thisGame, data);

    const personalData = await APIGetRecordData(
      gameId,
      mainStore.userId,
      songData.value?.id,
    );

    personalRecords.value = formatPersonalRecords(personalData[0]);
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }
});

function formatPersonalRecords(data) {
  let filtered = [];

  for (var chart of data.charts) {
    if (!chart.record) {
      filtered.push(null);
    } else {
      if (thisGame?.id == GameConstants.IIDX) {
        for (const chartId in filtered) {
          const maxScore = (chart.data?.notecount ?? 5730) * 2;
          var record = chart.record;
          record = formatIIDXScore(maxScore, record);
          chart.record = record;
          songData[chartId] = chart;
        }
      }

      filtered.push(formatScoreTable(thisGame, [chart.record])[0]);
      anyRecords.value = true;
    }
  }

  return filtered;
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
          chart.data?.difficulty !== 0 &&
          chart.data?.difficulty != null &&
          thisGame.chartTable[chart.chart],
      )
      // eslint-disable-next-line no-unused-vars
      .map((chart, index) => {
        const label = `${thisGame.chartTable[chart.chart]} - ${formatDifficulty(
          chart.data?.difficulty,
          thisGame.difficultyDenom,
        )}`;
        return { id: chart.chart, label };
      })
  );
});

const selectedChartRecords = computed(() => {
  if (!songData.value.charts || songData.value.charts.length === 0) return [];
  const chart = JSON.parse(
    JSON.stringify(songData.value.charts[chartSelector.currentChart]),
  );
  return formatScoreTable(thisGame, chart?.records ?? []);
});

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
                v-if="
                  chart.data?.difficulty != 0 &&
                  thisGame.chartTable[chart.chart]
                "
                color="info"
                :label="`${thisGame.chartTable[chart.chart]} - ${formatDifficulty(
                  chart.data?.difficulty,
                  thisGame.difficultyDenom,
                )}`"
              />
            </template>
          </div>
        </div>
      </CardBox>

      <SectionTitleLine
        v-if="anyRecords"
        :icon="PhListStar"
        title="Personal Records"
        main
      />
      <div class="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <template v-for="chart of songData.charts" :key="chart.db_id">
          <CardBoxWidget
            v-if="
              chart.data?.difficulty != 0 &&
              thisGame.chartTable[chart.chart] &&
              personalRecords[chart.chart]
            "
            :label="`${thisGame.chartTable[chart.chart]} - ${formatDifficulty(
              chart.data?.difficulty,
              thisGame.difficultyDenom,
            )}`"
            small-content
          >
            <div v-if="record = personalRecords[chart.chart]">
              <div class="space-x-2">
                <span class="text-2xl font-bold">
                  {{ record?.points.toLocaleString() }}
                </span>
                <span>Points</span>
              </div>

              <div
                v-for="header of thisGame?.scoreHeaders"
                :key="header"
                class="space-x-2"
              >
                <span class="text-2xl font-bold">
                  {{ getNestedValue(record, header.value) ?? "0" }}
                </span>
                <span>{{ header.text }}</span>
              </div>
            </div>
          </CardBoxWidget>
        </template>
      </div>

      <SectionTitleLine :icon="PhRanking" title="Top Records" main />
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <template v-for="chart of songData.charts" :key="chart.db_id">
          <CardBoxWidget
            v-if="
              chart.data?.difficulty != 0 && thisGame.chartTable[chart.chart]
            "
            :label="`${thisGame.chartTable[chart.chart]} - ${formatDifficulty(
              chart.data?.difficulty,
              thisGame.difficultyDenom,
            )}`"
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
              :headers="topScoreHeaders(thisGame)"
              :items="selectedChartRecords"
              @row-clicked="navigateToProfile"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
