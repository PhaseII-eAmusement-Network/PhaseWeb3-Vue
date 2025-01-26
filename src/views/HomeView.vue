<script setup>
import { computed, ref, onMounted, watch } from "vue";
import {
  mdiGamepad,
  mdiNewspaperVariant,
  mdiChartTimelineVariant,
} from "@mdi/js";
import UserCard from "@/components/UserCard.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();

import CardBoxNews from "@/components/Cards/CardBoxNews.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { getGameInfo } from "@/constants";
var newsData = ref([]);

onMounted(async () => {
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

const longestStreak = computed(() => {
  const groupByDay = (timestamps) => {
    const dayMap = {};
    timestamps.forEach((timestamp) => {
      const day = new Date(timestamp * 1000).toISOString().split("T")[0];
      dayMap[day] = (dayMap[day] || 0) + 1;
    });
    return dayMap;
  };

  var maxStreak = 0;

  userProfiles.value.forEach((user) => {
    const arcadeHistory = user.data?.arcade_history
      ? user.data?.arcade_history
      : {};
    const allTimestamps = [];

    Object.values(arcadeHistory).forEach((machines) => {
      Object.values(machines).forEach((timestamps) => {
        allTimestamps.push(...timestamps);
      });
    });

    const playsByDay = groupByDay(allTimestamps);

    const longestStreakForUser = Math.max(...Object.values(playsByDay));
    maxStreak = Math.max(maxStreak, longestStreakForUser);
  });

  return maxStreak;
});

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

      <SectionTitleLine
        :icon="mdiChartTimelineVariant"
        title="Quick Stats"
        main
      />
      <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 3xl:grid-cols-6 mb-6"
      >
        <CardBoxWidget
          :number="cumulativePlays"
          label="Cumulative Plays"
          suffix="plays"
        />
        <CardBoxWidget
          :number="userProfiles.length"
          label="Games Played"
          suffix="games"
        />
        <CardBoxWidget
          :number="longestStreak"
          label="Longest Play Streak"
          suffix="plays"
        />
      </div>

      <SectionTitleLine :icon="mdiGamepad" title="Showcase" main />
      <div
        class="grid grid-flow-row auto-rows-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-6 gap-5 mb-5"
      >
        <CardBoxGameStat
          v-for="profile of filterUserProfiles(userProfiles)"
          :key="profile.game"
          :game="profile.game"
          :value="profile.data.total_plays"
          profile-name=""
          type="plays"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
