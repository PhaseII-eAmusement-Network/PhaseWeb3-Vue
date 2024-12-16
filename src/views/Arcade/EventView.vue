<script setup>
import { reactive, ref, watch, onMounted } from "vue";
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
import { gameData, getGameInfo } from "@/constants";
import { getNestedValue, setNestedValue } from "@/constants/values";
import { APIGetArcade } from "@/stores/api/arcade";

const optionForm = ref(null);
const bareForm = ref(null);
const arcadeData = ref(null);
const loading = ref(true);

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

var arcadeOptions = [
  {
    id: "data.paseli_enabled",
    name: "PASELI Enabled.",
    help: "Enable PASELI for this arcade.",
    type: "Boolean",
  },
];

async function loadArcade() {
  try {
    arcadeData.value = null;
    optionForm.value = {};
    bareForm.value = {};
    const data = await APIGetArcade(arcadeId);
    arcadeData.value = data;

    for (const setting of arcadeOptions) {
      const value = getNestedValue(arcadeData.value, setting.id);
      setNestedValue(optionForm.value, setting.id, value);
      setNestedValue(bareForm.value, setting.id, value);
    }
    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

onMounted(() => {
  loadArcade();
});

const eventSettings = [
  {
    id: "iidx",
    versions: [
      {
        id: 22,
        settings: [
          {
            id: 0,
            keyId: "coke",
            type: Boolean,
            name: "Enable Coke-X-BEMANI",
            tooltip: "Enables the long forgotten Coca-Cola event.",
            value: true,
          },
          {
            id: 1,
            keyId: "phase",
            type: Array,
            name: "Current BOSS Phase",
            tooltip: "Set the main game event.",
            options: [
              {
                id: 0,
                label: "No Event",
              },
              {
                id: 1,
                label: "Chrono Seeker",
              },
              {
                id: 2,
                label: "QPronicle Chord",
              },
            ],
            value: 1,
          },
        ],
      },
    ],
  },
  {
    id: "dm",
    versions: [
      {
        id: 18,
        settings: [
          {
            id: 0,
            keyId: "banner",
            type: String,
            name: "Title Screen Banner",
            tooltip: "Set the text for the banner.",
            value: "",
          },
        ],
      },
      {
        id: 17,
        settings: [
          {
            id: 0,
            keyId: "banner",
            type: String,
            name: "Title Screen Banner",
            tooltip: "Set the text for the banner.",
            value: "",
          },
        ],
      },
    ],
  },
];

const filterForm = reactive({
  game: null,
  version: null,
});

function getGamesWithSettings() {
  var gamesWithSettings = [];
  for (const game of gameData) {
    const gameSettings = eventSettings.find((x) => x.id == game.id);
    if (gameSettings) {
      gamesWithSettings.push(game.id);
    }
  }
  return gamesWithSettings;
}

function makeGameOptions() {
  var gameOptions = [];
  const gamesWithSettings = getGamesWithSettings();
  for (const game of gamesWithSettings) {
    gameOptions.push({
      id: game,
      label: getGameInfo(game).name,
    });
  }
  return gameOptions;
}

function makeVersionOptions() {
  const selectedGame = eventSettings.find((x) => x.id == filterForm.game);
  var gameVersions = [];
  for (const version of selectedGame.versions) {
    const versionInfo = getGameInfo(filterForm.game).versions.find(
      (x) => x.id == version.id
    );

    gameVersions.push({
      id: version.id,
      label: versionInfo.label,
    });
  }
  return gameVersions;
}

function getGameSettings() {
  const settings = eventSettings.find((x) => x.id == filterForm.game);

  return settings.versions.find((x) => x.id == filterForm.version);
}

function getCurrentGameVersion() {
  const gameObject = getGameInfo(filterForm.game);
  const versionObject = gameObject.versions.find(
    (x) => x.id == filterForm.version
  );

  return `${gameObject.name} ${versionObject.label}`;
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
      <template v-if="!loading">
        <ArcadeCard class="mb-6" :arcade="arcadeData" :use-small="true" />
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
                    :options="makeGameOptions()"
                  />
                </div>
                <div v-if="filterForm.game">
                  <p class="pb-2 text-lg">Version</p>
                  <FormControl
                    v-model="filterForm.version"
                    name="version"
                    :options="makeVersionOptions()"
                  />
                </div>
              </div>
            </FormField>
          </div>

          <div v-if="filterForm.game && filterForm.version">
            <h2 class="text-xl">
              Settings for
              <b>{{ getCurrentGameVersion() }}</b>
            </h2>
            <hr class="pb-1 my-2" />

            <FormField
              v-for="setting in getGameSettings().settings"
              :key="setting.id"
              :label="setting.name"
              :help="setting.tooltip"
            >
              <FormControl
                v-if="setting.type == String"
                v-model="setting.value"
                :model-value="setting.value"
                :name="setting.keyId"
                placeholder="Not Set"
              />
              <FormCheckRadio
                v-else-if="setting.type == Boolean"
                v-model="setting.value"
                :input-value="setting.value"
                type="switch"
                :name="setting.keyId"
              />
              <FormControl
                v-if="setting.type == Array"
                v-model="setting.options[setting.value]"
                :name="setting.keyId"
                :options="setting.options"
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
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
