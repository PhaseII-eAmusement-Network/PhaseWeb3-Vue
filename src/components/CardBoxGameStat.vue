<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import CardBoxComponentBody from "@/components/CardBoxComponentBody.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTag from "@/components/PillTag.vue";
import GameIcon from "@/components/GameIcon.vue";
import { getGameInfo } from "@/constants";

const router = useRouter();
const props = defineProps({
  game: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  profileName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

const tag = computed(() => {
  if (props.type === "plays") {
    return {
      type: "success",
    };
  } else if (props.type === "scores") {
    return {
      type: "danger",
    };
  } else if (props.type === "ranking") {
    return {
      type: "warning",
    };
  }

  return {
    type: "info",
  };
});

function loadGamePage() {
  router.push(`/games/${props.game}`);
}

const selectedGame = getGameInfo(props.game);
const cardStyle = `
  background-image: linear-gradient(to left, transparent, rgba(0, 0, 0, 1)),
    url('${selectedGame.cardBG}');
  background-size: cover;
  background-repeat: no-repeat;
`;
</script>

<template>
  <button
    class="flex rounded-2xl hover:scale-[1.01] hover:shadow-xl hover:outline outline-blue-500/50 hover:bg-slate-500 hover:dark:bg-slate-950 transition-all duration-10"
    :style="cardStyle"
    @click="loadGamePage()"
  >
    <div
      class="relative w-full h-full bg-white dark:bg-slate-900/70 rounded-2xl"
    >
      <CardBoxComponentBody>
        <BaseLevel>
          <BaseLevel type="justify-start">
            <GameIcon class="md:mr-6" :path="selectedGame.icon" />
            <div class="text-center space-y-1 md:text-left md:mr-6">
              <h2 class="text-xl">{{ selectedGame.name }}</h2>
              <div
                class="flex space-x-2 justify-center md:justify-start pt-2 md:pt-0"
              >
                <PillTag :color="tag.type" :label="type" small />
                <h4 class="text-lg">{{ value }}</h4>
              </div>
            </div>
          </BaseLevel>
          <div class="text-center md:text-right">
            <p class="text-sm text-gray-400">
              {{ profileName }}
            </p>
          </div>
        </BaseLevel>
      </CardBoxComponentBody>
    </div>
  </button>
</template>
