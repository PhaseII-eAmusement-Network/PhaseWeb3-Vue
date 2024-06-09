<script setup>
import { ref, onMounted } from "vue";
import {
  mdiReload,
  mdiChartBellCurveCumulative,
  mdiGamepad,
  mdiTestTube,
  mdiNewspaperVariant,
} from "@mdi/js";
import UserCard from "@/components/UserCard.vue";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";
import { GameConstants } from "@/constants";

// Public beta news data
import CardBoxNews from "@/components/Cards/CardBoxNews.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
var newsData = ref([]);

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(async () => {
  fillChartData();
  try {
    const data = await mainStore.fetchAllNews();
    newsData.value = data;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }
});

function humanReadableTime(timestamp) {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString();
}

// const setGoals = [
//   {
//     game: "DanceDance Revolution",
//     type: "Rank",
//     goal: "Top 10 Ranking",
//     status: "#10 of 132",
//     deadline: "3 Weeks",
//   },
//   {
//     game: "pop'n music",
//     type: "Plays",
//     goal: "100 Plays",
//     status: "2 Plays Since Creation",
//     deadline: "1 Week",
//   },
// ];

const gameStats = [
  {
    id: GameConstants.IIDX,
    username: "DJ. TRMAZI",
    type: "plays",
    value: 33,
  },
  {
    id: GameConstants.DDR,
    username: "TRMAZI",
    type: "plays",
    value: 233,
  },
  {
    id: GameConstants.POPN_MUSIC,
    username: "TRMAZI",
    type: "plays",
    value: 69,
  },
  {
    id: GameConstants.SDVX,
    username: "TRMAZI",
    type: "plays",
    value: 420,
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <h2 class="pb-4 text-4xl lg:text-5xl">Welcome to <samp>PhaseII</samp></h2>
      <UserCard class="mb-6" />

      <!-- For public beta, we'll load the news here. -->
      <SectionTitleLine :icon="mdiNewspaperVariant" title="Network News" main />

      <div v-if="newsData.length" class="grid gap-4 grid-cols-1 w-full pb-4">
        <CardBoxNews
          v-for="news of newsData"
          :id="news.id"
          :key="news.id"
          :title="news.title"
          :content="news.body"
          :date="humanReadableTime(news.timestamp)"
          :cover="news.data.img"
          class="w-full h-full"
        />
      </div>
      <CardBoxComponentEmpty v-if="!newsData || !newsData.length" />

      <!-- <div class="my-6">
        <NotificationBar color="info">
          You have unread news!
          <template #right>
            <a href="#/news" class="text-blue-300 hover:underline">View now</a>
          </template>
        </NotificationBar>
      </div> -->

      <!-- This is for tracking stats. -->
      <!-- <SectionTitleLine
        :icon="mdiChartTimelineVariant"
        title="Quick Stats"
        main
      /> -->
      <!-- <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12% (from last week)"
          trend-type="up"
          :number="37"
          label="Scores (This week)"
        />
      </div> -->

      <SectionTitleLine :icon="mdiGamepad" title="Showcase" main />
      <div
        class="grid grid-flow-row auto-rows-auto grid-cols-1 md:grid-cols-2 gap-5 mb-5"
      >
        <CardBoxGameStat
          v-for="stat of gameStats"
          :key="stat.id"
          :game="stat.id"
          :value="stat.value"
          :profile-name="stat.username"
          :type="stat.type"
        />
      </div>

      <!-- <SectionTitleLine :icon="mdiFlagCheckered" title="Active Goals" main />
      <div class="mb-6">
        <CardBox has-table>
          <TableGoals :goals="setGoals" />
        </CardBox>
      </div> -->

      <SectionTitleLine
        :icon="mdiChartBellCurveCumulative"
        title="Play Trends"
        main
      >
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLine>

      <CardBox class="mb-6">
        <PillTag
          label="Scores (7-Day Period)"
          color="info"
          :icon="mdiTestTube"
        />
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <!-- <SectionTitleLine :icon="mdiAccountMultipleOutline" title="Rivals" main />
      <CardBox has-table>
        <TableRivalsFull />
      </CardBox> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
