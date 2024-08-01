<script setup>
import { computed, ref, onMounted, watch } from "vue";
import {
  // mdiReload,
  // mdiChartBellCurveCumulative,
  mdiGamepad,
  // mdiTestTube,
  mdiNewspaperVariant,
  mdiChartTimelineVariant,
} from "@mdi/js";
import UserCard from "@/components/UserCard.vue";
import * as chartConfig from "@/components/Charts/chart.config.js";
// import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
//import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
// import BaseButton from "@/components/BaseButton.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
// import PillTag from "@/components/PillTag.vue";

// Public beta news data
import CardBoxNews from "@/components/Cards/CardBoxNews.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { getGameInfo } from "@/constants";
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

const userProfiles = ref(mainStore.userProfiles);
watch(
  () => mainStore.userProfiles,
  (newValue) => {
    userProfiles.value = newValue;
  }
);

const cumulativePlays = computed(() => {
  return userProfiles.value.reduce(
    (total, user) => total + user.data.total_plays,
    0
  );
});

// const sortedUserProfiles = computed(() => {
//   return [...userProfiles.value].sort(
//     (a, b) => b.data.last_play_timestamp - a.data.last_play_timestamp
//   );
// });

function filterUserProfiles(userProfiles) {
  var filteredProfiles = [];
  for (const profile of userProfiles) {
    const game = getGameInfo(profile.game);
    if (game && !game.skip) {
      filteredProfiles.push(profile);
    }
  }

  filteredProfiles.sort(function (x, y) {
    return y.data.last_play_timestamp - x.data.last_play_timestamp;
  });

  return filteredProfiles;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6 mt-2 shadow-xl" />

      <!-- For public beta, we'll load the news here. -->
      <SectionTitleLine :icon="mdiNewspaperVariant" title="Network News" main />

      <div
        v-if="newsData.length"
        class="grid gap-4 grid-cols-1 xl:grid-cols-2 w-full pb-4"
      >
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

      <SectionTitleLine
        :icon="mdiChartTimelineVariant"
        title="Quick Stats"
        main
      />
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-6"
      >
        <CardBoxWidget :number="cumulativePlays" label="Cumulative Plays" />
        <CardBoxWidget :number="userProfiles.length" label="Games Played" />
      </div>

      <SectionTitleLine :icon="mdiGamepad" title="Showcase" main />
      <div
        class="grid grid-flow-row auto-rows-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 mb-5"
      >
        <CardBoxGameStat
          v-for="profile of filterUserProfiles(userProfiles)"
          :key="profile.game"
          :game="profile.game"
          :value="profile.data.total_plays"
          profile-name=" "
          type="plays"
        />
      </div>

      <!-- <SectionTitleLine :icon="mdiFlagCheckered" title="Active Goals" main />
      <div class="mb-6">
        <CardBox has-table>
          <TableGoals :goals="setGoals" />
        </CardBox>
      </div> -->

      <!-- <SectionTitleLine
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
      </CardBox> -->

      <!-- <SectionTitleLine :icon="mdiAccountMultipleOutline" title="Rivals" main />
      <CardBox has-table>
        <TableRivalsFull />
      </CardBox> -->
    </SectionMain>
  </LayoutAuthenticated>
</template>
