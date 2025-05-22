<script setup>
import { reactive, onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mdiAccountTieHat } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormControl from "@/components/FormControl.vue";
import EmblemCardBox from "@/components/Cards/EmblemCardBox.vue";
import QproCardBox from "@/components/Cards/QproCardBox.vue";
import AkanameCardBox from "@/components/Cards/AkanameCardBox.vue";
import StickerCardBox from "@/components/Cards/StickerCardBox.vue";
import PillTag from "@/components/PillTag.vue";

import { APIGetProfile, APIUpdateProfile } from "@/stores/api/profile";
import {
  getNestedValue,
  setNestedValue,
  transformNonUnicode,
  transformUnicode,
} from "@/constants/values";
import { getGameInfo } from "@/constants";
import { getGameOptions } from "@/constants/options";

const $route = useRoute();
const $router = useRouter();
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
const bareForm = ref(null);
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
    optionForm.value = {};
    bareForm.value = {};
    const data = await APIGetProfile(gameID, versionForm.currentVersion);
    myProfile.value = data;

    // Deep clone nested values from myProfile to optionForm using paths
    for (const setting of getGameOptions(
      thisGame,
      versionForm.currentVersion
    )) {
      const value = getNestedValue(myProfile.value, setting.id);
      setNestedValue(optionForm.value, setting.id, value);
      setNestedValue(bareForm.value, setting.id, value);
    }

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

async function updateProfile() {
  const response = await APIUpdateProfile(
    thisGame.id,
    versionForm.currentVersion,
    optionForm.value
  );

  if (response.status != "error") {
    await loadProfile();
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <GameHeader :game="thisGame" :version="versionForm.currentVersion">
        <div
          v-if="thisGame.versions && myProfile"
          class="w-full md:flex md:-mt-[75px] mb-4 place-content-end"
        >
          <div class="md:w-1/3 md:text-right">
            <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
              Select Version
            </h2>
            <FormControl
              v-model="versionForm.currentVersion"
              :options="filterVersions(myProfile.versions)"
            />
          </div>
        </div>

        <div v-if="myProfile" class="w-full">
          <ProfileCard
            :game="gameID"
            :version="versionForm.currentVersion"
            :profile="myProfile"
            use-small
          >
          </ProfileCard>
        </div>
      </GameHeader>

      <SectionTitleLine
        v-if="versionForm.currentVersion"
        :icon="mdiAccountTieHat"
        title="Profile Customizations"
        main
      />
      <div v-if="versionForm.currentVersion && myProfile">
        <CardBox is-form>
          <form @submit.prevent="updateProfile()">
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
                :model-value="getNestedValue(optionForm, setting.id) ?? ``"
                :name="setting.id"
                :maxlength="setting.maxLength ?? 15"
                @update:model-value="
                  (value) =>
                    setNestedValue(
                      optionForm,
                      setting.id,
                      setting.useUnicode
                        ? transformUnicode(value, setting.maxLength)
                        : transformNonUnicode(value, setting.maxLength)
                    )
                "
              />

              <FormControl
                v-if="setting.type == 'Number'"
                :model-value="getNestedValue(optionForm, setting.id) ?? 0"
                :name="setting.id"
                type="number"
                onkeypress="return event.charCode >= 48 && event.charCode <= 57"
                min="0"
                max="10000"
                @update:model-value="
                  (value) =>
                    setNestedValue(optionForm, setting.id, Number(value))
                "
              />

              <FormControl
                v-if="setting.type == 'Array'"
                :model-value="getNestedValue(optionForm, setting.id) ?? 0"
                :options="setting.options"
                :name="setting.id"
                :selected="getNestedValue(myProfile, setting.id) ?? 0"
                @update:model-value="
                  (value) =>
                    setNestedValue(optionForm, setting.id, Number(value))
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
            </FormField>

            <div
              v-if="JSON.stringify(optionForm) !== JSON.stringify(bareForm)"
              class="space-x-2 mt-6"
            >
              <BaseButton color="success" label="Save" type="submit" />
              <BaseButton
                color="danger"
                label="Revert"
                @click="loadProfile()"
              />
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
        <AkanameCardBox
          v-if="gameID == 'sdvx' && versionForm.currentVersion >= 5"
          :profile="myProfile"
          :version="versionForm.currentVersion"
        />
        <StickerCardBox
          v-if="
            (gameID == 'gitadora_dm' || gameID == 'gitadora_gf') &&
            versionForm.currentVersion >= 9
          "
          :profile="myProfile"
          :game="gameID"
          :version="versionForm.currentVersion"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
