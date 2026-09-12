<script setup>
import { ref, onMounted } from "vue";
import { PhFilmReel, PhVideo } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import { getGameInfo } from "@/constants";
import { formatSortableDate } from "@/constants/date";

import { APIGetPlayVideos } from "@/stores/api/account";
import { APIGetMusicData } from "@/stores/api/music";
import BaseDivider from "@/components/BaseDivider.vue";

const videoData = ref([]);
const loading = ref(false);

/*
 * Music data is stored by game/version:
 *
 * {
 *   iidx: {
 *     30: {
 *       123: { id: 123, name: "...", artist: "..." },
 *       456: { id: 456, name: "...", artist: "..." },
 *     },
 *     31: {
 *       ...
 *     }
 *   }
 * }
 */
const musicData = ref({});

const headers = [
  {
    text: "Timestamp",
    value: "timestamp",
    sortable: true,
    width: 120,
  },
  {
    text: "Song",
    value: "name",
    sortable: true,
    width: 120,
  },
  {
    text: "Artist",
    value: "artist",
    sortable: true,
    width: 120,
  },
  {
    text: "Game",
    value: "game",
    sortable: true,
    width: 120,
  },
  {
    text: "Version",
    value: "version",
    sortable: true,
    width: 120,
  },
  {
    text: "Status",
    value: "data.status",
    sortable: true,
    width: 120,
  },
];

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

function openInNewTab(url) {
  window.open(url.data?.url, "_blank").focus();
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <template v-if="videoData[0]">
        <SectionTitleLine :icon="PhVideo" title="Your Latest Video" main />
        <CardBox class="mb-6">
          <div
            v-if="videoData[0]?.data?.status == 'uploaded'"
            class="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <video controls class="mt-3 rounded-xl w-160 xl:w-7xl">
              <source :src="videoData[0]?.data?.url" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            <div
              class="text-center md:text-left grid grid-cols-1 place-content-start gap-6"
            >
              <div class="space-y-2">
                <div>
                  <h1 class="text-2xl xl:text-4xl font-bold">
                    {{ videoData[0]?.name }}
                  </h1>
                  <h1 class="text-xl xl:text-3xl font-semibold">
                    {{ videoData[0]?.artist }}
                  </h1>
                </div>

                <BaseDivider class="mx-1" />

                <h2 class="text-xl xl:text-2xl font-light">
                  {{ videoData[0]?.game }} {{ videoData[0]?.version }}
                </h2>
                <p>{{ videoData[0]?.timestamp }}</p>
              </div>

              <div>
                <BaseButton
                  color="info"
                  label="Share"
                  @click="copyToClipboard(videoData[0]?.data?.url)"
                />
              </div>
            </div>
          </div>
          <div v-else>
            <div class="space-y-1 text-center">
              <h1 class="text-2xl xl:text-4xl font-bold">
                Your video is still uploading!
              </h1>
              <h2 class="text-xl xl:text-2xl font-light">
                Please wait for the upload to complete.
              </h2>
              <h2 class="text-xl xl:text-xl">
                Upload started at {{ videoData[0].timestamp }}
              </h2>
            </div>
          </div>
        </CardBox>
      </template>

      <SectionTitleLine :icon="PhFilmReel" title="All Play Videos" main />
      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="videoData"
              @row-clicked="openInNewTab"
            />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
