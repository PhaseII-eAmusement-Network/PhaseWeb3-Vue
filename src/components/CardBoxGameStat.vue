<script setup>
import { computed } from "vue";
import CardBoxComponentBody from "@/components/CardBoxComponentBody.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTag from "@/components/PillTag.vue";
import GameIcon from "@/components/GameIcon.vue";
import { getGameInfo } from "@/constants";

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

const selectedGame = getGameInfo(props.game);
const cardStyle = `
  background-image: linear-gradient(to left, transparent, rgba(0, 0, 0, 1)),
    url('${selectedGame.cardBG}');
  background-size: cover;
  background-repeat: no-repeat;
`;
</script>

<template>
  <div class="flex rounded-2xl" :style="cardStyle">
    <div
      class="relative w-full h-full bg-white dark:bg-slate-900/70 rounded-2xl"
    >
      <CardBoxComponentBody>
        <BaseLevel>
          <BaseLevel type="justify-start">
            <GameIcon class="md:mr-6" :path="selectedGame.icon" />
            <div class="text-center space-y-1 md:text-left md:mr-6">
              <div class="md:flex md:items-center mb-4 md:mb-0 md:space-x-2">
                <h2 class="text-xl">{{ selectedGame.name }}</h2>
                <PillTag :color="tag.type" :label="type" small />
              </div>
              <h4 class="text-lg">{{ value }}</h4>
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
  </div>
</template>
