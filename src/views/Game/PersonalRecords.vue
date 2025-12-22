<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhRanking, PhUser, PhMedal } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";

import { APIGetRecordData } from "@/stores/api/music";
import { APIGetProfile } from "@/stores/api/profile";
import { getGameInfo } from "@/constants";
import {
  shouldRenderChart,
  formatDifficulty,
} from "@/constants/scoreDataFilters";

const $route = useRoute();
const $router = useRouter();
var gameId = $route.params.game;
const thisGame = getGameInfo(gameId);
var profileUserId = $route.params.userId ?? null;
var songData = ref([]);
const myProfile = ref(null);
const versionForm = reactive({
  currentVersion: null,
});

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

if (!profileUserId) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

onMounted(async () => {
  try {
    const data = await APIGetRecordData(gameId, profileUserId);
    songData.value = data;

    loadProfile();

    if (thisGame.versions && !versionForm.currentVersion) {
      versionForm.currentVersion = filteredVersions.value.at(-1)?.id ?? null;
    }
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }
});

async function loadProfile() {
  try {
    myProfile.value = null;
    const data = await APIGetProfile(gameId, null, profileUserId);
    myProfile.value = data.profile;
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

const filteredVersions = computed(() => {
  if (!thisGame.versions) return [];

  const versionIdsWithSongs = new Set(songData.value.map((s) => s.version));
  return thisGame.versions.filter((v) => versionIdsWithSongs.has(v.id));
});

const filteredSongs = computed(() => {
  if (!versionForm.currentVersion) return songData.value;
  return songData.value.filter((s) => s.version === versionForm.currentVersion);
});

const songsWithRecords = computed(() => {
  return filteredSongs.value.filter((song) => {
    return song.charts.some(
      (chart) =>
        chart.data?.difficulty != 0 &&
        thisGame.chartTable[chart.chart] &&
        chart.record,
    );
  });
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain v-if="songData">
      <template v-if="myProfile">
        <GameHeader :game="thisGame" :profile="myProfile" />
        <div class="flex gap-2 mb-6 md:mb-0">
          <BaseButton
            :icon="PhUser"
            :to="`/games/${thisGame.id}/profiles/${myProfile.userId}`"
            :outline="false"
            color="info"
            :label="`${myProfile.username}'s Profile`"
          />
          <BaseButton
            :icon="PhMedal"
            :to="`/games/${thisGame.id}/scores/${myProfile.userId}`"
            :outline="false"
            color="info"
            :label="`${myProfile.username}'s Scores`"
          />
        </div>
        <SectionTitleLine
          :icon="PhRanking"
          :title="`${myProfile.username}'s ${
            thisGame.shortName ? thisGame.shortName : thisGame.name
          } Records`"
          main
        >
          <template v-if="thisGame.versions">
            <div class="md:w-1/3 md:text-right">
              <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
                Select Version
              </h2>
              <FormControl
                v-model="versionForm.currentVersion"
                :options="filteredVersions.slice().reverse()"
              />
            </div>
          </template>
        </SectionTitleLine>

        <CardBox v-for="song of songsWithRecords" :key="song.id" class="mb-6">
          <div class="lg:flex w-full lg:place-content-between">
            <div class="mb-4 lg:mb-0 space-y-1">
              <h1 class="text-lg lg:text-xl">{{ song.name }}</h1>
              <h2 class="text-md lg:text-lg">{{ song.artist }}</h2>

              <BaseButton
                label="View Song"
                color="info"
                :to="`/games/${gameId}/song/${song.id}`"
              />
            </div>

            <div
              class="grid md:grid-cols-2 lg:flex gap-2 lg:justify-end lg:place-content-end"
            >
              <template v-for="chart of song.charts" :key="chart.db_id">
                <template v-if="chart.record">
                  <div
                    v-if="
                      shouldRenderChart(
                        chart.data?.difficulty,
                        thisGame.chartTable,
                        chart.chart,
                      )
                    "
                    class="bg-gray-900 dark:bg-gray-700 p-4 rounded-lg"
                  >
                    <h2 class="text-md lg:text-lg">
                      {{ thisGame.chartTable[chart.chart] }} -
                      {{
                        formatDifficulty(
                          chart.data?.difficulty,
                          thisGame.difficultyDenom,
                        )
                      }}
                    </h2>
                    {{
                      chart.record
                        ? `${
                            chart.record?.username
                          } - ${chart.record.points?.toLocaleString()}`
                        : "Unclaimed"
                    }}
                  </div>
                </template>
              </template>
            </div>
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
