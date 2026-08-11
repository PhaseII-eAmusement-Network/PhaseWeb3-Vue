<script setup>
import { computed, onMounted, onUnmounted } from "vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import { PhArrowLeft, PhArrowRight } from "@phosphor-icons/vue";

const props = defineProps({
  current: Number,
  total: Number,
});

const emit = defineEmits(["next", "previous"]);

const progress = computed(() => {
  return (props.current / (props.total - 1)) * 100;
});

function onKeyDown(event) {
  switch (event.key) {
    case "ArrowRight":
    case " ":
    case "Enter":
      emit("next");
      break;

    case "ArrowLeft":
      emit("previous");
      break;
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeyDown);
});
</script>

<template>
  <CardBox
    class="w-full md:w-auto rounded-none md:rounded-xl p-4"
    color-prop="bg-slate-800 dark:bg-slate-800"
    has-table
  >
    <div class="flex flex-col items-center justify-center">
      <slot />
    </div>

    <template v-if="current">
      <div class="space-y-2 mt-8">
        <p class="text-sm opacity-70">{{ current }} / {{ total - 1 }}</p>
        <div class="h-1 bg-gray-700">
          <div
            class="h-full bg-emerald-400 transition-all duration-500"
            :style="{ width: `${progress}%` }"
          />
        </div>
      </div>
    </template>

    <BaseButtons type="justify-center gap-4" class-addon="my-6">
      <BaseButton
        v-if="current"
        label="Back"
        color="info"
        :icon="PhArrowLeft"
        @click="$emit('previous')"
      />

      <BaseButton
        v-if="progress !== 100"
        :label="current ? 'Next' : `Here we go!`"
        color="success"
        :icon="current ? PhArrowRight : null"
        @click="$emit('next')"
      />
    </BaseButtons>
  </CardBox>
</template>
