<script setup>
import { ref, onMounted } from "vue";

import { PhCalendar, PhChartLine } from "@phosphor-icons/vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBox from "@/components/CardBox.vue";
import LineChart from "@/components/Charts/LineChart.vue";
import RerunLogo from "@/components/Rerun/RerunLogo.vue";
import StatsBox from "@/components/Rerun/StatsBox.vue";
import { generateMonthlyChartData } from "@/components/Charts/monthly";

defineProps({
  data: {
    type: Object,
  },
});

const show = ref(false);
const chartData = generateMonthlyChartData();

onMounted(() => {
  requestAnimationFrame(() => {
    show.value = true;
  });
});
</script>

<template>
  <div class="relative flex h-full flex-col px-4 py-8 max-w-3xl md:min-w-lg">
    <div class="absolute left-4 top-4">
      <RerunLogo small :year="data.year" />
    </div>

    <Transition
      enter-active-class="transition-all duration-700 delay-50 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="show" class="mt-12 -mb-6">
        <SectionTitleLine
          :icon="PhCalendar"
          color="text-orange-300"
          title="Notable Dates"
          main
        />
      </div>
    </Transition>

    <div class="mt-6 grid w-full gap-5">
      <Transition
        enter-active-class="transition-all duration-700 delay-[200ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="Your first play..."
            footer="Started with DDR, and you never stopped."
            suffix="(14 plays, 30 scores, 10 records)"
          >
            1/1/2026
          </StatsBox>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-700 delay-[300ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="Your best day..."
            footer="What a day!"
            suffix="(14 plays, 30 scores, 10 records)"
          >
            3/3/2026
          </StatsBox>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-700 delay-[300ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="Your best month..."
            footer="You're truly dedicated."
            suffix="(14 plays, 30 scores, 10 records)"
          >
            December
          </StatsBox>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-700 delay-[400ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="Your latest play..."
            footer="Wrapping it up with IIDX."
            suffix="(14 plays, 30 scores, 10 records)"
          >
            12/25/2026
          </StatsBox>
        </div>
      </Transition>
    </div>

    <Transition
      enter-active-class="transition-all duration-700 delay-[700ms] ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="show" class="mt-6">
        <SectionTitleLine
          :icon="PhChartLine"
          color="text-sky-300"
          title="Monthly Breakdown"
          main
        />
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-all duration-700 delay-[800ms] ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="show">
        <CardBox>
          <LineChart :data="chartData" class="h-50" />
        </CardBox>
      </div>
    </Transition>
  </div>
</template>
