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
    <img
      :src="avatar"
      :alt="username"
      class="rounded-full block h-auto w-40 max-h-40 bg-gray-100 dark:bg-slate-800"
    />
    <slot />
  </div>
</template>
