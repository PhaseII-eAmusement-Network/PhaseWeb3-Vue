<script setup>
import { useSlots, computed } from "vue";
import GameIcon from "./GameIcon.vue";

defineProps({
  path: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
});

const hasSlot = computed(() => useSlots().default);
</script>

<template>
  <section class="pt-6 mb-6 flex items-center justify-between">
    <div class="flex items-center justify-start space-x-2">
      <GameIcon :path="path" class="w-12 h-12 p-1 drop-shadow-md" />
      <h1 class="text-2xl md:text-3xl leading-tight">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
  </section>
</template>
