<script setup>
import { computed } from "vue";
import { PhCaretUp, PhCaretDown, PhWarningCircle } from "@phosphor-icons/vue";
import PillTag from "@/components/PillTag.vue";

const props = defineProps({
  trend: {
    type: String,
    required: true,
  },
  trendType: {
    type: String,
    default: null,
  },
  small: Boolean,
});

const trendStyle = computed(() => {
  if (props.trendType === "up") {
    return {
      icon: PhCaretUp,
      style: "success",
    };
  }

  if (props.trendType === "down") {
    return {
      icon: PhCaretDown,
      style: "danger",
    };
  }

  if (props.trendType === "alert") {
    return {
      icon: PhWarningCircle,
      style: "warning",
    };
  }

  return {
    style: "info",
  };
});
</script>

<template>
  <PillTag
    :label="trend"
    :color="trendStyle.style"
    :icon="trendStyle.icon"
    :small="small"
  />
</template>
