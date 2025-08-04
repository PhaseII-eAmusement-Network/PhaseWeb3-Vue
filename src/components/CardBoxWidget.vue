<script setup>
import CardBox from "@/components/CardBox.vue";
import NumberDynamic from "@/components/NumberDynamic.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTagTrend from "@/components/PillTagTrend.vue";
import IconRounded from "@/components/IconRounded.vue";

defineProps({
  number: {
    type: Number,
    default: 0,
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
  label: {
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
  iconBGColor: {
    type: String,
    default: null,
  },
  trend: {
    type: String,
    default: null,
  },
  trendType: {
    type: String,
    default: null,
  },
  smallContent: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <CardBox>
    <div
      class="grid grid-cols-1 justify-center md:justify-start w-full md:flex gap-4"
    >
      <IconRounded
        v-if="icon"
        :icon="icon"
        size="30"
        :class="iconColor"
        bg-color="bg-gray-800"
      />
      <div>
        <BaseLevel v-if="trend" class="mb-3" mobile>
          <PillTagTrend :trend="trend" :trend-type="trendType" small />
        </BaseLevel>
        <BaseLevel mobile>
          <div>
            <h3 :class="color" class="text-lg leading-tight mb-1.5">
              {{ label }}
            </h3>
            <h1 class="text-3xl leading-tight font-semibold">
              <NumberDynamic
                v-if="number"
                :class="numColor"
                :value="number"
                :prefix="prefix"
                :suffix="suffix"
              />
              <div
                :class="numColor + (smallContent ? ` text-lg font-normal` : ``)"
              >
                <slot />
              </div>
            </h1>
          </div>
        </BaseLevel>
      </div>
    </div>
  </CardBox>
</template>
