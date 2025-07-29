<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  mdiAccountOutline,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
  mdiChartBarStacked,
  mdiChartAreasplineVariant,
  mdiChartTimeline,
  mdiStickerOutline,
  mdiChartDonutVariant,
} from "@mdi/js";
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
import { GameConstants, getGameInfo } from "@/constants";
import { getIIDXDan } from "@/constants/danClass.js";
import { getGitadoraColor, getJubilityColor } from "@/constants/skillColor";
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
    data.timeline = await generateTimeline(data);

    myProfile.value = formatProfile(data);

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
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

function returnNumber(stat, profile) {
  if (stat.isSkill) {
    return profile.stats[stat.key] / 100;
  } else if (stat.isJubility) {
    return profile.stats[stat.key] / 10;
  }

  return profile.stats[stat.key];
}

function formatProfile(profile) {
  if (profile.stats) {
    if (profile.stats.first_play_timestamp) {
      const date = new Date(profile.stats.first_play_timestamp * 1000);
      profile.stats.first_play_timestamp = date.toLocaleString();
    }

    if (profile.stats.last_play_timestamp) {
      const date = new Date(profile.stats.last_play_timestamp * 1000);
      profile.stats.last_play_timestamp = date.toLocaleString();
    }

    if (profile.dp) {
      if (profile.dp.dan !== undefined) {
        profile.dp.dan = getIIDXDan(profile.dp.dan).short;
      }
    }
  }

  return profile;
}

function formatCounts(profile) {
  const stats = profile.stats?.count;
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

async function generateTimeline(myProfile) {
  const stats = myProfile?.stats;
  const firstPlay = stats?.first_play_timestamp;
  const lastPlay = stats?.last_play_timestamp;
  const arcadeHistory = stats?.arcade_history;

  const plays = [];

  // Add the first play
  if (firstPlay) {
    plays.push({
      timestamp: new Date(firstPlay * 1000).toLocaleString(),
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
          const date = new Date(timestamp * 1000);
          if (![firstPlay, lastPlay].includes(timestamp)) {
            plays.push({
              timestamp: date.toLocaleString(),
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
      timestamp: new Date(lastPlay * 1000).toLocaleString(),
      arcade: stats?.last_play_arcade,
      first_play: false,
    });
  }

  // Sort plays by timestamp
  return plays.sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
}
</script>

<template>
  <LayoutAuthenticated>
    <template v-if="myProfile">
      <SectionMain>
        <GameHeader :game="thisGame" />
        <SectionTitleLine :icon="mdiAccountOutline" title="View Profile" main>
          <div
            v-if="thisGame.versions && myProfile"
            class="mt-2 md:mt-0 md:w-1/3 md:text-right"
          >
            <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
              Select Version
            </h2>
            <FormControl
              v-model="versionForm.currentVersion"
              :options="filterVersions(myProfile.versions)"
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
                use-small
                :game="gameID"
                :version="versionForm.currentVersion"
                :profile="myProfile"
              >
                <div
                  v-if="!thisGame.noScores"
                  class="md:w-1/3 grid grid-cols-1 md:grid-cols-2 gap-3"
                >
                  <BaseButton
                    :href="`/#/games/${gameID}/scores/${myProfile.userId}`"
                    :icon="mdiPlaylistMusicOutline"
                    class="w-full md:w-auto"
                    color="info"
                    label="View Scores"
                  />

                  <BaseButton
                    :href="`/#/games/${gameID}/records/${myProfile.userId}`"
                    :icon="mdiFormatListText"
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
              v-if="myProfile.stats[stat.key]"
              :class="stat.span"
              :label="stat.label"
              :number="
                stat.type == Number ? returnNumber(stat, myProfile) : null
              "
              :num-color="colorText(stat)"
            >
              {{ stat.type == String ? myProfile.stats[stat.key] : null }}
            </CardBoxWidget>
          </template>
          <CardBoxWidget
            v-if="myProfile.stats?.count?.records"
            label="Records"
            :number="myProfile.stats?.count?.records"
          />
          <CardBoxWidget
            v-if="myProfile.stats?.count?.attempts"
            label="Attempts"
            :number="myProfile.stats?.count?.attempts"
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
            myProfile.stats?.count ||
            myProfile.tune_cnt ||
            myProfile.max_clear_diff ||
            myProfile.battle_data
          "
        >
          <SectionTitleLine
            :icon="mdiChartAreasplineVariant"
            title="Stats"
            main
          />
          <div
            class="my-6 grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            <template v-for="stat of formatCounts(myProfile)" :key="stat">
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

        <template v-if="myProfile.jubility">
          <SectionTitleLine
            :icon="mdiChartBarStacked"
            title="Jubility Breakdown"
            main
          />

          <div class="my-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardBox v-if="myProfile.pick_up_breakdown">
              <PillTag label="Pick-Up" color="info" />
              <JubilityTable
                :jubility-data="myProfile.pick_up_breakdown"
                ,
                :version="versionForm.currentVersion"
              />
            </CardBox>
            <CardBox v-if="myProfile.other_breakdown">
              <PillTag label="Common" color="info" />
              <JubilityTable
                :jubility-data="myProfile.other_breakdown"
                ,
                :version="versionForm.currentVersion"
              />
            </CardBox>
          </div>
        </template>

        <template v-if="myProfile?.trbitem">
          <SectionTitleLine
            :icon="mdiStickerOutline"
            title="Sticker Board"
            main
          />

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
          <SectionTitleLine
            :icon="mdiChartDonutVariant"
            title="Notes Radar"
            main
          />
          <UserNotesRadar
            :game="thisGame.id"
            :version="versionForm.currentVersion"
            :profile="profileUserId"
          />
        </template>

        <template v-if="myProfile?.timeline">
          <SectionTitleLine :icon="mdiChartTimeline" title="Timeline" main />

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
