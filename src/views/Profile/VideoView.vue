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

import { APIGetPlayVideos } from "@/stores/api/account";
import { APIGetMusicData } from "@/stores/api/music";
import BaseDivider from "@/components/BaseDivider.vue";

const videoData = ref([]);
const loading = ref(false);

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
  videoData.value = null;
  try {
    const data = await APIGetPlayVideos();
    videoData.value = filterVideos(JSON.parse(JSON.stringify(data)));

    const uniqueMusicIds = [
      ...new Set(videoData.value.map((video) => video.musicid)),
    ];

    if (uniqueMusicIds.length > 0) {
      const songData = await APIGetMusicData(
        "iidx",
        data[0].version,
        uniqueMusicIds,
        true,
      );

      const songMap = Object.fromEntries(
        songData.map((song) => [song.id, song]),
      );

      videoData.value = videoData.value.map((video) => ({
        ...video,
        name: songMap[video.musicid]?.name || "Unknown Song",
        artist: songMap[video.musicid]?.artist || "Unknown Artist",
      }));
    }
  } catch (error) {
    console.error("Failed to fetch video data:", error);
  }

  loading.value = false;
}

onMounted(async () => {
  await loadVideos();
});

function filterVideos(playVideos) {
  playVideos.sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });

  for (const video of playVideos) {
    const game = getGameInfo(video.game);
    video.game = game.name;
    video.version = game.versions.find((x) => x.id == video.version).label ?? 0;

    if (video.timestamp) {
      const date = new Date(video.timestamp * 1000);
      video.timestamp = date.toLocaleString();
    }
  }

  return playVideos;
}

const copyToClipboard = (text) => {
  if (text.data?.url) {
    text = text.data?.url;
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
            <video controls class="mt-3 rounded-xl w-[640px] xl:w-[1280px]">
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
