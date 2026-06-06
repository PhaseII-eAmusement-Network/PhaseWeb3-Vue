<script setup>
import { ref } from "vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";

import { formatDifficulty } from "@/constants/scoreDataFilters";
import { getNestedValue } from "@/constants/values";
import { PhCaretDown } from "@phosphor-icons/vue";

defineProps({
  thisGame: Object,
  chart: Object,
  record: Object,
  showUser: {
    type: Boolean,
    default: false,
  },
});

const isOpen = ref(false);
</script>

<template>
  <CardBox has-table>
    <div class="px-4 pt-4">
      <div class="flex items-center gap-2">
        <BaseButton
          :icon="PhCaretDown"
          color="info"
          class="md:hidden transition-transform duration-200"
          :class="{ 'rotate-180': isOpen }"
          @click="isOpen = !isOpen"
        />

        <span
          v-if="chart.data?.difficulty != 0 && thisGame.chartTable[chart.chart]"
          class="p-2 text-md md:text-lg text-slate-400"
        >
          {{ thisGame.chartTable[chart.chart] }} -
          {{
            formatDifficulty(chart.data?.difficulty, thisGame.difficultyDenom)
          }}
        </span>
      </div>

      <span v-if="showUser">{{ record.username }}</span>

      <div
        class="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6 place-items-center text-center"
        :class="{ hidden: !isOpen, 'md:grid': true }"
      >
        <div>
          <h1 class="text-sm font-light">Points</h1>
          <p class="text-md lg:text-lg font-bold text-white">
            {{ record?.points.toLocaleString() }}
          </p>
        </div>

        <template v-for="header in thisGame?.scoreHeaders" :key="header.value">
          <div v-if="getNestedValue(record, header.value)">
            <h1 class="text-sm font-light">
              {{ header.text }}
            </h1>
            <p class="text-md lg:text-lg font-bold text-white">
              {{ getNestedValue(record, header.value) }}
            </p>
          </div>
        </template>
      </div>

      <div class="p-2 pb-4 font-light text-slate-300">
        <span>Updated {{ record.timestamp }}</span>
      </div>
    </div>
  </CardBox>
</template>
