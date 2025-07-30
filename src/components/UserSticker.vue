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
    default: 320,
  },
});

const userProfile = ref(props.profile);
const version = ref(props.version);

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    version.value = props.version;
  },
);

const ASSET_PATH = import.meta.env.VITE_GAME_ASSET_PATH;
const templatePath = `${ASSET_PATH}/trbitem`;
function getPath(id) {
  return `${templatePath}/${version.value}/${id}.png`;
}

function getStickerStyle(sticker) {
  return {
    // Use transform for positioning, scaling, and rotation
    transform: `translate(${sticker.sticker_pos_x - 150}px, ${
      sticker.sticker_pos_y - 100
    }px) scale(${sticker.sticker_scale_x}, ${sticker.sticker_scale_x}) rotate(${
      sticker.sticker_rotate
    }deg)`,
    // Ensure the base position is at the top-left corner of the sticker
    position: "absolute",
  };
}
</script>

<template>
  <div class="relative overflow-hidden w-[320px] h-[554px] border">
    <!-- Base Image -->
    <img
      :src="getPath(userProfile.trbitem?.base ?? 0)"
      class="absolute w-[320px] h-[554px] drop-shadow-lg"
    />

    <!-- Stickers -->
    <div
      v-for="sticker in userProfile.trbitem?.stickers ?? []"
      :key="sticker.sticker_id"
      class="absolute"
      :style="getStickerStyle(sticker)"
    >
      <img :src="getPath(sticker.sticker_id)" class="w-[300px] h-[300px]" />
    </div>
  </div>
</template>
