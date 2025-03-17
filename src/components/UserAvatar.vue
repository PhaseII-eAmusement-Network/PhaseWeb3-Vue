<script setup>
import { computed } from "vue";

const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: null,
  },
  border: {
    type: String,
    default: null,
  },
});

const avatar = computed(
  () => props.avatar ?? `https://i.imgur.com/nkx5ufe.jpg`
);

const username = computed(() => props.username);
</script>

<template>
  <div>
    <div class="relative inline-block">
      <img
        :src="avatar"
        :alt="username"
        width="200"
        height="200"
        class="w-full h-auto bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden drop-shadow-lg"
      />
      <img
        v-if="border"
        :src="`${ASSET_PATH}/border/${border}.webp`"
        alt="border"
        class="absolute inset-0 w-full h-full overflow-hidden scale-[1.02]"
        style="object-fit: fill"
      />
    </div>
    <slot />
  </div>
</template>
