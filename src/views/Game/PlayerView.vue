<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  PhUser,
  PhCalendarDots,
  PhChartLine,
  PhRanking,
  PhMedal,
  PhChartPieSlice,
  PhSticker,
  PhTarget,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import JubilityTable from "@/components/Tables/JubilityTable.vue";
import UserSticker from "@/components/UserSticker.vue";
import UserNotesRadar from "@/components/Charts/UserNotesRadar.vue";

import { APIGetProfile } from "@/stores/api/profile";
import { APIGetArcade } from "@/stores/api/arcade";
import { APIGetMusicData } from "@/stores/api/music";
import { GameConstants, getGameInfo } from "@/constants";
import { getIIDXDan } from "@/constants/danClass.js";
import { getGitadoraColor, getJubilityColor } from "@/constants/skillColor";
import { formatSortableDate } from "@/constants/date";
import HitchartCardBox from "@/components/Cards/HitchartCardBox.vue";
const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;
var profileUserId = null;
var firstLoad = true;

gameID = $route.params.game;
profileUserId = $route.params.userId;
thisGame = getGameInfo(gameID);

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

const versionForm = reactive({
  currentVersion: null,
});

watch(
  () => versionForm.currentVersion,
  () => {
    if (firstLoad) {
      firstLoad = false;
    } else {
      loadProfile();
    }
  },
);

const myProfile = ref(null);
const myVersions = ref(null);
const myStats = ref(null);
const myHitChart = ref(null);
const musicIds = ref([]);
const musicData = ref(null);

onMounted(async () => {
  loadProfile();
});

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

async function loadProfile() {
  try {
    myProfile.value = null;
    var data = await APIGetProfile(
      gameID,
      versionForm.currentVersion,
      profileUserId,
    );
    data.timeline = await generateTimeline(data.stats);

    const formatted = formatProfile(data.profile, data.stats);
    myProfile.value = formatted[0];
    myVersions.value = data.versions;
    myStats.value = formatted[1];

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }

    if (data.hitChart?.length) {
      musicIds.value = getHitchartIds(data.hitChart);
      await getMusicData();
      myHitChart.value = formatHitchart(data.hitChart);
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

async function loadArcade(arcadeId) {
  try {
    const data = await APIGetArcade(arcadeId);
    return data;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

var loadStats = [
  {
    label: "Register Date",
    type: String,
    span: "md:col-span-2",
    key: "first_play_timestamp",
  },
  {
    label: "Last Play",
    type: String,
    span: "md:col-span-2",
    key: "last_play_timestamp",
  },
  {
    label: "First Arcade",
    type: String,
    span: "md:col-span-2",
    key: "first_play_arcade",
  },
  {
    label: "Last Arcade",
    type: String,
    span: "md:col-span-2",
    key: "last_play_arcade",
  },
  {
    label: "Total Plays",
    type: Number,
    key: "total_plays",
  },
  {
    label: "EXP",
    type: Number,
    key: "exp",
  },
  {
    label: "SP Plays",
    type: Number,
    key: "single_plays",
  },
  {
    label: "DP Plays",
    type: Number,
    key: "double_plays",
  },
  {
    label: "SP DJPOINT",
    type: Number,
    key: "single_dj_points",
  },
  {
    label: "DP DJPOINT",
    type: Number,
    key: "double_dj_points",
  },
];

function getSources() {
  if (!versionForm.currentVersion) {
    return thisGame.cardBG;
  } else {
    return `${ASSET_PATH}/games/${thisGame.id}/card/${versionForm.currentVersion}.webp`;
  }
}

function getVideoSource() {
  if (
    versionForm.currentVersion &&
    thisGame.videoTable?.includes(versionForm.currentVersion)
  ) {
    const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
    return `${ASSET_PATH}/video/${thisGame.id}/${versionForm.currentVersion}.mp4`;
  } else {
    return null;
  }
}

function getCardStyle() {
  if (thisGame.videoTable?.includes(versionForm.currentVersion)) {
    return null;
  } else {
    return `
      background-image: url('${getSources()}');
      background-size: cover;
      background-repeat: no-repeat;
    `;
  }
}

function colorText(stat, profile) {
  if (profile) {
    if (stat.isSkill && profile.jubility) {
      return getGitadoraColor(profile.jubility);
    } else if (stat.isJubility && profile.records.skill) {
      return getJubilityColor(profile.records.skill);
    }
  }
  return "";
}

function filterVersions(haveVersions) {
  var filtered = [];
  for (const version of thisGame.versions) {
    if (haveVersions.includes(version.id)) {
      filtered.push(version);
    }
  }
  return filtered;
}

function returnNumber(stat, stats) {
  if (stat.isSkill) {
    return stats[stat.key] / 100;
  } else if (stat.isJubility) {
    return stats[stat.key] / 10;
  }

  return stats[stat.key];
}

function formatProfile(profile, stats) {
  if (stats) {
    if (stats.first_play_timestamp) {
      stats.first_play_timestamp = formatSortableDate(
        stats.first_play_timestamp,
      );
    }

    if (stats.last_play_timestamp) {
      stats.last_play_timestamp = formatSortableDate(stats.last_play_timestamp);
    }
  }
  if (profile.dp) {
    if (profile.dp.dan !== undefined) {
      profile.dp.dan = getIIDXDan(profile.dp.dan).short;
    }
  }

  return [profile, stats];
}

function formatCounts(inStats) {
  const stats = inStats?.count;
  return stats
    ? [
        stats.mfc != null
          ? {
              label: "MFCs",
              value: stats.mfc,
            }
          : {
              label: "MFCs",
              value: 0,
            },
        stats.pfc != null
          ? {
              label: "PFCs",
              value: stats.pfc,
            }
          : {
              label: "PFCs",
              value: 0,
            },
        stats.fc != null
          ? {
              label: "GFCs",
              value: stats.fc,
            }
          : {
              label: "GFCs",
              value: 0,
            },
        stats.gfc != null
          ? {
              label: "FCs",
              value: stats.gfc,
            }
          : {
              label: "FCs",
              value: 0,
            },
        stats.life4 != null
          ? {
              label: "Life-4 Clears",
              value: stats.life4,
            }
          : {
              label: "Life-4 Clears",
              value: 0,
            },
      ]
    : [];
}

async function generateTimeline(stats) {
  const firstPlay = stats?.first_play_timestamp;
  const lastPlay = stats?.last_play_timestamp;
  const arcadeHistory = stats?.arcade_history;

  const plays = [];

  // Add the first play
  if (firstPlay) {
    plays.push({
      timestamp: formatSortableDate(firstPlay),
      arcade: stats?.first_play_arcade,
      first_play: true,
    });
  }

  // Add arcade history
  if (arcadeHistory) {
    for (const [arcadeId, machines] of Object.entries(arcadeHistory)) {
      const arcade = await loadArcade(arcadeId);
      for (const [machineId, timestamps] of Object.entries(machines)) {
        for (const timestamp of timestamps) {
          if (![firstPlay, lastPlay].includes(timestamp)) {
            plays.push({
              timestamp: formatSortableDate(timestamp),
              arcade: arcade.name,
              machineId: machineId,
              first_play: false,
            });
          }
        }
      }
    }
  }

  // Add the last play
  if (lastPlay) {
    plays.push({
      timestamp: formatSortableDate(lastPlay),
      arcade: stats?.last_play_arcade,
      first_play: false,
    });
  }

  // Sort plays by timestamp
  return plays.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}

async function getMusicData() {
  if (musicIds.value.length) {
    const data = await APIGetMusicData(
      gameID,
      versionForm.currentVersion,
      musicIds.value,
      true,
    );
    musicData.value = data;
  }
}

function getMusic(id) {
  if (!musicData.value) {
    return null;
  }
  return musicData.value.find((x) => x.id == id);
}

function getHitchartIds(data) {
  var hitchartIds = [];

  for (const dataId in data) {
    const songid = data[dataId][0];
    hitchartIds.push(songid);
  }

  return hitchartIds;
}

function formatHitchart(data) {
  var formattedData = [];
  for (const dataId in data) {
    const songid = data[dataId][0];
    const plays = data[dataId][1];
    const song = getMusic(songid);

    formattedData.push({
      songid: songid,
      plays: plays,
      name: song?.name,
      artist: song?.artist,
    });
  }

  return formattedData;
}
</script>

<template>
  <LayoutAuthenticated>
    <template v-if="myProfile">
      <SectionMain>
        <GameHeader :game="thisGame" />
        <SectionTitleLine :icon="PhUser" title="View Profile" main>
          <div
            v-if="thisGame.versions && myProfile"
            class="mt-2 md:mt-0 md:w-1/3 md:text-right"
          >
            <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
              Select Version
            </h2>
            <FormControl
              v-model="versionForm.currentVersion"
              :options="filterVersions(myVersions)"
            />
          </div>
        </SectionTitleLine>
        <div
          v-if="versionForm.currentVersion && myProfile"
          :style="getCardStyle()"
          class="rounded-2xl mb-6 card-container"
        >
          <video
            autoplay
            muted
            loop
            playsinline
            :src="getVideoSource()"
            class="background-video"
          ></video>
          <div
            class="bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3 card-content"
          >
            <div class="w-full">
              <ProfileCard
                :game="gameID"
                :version="versionForm.currentVersion"
                :profile="myProfile"
              >
                <div
                  v-if="!thisGame.noScores"
                  class="md:w-1/3 grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
                >
                  <BaseButton
                    :to="`/games/${gameID}/scores/${myProfile.userId}`"
                    :icon="PhMedal"
                    class="w-full md:w-auto"
                    color="info"
                    label="View Scores"
                  />

                  <BaseButton
                    :to="`/games/${gameID}/records/${myProfile.userId}`"
                    :icon="PhRanking"
                    class="w-full md:w-auto"
                    color="info"
                    label="View Records"
                  />
                </div>
              </ProfileCard>
            </div>
          </div>
        </div>
        <div class="my-6 grid grid-cols-1 md:grid-cols-4 gap-6">
          <template v-for="stat in loadStats" :key="stat">
            <CardBoxWidget
              v-if="myStats[stat.key]"
              :class="stat.span"
              :label="stat.label"
              :number="stat.type == Number ? returnNumber(stat, myStats) : null"
              :num-color="colorText(stat)"
            >
              {{ stat.type == String ? myStats[stat.key] : null }}
            </CardBoxWidget>
          </template>
          <CardBoxWidget
            v-if="myStats?.count?.records"
            label="Records"
            :number="myStats?.count?.records"
          />
          <CardBoxWidget
            v-if="myStats?.count?.attempts"
            label="Scores"
            :number="myStats?.count?.attempts"
          />

          <!-- GFDM -->
          <CardBoxWidget
            v-if="myProfile.skill"
            label="Skill Points"
            :number="myProfile.skill / 100"
            :num-color="getGitadoraColor(myProfile.skill)"
          />
          <CardBoxWidget v-if="myProfile.profile_skill" label="Skill Level">
            {{ myProfile.profile_skill / 100 }}
          </CardBoxWidget>

          <!-- Jubeat -->
          <CardBoxWidget
            v-if="myProfile.jubility"
            label="Jubility"
            :num-color="getJubilityColor(myProfile.jubility)"
          >
            {{ myProfile.jubility / 10 }}</CardBoxWidget
          >
          <CardBoxWidget
            v-if="myProfile.pick_up_jubility"
            label="Pick-Up Jubility"
            :num-color="getJubilityColor(myProfile.pick_up_jubility)"
          >
            {{ myProfile.pick_up_jubility / 10 }}</CardBoxWidget
          >
          <CardBoxWidget
            v-if="myProfile.common_jubility"
            label="Common Jubility"
            :num-color="getJubilityColor(myProfile.common_jubility)"
          >
            {{ myProfile.common_jubility / 10 }}
          </CardBoxWidget>

          <!-- IIDX -->
          <CardBoxWidget
            v-if="myProfile.deller"
            label="Deller"
            :number="myProfile.deller"
          />
          <CardBoxWidget v-if="myProfile.sgrade" label="SP DAN">
            {{ getIIDXDan(myProfile.sgrade).label }}
          </CardBoxWidget>
          <CardBoxWidget v-if="myProfile.dgrade" label="DP DAN">
            {{ getIIDXDan(myProfile.dgrade).label }}
          </CardBoxWidget>

          <!-- Tsum Tsum -->
          <CardBoxWidget
            v-if="myProfile.total_exp"
            label="EXP"
            :number="myProfile.total_exp"
          />
          <CardBoxWidget
            v-if="myProfile.coin_num"
            label="Coins"
            :number="myProfile.coin_num"
          />

          <!-- SDVX -->
          <CardBoxWidget
            v-if="myProfile.block"
            label="Block"
            :number="myProfile.block"
          />
          <CardBoxWidget
            v-if="myProfile.packet"
            label="Packet"
            :number="myProfile.packet"
          />
        </div>

        <template
          v-if="
            myStats?.count ||
            myProfile.tune_cnt ||
            myProfile.max_clear_diff ||
            myProfile.battle_data
          "
        >
          <SectionTitleLine :icon="PhChartLine" title="Stats" main />
          <div
            class="my-6 grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            <template v-for="stat of formatCounts(myStats)" :key="stat">
              <CardBoxWidget
                v-if="stat !== undefined"
                :label="stat.label"
                :number="stat.value"
              >
                {{ stat.value ? null : "0" }}
              </CardBoxWidget>
            </template>

            <!-- Jubeat -->
            <CardBoxWidget
              v-if="myProfile.tune_cnt"
              label="Total Tunes"
              :number="myProfile.tune_cnt"
            />
            <CardBoxWidget
              v-if="myProfile.ex_cnt"
              label="Total EXC"
              :number="myProfile.ex_cnt"
            />
            <CardBoxWidget
              v-if="myProfile.fc_cnt"
              label="Total FC"
              :number="myProfile.fc_cnt"
            />
            <CardBoxWidget
              v-if="myProfile.clear_cnt"
              label="Total Clear"
              :number="myProfile.clear_cnt"
            />
            <CardBoxWidget
              v-if="myProfile.saved_cnt"
              label="Total Saved"
              :number="myProfile.saved_cnt"
            />
            <CardBoxWidget
              v-if="myProfile.match_cnt"
              label="Total Matches"
              :number="myProfile.match_cnt"
            />

            <!-- Gitadora -->
            <CardBoxWidget
              v-if="myProfile.max_clear_diff"
              label="Max Clear Difficulty"
            >
              {{ myProfile.max_clear_diff / 100 }}
            </CardBoxWidget>
            <CardBoxWidget
              v-if="myProfile.max_full_diff"
              label="Max FC Difficulty"
            >
              {{ myProfile.max_full_diff / 100 }}
            </CardBoxWidget>
            <CardBoxWidget
              v-if="myProfile.max_exce_diff"
              label="Max EX FC Difficulty"
            >
              {{ myProfile.max_exce_diff / 100 }}
            </CardBoxWidget>
            <CardBoxWidget
              v-if="myProfile.clear_num"
              label="Total Clear"
              :number="myProfile.clear_num"
            />
            <CardBoxWidget
              v-if="myProfile.full_num"
              label="Total FC"
              :number="myProfile.full_num"
            />
            <CardBoxWidget
              v-if="myProfile.exce_num"
              label="Total EX FC"
              :number="myProfile.exce_num"
            />
            <CardBoxWidget
              v-if="myProfile.e_num"
              label="Total E"
              :number="myProfile.e_num"
            />
            <CardBoxWidget
              v-if="myProfile.d_num"
              label="Total D"
              :number="myProfile.d_num"
            />
            <CardBoxWidget
              v-if="myProfile.c_num"
              label="Total C"
              :number="myProfile.c_num"
            />
            <CardBoxWidget
              v-if="myProfile.b_num"
              label="Total B"
              :number="myProfile.b_num"
            />
            <CardBoxWidget
              v-if="myProfile.a_num"
              label="Total A"
              :number="myProfile.a_num"
            />
            <CardBoxWidget
              v-if="myProfile.s_num"
              label="Total S"
              :number="myProfile.s_num"
            />
            <CardBoxWidget
              v-if="myProfile.ss_num"
              label="Total SS"
              :number="myProfile.ss_num"
            />
            <CardBoxWidget
              v-if="myProfile.session_cnt"
              label="Sessions Played"
              :number="myProfile.session_cnt"
            />

            <!-- Tsum Tsum -->
            <CardBoxWidget
              v-if="myProfile.battle_data?.win_num"
              label="Total Wins"
              :number="myProfile.battle_data?.win_num"
            />
            <CardBoxWidget
              v-if="myProfile.battle_data?.lose_num"
              label="Total Losses"
              :number="myProfile.battle_data?.lose_num"
            />
            <CardBoxWidget
              v-if="myProfile.battle_data?.draw_num"
              label="Total Draws"
              :number="myProfile.battle_data?.draw_num"
            />
          </div>
        </template>

        <div v-if="myHitChart && !thisGame.noScores" class="mb-6">
          <HitchartCardBox :hitchart-data="myHitChart" :game-id="gameID" />
        </div>

        <template v-if="myProfile.jubility">
          <SectionTitleLine
            :icon="PhChartPieSlice"
            title="Jubility Breakdown"
            main
          />
          <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardBox v-if="myProfile.pick_up_breakdown">
              <PillTag label="Pick-Up" color="info" />
              <JubilityTable
                :jubility-data="myProfile.pick_up_breakdown"
                :version="versionForm.currentVersion"
              />
            </CardBox>
            <CardBox v-if="myProfile.other_breakdown">
              <PillTag label="Common" color="info" />
              <JubilityTable
                :jubility-data="myProfile.other_breakdown"
                :version="versionForm.currentVersion"
              />
            </CardBox>
          </div>
        </template>

        <template v-if="myProfile?.trbitem">
          <SectionTitleLine :icon="PhSticker" title="Sticker Board" main />
          <div class="my-6">
            <CardBox class="w-full grid place-content-center">
              <UserSticker
                :version="versionForm.currentVersion"
                :profile="myProfile"
                :size="290"
              />
            </CardBox>
          </div>
        </template>

        <template
          v-if="
            thisGame.id == GameConstants.IIDX &&
            versionForm.currentVersion >= 29
          "
        >
          <SectionTitleLine :icon="PhTarget" title="Notes Radar" main />
          <UserNotesRadar
            :game="thisGame.id"
            :version="versionForm.currentVersion"
            :profile="profileUserId"
          />
        </template>

        <template v-if="myProfile?.timeline">
          <SectionTitleLine :icon="PhCalendarDots" title="Timeline" main />
          <div class="my-6">
            <CardBox>
              <ol
                class="border-s border-neutral-300 md:flex md:justify-start md:gap-10 md:border-s-0 md:border-t md:overflow-x-auto overflow-y-visible md:whitespace-nowrap scrollbar"
              >
                <li
                  v-for="playHistory of JSON.parse(
                    JSON.stringify(myProfile?.timeline),
                  ).reverse()"
                  :key="playHistory.timestamp"
                  class="md:inline-block shrink-0"
                >
                  <div
                    class="flex-start flex items-center pt-2 md:block md:pt-4"
                  >
                    <div
                      class="-ms-[6px] me-3 h-[12px] w-[12px] md:w-0.5 md:h-4 rounded-full md:rounded-none bg-gray-300 md:-mt-6 md:me-0 md:ms-0"
                    ></div>
                    <p class="mt-2 text-sm font-light">
                      {{ playHistory.timestamp }}
                    </p>
                  </div>
                  <div class="ms-4 pb-6 md:ms-0">
                    <h4 class="text-lg font-semibold">
                      {{ playHistory.arcade }}
                    </h4>
                  </div>
                </li>
              </ol>
            </CardBox>
          </div>
        </template>
      </SectionMain>
    </template>
  </LayoutAuthenticated>
</template>
