<script setup>
import { ref, computed, onMounted } from "vue";
import {
  PhFilmReel,
  PhPlay,
  PhUploadSimple,
  PhVideo,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import { getGameInfo } from "@/constants";
import { formatSortableDate } from "@/constants/date";

import { APIGetPlayVideos } from "@/stores/api/account";
import { APIGetMusicData } from "@/stores/api/music";
import BaseDivider from "@/components/BaseDivider.vue";

const videoData = ref([]);
const loading = ref(false);
const musicData = ref({});
const newestVideo = ref(null);
const selectedVideo = ref(newestVideo);

const groupedVideos = computed(() => {
  const groups = [];

  for (const video of videoData.value) {
    let dateGroup = groups.find((group) => group.key === video.dateKey);

    if (!dateGroup) {
      dateGroup = {
        key: video.dateKey,
        label: video.dateLabel,
        games: [],
      };

      groups.push(dateGroup);
    }

    let gameGroup = dateGroup.games.find((group) => group.key === video.gameId);

    if (!gameGroup) {
      gameGroup = {
        key: video.gameId,
        name: video.game,
        videos: [],
      };

      dateGroup.games.push(gameGroup);
    }

    gameGroup.videos.push(video);
  }

  return groups;
});

const selectVideo = (video) => {
  selectedVideo.value = video;
};

async function loadVideos() {
  loading.value = true;

  try {
    const data = await APIGetPlayVideos();
    const videos = filterVideos(JSON.parse(JSON.stringify(data)));
    const musicIdsByGameVersion = {};

    for (const video of videos) {
      const game = video.gameId;
      const version = video.versionId;

      if (!musicIdsByGameVersion[game]) {
        musicIdsByGameVersion[game] = {};
      }

      if (!musicIdsByGameVersion[game][version]) {
        musicIdsByGameVersion[game][version] = new Set();
      }

      musicIdsByGameVersion[game][version].add(video.musicid);
    }

    const musicRequests = [];

    for (const [game, versions] of Object.entries(musicIdsByGameVersion)) {
      for (const [version, musicIds] of Object.entries(versions)) {
        musicRequests.push(
          APIGetMusicData(game, version, [...musicIds], true).then((songs) => ({
            game,
            version,
            songs,
          })),
        );
      }
    }

    const musicResults = await Promise.all(musicRequests);
    const sortedMusicData = {};

    for (const { game, version, songs } of musicResults) {
      if (!sortedMusicData[game]) {
        sortedMusicData[game] = {};
      }

      const songMap = Object.fromEntries(songs.map((song) => [song.id, song]));

      sortedMusicData[game][version] = Object.fromEntries(
        Object.entries(songMap).sort(([a], [b]) => Number(a) - Number(b)),
      );
    }

    musicData.value = Object.fromEntries(
      Object.entries(sortedMusicData)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([game, versions]) => [
          game,
          Object.fromEntries(
            Object.entries(versions).sort(([a], [b]) => Number(a) - Number(b)),
          ),
        ]),
    );

    videoData.value = videos.map((video) => {
      const song =
        musicData.value[video.gameId]?.[video.versionId]?.[video.musicid];

      return {
        ...video,
        name: song?.name || "Unknown Song",
        artist: song?.artist || "Unknown Artist",
      };
    });

    newestVideo.value = videoData.value[0] ?? null;
    selectedVideo.value = newestVideo.value;
  } catch (error) {
    console.error("Failed to fetch video data:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(async () => {
  await loadVideos();
});

function filterVideos(playVideos) {
  playVideos.sort((x, y) => y.timestamp - x.timestamp);

  for (const video of playVideos) {
    video.gameId = video.game;
    video.versionId = video.version;

    const game = getGameInfo(video.game);

    video.game = game.name;
    video.version =
      game.versions.find((x) => x.id == video.versionId)?.label ?? 0;

    const timestamp =
      video.timestamp < 100000000000 ? video.timestamp * 1000 : video.timestamp;

    const date = new Date(timestamp);

    video.dateKey = date.toISOString().slice(0, 10);
    video.dateLabel = date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    if (video.timestamp) {
      video.timestamp = formatSortableDate(video.timestamp);
    }
  }

  return playVideos;
}

const copyToClipboard = (text) => {
  if (text.data?.url) {
    text = text.data.url;
  }

  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied URL to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy to clipboard!");
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <template v-if="newestVideo">
        <SectionTitleLine :icon="PhVideo" title="Video Player" main />

        <CardBox class="mb-6">
          <div
            v-if="selectedVideo?.data?.status === 'uploaded'"
            class="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]"
          >
            <div>
              <video
                :key="selectedVideo?.data?.url"
                controls
                autoplay
                class="aspect-video w-full rounded-xl bg-black object-contain"
              >
                <source :src="selectedVideo?.data?.url" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            <div
              class="grid grid-cols-1 content-start gap-6 text-center xl:text-left"
            >
              <div class="space-y-2">
                <div>
                  <h1 class="text-2xl font-bold xl:text-4xl">
                    {{ selectedVideo?.name }}
                  </h1>

                  <h2 class="text-xl font-semibold xl:text-3xl">
                    {{ selectedVideo?.artist }}
                  </h2>
                </div>

                <BaseDivider class="mx-1" />

                <h3 class="text-xl font-light xl:text-2xl">
                  {{ selectedVideo?.game }}
                  {{ selectedVideo?.version }}
                </h3>

                <p>
                  {{ selectedVideo?.timestamp }}
                </p>
              </div>

              <div class="flex justify-center gap-2 xl:justify-start">
                <BaseButton
                  color="info"
                  label="Share"
                  @click="copyToClipboard(selectedVideo?.data?.url)"
                />
              </div>
            </div>
          </div>

          <div v-else>
            <div class="space-y-1 text-center">
              <h1 class="text-2xl font-bold xl:text-4xl">
                Your video is still uploading!
              </h1>

              <h2 class="text-xl font-light xl:text-2xl">
                Please wait for the upload to complete.
              </h2>

              <h2 class="text-xl">
                Upload started at {{ selectedVideo?.timestamp }}
              </h2>
            </div>
          </div>
        </CardBox>
      </template>

      <div class="flex items-center justify-between">
        <SectionTitleLine :icon="PhFilmReel" title="Video Library" main />
        <div
          class="-mt-4 flex items-center rounded-2xl bg-slate-900 p-3.5 drop-shadow-2xl"
        >
          <span>{{ videoData.length }} videos</span>
        </div>
      </div>

      <CardBox>
        <div class="space-y-10">
          <div
            v-for="dateGroup in groupedVideos"
            :key="dateGroup.key"
            class="space-y-5"
          >
            <div class="flex items-center gap-4">
              <div class="h-px flex-1 bg-slate-800" />
              <h2 class="text-sm font-semibold tracking-wider text-slate-400">
                {{ dateGroup.label }}
              </h2>
              <div class="h-px flex-1 bg-slate-800" />
            </div>

            <div
              v-for="gameGroup in dateGroup.games"
              :key="gameGroup.key"
              class="space-y-3"
            >
              <div class="flex items-center gap-2">
                <h3
                  class="text-base font-semibold text-slate-700 dark:text-slate-200"
                >
                  {{ gameGroup.name }}
                </h3>
                <span
                  class="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                >
                  {{ gameGroup.videos.length }}
                </span>
              </div>

              <div
                class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              >
                <button
                  v-for="video in gameGroup.videos"
                  :key="video.id"
                  type="button"
                  class="group overflow-hidden rounded-xl border text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-info"
                  :class="
                    selectedVideo?.id === video.id
                      ? 'border-blue-400 bg-slate-800 ring-2 ring-blue-400'
                      : 'border-slate-800 hover:border-info/60 hover:shadow-md'
                  "
                  @click="selectVideo(video)"
                >
                  <div
                    class="relative aspect-video overflow-hidden bg-slate-900"
                  >
                    <video
                      v-if="video?.data?.status === 'uploaded'"
                      :src="video?.data?.url"
                      preload="metadata"
                      muted
                      playsinline
                      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div
                      v-if="video?.data?.status === 'uploaded'"
                      class="absolute inset-0 flex items-center justify-center bg-black/10 transition-colors group-hover:bg-black/30"
                    >
                      <div
                        class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/90 text-slate-800/90 shadow-lg transition-transform group-hover:scale-110"
                      >
                        <template v-if="selectedVideo?.id === video.id">
                          <BaseIcon
                            :icon="PhPlay"
                            :size="24"
                            class="animate-pulse text-emerald-700"
                          />
                        </template>
                        <template v-else>
                          <BaseIcon :icon="PhPlay" :size="24" />
                        </template>
                      </div>
                    </div>

                    <div
                      v-else
                      class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900"
                    >
                      <BaseIcon :icon="PhUploadSimple" :size="20" />
                      <span class="text-sm font-medium"> Uploading </span>
                    </div>
                    <div
                      v-if="selectedVideo?.id === video.id"
                      class="absolute right-2 top-2 rounded-full bg-info px-2 py-1 text-xs font-semibold text-slate-100 drop-shadow-2xl"
                    >
                      <span>Selected</span>
                    </div>
                  </div>

                  <div class="space-y-1 p-4">
                    <h3 class="truncate font-semibold" :title="video?.name">
                      {{ video?.name }}
                    </h3>
                    <p
                      class="truncate text-sm text-slate-500 dark:text-slate-400"
                    >
                      {{ video?.artist }}
                    </p>
                    <div
                      class="flex items-center justify-between gap-2 pt-2 text-xs text-slate-400"
                    >
                      <span class="truncate">
                        {{ video?.version }}
                      </span>
                      <span class="shrink-0">
                        {{ video?.timestamp }}
                      </span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          <div
            v-if="!videoData.length"
            class="py-12 text-center text-slate-500 dark:text-slate-400"
          >
            <h3
              class="text-lg font-semibold text-slate-700 dark:text-slate-200"
            >
              No videos yet
            </h3>
            <p class="mt-1">Your uploaded videos will appear here.</p>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
