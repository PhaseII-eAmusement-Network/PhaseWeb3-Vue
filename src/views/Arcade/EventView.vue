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
import {
  APIGetArcade,
  APIGetArcadeSettings,
  APIUpdateArcadeSettings,
} from "@/stores/api/arcade";

const optionForm = ref(null);
const filterForm = reactive({
  game: null,
  version: null,
});

const gamesWithSettings = reactive([]);
const bareForm = ref(null);
const arcadeData = ref(null);
const loading = ref(true);

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

async function loadArcade() {
  try {
    arcadeData.value = null;
    optionForm.value = {};
    bareForm.value = {};
    const data = await APIGetArcade(arcadeId);
    arcadeData.value = data;

    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

async function loadSettings() {
  try {
    optionForm.value = {};
    bareForm.value = {};
    const data = await APIGetArcadeSettings(
      arcadeId,
      filterForm.game,
      filterForm.version
    );
    optionForm.value = JSON.parse(JSON.stringify(data));
    bareForm.value = data;
  } catch (error) {
    console.error("Failed to fetch arcade setting data:", error);
  }
}

onMounted(() => {
  loadArcade();
  getGamesWithSettings();
});

function getGamesWithSettings() {
  for (const game of gameData) {
    const gameOptions = game.gameOptions;
    if (gameOptions) {
      gamesWithSettings.push({ game: game.id, gameOptions: gameOptions });
    }
  }
}

function makeGameList() {
  var gameList = [];
  for (const gameObject of gamesWithSettings) {
    if (gameObject.gameOptions) {
      gameList.push({
        id: gameObject.game,
        label: getGameInfo(gameObject.game).name,
      });
    }
  }
  return gameList;
}

function makeVersionOptions() {
  const selectedGame = gamesWithSettings.find((x) => x.game == filterForm.game);
  const game = getGameInfo(filterForm.game);
  var selectableVersions = [];
  for (const version of Object.entries(selectedGame.gameOptions)) {
    if (game.versions == undefined) {
      selectableVersions.push({
        id: version[0],
        label: game.name,
      });
      filterForm.version = 1;
    } else {
      const versionInfo = game.versions.find((x) => x.id == version[0]);
      selectableVersions.push({
        id: version[0],
        label: versionInfo.label,
      });
    }
  }
  return selectableVersions;
}

function getCurrentGameVersion() {
  const gameObject = getGameInfo(filterForm.game);
  var versionObject = null;
  if (gameObject.versions) {
    versionObject = gameObject.versions.find((x) => x.id == filterForm.version);
  }

  return `${gameObject.name} ${versionObject?.label ?? ""}`;
}

function getSettings() {
  const selectedGame = gamesWithSettings.find((x) => x.game == filterForm.game);
  return selectedGame.gameOptions[filterForm.version];
}

async function updateSettings() {
  const response = await APIUpdateArcadeSettings(
    arcadeId,
    filterForm.game,
    filterForm.version,
    optionForm.value
  );

  if (response.status != "error") {
    await loadSettings();
  }
}

watch(
  () => filterForm.game,
  () => {
    filterForm.version = null;
    optionForm.value = {};
  }
);

watch(
  () => filterForm.version,
  () => {
    if (filterForm.version) {
      loadSettings();
    }
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
                    :options="makeGameList()"
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
              v-for="setting in getSettings()"
              :key="setting.id"
              :label="setting.name"
              :help="setting.help"
            >
              <FormControl
                v-if="setting.type == 'String'"
                :model-value="getNestedValue(optionForm, setting.id) ?? ``"
                :name="setting.name"
                placeholder="Not Set"
                @update:model-value="
                  (value) => setNestedValue(optionForm, setting.id, value)
                "
              /><FormControl
                v-if="setting.type == 'LargeText'"
                :model-value="getNestedValue(optionForm, setting.id) ?? ``"
                :name="setting.name"
                placeholder="Not Set"
                type="textarea"
                @update:model-value="
                  (value) => setNestedValue(optionForm, setting.id, value)
                "
              />
              <FormCheckRadio
                v-if="setting.type == 'Boolean'"
                :name="setting.id"
                :model-value="
                  Boolean(getNestedValue(optionForm, setting.id) ?? 0)
                "
                :input-value="true"
                type="switch"
                @update:model-value="
                  (value) =>
                    setNestedValue(optionForm, setting.id, Number(value) ?? 0)
                "
              />
              <FormControl
                v-if="setting.type == 'Array'"
                :model-value="getNestedValue(optionForm, setting.id) ?? 0"
                :options="setting.options"
                :name="setting.id"
                :selected="getNestedValue(optionForm, setting.id) ?? 0"
                placeholder="Select..."
                @update:model-value="
                  (value) =>
                    setNestedValue(optionForm, setting.id, Number(value))
                "
              />
            </FormField>
            <div
              v-if="JSON.stringify(optionForm) != JSON.stringify(bareForm)"
              class="space-x-2 mt-6"
            >
              <BaseButton
                color="success"
                label="Save"
                @click="updateSettings()"
              />
              <BaseButton
                color="danger"
                label="Revert"
                @click="loadSettings()"
              />
            </div>
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
