<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhUsersThree } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import FormControl from "@/components/FormControl.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import GeneralTable from "@/components/GeneralTable.vue";

import { APIGetProfile, APIGetAllProfiles } from "@/stores/api/profile";
import { getGameInfo } from "@/constants";
import { dashCode } from "@/constants/userData";
import { getIIDXDan } from "@/constants/danClass";
import { formatSortableDate } from "@/constants/date";

const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;

const versionForm = reactive({
  currentVersion: null,
});

watch(
  () => versionForm.currentVersion,
  () => {
    loadProfile();
  },
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
    const data = await APIGetAllProfiles(gameID);
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
    const data = await APIGetProfile(gameID, versionForm.currentVersion);
    myProfile.value = data;

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
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
  headers.push({
    text: "Rival ID",
    value: "extid",
    sortable: true,
    width: 100,
  });
}

headers.push(
  {
    text: "Last Play",
    value: "stats.last_play_timestamp",
    sortable: true,
    width: 150,
  },
  {
    text: "Last Arcade",
    value: "stats.last_play_arcade",
    sortable: true,
    width: 150,
  },
  { text: "Plays", value: "stats.total_plays", sortable: true, width: 50 },
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
        item.stats.last_play_timestamp = formatSortableDate(
          item.stats.last_play_timestamp,
        );
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
      <GameHeader :game="thisGame" :version="versionForm.currentVersion">
        <div
          v-if="thisGame.versions && myProfile"
          class="w-full md:flex md:-mt-[75px] mb-4 place-content-end"
        >
          <div class="md:w-1/3 md:text-right">
            <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
              Select Version
            </h2>
            <FormControl
              v-model="versionForm.currentVersion"
              :options="filterVersions(myProfile.versions)"
            />
          </div>
        </div>

        <div v-if="myProfile" class="w-full">
          <ProfileCard
            :game="gameID"
            :version="versionForm.currentVersion"
            :profile="myProfile"
          >
          </ProfileCard>
        </div>
      </GameHeader>

      <SectionTitleLine :icon="PhUsersThree" title="All Players" main />
      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="profiles"
              @row-clicked="navigateToProfile"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
