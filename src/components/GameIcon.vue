<script setup>
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: true,
  },
  w: {
    type: String,
    default: "w-16",
  },
  h: {
    type: String,
    default: "h-16",
  },
});

const spanClass = computed(
  () => `inline-flex justify-center items-center ${props.w} ${props.h}`
);
</script>

<template>
  <span :class="spanClass">
    <img :src="path" class="rounded-full" :class="`${w}`" />
    <slot />
  </span>
</template>
