<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhSword, PhPlusCircle } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";

import {
  APIGetProfile,
  APIGetAllProfiles,
  APIGetLinks,
} from "@/stores/api/profile";
import { getGameInfo } from "@/constants";
import { dashCode } from "@/constants/userData";

const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;

gameID = $route.params.game;
thisGame = getGameInfo(gameID);

const profile = ref(null);
const links = ref(null);
const allProfiles = ref([]);
const versionForm = reactive({
  currentVersion: null,
});

watch(
  () => versionForm.currentVersion,
  () => {
    loadProfile();
    loadLinks();
    loadAllProfiles();
  },
);

onMounted(async () => {
  loadAllProfiles();
  await loadProfile();
  loadLinks();
});

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

async function loadProfile() {
  try {
    profile.value = null;
    const data = await APIGetProfile(gameID, versionForm.currentVersion);
    profile.value = data;

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

async function loadLinks() {
  try {
    links.value = null;
    const linkData = await APIGetLinks(gameID, versionForm.currentVersion);
    links.value = linkData;
  } catch (error) {
    console.error("Failed to fetch user link data:", error);
  }
}

async function loadAllProfiles() {
  try {
    const data = await APIGetAllProfiles(gameID, versionForm.currentVersion);
    allProfiles.value = data;
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }
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

const filterForm = reactive({
  filter: null,
});

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

function filterProfiles() {
  if (filterForm.filter) {
    return allProfiles.value.filter(
      (rival) =>
        rival.username
          .toLowerCase()
          .includes(filterForm.filter.toLowerCase()) ||
        rival.extid
          .toString()
          .toLowerCase()
          .includes(filterForm.filter.toLowerCase()),
    );
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <GameHeader :game="thisGame" :version="versionForm.currentVersion">
        <div
          v-if="thisGame.versions && profile"
          class="w-full md:flex md:-mt-[75px] mb-4 place-content-end"
        >
          <div class="md:w-1/3 md:text-right">
            <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
              Select Version
            </h2>
            <FormControl
              v-model="versionForm.currentVersion"
              :options="filterVersions(profile.versions)"
            />
          </div>
        </div>

        <div v-if="profile" class="w-full">
          <ProfileCard
            :game="gameID"
            :version="versionForm.currentVersion"
            :profile="profile"
          >
          </ProfileCard>
        </div>
      </GameHeader>

      <SectionTitleLine :icon="PhPlusCircle" title="Add a Rival" main />
      <CardBox v-if="versionForm.currentVersion" class="mb-6">
        <FormField
          label="Search"
          help="Search by username or Rival ID to add a rival."
          class="w-full md:w-1/3"
        >
          <FormControl
            v-model="filterForm.filter"
            :model-value="filterForm.filter"
            placeholder="1234-5678"
          />
        </FormField>

        <div class="grid gap-4">
          <div
            v-for="player of filterProfiles()"
            :key="player.id"
            class="bg-slate-800 p-4 rounded-xl"
          >
            <div class="flex w-full place-content-between">
              <div>
                <h1 class="text-lg md:text-xl">{{ player.username }}</h1>
                <h2 class="text-md md:text-lg font-mono">
                  {{ dashCode(player.extid) }}
                </h2>
              </div>

              <div class="flex align-middle">
                <BaseButton
                  label="Add Rival"
                  color="success"
                  :disabled="player.userId == profile?.userId"
                  tooltip="penis"
                />
              </div>
            </div>
          </div>
        </div>
      </CardBox>

      <SectionTitleLine :icon="PhSword" title="Rivals" main />
      <CardBox v-if="versionForm.currentVersion" class="mb-6">
        <div class="grid gap-3">
          <CardBox v-for="rival of profile?.rivals" :key="rival.id">
            <div class="flex justify-between items-center">
              <div class="flex">
                <div class="grid">
                  <h1 class="text-lg">{{ rival.name }}</h1>
                  <h2 class="text-md font-mono">{{ rival.rivalID }}</h2>
                </div>
              </div>
              <BaseButton label="Remove Rival" color="danger" />
            </div>
          </CardBox>
          <CardBox v-if="!profile?.rivals">
            <h1 class="text-2xl">{{ links }}</h1>
          </CardBox>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
