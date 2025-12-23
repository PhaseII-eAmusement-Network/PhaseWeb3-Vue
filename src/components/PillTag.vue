<script setup>
import { computed } from "vue";
import { useMainStore } from "@/stores/main";
import { colorsBgLight, colorsOutline } from "@/colors.js";
import PillTagPlain from "@/components/PillTagPlain.vue";

const mainStore = useMainStore();

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    default: null,
  },
  small: Boolean,
  outline: {
    type: Boolean,
    default: true,
  },
});

function isOutline(outlineProp, customize) {
  if (customize === undefined) {
    return outlineProp;
  } else {
    return customize;
  }
}

const componentClass = computed(() => [
  props.small ? "py-1 px-3" : "py-1.5 px-4",
  isOutline(props.outline, mainStore.userCustomize.pillOutline)
    ? colorsOutline[props.color]
    : colorsBgLight[props.color],
]);
</script>

<template>
  <PillTagPlain
    class="border rounded-full"
    :class="componentClass"
    :icon="icon"
    :label="label"
    :small="small"
  />
</template>
