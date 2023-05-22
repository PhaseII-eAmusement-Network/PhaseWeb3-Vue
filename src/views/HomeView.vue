<script setup>
import { ref, onMounted } from "vue";
import {
  mdiAccountMultipleOutline,
  mdiChartTimelineVariant,
  mdiReload,
  mdiChartBellCurveCumulative,
  mdiGamepad,
} from "@mdi/js";
import UserCard from "@/components/UserCard.vue";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";
import TableRivalsFull from "@/components/TableRivalsFull.vue";
import { GameConstants } from "@/constants";

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <h2 class="pb-4 text-4xl lg:text-5xl">Welcome to <samp>PhaseII</samp></h2>
      <UserCard class="mb-6" />

      <SectionTitleLine
        :icon="mdiChartTimelineVariant"
        title="Quick Stats"
        main
      />

      <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
        <CardBoxWidget
          trend="12% (from last week)"
          trend-type="up"
          :number="37"
          label="Scores (This week)"
        />
        <CardBoxWidget
          trend="12%"
          trend-type="down"
          :number="770"
          :prefix="'¢'"
          label="PhaseCoin"
        />
        <CardBoxWidget
          trend="None Completed"
          trend-type="alert"
          :number="2"
          label="Active Goals"
        />
      </div>

      <SectionTitleLine :icon="mdiGamepad" title="Game Stats" main />
      <div
        class="grid grid-flow-row auto-rows-auto grid-cols-1 md:grid-cols-2 gap-5 mb-5"
      >
        <CardBoxGameStat
          :game="GameConstants.IIDX"
          value="#10 out of 132"
          profile-name="DJ. TRMAZI"
          type="ranking"
        />
        <CardBoxGameStat
          :game="GameConstants.DRUMMANIA"
          :value="300"
          profile-name="TRMAZI"
          type="plays"
        />
        <CardBoxGameStat
          :game="GameConstants.DDRCLASS"
          :value="392"
          profile-name="TRMAZI"
          type="scores"
        />
        <CardBoxGameStat
          :game="GameConstants.SDVX"
          value="#15 out of 200"
          profile-name="TRMAZI"
          type="ranking"
        />
      </div>

      <SectionTitleLine
        :icon="mdiChartBellCurveCumulative"
        title="Play Trends"
        main
      >
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLine>

      <CardBox class="mb-6">
        <PillTag
          label="Scores (7-Day Period)"
          color="info"
          :icon="mdiTestTube"
        />
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLine :icon="mdiAccountMultipleOutline" title="Rivals" main />
      <CardBox has-table>
        <TableRivalsFull />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
