<script setup>
import { ref, onMounted } from "vue";
import { PhFileImage } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GameIcon from "@/components/GameIcon.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import { getGameInfo } from "@/constants";

import { APIGetUserContent } from "@/stores/api/account";

var contentData = ref([]);
const loading = ref(false);

async function loadVideos() {
  contentData.value = null;
  try {
    const data = await APIGetUserContent("lpac_upload");
    contentData.value = filterContent(data);
  } catch (error) {
    console.error("Failed to fetch content:", error);
  }

  loading.value = false;
}

onMounted(async () => {
  await loadVideos();
});

function filterContent(data) {
  data.sort(function (x, y) {
    return y.timestamp - x.timestamp;
  });

  for (const session of data) {
    const game = getGameInfo(session.game);
    session.game = game.name;
    session.version =
      game.versions.find((x) => x.id == session.version).label ?? 0;

    if (session.timestamp) {
      const date = new Date(session.timestamp * 1000);
      session.timestamp = date.toLocaleString();
    }
  }

  return data;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <template v-if="contentData">
        <SectionTitleLine :icon="PhFileImage" title="Your Uploads" main />
        <CardBox
          v-for="content of contentData"
          :key="content.timestamp"
          class="mb-6"
        >
          <div class="md:flex gap-4 items-center pb-6">
            <GameIcon :path="getGameInfo(content.game).icon" />
            <h1 class="text-3xl">
              {{ getGameInfo(content.game).name }}
            </h1>
            <h1 class="text-2xl font-light">
              {{ content.timestamp }}
            </h1>
          </div>

          <div
            v-if="content.data?.status == 'uploaded'"
            class="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 gap-6 place-items-center"
          >
            <div
              v-for="image in content.data?.filelist"
              :key="image.filename"
              class="md:hover:scale-[1.1] transition ease-in-out"
            >
              <a
                :href="`https://cdn.phaseii.network/file/PhaseII/${image.b2_path}`"
                target="_blank"
              >
                <img
                  class="w-[200px]"
                  :src="`https://cdn.phaseii.network/file/PhaseII/${image.b2_path}`"
                />
              </a>
            </div>
          </div>
          <div v-else>
            <div class="space-y-1 text-center">
              <h1 class="text-2xl xl:text-4xl font-bold">
                Your content is still uploading!
              </h1>
              <h2 class="text-xl xl:text-2xl font-light">
                Please wait for the upload to complete.
              </h2>
              <h2 class="text-xl xl:text-xl">
                Upload started at {{ contentData[0].timestamp }}
              </h2>
            </div>
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
