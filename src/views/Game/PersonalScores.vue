<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { PhRanking, PhUser, PhMedal } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import CardBox from "@/components/CardBox.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";

import { APIGetProfile } from "@/stores/api/profile";
import { getGameInfo } from "@/constants";
import {
  formatScoreTable,
  personalScoreHeaders,
} from "@/constants/table/scores";

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

onMounted(async () => {
  try {
    const data = await mainStore.getAttemptData(gameID, profileUserId);
    scores.value = formatScoreTable(thisGame, data);
  } catch (error) {
    console.error("Failed to fetch score data:", error);
  }

  loadProfile();
});

async function loadProfile() {
  try {
    myProfile.value = null;
    const data = await APIGetProfile(gameID, null, profileUserId);
    myProfile.value = data.profile;
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

const navigateToSong = (item) => {
  const songId = item.song.id;
  $router.push(`/games/${gameID}/song/${songId}`);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="myProfile">
        <GameHeader :game="thisGame" :profile="myProfile" />
        <div class="flex gap-2 mb-6">
          <BaseButton
            :icon="PhUser"
            :to="`/games/${thisGame.id}/profiles/${myProfile.userId}`"
            :outline="false"
            color="info"
            :label="`${myProfile.username}'s Profile`"
          />
          <BaseButton
            :icon="PhRanking"
            :to="`/games/${thisGame.id}/records/${myProfile.userId}`"
            :outline="false"
            color="info"
            :label="`${myProfile.username}'s Records`"
          />
        </div>
        <SectionTitleLine
          :icon="PhMedal"
          :title="`${myProfile.username}'s ${
            thisGame.shortName ? thisGame.shortName : thisGame.name
          } Scores`"
          main
        />

        <CardBox has-table>
          <GeneralTable
            :headers="personalScoreHeaders(thisGame)"
            :items="scores"
            @row-clicked="navigateToSong"
          />
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
