<script setup>
import { computed } from "vue";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  modelValue: {
    type: Array,
    default: () => [0, 100],
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["update:modelValue"]);

const computedMin = computed({
  get: () => props.modelValue[0],
  set: (value) => {
    emit("update:modelValue", [
      Math.min(value, props.modelValue[1]),
      props.modelValue[1],
    ]);
  },
});
const computedMax = computed({
  get: () => props.modelValue[1],
  set: (value) => {
    emit("update:modelValue", [
      props.modelValue[0],
      Math.max(value, props.modelValue[0]),
    ]);
  },
});

const minPercent = computed(
  () => ((computedMin.value - props.min) / (props.max - props.min)) * 100,
);
const maxPercent = computed(
  () => ((computedMax.value - props.min) / (props.max - props.min)) * 100,
);
const backgroundFill = computed(() => ({
  background: `linear-gradient(to right, rgb(55, 65, 81) ${minPercent.value}%, rgb(37, 99, 235) ${minPercent.value}%, rgb(37, 99, 235) ${maxPercent.value}%, rgb(55, 65, 81) ${maxPercent.value}%)`,
}));

const minOnTop = computed(() => minPercent.value > 50);
</script>

<template>
  <div class="mb-6 last:mb-0">
    <span v-if="label" class="font-bold text-sm"> {{ label }} </span>

    <div class="relative w-full h-6 flex items-center">
      <div class="absolute w-full h-2 rounded-lg" :style="backgroundFill" />

      <input
        v-model="computedMin"
        type="range"
        :name="name + '-min'"
        :min="min"
        :max="max"
        :step="step"
        :style="{ zIndex: minOnTop ? 4 : 3 }"
        class="absolute w-full h-2 rounded-lg appearance-none cursor-pointer slider"
      />

      <input
        v-model="computedMax"
        type="range"
        :name="name + '-max'"
        :min="min"
        :max="max"
        :step="step"
        :style="{ zIndex: minOnTop ? 3 : 4 }"
        class="absolute w-full h-2 rounded-lg appearance-none cursor-pointer slider"
      />
    </div>

    <span class="font-light">
      {{ computedMin }}
      {{ computedMax != computedMin ? " - " + computedMax : "" }}
    </span>
  </div>
</template>

<style scoped>
.slider {
  pointer-events: none;
}
.slider::-webkit-slider-thumb {
  pointer-events: auto;
}
.slider::-moz-range-thumb {
  pointer-events: auto;
}
</style>
