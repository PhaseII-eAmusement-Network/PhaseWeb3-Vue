<script setup>
import { reactive, ref, onMounted, computed, watch } from "vue";
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
import GameHeader from "@/components/Cards/GameHeader.vue";
import RecordCardBox from "@/components/Cards/RecordCardBox.vue";
import { useMainStore } from "@/stores/main.js";
import { APIGetTopScore, APIGetRecordData } from "@/stores/api/music";
import { getGameInfo, GameConstants } from "@/constants";
import { formatDifficulty } from "@/constants/scoreDataFilters";
import { hydrateScoreData } from "@/helpers/score";
import { formatIIDXScore } from "@/helpers/score/iidx";
import { topScoreHeaders, formatScoreTable } from "@/constants/table/scores";

const mainStore = useMainStore();
const $route = useRoute();
const $router = useRouter();

const gameId = $route.params.game;
const songId = $route.params.songId;

const thisGame = getGameInfo(gameId);

const songData = ref(null);
const anyRecords = ref(false);
const personalRecords = ref({});

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

const chartSelector = reactive({
  currentChart: null,
});

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

    const firstChart = songData.value.charts.find(
      (chart) =>
        chart.data?.difficulty !== 0 &&
        chart.data?.difficulty != null &&
        thisGame.chartTable[chart.chart],
    );

    if (firstChart) {
      chartSelector.currentChart = firstChart.chart;
    }
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }
});

function formatPersonalRecords(data) {
  const filtered = [];

  for (const chart of data.charts) {
    if (!chart.record) {
      filtered[chart.chart] = null;
      continue;
    }

    if (thisGame?.id === GameConstants.IIDX) {
      const maxScore = (chart.data?.notecount ?? 5730) * 2;

      let record = chart.record;
      record = formatIIDXScore(maxScore, record);

      chart.record = record;
    }

    filtered[chart.chart] = formatScoreTable(thisGame, [chart.record])[0];
    anyRecords.value = true;
  }

  return filtered;
}

const chartOptions = computed(() => {
  if (!songData.value?.charts) return [];

  return songData.value.charts
    .filter(
      (chart) =>
        chart.data?.difficulty !== 0 &&
        chart.data?.difficulty != null &&
        thisGame.chartTable[chart.chart],
    )
    .map((chart) => ({
      id: chart.chart,
      label: `${thisGame.chartTable[chart.chart]} - ${formatDifficulty(
        chart.data?.difficulty,
        thisGame.difficultyDenom,
      )}`,
    }));
});

watch(
  chartOptions,
  (options) => {
    if (
      options.length &&
      !options.some((x) => x.id === chartSelector.currentChart)
    ) {
      chartSelector.currentChart = options[0].id;
    }
  },
  { immediate: true },
);

const selectedChart = computed(() => {
  if (!songData.value?.charts) return null;

  return (
    songData.value.charts.find(
      (chart) => chart.chart === chartSelector.currentChart,
    ) ?? null
  );
});

const selectedChartRecords = computed(() => {
  if (!selectedChart.value) return [];

  return formatScoreTable(
    thisGame,
    JSON.parse(JSON.stringify(selectedChart.value.records ?? [])),
  );
});

const chartDifficulties = computed(() => {
  if (!songData.value?.charts) return [];

  return songData.value.charts
    .filter(
      (chart) =>
        chart.data?.difficulty !== 0 && thisGame.chartTable[chart.chart],
    )
    .map(
      (chart) =>
        `${thisGame.chartTable[chart.chart]} - ${formatDifficulty(
          chart.data.difficulty,
          thisGame.difficultyDenom,
        )}`,
    );
});

const navigateToProfile = (item) => {
  const userId = item.userId;
  $router.push(`/games/${gameId}/profiles/${userId}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain v-if="songData != null">
      <GameHeader :game="thisGame" />
      <SectionTitleLine :icon="PhMusicNote" title="Song Overview" main />
      <CardBox class="mb-6" has-table>
        <div class="grid gap-4 bg-slate-900/90 card-content">
          <div>
            <h1 class="text-3xl font-bold">{{ songData.name }}</h1>
            <h2 class="text-2xl">{{ songData.artist }}</h2>
            <h2 class="text-xl font-light italic">{{ songData.genre }}</h2>
          </div>

          <div class="hidden lg:block">
            {{ chartDifficulties?.join("  /  ") }}
          </div>
          <div class="lg:hidden grid grid-cols-1 md:grid-cols-3">
            <span v-for="diff of chartDifficulties">
              {{ diff }}
            </span>
          </div>
        </div>
      </CardBox>

      <SectionTitleLine
        v-if="anyRecords"
        :icon="PhListStar"
        title="Personal Records"
        main
      />
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <template v-for="chart of songData.charts" :key="chart.db_id">
          <RecordCardBox
            v-if="
              chart.data?.difficulty != 0 &&
              thisGame.chartTable[chart.chart] &&
              personalRecords[chart.chart]
            "
            :this-game="thisGame"
            :chart="chart"
            :record="personalRecords[chart.chart]"
          />
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
