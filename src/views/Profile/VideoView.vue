<script setup>
import { ref, computed, onMounted } from "vue";
import {
  PhCaretRight,
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
      <UserCard class="mb-4 sm:mb-6" use-small even-smaller />

      <template v-if="newestVideo">
        <SectionTitleLine :icon="PhVideo" title="Video Player" main />

        <CardBox class="mb-4 sm:mb-6">
          <div
            v-if="selectedVideo?.data?.status === 'uploaded'"
            class="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(300px,1fr)] xl:gap-5"
          >
            <video
              :key="selectedVideo?.data?.url"
              controls
              autoplay
              class="aspect-video w-full rounded-lg bg-black object-contain sm:rounded-xl"
            >
              <source :src="selectedVideo?.data?.url" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div class="flex flex-col justify-center text-center xl:text-left">
              <div class="space-y-1">
                <h1 class="truncate text-xl font-bold sm:text-2xl">
                  {{ selectedVideo?.name }}
                </h1>

                <h2
                  class="truncate text-base font-semibold text-slate-400 sm:text-xl"
                >
                  {{ selectedVideo?.artist }}
                </h2>

                <BaseDivider class="mx-1" />

                <p class="text-sm text-slate-400">
                  {{ selectedVideo?.game }}
                  {{ selectedVideo?.version }}
                </p>

                <p class="text-xs text-slate-500">
                  {{ selectedVideo?.timestamp }}
                </p>
              </div>

              <div class="mt-4 flex justify-center xl:justify-start">
                <BaseButton
                  color="info"
                  label="Share"
                  @click="copyToClipboard(selectedVideo?.data?.url)"
                />
              </div>
            </div>
          </div>

          <div v-else class="py-4 text-center sm:py-8">
            <h1 class="text-xl font-bold sm:text-2xl">
              Your video is still uploading!
            </h1>

            <p class="mt-1 text-sm text-slate-400 sm:text-base">
              Please wait for the upload to complete.
            </p>

            <p class="mt-2 text-xs text-slate-500 sm:text-sm">
              Upload started at {{ selectedVideo?.timestamp }}
            </p>
          </div>
        </CardBox>
      </template>

      <div class="mb-2 flex items-center justify-between gap-3">
        <SectionTitleLine :icon="PhFilmReel" title="Video Library" main />
        <div
          class="-mt-3 flex shrink-0 items-center rounded-xl bg-slate-900 px-3 py-2 text-xs font-medium text-slate-300 drop-shadow-xl sm:-mt-4 sm:px-3.5 sm:py-2.5 sm:text-sm"
        >
          {{ videoData.length }} videos
        </div>
      </div>

      <CardBox>
        <div class="space-y-2">
          <details
            v-for="(dateGroup, dateIndex) in groupedVideos"
            :key="dateGroup.key"
            :open="dateIndex === 0"
            class="group"
          >
            <summary
              class="flex cursor-pointer list-none items-center gap-2 rounded-lg px-2 py-2.5 transition-colors hover:bg-slate-800/60 [&::-webkit-details-marker]:hidden"
            >
              <div
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-transform group-open:rotate-90"
              >
                <BaseIcon :icon="PhCaretRight" :size="15" />
              </div>

              <span
                class="min-w-0 flex-1 truncate text-sm font-semibold text-slate-300"
              >
                {{ dateGroup.label }}
              </span>

              <span
                class="shrink-0 rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-500 sm:text-xs"
              >
                {{
                  dateGroup.games.reduce(
                    (total, game) => total + game.videos.length,
                    0,
                  )
                }}
              </span>
            </summary>

            <div class="ml-2 border-l border-slate-800 pl-2 sm:ml-3 sm:pl-3">
              <div class="space-y-1">
                <details
                  v-for="(gameGroup, gameIndex) in dateGroup.games"
                  :key="gameGroup.key"
                  :open="dateIndex === 0 && gameIndex === 0"
                  class="group"
                >
                  <summary
                    class="flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-2 transition-colors hover:bg-slate-800/40 [&::-webkit-details-marker]:hidden"
                  >
                    <div
                      class="flex h-4 w-4 shrink-0 items-center justify-center text-slate-500 transition-transform group-open:rotate-90"
                    >
                      <BaseIcon :icon="PhCaretRight" :size="10" />
                    </div>

                    <span
                      class="min-w-0 flex-1 truncate text-xs font-semibold text-slate-400 sm:text-sm"
                    >
                      {{ gameGroup.name }}
                    </span>

                    <span
                      class="shrink-0 text-[10px] tabular-nums text-slate-600 sm:text-xs"
                    >
                      {{ gameGroup.videos.length }}
                    </span>
                  </summary>

                  <div class="pb-3 pl-2 pt-1 sm:pl-3">
                    <div
                      class="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
                    >
                      <button
                        v-for="video in gameGroup.videos"
                        :key="video.id"
                        type="button"
                        class="group/card overflow-hidden rounded-lg border text-left transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-info"
                        :class="
                          selectedVideo?.id === video.id
                            ? 'border-blue-400 bg-slate-800 ring-1 ring-blue-400'
                            : 'border-slate-800 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-800/60'
                        "
                        @click="selectVideo(video)"
                      >
                        <div
                          class="relative aspect-video overflow-hidden bg-slate-950"
                        >
                          <video
                            v-if="video?.data?.status === 'uploaded'"
                            :src="video?.data?.url"
                            preload="none"
                            muted
                            playsinline
                            class="h-full w-full object-cover transition-transform duration-200 group-hover/card:scale-105"
                          />

                          <div
                            v-if="video?.data?.status === 'uploaded'"
                            class="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover/card:bg-black/20"
                          >
                            <div
                              class="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200/90 text-slate-800 shadow-lg sm:h-9 sm:w-9"
                            >
                              <BaseIcon
                                :icon="PhPlay"
                                :size="16"
                                :class="
                                  selectedVideo?.id === video.id
                                    ? 'text-emerald-700'
                                    : ''
                                "
                              />
                            </div>
                          </div>

                          <div
                            v-else
                            class="absolute inset-0 flex flex-col items-center justify-center bg-slate-900"
                          >
                            <BaseIcon :icon="PhUploadSimple" :size="16" />
                            <span
                              class="mt-1 text-[10px] font-medium text-slate-400"
                            >
                              Uploading
                            </span>
                          </div>

                          <div
                            v-if="selectedVideo?.id === video.id"
                            class="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-400 shadow-lg shadow-emerald-400/50"
                          />
                        </div>

                        <div class="min-w-0 px-2 py-1.5">
                          <h3
                            class="truncate text-xs font-semibold text-slate-200 sm:text-sm"
                            :title="video?.name"
                          >
                            {{ video?.name }}
                          </h3>

                          <p
                            class="truncate text-[10px] text-slate-500 sm:text-xs"
                            :title="video?.artist"
                          >
                            {{ video?.artist }}
                          </p>

                          <div
                            class="mt-0.5 hidden items-center justify-between gap-1 text-[10px] text-slate-600 sm:flex"
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
                </details>
              </div>
            </div>
          </details>

          <div
            v-if="!videoData.length"
            class="py-8 text-center text-slate-500 sm:py-12"
          >
            <h3 class="text-base font-semibold text-slate-300 sm:text-lg">
              No videos yet
            </h3>

            <p class="mt-1 text-xs sm:text-sm">
              Your uploaded videos will appear here.
            </p>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
