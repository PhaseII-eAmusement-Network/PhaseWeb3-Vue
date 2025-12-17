<script setup>
import { defineProps } from "vue";

defineProps({
  musicData: {
    type: Object,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="flex mt-3">
    <a
      class="bg-slate-700 p-2 rounded-xl hover:text-slate-300"
      :href="`/games/${gameId}/song/${musicData.id}`"
    >
      {{ musicData.name }} - {{ musicData.artist }}
    </a>
  </div>
</template>
