<script setup>
import { watch, ref, onMounted, computed } from "vue";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "vue-chartjs";

import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";
import { APIGetAchievements } from "@/stores/api/profile";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const props = defineProps({
  profile: {
    type: Number,
    default: null,
  },
  game: {
    type: String,
    default: null,
  },
  version: {
    type: Number,
    default: 9,
  },
});

const userProfile = ref(props.profile);
const version = ref(props.version);
const loading = ref(true);
const loadingKey = ref(0);
const chartData = ref({
  labels: ["Notes", "Peak", "Scratch", "Sof-Lan", "Charge", "Chord"],
  datasets: [
    {
      label: "SP",
      backgroundColor: "rgba(22, 95, 250, 0.2)",
      borderColor: "rgba(22, 95, 250, 1)",
      pointBackgroundColor: "rgba(22, 95, 250, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(22, 95, 250, 1)",
      data: [],
    },
    {
      label: "DP",
      backgroundColor: "rgba(250, 170, 22, 0.2)",
      borderColor: "rgba(250, 170, 22, 1)",
      pointBackgroundColor: "rgba(250, 170, 22, 1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(250, 170, 22, 1)",
      data: [],
    },
  ],
});

watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    version.value = props.version;
    loadData();
  }
);

async function loadData() {
  try {
    const data = await APIGetAchievements(
      props.game,
      props.version,
      userProfile.value,
      [
        ["notes_radar", 0],
        ["notes_radar", 1],
      ]
    );

    const reorderData = (originalData) => {
      const [notes, peak, scratch, sof_lan, charge, chord] = originalData;
      return [
        notes / 100,
        peak / 100,
        scratch / 100,
        sof_lan / 100,
        charge / 100,
        chord / 100,
      ];
    };

    if (data[0]?.achievementId === 0) {
      chartData.value.datasets[0].data = reorderData(data[0].data.radar_score);
    }
    if (data[1]?.achievementId === 1) {
      chartData.value.datasets[1].data = reorderData(data[1].data.radar_score);
    }

    loading.value = false;
    loadingKey.value += 1;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

onMounted(async () => {
  loadData();
});

const chartOptions = {
  responsive: false,
  maintainAspectRatio: true,
  scales: {
    r: {
      ticks: {
        stepSize: 30,
        callback: function (value) {
          return value;
        },
      },
      pointLabels: {
        font: {
          size: 15,
        },
      },
    },
  },
};

const spTotalScore = computed(() => {
  return chartData.value.datasets[0].data
    .reduce((sum, value) => sum + value, 0)
    .toFixed(2);
});

const dpTotalScore = computed(() => {
  return chartData.value.datasets[1].data
    .reduce((sum, value) => sum + value, 0)
    .toFixed(2);
});
</script>

<template>
  <CardBox v-if="chartData.datasets[0]" class="my-6">
    <div class="grid lg:grid-cols-2 gap-4">
      <CardBox color-prop="bg-slate-800 dark:bg-slate-800">
        <PillTag color="info" label="SP Radar" class="mb-2" />
        <div class="w-full grid place-content-center text-center">
          <Radar
            :key="loadingKey"
            class="bg-slate-100 p-2 rounded-lg"
            :data="{
              labels: chartData.labels,
              datasets: [chartData.datasets[0]],
            }"
            :options="chartOptions"
          />
          <span class="text-lg">Total score: {{ spTotalScore }}</span>
        </div>
      </CardBox>
      <CardBox color-prop="bg-slate-800 dark:bg-slate-800">
        <PillTag color="info" label="DP Radar" class="mb-2" />
        <div class="w-full grid place-content-center text-center">
          <Radar
            :key="loadingKey"
            class="bg-slate-100 p-2 rounded-lg"
            :data="{
              labels: chartData.labels,
              datasets: [chartData.datasets[1]],
            }"
            :options="chartOptions"
          />
          <span class="text-lg">Total score: {{ dpTotalScore }}</span>
        </div>
      </CardBox>
    </div>
  </CardBox>
</template>
