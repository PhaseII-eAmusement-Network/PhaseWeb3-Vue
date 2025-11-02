<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhRanking } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";

import { APIGetRecordData } from "@/stores/api/music";
import { getGameInfo } from "@/constants";
const $route = useRoute();
const $router = useRouter();
var gameId = $route.params.game;
const thisGame = getGameInfo(gameId);
var songData = ref([]);
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

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

onMounted(async () => {
  try {
    const data = await APIGetRecordData(gameId);
    songData.value = data;

    if (thisGame.versions && !versionForm.currentVersion) {
      versionForm.currentVersion = filteredVersions.value.at(-1)?.id ?? null;
    }
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }
});

const filteredVersions = computed(() => {
  if (!thisGame.versions) return [];

  const versionIdsWithSongs = new Set(
    songData.value.map((s) => parseInt(s.version)),
  );
  return thisGame.versions.filter((v) => versionIdsWithSongs.has(v.id));
});

const filteredSongs = computed(() => {
  if (!versionForm.currentVersion) return songData.value;
  return songData.value.filter(
    (s) => parseInt(s.version) === versionForm.currentVersion,
  );
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain v-if="songData">
      <GameHeader :game="thisGame" />
      <SectionTitleLine :icon="PhRanking" title="Top Records" main>
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

      <CardBox v-for="song of filteredSongs" :key="song.id" class="mb-6">
        <div class="md:flex w-full md:place-content-between">
          <div class="mb-4 md:mb-0 space-y-1">
            <h1 class="text-lg md:text-xl">{{ song.name }}</h1>
            <h2 class="text-md md:text-lg">{{ song.artist }}</h2>

            <BaseButton
              label="View Song"
              color="info"
              :to="`/games/${gameId}/song/${song.id}`"
            />
          </div>

          <div class="grid md:flex gap-2 md:justify-end md:place-content-end">
            <template v-for="chart of song.charts" :key="chart.db_id">
              <div
                v-if="
                  chart.data?.difficulty != 0 &&
                  thisGame.chartTable[chart.chart]
                "
                class="bg-gray-900 dark:bg-gray-700 p-4 rounded-lg"
              >
                <h2 class="text-md md:text-lg">
                  {{ thisGame.chartTable[chart.chart] }} -
                  {{ chart.data?.difficulty / (thisGame.difficultyDenom ?? 1) }}
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
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
