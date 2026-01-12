<script setup>
import { ref } from "vue";
import { PhCaretUp } from "@phosphor-icons/vue";
import BaseIcon from "@/components/BaseIcon.vue";

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const open = ref(false);

const toggle = () => {
  open.value = !open.value;
};
</script>

<template>
  <div class="rounded-lg overflow-hidden">
    <button
      class="w-full flex items-center justify-between px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 hover:dark:bg-slate-700 transition duration-25"
      @click="toggle"
    >
      <span class="text-lg">
        {{ title }}
      </span>

      <BaseIcon
        :icon="PhCaretUp"
        class="flex-none transition-transform duration-150 ease-in-out"
        :class="[open ? 'rotate-0' : 'rotate-180']"
      />
    </button>

    <Transition
      enter-active-class="transition-position duration-75"
      enter-from-class="opacity-50 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-position duration-75"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-50 -translate-y-2"
    >
      <div
        v-show="open"
        class="px-4 py-3 border-t text-left bg-slate-50 dark:bg-slate-700"
      >
        <slot />
      </div>
    </Transition>
  </div>
</template>
