<script setup>
import { computed, ref, onMounted } from "vue";
import {
  PhJoystick,
  PhNewspaper,
  PhTrendUp,
  PhPlay,
  PhFire,
  PhMedal,
  PhRanking,
} from "@phosphor-icons/vue";
import UserCard from "@/components/UserCard.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import CardBoxNews from "@/components/Cards/CardBoxNews.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { useMainStore } from "@/stores/main";
import { getGameInfo } from "@/constants";
import { generateChartData } from "@/components/Charts/chart.config";
import { formatSortableDate } from "@/constants/date";
const mainStore = useMainStore();
var newsData = ref([]);

onMounted(async () => {
  try {
    const data = await mainStore.fetchAllNews(2);
    newsData.value = data;
  } catch (error) {
    console.error("Failed to fetch news data:", error);
  }
});

const userProfiles = computed(() => mainStore.userProfiles);
const userScoreStats = computed(() => mainStore.userScoreStats);

const cumulativePlays = computed(() => {
  return userProfiles.value.reduce(
    (total, user) => total + user.data.total_plays,
    0,
  );
});

const uniqueProfiles = computed(() => {
  return userProfiles.value.length;
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

const today = new Date().toISOString().split("T")[0];

const totalAttempts = computed(() => {
  return userScoreStats.value?.attempts?.length || 0;
});

const totalRecords = computed(() => {
  return userScoreStats.value?.records?.length || 0;
});

const todayAttempts = computed(() => {
  return (
    userScoreStats.value?.attempts?.filter((a) => {
      const attemptDate = new Date(a.timestamp * 1000)
        .toISOString()
        .split("T")[0];
      return attemptDate === today;
    }).length || 0
  );
});

const todayRecords = computed(() => {
  return (
    userScoreStats.value?.records?.filter((r) => {
      const recordDate = new Date(r.timestamp * 1000)
        .toISOString()
        .split("T")[0];
      return recordDate === today;
    }).length || 0
  );
});

const todayPlays = computed(() => {
  const todayStr = new Date().toISOString().split("T")[0];
  let total = 0;

  userProfiles.value.forEach((profile) => {
    const arcadeHistory = profile.data?.arcade_history || {};

    Object.values(arcadeHistory).forEach((machines) => {
      Object.values(machines).forEach((timestamps) => {
        timestamps.forEach((ts) => {
          const dateStr = new Date(ts * 1000).toISOString().split("T")[0];
          if (dateStr === todayStr) {
            total++;
          }
        });
      });
    });
  });

  return total;
});

const cardBoxes = ref([
  {
    label: "Cumulative Plays",
    icon: PhPlay,
    iconColor: "text-emerald-600",
    suffix: "play",
    number: cumulativePlays,
  },
  {
    label: "Games Played",
    icon: PhJoystick,
    iconColor: "text-sky-300",
    suffix: "game",
    number: uniqueProfiles,
  },
  {
    label: "Plays Today",
    icon: PhPlay,
    iconColor: "text-sky-300",
    suffix: "play",
    number: todayPlays,
  },
  {
    label: "Longest Play Streak",
    icon: PhFire,
    iconColor: "text-red-500",
    suffix: "play",
    number: longestStreak,
  },
  {
    label: "Total Records",
    icon: PhRanking,
    iconColor: "text-amber-400",
    suffix: "record",
    number: totalRecords,
  },
  {
    label: "Total Attempts",
    icon: PhMedal,
    iconColor: "text-pink-300",
    suffix: "attempt",
    number: totalAttempts,
  },
  {
    label: "Records Today",
    icon: PhRanking,
    iconColor: "text-amber-400",
    suffix: "record",
    number: todayRecords,
  },
  {
    label: "Attempts Today",
    icon: PhMedal,
    iconColor: "text-sky-300",
    suffix: "attempt",
    number: todayAttempts,
  },
]);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6 mt-2 shadow-xl" />

      <SectionTitleLine :icon="PhNewspaper" title="Network News" main />
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
          :date="formatSortableDate(news.timestamp)"
          :cover="news.data.img"
          :read="
            mainStore?.userData?.seen_news
              ? mainStore?.userData?.seen_news[news.id]
              : false
          "
          class="w-full h-full"
        />
      </div>
      <CardBoxComponentEmpty v-if="!newsData || !newsData.length" />

      <SectionTitleLine :icon="PhTrendUp" title="Quick Stats" main />
      <div
        class="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 mb-6"
      >
        <template v-for="box of cardBoxes" :key="box.label">
          <CardBoxWidget
            v-if="box.number"
            :icon="box.icon"
            :number="box.number"
            :label="box.label"
            :suffix="`${box.suffix}${box.number == 1 ? '' : 's'}`"
            :icon-color="box.iconColor"
          />
        </template>
      </div>

      <SectionTitleLine :icon="PhJoystick" title="Showcase" main />
      <div
        class="grid grid-flow-row auto-rows-auto grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-6 gap-5 mb-5"
      >
        <CardBoxGameStat
          v-for="profile of filterUserProfiles(userProfiles)"
          :key="profile.game"
          :game="profile.game"
          :value="profile.data.total_plays"
          :profile-name="profile?.username"
          type="plays"
        />
      </div>

      <SectionTitleLine :icon="PhTrendUp" title="Play Trends" main />
      <CardBox class="mb-6">
        <div v-if="userProfiles">
          <LineChart
            :data="generateChartData(userProfiles, userScoreStats)"
            class="h-96"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
