<script setup>
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { mdiNewspaperVariantMultiple } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import BaseButton from "@/components/BaseButton.vue";
import { arcadeList, getGameTitle, getGameInfo } from "@/constants";

const $route = useRoute();
const arcadeID = parseInt($route.params.id);
const thisArcade = arcadeList.find((x) => x.id === arcadeID);

function multiSelectOptions(Options) {
  var filtered = [];
  for (const option of Options) {
    filtered.push(option.name);
  }

  return filtered;
}

const eventSettings = [
  {
    game: "iidx",
    version: 22,
    settings: [
      {
        id: 0,
        keyId: "coke",
        type: "bool",
        name: "Enable Coke-X-BEMANI",
        tooltip: "Enables the long forgotten Coca-Cola event.",
        value: true,
      },
      {
        id: 1,
        keyId: "phase",
        type: "select",
        name: "Current BOSS Phase",
        tooltip: "Set the main game event.",
        options: [
          {
            id: 0,
            name: "No Event",
          },
          {
            id: 1,
            name: "Chrono Seeker",
          },
          {
            id: 2,
            name: "QPronicle Chord",
          },
        ],
        value: 1,
      },
    ],
  },
  {
    game: "dm",
    version: 18,
    settings: [
      {
        id: 0,
        keyId: "banner",
        type: "string",
        name: "Title Screen Banner",
        tooltip: "Set the text for the banner.",
        value: "",
      },
    ],
  },
];

const filterForm = reactive({
  game: null,
  version: null,
});

function listGames() {
  var games = [];
  for (const object of eventSettings) {
    const gameName = getGameInfo(object.game).name;
    if (games[gameName] == undefined) {
      games.push(gameName);
    }
  }

  return games;
}

function listVersions() {
  var versions = [];
  for (const object of eventSettings) {
    if (object.game == getGameInfo(filterForm.game).id) {
      const gameObject = getGameInfo(object.game);
      const version = object.version;
      if (versions[version] == undefined) {
        versions.push(gameObject.versions.find((x) => x.id == version).name);
      }
    }
  }

  return versions;
}

function getGameSettings() {
  const gameObject = getGameInfo(filterForm.game);
  const version = gameObject.versions.find((x) => x.name == filterForm.version);
  const data = eventSettings.find(
    (x) => x.game == gameObject.id && x.version == version.id
  );

  return data;
}

watch(
  () => filterForm.game,
  () => {
    filterForm.version = null; // Reset selected version to null
  }
);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <ArcadeCard class="mb-6" :arcade-data="thisArcade" />
      <SectionTitleLine
        :icon="mdiNewspaperVariantMultiple"
        title="Game Event Settings"
        main
      />

      <CardBox class="mb-6">
        <div class="mb-4">
          <FormField
            label="Select Game"
            help="Pick a game and version to get started."
          >
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <p class="pb-2 text-lg">Game</p>
                <FormControl
                  v-model="filterForm.game"
                  name="game"
                  :options="listGames()"
                />
              </div>
              <div v-if="filterForm.game">
                <p class="pb-2 text-lg">Version</p>
                <FormControl
                  v-model="filterForm.version"
                  name="version"
                  :options="listVersions()"
                />
              </div>
            </div>
          </FormField>
        </div>

        <div v-if="filterForm.game && filterForm.version">
          <h2 class="text-xl">
            Settings for
            <b>{{
              getGameTitle(getGameSettings().game, getGameSettings().version)
            }}</b>
          </h2>
          <hr class="pb-1 my-2" />

          <FormField
            v-for="setting in getGameSettings().settings"
            :key="setting.id"
            :label="setting.name"
            :help="setting.tooltip"
          >
            <FormControl
              v-if="setting.type == 'string'"
              v-model="setting.value"
              :model-value="setting.value"
              :name="setting.keyId"
              placeholder="Not Set"
            />
            <FormCheckRadio
              v-else-if="setting.type == 'bool'"
              v-model="setting.value"
              :input-value="setting.value"
              type="switch"
              :name="setting.keyId"
            />
            <FormControl
              v-if="setting.type == 'select'"
              v-model="multiSelectOptions(setting.options)[setting.value]"
              :name="setting.keyId"
              :options="multiSelectOptions(setting.options)"
              placeholder="Select..."
            />
          </FormField>
          <BaseButton
            color="success"
            type="submit"
            label="Save"
            :small="false"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
