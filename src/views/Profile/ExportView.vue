<script setup>
import { computed } from "vue";
import { PhArchive } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";

import { useMainStore } from "@/stores/main";
import { getGameInfo } from "@/constants";
import { exportJSON } from "@/helpers/contentExport";

import { APIGetUser, APIGetCards } from "@/stores/api/account";
import { APIGetProfile } from "@/stores/api/profile";
import { APIGetRecordData, getAttemptData } from "@/stores/api/music";

const mainStore = useMainStore();
const userProfiles = computed(() => mainStore.userProfiles);

function filterUserProfiles(userProfiles) {
  if (!userProfiles) {
    return;
  }

  var filteredProfiles = [];
  for (const profile of userProfiles) {
    const game = getGameInfo(profile.game);
    if (game) {
      profile.gameData = game;
      filteredProfiles.push(profile);
    }
  }

  filteredProfiles.sort((x, y) =>
    x.gameData.name.localeCompare(y.gameData.name),
  );

  return filteredProfiles;
}

async function exportUserAccount() {
  const data = await APIGetUser(mainStore.userId);
  exportJSON("_user_account", data);
}

async function exportUserCards() {
  const data = await APIGetCards();
  exportJSON("_user_cards", data);
}

async function exportProfiles(gameId) {
  const game = getGameInfo(gameId);

  const exportData = { versionKey: game.versions ?? null };
  const latestProfile = await APIGetProfile(gameId, null, mainStore.userId);

  if (!latestProfile?.versions) {
    window.alert("Failed to export data!");
    return;
  }

  const versions = [...latestProfile.versions];
  const latestVersion = versions.length > 1 ? versions.pop() : 1;

  const sanitizeProfile = (profile) => {
    if (!profile) return null;
    // eslint-disable-next-line no-unused-vars
    const { versions, stats, machine_judge_adjust, ...rest } = profile;
    return rest;
  };

  mainStore.continueLoad = versions.length > 0;

  for (const version of versions) {
    const profile = await APIGetProfile(gameId, version, mainStore.userId);
    exportData[version] = sanitizeProfile(profile);
  }

  mainStore.continueLoad = false;
  mainStore.isLoading = false;
  mainStore.isSaving = false;
  mainStore.loadingPool = [];
  mainStore.savingPool = [];

  exportData[latestVersion] = sanitizeProfile(latestProfile);

  exportJSON(`_${gameId}_profiles`, exportData);
}

async function exportScores(gameId) {
  const data = await getAttemptData(gameId, mainStore.userId);
  exportJSON(`_${gameId}_attempts`, data);

  const recordData = await APIGetRecordData(gameId, mainStore.userId);
  exportJSON(`_${gameId}_records`, recordData);
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />
      <SectionTitleLine :icon="PhArchive" title="Export your Data" main />

      <PillTag color="success" label="Personal Data" class="mb-4" />
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <CardBox>
          <FormField
            label="General Data"
            help="Basic user data for your account (email, Discord info, Tachi info, news, app settings)"
          >
            <BaseButton
              color="success"
              label="Export"
              @click="exportUserAccount"
            />
          </FormField>
        </CardBox>
        <CardBox>
          <FormField
            label="Card Data"
            help="Login cards (exported as internal and access code)"
          >
            <BaseButton
              color="success"
              label="Export"
              @click="exportUserCards"
            />
          </FormField>
        </CardBox>
      </div>

      <PillTag color="warning" label="Profile Data" class="mb-4" />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CardBox v-for="profile of filterUserProfiles(userProfiles)">
          <h1 class="text-xl font-bold">{{ profile.gameData.name }}</h1>
          <hr class="mb-4" />
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Account Data"
              help="Data for the account (all played versions) for event tracking and settings. Does not include scores."
            >
              <BaseButton
                color="success"
                label="Export"
                @click="exportProfiles(profile.game)"
              />
            </FormField>

            <FormField
              v-if="!profile.gameData.noScores"
              label="Score Data"
              help="Data for music, scores, and records. May take a while to export."
            >
              <BaseButton
                color="success"
                label="Export"
                @click="exportScores(profile.game)"
              />
            </FormField>
          </div>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
