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
import { formatSortableDate } from "@/constants/date";

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
      session.timestamp = formatSortableDate(session.timestamp);
    }
  }

  return data;
}

function handleMouseMove(event, id) {
  const card = document.getElementById(`card-${id}`);
  const shine = document.getElementById(`shine-${id}`);
  if (!card || !shine) return;

  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -10;
  const rotateY = ((x - centerX) / centerX) * 10;
  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;

  shine.style.opacity = "100";
  shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.5), transparent 60%)`;
}

function resetTransform(id) {
  const card = document.getElementById(`card-${id}`);
  const shine = document.getElementById(`shine-${id}`);
  if (card) {
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }
  if (shine) {
    shine.style.opacity = "0";
  }
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
              class="relative group [perspective:1000px]"
              @mousemove="handleMouseMove($event, image.filename)"
              @mouseleave="resetTransform(image.filename)"
            >
              <div
                :id="`card-${image.filename}`"
                class="transition-transform duration-300 ease-out [transform-style:preserve-3d] md:hover:scale-[1.05]"
              >
                <a
                  :href="`https://cdn.phaseii.network/file/PhaseII/${image.b2_path}`"
                  target="_blank"
                >
                  <div
                    :id="`shine-${image.filename}`"
                    class="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
                    style="
                      background: radial-gradient(
                        circle at 50% 50%,
                        rgba(255, 255, 255, 0.6),
                        rgba(255, 0, 150, 0.2),
                        transparent 70%
                      );
                    "
                  />
                  <img
                    class="w-[200px] shadow-xl"
                    :src="`https://cdn.phaseii.network/file/PhaseII/${image.b2_path}`"
                  />
                </a>
              </div>
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

<style>
.card-hover {
  perspective: 1000px;
}

.card-hover img {
  transform: rotateY(0) rotateX(0) scale(1);
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
  transform-style: preserve-3d;
}

.card-hover:hover img {
  transform: rotateY(8deg) rotateX(-5deg) scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
}
</style>
