<script setup>
import { reactive, onMounted, watch, ref } from "vue";
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
import EmblemCardBox from "@/components/Cards/EmblemCardBox.vue";
import QproCardBox from "@/components/Cards/QproCardBox.vue";
import PillTag from "@/components/PillTag.vue";
import { getGameInfo } from "@/constants";
import { getVideoSource, getCardStyle } from "@/constants/sources";
import { getGameOptions } from "@/constants/options";

const $route = useRoute();
const $router = useRouter();
const mainStore = useMainStore();
var gameID = null;
var thisGame = null;

const versionForm = reactive({
  currentVersion: null,
});

watch(
  () => versionForm.currentVersion,
  () => {
    loadProfile();
  }
);

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

const optionForm = ref(null);
const myProfile = ref(null);

onMounted(() => {
  loadProfile();
});

function filterVersions(haveVersions) {
  var filtered = [];
  for (const version of thisGame.versions) {
    if (haveVersions.includes(version.id)) {
      filtered.push(version);
    }
  }
  return filtered;
}

async function loadProfile() {
  try {
    myProfile.value = null;
    optionForm.value = null;
    const data = await mainStore.getUserProfile(
      gameID,
      versionForm.currentVersion
    );
    myProfile.value = data;
    optionForm.value = data;

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
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
          v-if="thisGame.versions && myProfile"
          class="mt-2 md:mt-0 md:w-1/3 md:text-right"
        >
          <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
            Select Version
          </h2>
          <FormControl
            v-model="versionForm.currentVersion"
            :options="filterVersions(myProfile.versions)"
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
        v-if="versionForm.currentVersion && myProfile"
        :style="getCardStyle(thisGame, versionForm.currentVersion)"
        class="rounded-2xl mb-6 card-container"
      >
        <video
          autoplay
          muted
          loop
          playsinline
          :src="getVideoSource(thisGame, versionForm.currentVersion)"
          class="background-video"
        ></video>
        <div
          class="bg-white dark:bg-slate-900/90 rounded-2xl pt-6 p-3 card-content"
        >
          <div class="w-full">
            <ProfileCard
              v-if="myProfile"
              use-small
              :game="gameID"
              :profile="myProfile"
              :version="versionForm.currentVersion"
            />
          </div>
        </div>
      </div>

      <div v-if="versionForm.currentVersion && myProfile && optionForm">
        <CardBox>
          <form>
            <div>
              <PillTag color="info" label="General" class="mb-2" />
              <FormField
                v-for="setting of getGameOptions(
                  thisGame,
                  versionForm.currentVersion
                )"
                :key="setting.id"
                :label="setting.name"
                :help="setting.help"
              >
                <FormControl
                  v-if="setting.type == 'String'"
                  :name="setting.id"
                  :model-value="getNestedValue(optionForm, setting.id)"
                  :maxlength="setting.maxLength ?? 15"
                />

                <FormControl
                  v-if="setting.type == 'Number'"
                  :name="setting.id"
                  :model-value="getNestedValue(optionForm, setting.id)"
                  type="number"
                  onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                  min="0"
                  max="999"
                />

                <FormControl
                  v-if="setting.type == 'Array'"
                  :options="setting.options"
                  :name="setting.id"
                  :model-value="getNestedValue(optionForm, setting.id)"
                  :selected="getNestedValue(optionForm, setting.id)"
                />

                <FormCheckRadio
                  v-if="setting.type == 'Boolean'"
                  :name="setting.id"
                  :input-value="Boolean(getNestedValue(optionForm, setting.id))"
                  :model-value="Boolean(getNestedValue(optionForm, setting.id))"
                  type="switch"
                />
              </FormField>
            </div>

            <div class="space-x-2 mt-6">
              <BaseButton type="submit" color="success" label="Save" />
              <BaseButton type="submit" color="danger" label="Revert" />
            </div>
          </form>
        </CardBox>

        <EmblemCardBox
          v-if="
            gameID == 'jubeat' &&
            versionForm.currentVersion >= 10 &&
            myProfile.last?.emblem
          "
          :profile="myProfile"
          :version="versionForm.currentVersion"
        />
        <QproCardBox
          v-if="
            (gameID == 'iidx' || gameID == 'iidxclass') &&
            versionForm.currentVersion >= 19
          "
          :profile="myProfile"
          :version="versionForm.currentVersion"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
