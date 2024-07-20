<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountOutline,
  mdiBackburger,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
  mdiChartBarStacked,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import JubilityTable from "@/components/Tables/JubilityTable.vue";
import { getGameInfo } from "@/constants";
import { getIIDXDan } from "@/constants/danClass.js";
import { getGitadoraColor, getJubilityColor } from "@/constants/skillColor";

const $route = useRoute();
const $router = useRouter();
const mainStore = useMainStore();
var gameID = null;
var thisGame = null;
var profileUserId = null;

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
    loadProfile();
  }
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
    const data = await mainStore.getUserProfile(
      gameID,
      versionForm.currentVersion,
      profileUserId
    );
    myProfile.value = formatProfile(data);

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
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
  var sources = null;
  if (!versionForm.currentVersion) {
    sources = thisGame.cardBG;
  } else {
    sources = `/assets/games/${thisGame.id}/card/${versionForm.currentVersion}.webp`;
  }
  return sources;
}

function getCardStyle() {
  return `
      background-image: url('${getSources()}');
      background-size: cover;
      background-repeat: no-repeat;
    `;
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
  const stats = profile.stats[`count_${versionForm.currentVersion}`];

  return stats
    ? [
        stats.mfc != null
          ? {
              label: "MFCs",
              value: stats.mfc,
            }
          : 0,
        stats.pfc != null
          ? {
              label: "PFCs",
              value: stats.pfc,
            }
          : 0,
        stats.fc != null
          ? {
              label: "GFCs",
              value: stats.fc,
            }
          : 0,
        stats.gfc != null
          ? {
              label: "FCs",
              value: stats.gfc,
            }
          : 0,
        stats.life4 != null
          ? {
              label: "Life-4 Clears",
              value: stats.life4,
            }
          : 0,
      ]
    : [];
}
</script>

<template>
  <LayoutAuthenticated>
    <template v-if="myProfile">
      <SectionMain>
        <div class="md:flex pb-6 md:justify-between md:items-center">
          <BaseButton
            :icon="mdiBackburger"
            :href="`/#/games/${gameID}`"
            class="w-full md:w-auto"
            color="info"
            :label="`${
              thisGame.shortName ? thisGame.shortName : thisGame.name
            } Home`"
          />

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
        </div>
        <SectionTitleLine :icon="mdiAccountOutline" title="View Profile" main />
        <div
          v-if="versionForm.currentVersion && myProfile"
          :style="getCardStyle()"
          class="rounded-2xl mb-6"
        >
          <div class="bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3">
            <div class="w-full">
              <ProfileCard
                use-small
                :game="gameID"
                :version="versionForm.currentVersion"
                :profile="myProfile"
              >
                <div class="md:w-1/3 grid grid-cols-1 md:grid-cols-2 gap-3">
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
              <!-- {{
                      stat.type == String && stat.isIIDXDan
                        ? getIIDXDan(myProfile[stat.key]).label
                        : None
                    }} -->
            </CardBoxWidget>
          </template>
          <CardBoxWidget
            v-if="myProfile.skill"
            label="Skill Points"
            :number="myProfile.skill / 100"
            :num-color="getGitadoraColor(myProfile.skill)"
          />
          <CardBoxWidget v-if="myProfile.profile_skill" label="Skill Level">{{
            myProfile.profile_skill / 100
          }}</CardBoxWidget>
          <CardBoxWidget
            v-if="myProfile.jubility"
            label="Jubility"
            :num-color="getJubilityColor(myProfile.jubility)"
            >{{ myProfile.jubility / 10 }}</CardBoxWidget
          >
          <CardBoxWidget
            v-if="myProfile.pick_up_jubility"
            label="Pick-Up Jubility"
            :num-color="getJubilityColor(myProfile.pick_up_jubility)"
            >{{ myProfile.pick_up_jubility / 10 }}</CardBoxWidget
          >
          <CardBoxWidget
            v-if="myProfile.common_jubility"
            label="Common Jubility"
            :num-color="getJubilityColor(myProfile.common_jubility)"
            >{{ myProfile.common_jubility / 10 }}</CardBoxWidget
          >
          <CardBoxWidget
            v-if="myProfile.deller"
            label="Deller"
            :number="myProfile.deller"
          />
          <CardBoxWidget v-if="myProfile.sgrade" label="SP DAN">{{
            getIIDXDan(myProfile.sgrade).label
          }}</CardBoxWidget>
          <CardBoxWidget v-if="myProfile.dgrade" label="DP DAN">{{
            getIIDXDan(myProfile.dgrade).label
          }}</CardBoxWidget>
        </div>

        <div
          v-if="myProfile.stats[`count_${versionForm.currentVersion}`]"
          class="my-6 grid grid-cols-2 md:grid-cols-5 xl:grid-cols-6 gap-6"
        >
          <template v-for="stat of formatCounts(myProfile)" :key="stat">
            <CardBoxWidget
              v-if="stat.value"
              :label="stat.label"
              :number="stat.value"
            />
          </template>
        </div>

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
      </SectionMain>
    </template>
  </LayoutAuthenticated>
</template>
