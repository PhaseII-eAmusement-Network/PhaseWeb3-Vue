<script setup>
import { PhGear } from "@phosphor-icons/vue";
import { useSlots, computed } from "vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";
import IconRounded from "@/components/IconRounded.vue";

defineProps({
  icon: {
    type: Object,
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
    class="mb-6 flex items-center justify-between"
  >
    <div class="flex items-center justify-start">
      <IconRounded
        v-if="icon && main"
        :icon="icon"
        color="light"
        class="mr-3"
        bg
      />
      <BaseIcon v-else-if="icon" :icon="icon" class="mr-2" size="20" />
      <h1 :class="main ? 'text-3xl' : 'text-2xl'" class="leading-tight">
        {{ title }}
      </h1>
    </div>
    <slot v-if="hasSlot" />
    <BaseButton v-else :icon="PhGear" color="whiteDark" />
  </section>
</template>
