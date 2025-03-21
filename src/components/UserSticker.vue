<script setup>
import { watch, ref } from "vue";

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
const version = ref(props.version);

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    version.value = props.version;
  }
);

const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
const templatePath = `${ASSET_PATH}/trbitem`;
function getPath(id) {
  return `${templatePath}/${version.value}/${id}.png`;
}

function getStickerStyle(sticker) {
  return {
    left: `${sticker.sticker_pos_x}px`,
    top: `${sticker.sticker_pos_y}px`,
    transform: `scale(${sticker.sticker_scale_x}, ${sticker.sticker_scale_y}) rotate(${sticker.sticker_rotate}deg)`,
  };
}
</script>

<template>
  <div class="inner">
    <div :style="`position: relative; width: ${size}px; height: 500px`">
      <div key="base" style="position: absolute">
        <img
          :src="getPath(userProfile.trbitem?.base ?? 0)"
          :style="`width: ${size}px`"
          class="drop-shadow-lg"
        />
      </div>

      <div
        v-for="sticker of userProfile.trbitem?.stickers ?? []"
        :key="sticker.sticker_id"
        class="absolute cursor-pointer"
        :style="getStickerStyle(sticker)"
      >
        <img :src="getPath(sticker.sticker_id)" />
      </div>
    </div>
  </div>
</template>
