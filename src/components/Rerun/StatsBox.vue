<script setup>
import NumberDynamic from "@/components/NumberDynamic.vue";

const props = defineProps({
  header: {
    type: String,
  },
  footer: {
    type: String,
  },
  number: {
    type: Number,
    default: null,
  },
  icon: {
    type: Object,
    default: null,
  },
  prefix: {
    type: String,
    default: null,
  },
  suffix: {
    type: String,
    default: null,
  },
  color: {
    type: String,
    default: "text-gray-500 dark:text-slate-400",
  },
  numColor: {
    type: String,
    default: "",
  },
  iconColor: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div
    class="rounded-2xl border border-slate-400/10 bg-slate-400/5 hover:bg-slate-400/10 transition-colors px-6 py-5"
  >
    <div class="text-sm tracking-wider text-slate-400">
      {{ props.header }}
    </div>

    <div class="text-2xl font-bold">
      <NumberDynamic
        v-if="props.number !== null"
        :value="props.number"
        :prefix="props.prefix"
        :suffix="props.suffix"
      />

      <div v-else class="grid md:flex gap-x-2 items-baseline">
        <slot />
        <div class="text-sm text-slate-300">
          {{ suffix }}
        </div>
      </div>
    </div>

    <div class="text-slate-400">{{ props.footer }}</div>
  </div>
</template>
