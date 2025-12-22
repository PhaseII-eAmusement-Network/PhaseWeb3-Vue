<script setup>
import { reactive, ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhUsersThree, PhCalendarDots } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import CardBox from "@/components/CardBox.vue";
import FormControl from "@/components/FormControl.vue";
import ProfileCard from "@/components/Cards/ProfileCard.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import PillTag from "@/components/PillTag.vue";
import HitchartCardBox from "@/components/Cards/HitchartCardBox.vue";
import SongCardSmall from "@/components/Cards/SongCardSmall.vue";

import { APIGetProfile, APIGetGame } from "@/stores/api/profile";
import { APIGetMusicData } from "@/stores/api/music";
import { getGameInfo } from "@/constants";
import { dashCode } from "@/constants/userData";
import { getIIDXDan } from "@/constants/danClass";
import { formatSortableDate } from "@/constants/date";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const $route = useRoute();
const $router = useRouter();
var gameID = null;
var thisGame = null;

const myProfile = ref(null);
const myVersions = ref(null);
const profiles = ref([]);
const hitchartData = ref(null);
const timeSensitiveData = ref([]);
const musicIds = ref([]);
const musicData = ref(null);
const versionEvents = ref(null);

const versionForm = reactive({
  currentVersion: null,
});

watch(
  () => versionForm.currentVersion,
  () => {
    mainStore.continueLoad = true;
    loadGame(versionForm.currentVersion, profiles.length != 0);
    loadProfile();
    musicIds.value = [];
    mainStore.continueLoad = false;
    mainStore.isLoading = false;
    mainStore.loadingPool.length = 0;
  },
);

gameID = $route.params.id;
thisGame = getGameInfo(gameID);

if (thisGame == null) {
  $router.push({
    name: "ErrorPage",
    params: {
      catchAll: "404",
    },
  });
}

onMounted(async () => {
  mainStore.continueLoad = true;
  await loadProfile();
  await loadGame(null, profiles.length == 0);
  mainStore.continueLoad = false;
  mainStore.isLoading = false;
  mainStore.loadingPool.length = 0;
});

if (!thisGame.versions) {
  versionForm.currentVersion = 1;
}

async function loadGame(version, noUsers) {
  try {
    const data = await APIGetGame(gameID, version, noUsers);
    if (profiles.value.length === 0 && !noUsers) {
      profiles.value = formatProfiles(data.profiles);
    }
    hitchartData.value = data.hitchart;
    timeSensitiveData.value = data.scheduledEvents;
    getVersionEvents();
    musicIds.value = getHitchartIds(data.hitchart).concat(
      getEventIds(data.scheduledEvents),
    );
    await getMusicData();
    hitchartData.value = formatHitchart(data.hitchart);
  } catch (error) {
    console.error("Failed to fetch profile data:", error);
  }
}

async function loadProfile() {
  try {
    myProfile.value = null;
    const data = await APIGetProfile(gameID, versionForm.currentVersion);
    if (!data) {
      return;
    }
    myProfile.value = data.profile;
    myVersions.value = data.versions;

    if (data && !versionForm.currentVersion) {
      versionForm.currentVersion = data.versions[data.versions.length - 1];
    }
  } catch (error) {
    console.error("Failed to fetch user profile data:", error);
  }
}

const headers = [];
headers.push({
  text: "Player",
  value: "username",
  sortable: true,
  width: 120,
});

if (!thisGame.noRivals) {
  headers.push({
    text: "Rival ID",
    value: "extid",
    sortable: true,
    width: 100,
  });
}

headers.push(
  {
    text: "Last Play",
    value: "stats.last_play_timestamp",
    sortable: true,
    width: 150,
  },
  {
    text: "Last Arcade",
    value: "stats.last_play_arcade",
    sortable: true,
    width: 150,
  },
  { text: "Plays", value: "stats.total_plays", sortable: true, width: 50 },
);

if (thisGame.playerHeaders) {
  for (var header of thisGame.playerHeaders) {
    headers.push(header);
  }
}

function formatProfiles(profiles) {
  var formattedItems = [];
  for (var item of profiles) {
    if (item.extid) {
      item.extid = dashCode(item.extid);
    }

    if (item.stats) {
      if (item.stats.last_play_timestamp) {
        item.stats.last_play_timestamp = formatSortableDate(
          item.stats.last_play_timestamp,
        );
      }

      if (item.sgrade) {
        item.sgrade = getIIDXDan(item.sgrade).short;
      }

      if (item.dgrade) {
        item.dgrade = getIIDXDan(item.dgrade).short;
      }
    }

    formattedItems.push(item);
  }

  formattedItems.sort((a, b) => {
    const totalPlaysA = a.stats ? a.stats.total_plays || 0 : 0;
    const totalPlaysB = b.stats ? b.stats.total_plays || 0 : 0;
    return totalPlaysB - totalPlaysA; // Sort in descending order
  });
  return formattedItems;
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

const navigateToProfile = (item) => {
  const userID = item.userId;
  $router.push(`/games/${gameID}/profiles/${userID}`);
};

function getVersionEvents() {
  if (!thisGame.scheduledEvents) {
    return null;
  }
  versionEvents.value =
    thisGame.scheduledEvents[versionForm.currentVersion] ?? null;
  return versionEvents.value;
}

async function getMusicData() {
  if (musicIds.value.length) {
    const data = await APIGetMusicData(
      gameID,
      versionForm.currentVersion,
      musicIds.value,
      true,
    );
    musicData.value = data;
  }
}

function getMusic(id) {
  if (!musicData.value) {
    return null;
  }
  return musicData.value.find((x) => x.id == id);
}

function getEventSetting(eventId) {
  const setting = timeSensitiveData.value.find((x) => x.id == eventId);
  return setting;
}

function getHitchartIds(data) {
  var hitchartIds = [];

  for (const dataId in data) {
    const songid = data[dataId][0];
    hitchartIds.push(songid);
  }

  return hitchartIds;
}

function getEventIds(eventData) {
  if (versionEvents.value == null) {
    return [];
  }

  var eventIds = [];
  for (const event of versionEvents.value) {
    const setting = eventData.find((x) => x.id == event.id);

    if (setting?.data?.music) {
      if (Array.isArray(setting?.data.music)) {
        for (const music of setting.data.music) {
          eventIds.push(music);
        }
      } else {
        eventIds.push(setting?.data.music);
      }
    }

    if (setting?.data?.today) {
      eventIds.push(setting?.data.today);
    }

    if (setting?.data?.whim) {
      eventIds.push(setting?.data.whim);
    }
  }
  return eventIds;
}

function formatHitchart(data) {
  var formattedData = [];
  for (const dataId in data) {
    const songid = data[dataId][0];
    const plays = data[dataId][1];
    const song = getMusic(songid);

    formattedData.push({
      songid: songid,
      plays: plays,
      name: song?.name,
      artist: song?.artist,
    });
  }

  return formattedData;
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
              :options="filterVersions(myVersions)"
            />
          </div>
        </div>

        <div v-if="myProfile" class="w-full">
          <ProfileCard
            :game="gameID"
            :version="versionForm.currentVersion"
            :profile="myProfile"
          >
          </ProfileCard>
        </div>
      </GameHeader>

      <div
        v-if="versionEvents || !thisGame.noScores"
        class="grid lg:grid-cols-2 items-stretch w-full gap-6 mb-6"
      >
        <div
          v-if="!thisGame.noScores && hitchartData"
          :class="{
            'md:col-span-2': !versionEvents,
          }"
        >
          <HitchartCardBox :hitchart-data="hitchartData" :game-id="gameID" />
        </div>

        <div v-if="versionEvents != null">
          <SectionTitleLine
            :icon="PhCalendarDots"
            color="text-emerald-400"
            title="Scheduled Events"
            main
          />
          <CardBox>
            <div v-if="musicData" class="grid gap-6">
              <div v-for="event of versionEvents" :key="event.id">
                <div v-if="getEventSetting(event.id)">
                  <div v-if="event.id">
                    <PillTag color="info" :label="event.duration" />
                    <h1 class="text-xl font-bold">
                      {{ event.name }}
                    </h1>

                    <div class="text-md font-light flex gap-2">
                      <h1>
                        Started
                        <span class="font-normal">
                          {{
                            formatSortableDate(
                              getEventSetting(event.id)?.start_time,
                            )
                          }}
                        </span>
                      </h1>
                      <span>|</span>
                      <h1>
                        Expires
                        <span class="font-normal">
                          {{
                            formatSortableDate(
                              getEventSetting(event.id)?.end_time,
                            )
                          }}
                        </span>
                      </h1>
                    </div>
                    <template
                      v-if="
                        Array.isArray(getEventSetting(event.id)?.data?.music) &&
                        musicData
                      "
                    >
                      <div class="flex gap-6 text-lg mt-3">
                        <SongCardSmall
                          v-for="musicId of getEventSetting(event.id).data
                            .music"
                          :game-id="gameID"
                          :music-data="getMusic(musicId)"
                        />
                      </div>
                    </template>
                    <template
                      v-else-if="getEventSetting(event.id)?.data?.music"
                    >
                      <div class="flex mt-3">
                        <SongCardSmall
                          :game-id="gameID"
                          :music-data="
                            getMusic(getEventSetting(event.id)?.data?.music)
                          "
                        />
                      </div>
                    </template>
                    <template v-if="getEventSetting(event.id)?.data?.today">
                      <SongCardSmall
                        :game-id="gameID"
                        :music-data="
                          getMusic(getEventSetting(event.id)?.data?.today)
                        "
                      />
                    </template>
                    <template v-if="getEventSetting(event.id)?.data?.whim">
                      <SongCardSmall
                        :game-id="gameID"
                        :music-data="
                          getMusic(getEventSetting(event.id)?.data?.whim)
                        "
                      />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </CardBox>
        </div>
      </div>

      <SectionTitleLine
        :icon="PhUsersThree"
        color="text-blue-400"
        title="All Players"
        main
      />
      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="profiles"
              @row-clicked="navigateToProfile"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
