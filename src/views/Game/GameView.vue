<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  mdiAccountMultiple,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
} from "@mdi/js";
import { useMainStore } from "@/stores/main";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GameTitleLine from "@/components/GameTitleLine.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import FormControl from "@/components/FormControl.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import { getGameInfo } from "@/constants";
import { dashCode } from "@/constants/userData";
import { getIIDXDan } from "@/constants/danClass";

const $route = useRoute();
const $router = useRouter();
const mainStore = useMainStore();
var gameID = null;
var thisGame = null;

const versionForm = reactive({
  currentVersion: null,
});

watch(
  () => versionForm.currentVersion,
  () => {
    loadProfile();
  }
);

gameID = $route.params.id;
thisGame = getGameInfo(gameID);

if (thisGame == null) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

const myProfile = ref(null);
const profiles = ref([]);

onMounted(async () => {
  try {
    const data = await mainStore.getGameProfiles(gameID);
    profiles.value = formatProfiles(data);
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }

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
      versionForm.currentVersion
    );
    myProfile.value = data;

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

function getSources() {
  if (!versionForm.currentVersion) {
    return thisGame.cardBG;
  } else {
    return `/assets/games/${thisGame.id}/card/${versionForm.currentVersion}.webp`;
  }
}

function getVideoSource() {
  if (
    versionForm.currentVersion &&
    thisGame.videoTable?.includes(versionForm.currentVersion)
  ) {
    return `https://web3.phaseii.network/gameassets/video/${thisGame.id}/${versionForm.currentVersion}.mp4`;
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

const headers = [];
headers.push({
  text: "Player",
  value: "username",
  sortable: true,
  width: 120,
});

if (!thisGame.noRivals) {
  headers.push({ text: "Rival ID", value: "extid", width: 100 });
}

headers.push(
  { text: "Last Play", value: "stats.last_play_timestamp", width: 150 },
  { text: "Last Arcade", value: "stats.last_play_arcade", width: 150 },
  { text: "Plays", value: "stats.total_plays", sortable: true, width: 50 }
  // { text: "Last Arcade", value: "last.arcade", sortable: true, width: 150 }
);

if (thisGame.playerHeaders) {
  for (var header of thisGame.playerHeaders) {
    headers.push(header);
  }
}

function formatProfiles(profiles) {
  var formattedItems = [];
  for (var item of profiles) {
    if (item.extid) {
      item.extid = dashCode(item.extid);
    }

    if (item.stats) {
      if (item.stats.last_play_timestamp) {
        const date = new Date(item.stats.last_play_timestamp * 1000);
        item.stats.last_play_timestamp = date.toLocaleString();
      }

      if (item.sgrade) {
        item.sgrade = getIIDXDan(item.sgrade).short;
      }

      if (item.dgrade) {
        item.dgrade = getIIDXDan(item.dgrade).short;
      }
    }

    formattedItems.push(item);
  }

  formattedItems.sort((a, b) => {
    const totalPlaysA = a.stats ? a.stats.total_plays || 0 : 0;
    const totalPlaysB = b.stats ? b.stats.total_plays || 0 : 0;
    return totalPlaysB - totalPlaysA; // Sort in descending order
  });
  return formattedItems;
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

const navigateToProfile = (item) => {
  const userID = item.userId;
  $router.push(`/games/${gameID}/profiles/${userID}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
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
            <div
              class="md:flex md:px-5 md:space-x-10 md:justify-between md:items-center"
            >
              <GameTitleLine :path="thisGame.icon" :title="thisGame.name" />
              <div
                v-if="thisGame.versions && myProfile"
                class="md:w-1/3 md:text-right"
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
          </div>
          <div v-if="myProfile" class="w-full pt-6">
            <ProfileCard
              :game="gameID"
              :version="versionForm.currentVersion"
              :profile="myProfile"
            >
              <div class="grid grid-cols-2 gap-6 pt-6">
                <CardBoxWidget
                  :number="myProfile.stats.total_plays"
                  label="Plays"
                />

                <template v-if="myProfile.records">
                  <CardBoxWidget
                    v-if="myProfile.records.skill"
                    :number="myProfile.records.skill / 100"
                    label="Skill Points"
                  />
                </template>
              </div>
            </ProfileCard>
          </div>
          <div v-else class="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3">
            <BaseButton
              v-if="!thisGame.noScores"
              :href="`/#/games/${gameID}/scores`"
              :icon="mdiPlaylistMusicOutline"
              :outline="false"
              color="info"
              label="Network Scores"
            />
            <BaseButton
              v-if="!thisGame.noRecords"
              :href="`/#/games/${gameID}/records`"
              :icon="mdiFormatListText"
              :outline="false"
              color="info"
              label="Network Records"
            />
          </div>
        </div>
      </div>

      <SectionTitleLine :icon="mdiAccountMultiple" title="All Players" main />
      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="profiles"
              :path="`/#/${gameID}/profiles/`"
              @row-clicked="navigateToProfile"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
