<script setup>
import { reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMainStore } from "@/stores/main";
import { mdiAccountTieHat, mdiBackburger } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormControl from "@/components/FormControl.vue";
import { getGameInfo } from "@/constants";

const $route = useRoute();
const $router = useRouter();
const mainStore = useMainStore();
var gameID = null;
var thisGame = null;

const versionForm = reactive({
  currentVersion: null,
});

const settings = [
  {
    id: "username",
    name: "Username",
    help: "Set your username for this profile",
    type: String,
  },
  {
    id: "fastSlow",
    name: "Fast/Slow Display",
    help: "Enable or disable displaying of Fast/Slow",
    type: Boolean,
  },
  {
    id: "comboPosition",
    name: "Combo Position",
    help: "Change order of the combo and notes",
    type: Boolean,
  },
  {
    id: "weight",
    name: "Weight (kg)",
    help: "Set your weight for in-game workout mode",
    type: Number,
  },
  {
    id: "dancer",
    name: "Character",
    help: "Set your background dancer",
    type: Array,
    options: [
      { id: 0, label: "Afro" },
      { id: 1, label: "Emi" },
    ],
  },
  {
    id: "arrow",
    name: "Arrow Skin",
    help: "Set your arrow skin",
    type: Array,
    options: [
      { id: 0, label: "Normal" },
      { id: 1, label: "Classic" },
    ],
  },
];

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
  stats: {
    firstPlay: "1/14/2021",
    singlePlays: 165,
    singleDan: 1900,
    singlePoint: 1877,
    doublePlays: 15,
    doubleDan: 0,
    doublePoint: 187,
    skillPoints: 950000,
  },
};

const userSettings = reactive({
  username: "TRMAZI",
  fastSlow: true,
  comboPosition: false,
  weight: 100,
  dancer: 0,
  arrow: 1,
  guideLines: 0,
  filter: 3,
});

gameID = $route.params.game;
thisGame = getGameInfo(gameID);

if (!thisGame) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

var userVersions = {};
onMounted(() => {
  userVersions = mainStore.profiles[gameID];
  console.log(userVersions);
  if (userVersions != undefined) {
    versionForm.currentVersion = Math.max(...userVersions);
  }
});

function getSources() {
  var sources = null;
  if (!versionForm.currentVersion) {
    sources = thisGame.cardBG;
  } else {
    sources = `/assets/games/${thisGame.id}/card/${versionForm.currentVersion}.png`;
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
      <div class="md:flex pb-6 md:justify-between md:items-center">
        <BaseButton
          :icon="mdiBackburger"
          :href="`/#/games/${gameID}`"
          class="w-full md:w-auto"
          color="info"
          label="Go Back"
        />
        <div
          v-if="thisGame.versions && profile && userVersions"
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
      <SectionTitleLine
        v-if="versionForm.currentVersion"
        :icon="mdiAccountTieHat"
        title="Profile Customizations"
        main
      />
      <div
        v-if="versionForm.currentVersion"
        :style="getCardStyle()"
        class="rounded-2xl mb-6"
      >
        <div class="bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3">
          <div class="w-full">
            <ProfileCard
              v-if="profile && userVersions"
              use-small
              :profile="profile"
            />
          </div>
        </div>
      </div>

      <div v-if="versionForm.currentVersion && profile && userVersions">
        <CardBox>
          <div>
            <FormField
              v-for="setting of settings"
              :key="setting.id"
              :label="setting.name"
              :help="setting.help"
            >
              <FormControl
                v-if="setting.type == String"
                :v-model="userSettings[setting.id]"
                :model-value="userSettings[setting.id]"
              />

              <FormControl
                v-if="setting.type == Number"
                :v-model="userSettings[setting.id]"
                :model-value="userSettings[setting.id]"
                type="number"
              />

              <FormControl
                v-if="setting.type == Array"
                :options="setting.options"
                :v-model="userSettings[setting.id]"
                :model-value="userSettings[setting.id]"
                :selected="userSettings[setting.id]"
              />

              <FormCheckRadio
                v-if="setting.type == Boolean"
                :v-model="userSettings[setting.id]"
                :model-value="userSettings[setting.id]"
                type="switch"
              />
            </FormField>
          </div>

          <template #footer>
            <div class="space-x-2">
              <BaseButton type="submit" color="success" label="Save" />
              <BaseButton type="submit" color="danger" label="Revert" />
            </div>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
