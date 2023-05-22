<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiChartTimelineVariant,
  mdiReload,
  mdiChartPie,
  mdiGamepad,
  mdiAccountMultipleOutline,
} from "@mdi/js";
import UserCard from "@/components/UserCard.vue";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import { GameConstants } from "@/constants";

const chartData = ref(null);

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

onMounted(() => {
  fillChartData();
});

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));
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
          :game="GameConstants.GUITARFREAKS"
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
          :game="GameConstants.GITADORA_GF"
          :value="392"
          profile-name="TRMAZI"
          type="scores"
        />
        <CardBoxGameStat
          :game="GameConstants.GITADORA_DM"
          value="#15 out of 200"
          profile-name="TRMAZI"
          type="ranking"
        />
      </div>

      <SectionTitleLine :icon="mdiAccountMultipleOutline" title="Rivals" main />
      <div
        class="grid grid-flow-row auto-rows-auto grid-cols-1 md:grid-cols-2 gap-5 mb-5"
      >
        <CardBoxClient
          v-for="client in clientBarItems"
          :key="client.id"
          :name="client.name"
          :login="client.login"
          :date="client.created"
          :progress="client.progress"
        />
      </div>

      <SectionTitleLineWithButton :icon="mdiChartPie" title="Trends overview">
        <BaseButton
          :icon="mdiReload"
          color="whiteDark"
          @click="fillChartData"
        />
      </SectionTitleLineWithButton>

      <CardBox class="mb-6">
        <div v-if="chartData">
          <line-chart :data="chartData" class="h-96" />
        </div>
      </CardBox>

      <SectionTitleLineWithButton :icon="mdiAccountMultiple" title="Clients" />

      <CardBox has-table>
        <TableSampleClients />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
