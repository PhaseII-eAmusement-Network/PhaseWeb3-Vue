<script setup>
import { computed } from "vue";
import { useStyleStore } from "@/stores/style.js";

const props = defineProps({
  zIndex: {
    type: String,
    default: "z-50",
  },
  type: {
    type: String,
    default: "flex",
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["overlay-click"]);

const overlayClick = (event) => {
  emit("overlay-click", event);
};

const styleStore = useStyleStore();

const transparentClass = computed(() => {
  return props.transparent
    ? "dark:from-gray-700/90 dark:via-gray-900/90 dark:to-gray-700/90"
    : "dark:from-gray-700 dark:via-gray-900 dark:to-gray-700";
});
</script>

<template>
  <Transition name="overlay-fade">
    <div
      v-show="active"
      :class="[type, zIndex, transparentClass]"
      class="fixed inset-0 flex flex-col items-center justify-center bg-linear-to-tr transform"
    >
      <div
        class="absolute inset-0"
        :class="`${styleStore.overlayStyle} ${
          transparent ? 'opacity-90' : 'opacity-100'
        }`"
        @click="overlayClick"
      />
      <slot />
    </div>
  </Transition>
</template>
