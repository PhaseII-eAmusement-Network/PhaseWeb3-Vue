<script setup>
import { reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mdiSwordCross, mdiPlus } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { getGameInfo } from "@/constants";

const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;

const profile = {
  id: 1,
  name: "Trmazi",
  extid: 12345678,
  avatar:
    "https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/",
  last: {
    arcade: "GhettoCade",
    date: "7/16/2023",
  },
};

const rivals = [
  {
    id: 1,
    name: "TRMAZI",
    rivalID: "1234-5678",
  },
  {
    id: 2,
    name: "BLADE",
    rivalID: "1454-5687",
  },
  {
    id: 3,
    name: "HO!",
    rivalID: "5364-5568",
  },
];

const versionForm = reactive({
  currentVersion: null,
});

const filterForm = reactive({
  filter: null,
});

gameID = $route.params.game;
thisGame = getGameInfo(gameID);

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

function filterUsers() {
  if (filterForm.filter) {
    return rivals.filter(
      (rival) =>
        rival.name.toLowerCase().includes(filterForm.filter.toLowerCase()) ||
        rival.rivalID.toLowerCase().includes(filterForm.filter.toLowerCase())
    );
  }
}

function getSources() {
  var sources = null;
  if (!versionForm.currentVersion) {
    sources = thisGame.cardBG;
  } else {
    sources = `/web-assets/games/${thisGame.id}/card/${versionForm.currentVersion}.webp`;
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
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <div class="md:flex md:justify-end pb-6 items-center">
        <div
          v-if="thisGame.versions"
          class="mt-2 md:mt-0 md:w-1/3 md:text-right"
        >
          <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
            Select Version
          </h2>
          <FormControl
            v-model="versionForm.currentVersion"
            :options="thisGame.versions"
          />
        </div>
      </div>
      <div
        v-if="versionForm.currentVersion"
        :style="getCardStyle()"
        class="rounded-2xl mb-6"
      >
        <div class="bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3">
          <div class="w-full">
            <ProfileCard use-small :profile="profile" />
          </div>
        </div>
      </div>

      <SectionTitleLine :icon="mdiPlus" title="Add a Rival" main />
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

        <div class="grid gap-3">
          <CardBox v-for="rival of filterUsers()" :key="rival.id">
            <div class="flex justify-between items-center">
              <div class="flex">
                <img
                  class="w-10 mr-3"
                  src="https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/"
                />
                <div class="grid">
                  <h1 class="text-lg">{{ rival.name }}</h1>
                  <h2 class="text-md font-mono">{{ rival.rivalID }}</h2>
                </div>
              </div>
              <BaseButton label="Add Rival" color="success" />
            </div>
          </CardBox>
        </div>
      </CardBox>

      <SectionTitleLine :icon="mdiSwordCross" title="Rivals" main />
      <CardBox v-if="versionForm.currentVersion" class="mb-6">
        <div class="grid gap-3">
          <CardBox v-for="rival of rivals" :key="rival.id">
            <div class="flex justify-between items-center">
              <div class="flex">
                <img
                  class="w-10 mr-3"
                  src="https://static.wikia.nocookie.net/dancedancerevolutionddr/images/3/3b/Yuni_img1.gif/"
                />
                <div class="grid">
                  <h1 class="text-lg">{{ rival.name }}</h1>
                  <h2 class="text-md font-mono">{{ rival.rivalID }}</h2>
                </div>
              </div>
              <BaseButton label="Remove Rival" color="danger" />
            </div>
          </CardBox>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
