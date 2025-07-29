<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  mdiAccountMultiple,
  mdiPlaylistMusicOutline,
  mdiFormatListText,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GameTitleLine from "@/components/GameTitleLine.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";

import { APIGetAllProfiles } from "@/stores/api/profile";
import { getGameInfo } from "@/constants";
import { getCardStyle } from "@/constants/sources";
import { dashCode } from "@/constants/userData";
import { getIIDXDan } from "@/constants/danClass";

const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;

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

const profiles = ref([]);

onMounted(async () => {
  try {
    const data = await APIGetAllProfiles(gameID);
    profiles.value = formatProfiles(data);
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }
});

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

const navigateToProfile = (item) => {
  const userID = item.userId;
  $router.push(`/games/${gameID}/profiles/${userID}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div
        :style="getCardStyle(thisGame)"
        class="rounded-2xl mb-6 card-container"
      >
        <div
          class="bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3 card-content"
        >
          <div class="w-full">
            <div
              class="md:flex md:px-5 md:space-x-10 md:justify-between md:items-center"
            >
              <GameTitleLine :path="thisGame.icon" :title="thisGame.name" />
            </div>
          </div>

          <div class="md:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-3">
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
