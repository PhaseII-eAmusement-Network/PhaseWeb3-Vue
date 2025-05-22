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
  <section class="mb-2">
    <div
      class="text-center lg:text-left items-center justify-center lg:justify-start gap-2"
    >
      <div class="flex items-center justify-start">
        <GameIcon :path="path" class="w-12 h-12 p-1 drop-shadow-md" />
        <h1 class="text-2xl md:text-3xl leading-tight">
          {{ title }}
        </h1>
      </div>
      <div class="w-full flex gap-1 mb-4">
        <slot v-if="hasSlot" />
      </div>
    </div>
  </section>
</template>
