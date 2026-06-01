<script setup>
import CardBox from "@/components/CardBox.vue";

import { formatDifficulty } from "@/constants/scoreDataFilters";
import { getNestedValue } from "@/constants/values";

defineProps({
  thisGame: {
    type: Object,
    required: true,
  },
  chart: {
    type: Object,
    required: true,
  },
  record: {
    type: Object,
    required: true,
  },
  showUser: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <CardBox has-table>
    <div class="py-6 px-4">
      <span
        v-if="chart.data?.difficulty != 0 && thisGame.chartTable[chart.chart]"
        class="text-lg p-2 text-slate-400"
      >
        {{ thisGame.chartTable[chart.chart] }} -
        {{ formatDifficulty(chart.data?.difficulty, thisGame.difficultyDenom) }}
      </span>
      <span v-if="showUser">{{ record.username }}</span>
      <div
        class="pt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-6 justify-items-center-safe place-items-center text-center"
      >
        <div>
          <h1 class="font-light text-sm">Points</h1>
          <p class="text-md lg:text-lg font-bold text-white">
            {{ record?.points.toLocaleString() }}
          </p>
        </div>

        <template v-for="header of thisGame?.scoreHeaders" :key="header">
          <div>
            <h1 class="font-light text-sm">
              {{ header.text }}
            </h1>
            <p class="text-md lg:text-lg font-bold text-white">
              {{ getNestedValue(record, header.value) ?? "0" }}
            </p>
          </div>
        </template>
      </div>
      <span class="px-2 font-light text-slate-300">
        <span class="hidden md:block">Updated {{ record.timestamp }}</span>
        <div class="block md:hidden">
          Updated<br />
          {{ record.timestamp }}
        </div>
      </span>
    </div>
  </CardBox>
</template>
