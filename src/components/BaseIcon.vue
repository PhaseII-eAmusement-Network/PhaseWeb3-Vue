<script setup>
import { computed } from "vue";

const props = defineProps({
  path: {
    type: String,
    required: false,
    default: null,
  },
  icon: {
    type: Object,
    required: false,
    default: null,
  },
  w: {
    type: String,
    default: "w-6",
  },
  h: {
    type: String,
    default: "h-6",
  },
  size: {
    type: [String, Number],
    default: null,
  },
  color: {
    type: String,
    default: "",
  },
  fill: {
    type: String,
    default: "duotone",
  },
});

const spanClass = computed(
  () =>
    `inline-flex justify-center items-center ${props.w} ${props.h} ${props.color}`,
);

const iconSize = computed(() => props.size ?? (props.icon ? 20 : 18));
</script>

<template>
  <span :class="spanClass">
    <template v-if="props.path">
      <svg
        viewBox="0 0 24 24"
        :width="iconSize"
        :height="iconSize"
        class="inline-block"
      >
        <path fill="currentColor" :d="path" />
      </svg>
    </template>
    <template v-else-if="props.icon">
      <icon :size="iconSize" :weight="props.fill" />
    </template>
    <slot />
  </span>
</template>
