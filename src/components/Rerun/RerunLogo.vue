<script setup>
import { computed } from "vue";
import { PhRewind } from "@phosphor-icons/vue";
import BaseIcon from "@/components/BaseIcon.vue";

const props = defineProps({
  small: {
    type: Boolean,
    default: false,
  },
  year: {
    type: Number,
    default: null,
  },
});

const iconWidth = computed(() => (props.small ? "w-8" : "w-20"));
const iconSize = computed(() => (props.small ? 24 : 45));
const titleClass = computed(() =>
  props.small ? "text-xl font-bold" : "text-3xl font-bold",
);
const wrapperClass = computed(() =>
  props.small ? "flex items-center gap-2" : "text-center space-y-2",
);
</script>

<template>
  <div :class="wrapperClass">
    <BaseIcon
      :icon="PhRewind"
      color="text-amber-400"
      :w="iconWidth"
      :size="iconSize"
    />
    <h1 :class="titleClass"><samp>PhaseII</samp> Rerun {{ year }}</h1>
  </div>
</template>
