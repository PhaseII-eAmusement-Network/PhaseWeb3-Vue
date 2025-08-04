<script setup>
import { computed } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";

const props = defineProps({
  icon: {
    type: Object,
    required: true,
  },
  iconColor: {
    type: String,
    default: "",
  },
  color: {
    type: String,
    default: null,
  },
  w: {
    type: String,
    default: "w-12",
  },
  h: {
    type: String,
    default: "h-12",
  },
  bgColor: {
    type: String,
    default: "bg-slate-900",
  },
});

const spanColor = computed(() => props.iconColor);
</script>

<template>
  <BaseIcon
    :icon="icon"
    :w="w"
    :h="h"
    :color="spanColor"
    size="24"
    class="rounded-full"
    :class="props.bgColor"
  />
</template>
