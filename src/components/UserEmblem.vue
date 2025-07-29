<script setup>
import { computed, watch, ref } from "vue";

const props = defineProps({
  profile: {
    type: Object,
    default: null,
  },
  version: {
    type: Number,
    default: 14,
  },
  size: {
    type: Number,
    default: 128,
  },
});

const userProfile = ref(props.profile);
userProfile.value.emblem = formatEmblem(userProfile.value.last?.emblem);
const version = ref(props.version);

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    userProfile.value.emblem = formatEmblem(userProfile.value.last?.emblem);
  },
);

watch(
  () => props.version,
  () => {
    version.value = props.version;
  },
);

const valid_emblem_options = [
  "background",
  "main",
  "ornament",
  "effect",
  "speech_bubble",
];

const emblemImages = computed(() => {
  const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;

  return valid_emblem_options.map((option) => {
    const templatePath = `${ASSET_PATH}/emblems`;
    return `${templatePath}/${version.value}/${userProfile.value.emblem?.[option]}.png`;
  });
});

function formatEmblem(emblem) {
  if (emblem) {
    return {
      background: emblem[0],
      main: emblem[1],
      ornament: emblem[2],
      effect: emblem[3],
      speech_bubble: emblem[4],
    };
  }
}
</script>

<template>
  <div class="inner">
    <div :style="`position: relative; width: ${size}px; height: ${size}px`">
      <div
        v-for="(src, index) in emblemImages"
        :key="index"
        style="position: absolute"
      >
        <img
          :src="src"
          :style="`width: ${size}px; height: ${size}px`"
          class="drop-shadow-lg"
        />
      </div>
    </div>
  </div>
</template>
