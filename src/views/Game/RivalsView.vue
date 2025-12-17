<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhSword, PhPlusCircle } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";

import {
  APIGetProfile,
  APIGetGame,
  APIGetLinks,
  APIUpdateProfile,
  APIPutLink,
  APIDeleteLink,
} from "@/stores/api/profile";
import { getGameInfo, GameConstants, VersionConstants } from "@/constants";
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
const maxRivals = ref(null);
const maxActiveRivals = ref(null);
const activeRivals = ref(null);

watch(
  () => versionForm.currentVersion,
  () => {
    loadProfile();
    loadLinks();
    loadAllProfiles();
    versionMaxRivals();
  },
);

onMounted(async () => {
  await loadAll();
});

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

async function loadAll() {
  loadAllProfiles();
  await loadProfile();
  loadLinks();
  filterForm.filter = null;
}

async function loadProfile() {
  try {
    profile.value = null;
    const data = await APIGetProfile(gameID, versionForm.currentVersion);
    profile.value = data;

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }

    if (thisGame.useActiveRival) {
      getActiveRivals();
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

async function loadLinks() {
  try {
    links.value = null;
    var linkData = await APIGetLinks(gameID, versionForm.currentVersion);
    links.value = linkData;
  } catch (error) {
    console.error("Failed to fetch user link data:", error);
  }
}

async function loadAllProfiles() {
  try {
    const data = await APIGetGame(gameID, versionForm.currentVersion);
    allProfiles.value = data.profiles;
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
  var inputForm = JSON.parse(JSON.stringify(filterForm.filter));
  if (inputForm) {
    inputForm = inputForm.replace(/-/g, "");
    return allProfiles.value.filter(
      (rival) =>
        rival.username.toLowerCase().includes(inputForm.toLowerCase()) ||
        rival.extid.toString().toLowerCase().includes(inputForm.toLowerCase()),
    );
  }
}

function checkDisabled(rivalId) {
  if (rivalId == profile.value?.userId) {
    return true;
  }

  if (links.value == null) {
    return false;
  }

  if (links.value.length >= maxRivals.value) {
    return true;
  }

  return links.value.some((link) => link.otherUserId === rivalId);
}

function versionMaxRivals() {
  const versionInfo = thisGame.versions.find(
    (version) => version.id == versionForm.currentVersion,
  );

  maxRivals.value = versionInfo?.maxRivals ?? 3;
  maxActiveRivals.value = versionInfo?.maxActiveRivals ?? 3;
}

function getActiveRivals() {
  if (!profile.value?.last) {
    activeRivals.value = [];
    return;
  }

  var rivalList = [];
  const keys = ["fri", "rival1", "rival2", "rival3"];
  for (const key of keys) {
    const rivalId = profile.value?.last[key];
    if (rivalId >= 1) {
      rivalList.push(rivalId);
    }
  }

  activeRivals.value = rivalList;
}

async function addRival(otherUserId) {
  if (links.value && links.value.length >= maxRivals.value) {
    return;
  }

  var type = "rival";
  if (thisGame?.useActiveRival) {
    const usedTypes = new Set(
      (links.value ?? [])
        .map((link) => {
          if (link?.type?.startsWith("friend_")) {
            return parseInt(link.type.replace("friend_", ""), 10);
          }
          return null;
        })
        .filter((v) => v !== null && !isNaN(v)),
    );

    var availableId = null;
    for (let i = 0; i <= 9; i++) {
      if (!usedTypes.has(i)) {
        availableId = i;
        break;
      }
    }
    type = `friend_${availableId}`;
  }

  try {
    await APIPutLink(gameID, versionForm.currentVersion, otherUserId, type);
    await loadAll();
  } catch (error) {
    console.error("Failed to add rival:", error);
  }
}

async function deleteRival(otherUserId, type) {
  try {
    const deleteState = await APIDeleteLink(
      gameID,
      versionForm.currentVersion,
      otherUserId,
      type,
    );
    if (deleteState) {
      if (thisGame.useActiveRival) {
        await setInactive(type);
      }
    }

    await loadAll();
  } catch (error) {
    console.error("Failed to delete rival:", error);
  }
}

async function setActive(type) {
  var lastObject = profile.value?.last ?? {};
  var rivalPosition = null;
  if (type.startsWith("friend_")) {
    rivalPosition = parseInt(type.replace("friend_", ""), 10);
  } else {
    return;
  }

  if ([GameConstants.DDR, GameConstants.DDROMNI].includes(gameID)) {
    if (
      [VersionConstants.DDR_X, VersionConstants.DDR_X2].includes(
        versionForm.currentVersion,
      )
    ) {
      lastObject.fri = rivalPosition + 1;
    } else {
      if (!lastObject.rival1 || lastObject.rival1 < 1) {
        lastObject.rival1 = rivalPosition + 1;
      } else if (!lastObject.rival2 || lastObject.rival2 < 1) {
        lastObject.rival2 = rivalPosition + 1;
      } else if (!lastObject.rival3 || lastObject.rival3 < 1) {
        lastObject.rival3 = rivalPosition + 1;
      }
    }
  }

  await APIUpdateProfile(gameID, versionForm.currentVersion, {
    last: lastObject,
  });
  await loadAll();
}

async function setInactive(type) {
  var lastObject = profile.value?.last ?? {};
  var rivalPosition = null;

  if (type.startsWith("friend_")) {
    rivalPosition = parseInt(type.replace("friend_", ""), 10);
  } else {
    return;
  }

  if ([GameConstants.DDR, GameConstants.DDROMNI].includes(gameID)) {
    if (
      [VersionConstants.DDR_X, VersionConstants.DDR_X2].includes(
        versionForm.currentVersion,
      )
    ) {
      if (lastObject.fri === rivalPosition + 1) {
        lastObject.fri = 0;
      }
    } else {
      if (lastObject.rival1 === rivalPosition + 1) {
        lastObject.rival1 = 0;
      } else if (lastObject.rival2 === rivalPosition + 1) {
        lastObject.rival2 = 0;
      } else if (lastObject.rival3 === rivalPosition + 1) {
        lastObject.rival3 = 0;
      }
    }
  }

  await APIUpdateProfile(gameID, versionForm.currentVersion, {
    last: lastObject,
  });
  await loadAll();
}

const getLinkNum = (type) => {
  if (type.startsWith("friend_")) {
    return parseInt(type.replace("friend_", ""), 10) + 1;
  } else {
    return;
  }
};

const navigateToProfile = (userID) => {
  $router.push(`/games/${gameID}/profiles/${userID}`);
};
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
            <div class="grid md:flex gap-2 w-full place-content-between">
              <div>
                <h1 class="text-lg md:text-xl">{{ player.username }}</h1>
                <h2 class="text-md md:text-lg font-mono">
                  {{ dashCode(player.extid) }}
                </h2>
              </div>

              <BaseButtons>
                <BaseButton
                  label="Open Profile"
                  color="info"
                  @click="navigateToProfile(player.userId)"
                />
                <BaseButton
                  label="Add Rival"
                  color="success"
                  :disabled="checkDisabled(player.userId)"
                  @click="addRival(player.userId)"
                />
              </BaseButtons>
            </div>
          </div>
        </div>
      </CardBox>

      <SectionTitleLine :icon="PhSword" title="Rivals" main />
      <h2 class="text-xl rounded-2xl p-4 my-2 bg-slate-900">
        {{ links?.length ?? 0 }} / {{ maxRivals }} added
        <template v-if="thisGame?.useActiveRival">
          -
          <span
            >{{ activeRivals?.length ?? 0 }} /
            {{ maxActiveRivals }} active</span
          >
        </template>
      </h2>
      <CardBox v-if="versionForm.currentVersion" class="mb-6">
        <div class="grid gap-3">
          <CardBox
            v-for="link of links"
            :key="getLinkNum(link?.type)"
            color-prop="bg-slate-800 dark:bg-slate-800"
          >
            <div class="grid gap-2 md:flex justify-between items-center">
              <div class="flex">
                <h1 class="text-lg">
                  {{ link?.otherProfileData?.username }}
                  <template v-if="thisGame?.useActiveRival">
                    -
                    <span
                      v-if="activeRivals.includes(getLinkNum(link?.type))"
                      class="text-emerald-500"
                      >Active</span
                    >
                    <span v-else class="text-red-500">Inactive</span>
                  </template>
                </h1>
              </div>

              <BaseButtons>
                <BaseButton
                  label="Open Profile"
                  color="info"
                  @click="navigateToProfile(link?.otherUserId)"
                />
                <template v-if="thisGame?.useActiveRival">
                  <BaseButton
                    v-if="activeRivals.includes(getLinkNum(link?.type))"
                    label="Set Inactive"
                    color="warning"
                    @click="setInactive(link?.type)"
                  />
                  <BaseButton
                    v-else
                    label="Set Active"
                    color="success"
                    :disabled="activeRivals.length >= maxActiveRivals"
                    @click="setActive(link?.type)"
                  />
                </template>
                <BaseButton
                  label="Remove Rival"
                  color="danger"
                  @click="deleteRival(link?.otherUserId, link?.type)"
                />
              </BaseButtons>
            </div>
          </CardBox>

          <template v-if="!links || !links.length">
            <span class="text-xl">No rivals!</span>
          </template>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
