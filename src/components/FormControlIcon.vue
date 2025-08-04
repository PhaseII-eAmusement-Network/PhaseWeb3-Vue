<script setup>
import BaseIcon from "@/components/BaseIcon.vue";

defineProps({
  icon: {
    type: Object,
    default: null,
  },
  h: {
    type: String,
    default: null,
  },
});
</script>

<template>
  <BaseIcon
    :icon="icon"
    w="w-10"
    :h="h"
    class="absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-slate-400"
  />
</template>
