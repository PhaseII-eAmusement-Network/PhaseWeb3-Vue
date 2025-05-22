<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { mdiCounter, mdiAccountDetails } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import CardBox from "@/components/CardBox.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";

import { APIGetProfile } from "@/stores/api/profile";
import { getGameInfo } from "@/constants";

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

const myProfile = ref(null);
const scores = ref([]);

const headers = [
  { text: "Timestamp", value: "timestamp", width: 140 },
  { text: "New PB", value: "newRecord", width: 100 },
  { text: "Song", value: "song.name", width: 180 },
  { text: "Artist", value: "song.artist", width: 180 },
  { text: "Chart", value: "song.chart", width: 100 },
  { text: "Grade", value: "data.rank", width: 80 },
  { text: "Score", value: "points", width: 120 },
];

if (thisGame.scoreHeaders) {
  for (var header of thisGame.scoreHeaders) {
    headers.push(header);
  }
}

// headers.push({ text: "Type", value: "type", width: 80 });

onMounted(async () => {
  try {
    const data = await mainStore.getAttemptData(gameID, profileUserId);
    scores.value = formatScores(data);
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }

  loadProfile();
});

async function loadProfile() {
  try {
    myProfile.value = null;
    const data = await APIGetProfile(gameID, null, profileUserId);
    myProfile.value = data;
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

function formatScores(scores) {
  var formattedItems = [];
  for (var item of scores) {
    if (item.newRecord) {
      item.newRecord = "✅";
    } else {
      item.newRecord = "";
    }

    if (item.timestamp) {
      const date = new Date(item.timestamp * 1000);
      item.timestamp = date.toLocaleString();
    }

    if (item.points != undefined) {
      item.points = item.points
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if (item.data?.stats?.score != undefined) {
      item.exscore = item.points.toString();
      item.points = item.data?.stats?.score
        .toString()
        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
    }

    if (item.song?.chart != undefined && thisGame.chartTable) {
      item.song.chart = thisGame.chartTable[item.song?.chart];
    }

    if (item.data?.halo != undefined && thisGame.haloTable) {
      item.data.halo = thisGame.haloTable[item.data?.halo];
    }

    if (item.data?.medal != undefined && thisGame.medalTable) {
      item.data.medal = thisGame.medalTable[item.data?.medal];
    }

    if (item.data?.clear_status != undefined && thisGame.medalTable) {
      item.data.medal = thisGame.medalTable[item.data?.clear_status];
    }

    if (item.data?.rank != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.rank];
    }

    if (item.data?.result_rank != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.result_rank];
    }

    if (item.data?.grade != undefined && thisGame.rankTable) {
      item.data.rank = thisGame.rankTable[item.data?.grade];
    }

    if (item.data?.skill_perc > 0) {
      item.data.skill_perc = `${item.data?.skill_perc / 100}%`;
    } else {
      item.data.skill_perc = "0%";
    }

    if (item.data?.skill_points) {
      item.data.skill_points = item.data?.skill_points / 10;
    }

    if (item.data?.perc > 0) {
      item.data.perc = `${item.data?.perc / 100}%`;
    } else {
      item.data.perc = "0%";
    }

    if (item.data?.new_skill) {
      item.data.new_skill = item.data?.new_skill / 10;
    }

    if (item.data?.music_rate) {
      item.data.music_rate = item.data?.music_rate / 10;
    }

    if (item.data?.excellent) {
      item.medal = "EX FC";
    } else if (item.data?.fullcombo) {
      item.medal = "FC";
    } else if (item.data?.clear) {
      item.medal = "CLEARED";
    } else {
      item.medal = "FAILED";
    }

    formattedItems.push(item);
  }
  return formattedItems;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="myProfile">
        <GameHeader :game="thisGame" :profile="myProfile" />
        <SectionTitleLine
          :icon="mdiCounter"
          :title="`${myProfile.username}'s ${
            thisGame.shortName ? thisGame.shortName : thisGame.name
          } Scores`"
          main
        >
          <BaseButton
            :icon="mdiAccountDetails"
            :href="`/#/games/${thisGame.id}/profiles/${myProfile.userId}`"
            :outline="false"
            color="info"
            :label="`${myProfile.username}'s Profile`"
          />
        </SectionTitleLine>

        <CardBox has-table>
          <GeneralTable :headers="headers" :items="scores" />
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
