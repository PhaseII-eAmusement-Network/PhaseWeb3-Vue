<script setup>
import { computed } from "vue";

const props = defineProps({
  username: {
    type: String,
    required: true,
  },
  avatar: {
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
      <!-- <img
        src="/assets/border/pride.webp"
        alt="border"
        class="absolute inset-0 w-full h-full overflow-hidden scale-[1.02]"
        style="object-fit: fill"
      /> -->
    </div>
    <slot />
  </div>
</template>
