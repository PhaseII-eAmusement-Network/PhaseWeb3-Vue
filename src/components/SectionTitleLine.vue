<script setup>
import { useSlots, computed } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import IconRounded from "@/components/IconRounded.vue";

defineProps({
  icon: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: null,
  },
  title: {
    type: String,
    required: true,
  },
  main: Boolean,
});

const hasSlot = computed(() => useSlots().default);
</script>

<template>
  <section
    :class="{ 'pt-6': !main }"
    class="mb-6 md:flex items-center md:justify-between space-y-2 md:space-y-0"
  >
    <div class="flex items-center justify-start">
      <IconRounded
        v-if="icon && main"
        :icon="icon"
        :icon-color="color"
        color="light"
        class="mr-3"
        bg
      />
      <BaseIcon
        v-else-if="icon"
        :path="icon"
        :color="color"
        class="mr-2"
        size="20"
      />
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
  </section>
</template>
