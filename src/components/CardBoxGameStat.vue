<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import CardBoxComponentBody from "@/components/CardBoxComponentBody.vue";
import BaseLevel from "@/components/BaseLevel.vue";
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
  userId: {
    type: String,
    required: false,
    default: null,
  },
  profileName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  disableLocalClick: {
    type: Boolean,
    default: false,
  },
});

const tag = computed(() => {
  if (props.type === "plays") {
    return {
      type: "text-emerald-600",
    };
  } else if (props.type === "scores") {
    return {
      type: "text-red-500",
    };
  } else if (props.type === "ranking") {
    return {
      type: "text-amber-400",
    };
  }

  return {
    type: "info",
  };
});

function loadGamePage() {
  if (!props.disableLocalClick) {
    if (!props.userId) {
      router.push(`/games/${props.game}`);
    } else {
      router.push(`/games/${props.game}/profiles/${props.userId}`);
    }
  }
}

const selectedGame = getGameInfo(props.game);
const cardStyle = `
  background-image: linear-gradient(to top, transparent, rgba(0, 0, 0, .6)),
    url('${selectedGame.cardBG}');
  background-size: cover;
  background-repeat: no-repeat;
`;
</script>

<template>
  <button
    class="flex rounded-2xl hover:scale-[1.01] hover:shadow-xl hover:outline outline-blue-500/50 hover:bg-slate-500 hover:dark:bg-slate-950 transition-all duration-100"
    :style="cardStyle"
    @click="loadGamePage()"
  >
    <div
      class="relative w-full h-full bg-white dark:bg-slate-900/70 rounded-2xl"
    >
      <CardBoxComponentBody>
        <BaseLevel>
          <BaseLevel type="justify-start">
            <GameIcon
              class="md:mr-6 scale-110 md:scale-100"
              :path="selectedGame.icon"
            />
            <div class="text-center space-y-1 md:text-left md:mr-6 w-full">
              <h2 class="text-xl font-semibold not-sr-only sm:sr-only">
                {{
                  selectedGame.shortName
                    ? selectedGame.shortName
                    : selectedGame.name
                }}
              </h2>
              <div class="grid">
                <h2 class="text-xl sr-only sm:not-sr-only">
                  {{ selectedGame.name }}
                </h2>
                <hr class="my-1 text-gray-500" />
                <div>
                  <p class="text-sm md:text-md text-gray-300">
                    {{ profileName }}
                  </p>
                </div>
              </div>
              <div
                class="flex space-x-2 justify-center md:justify-start pt-2 md:pt-0"
              >
                <h4 class="text-lg drop-shadow-xl">
                  {{ value }} <span :class="tag.type">{{ type }}</span>
                </h4>
              </div>
            </div>
          </BaseLevel>
        </BaseLevel>
      </CardBoxComponentBody>
    </div>
  </button>
</template>
