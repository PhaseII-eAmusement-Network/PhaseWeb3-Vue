<script setup>
import { watch, ref } from "vue";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "vue-chartjs";

import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";
import FormRangeSlider from "@/components/FormRangeSlider.vue";
import { getGameInfo } from "@/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const props = defineProps({
  profile: {
    type: String,
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
  scores: {
    type: Object,
  },
});

const userProfile = ref(props.profile);
const version = ref(props.version);
watch(
  () => props.version,
  () => {
    userProfile.value = props.profile;
    version.value = props.version;
  },
);

const groups = [
  0, 700_000, 800_000, 850_000, 900_000, 950_000, 970_000, 980_000, 990_000,
  995_000, 999_000, 999_910, 1_000_000,
];
const colorGroups = [
  "rgba(220, 38, 38, 0.6)", // 0
  "rgba(192, 38, 211, 0.6)", // 700_000
  "rgba(22, 95, 250, 0.6)", // 800_000
  "rgba(0, 125, 244, 0.6)", // 850_000
  "rgba(0, 149, 230, 0.6)", // 900_000
  "rgba(0, 169, 226, 0.6)", // 950_000
  "rgba(0, 187, 225, 0.6)", // 970_000
  "rgba(0, 206, 224, 0.6)", // 980_000
  "rgba(0, 221, 218, 0.6)", // 990_000
  "rgba(94, 234, 212, 0.6)", // 995_000
  "rgba(251, 191, 36, 0.6)", // 999_000
  "rgba(251, 211, 96, 0.6)", // 999_910
  "rgba(253, 230, 138, 0.6)", // 1_000_000
];

const shortLabels = groups.map((label) => label.toLocaleString());
const fullLabels = [];
for (const [index, value] of groups.entries()) {
  const nextValue = groups[index + 1];
  fullLabels.push(
    `${value.toLocaleString()}${nextValue ? ` - ${(nextValue - 1).toLocaleString()}` : ""}`,
  );
}

const gameInfo = getGameInfo(props.game);
const chartData = ref({
  labels: shortLabels,
  datasets: [
    {
      label: "0",
      backgroundColor: colorGroups,
      borderColor: "rgba(22, 95, 250, 0.5)",
      data: [],
    },
    {
      label: "0",
      backgroundColor: colorGroups,
      borderColor: "rgba(250, 170, 22, 0.5)",
      data: [],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      ticks: {
        precision: 0,
      },
    },
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        title: function (ctx) {
          return fullLabels[ctx[0].dataIndex];
        },
        label: function (ctx) {
          return `level ${ctx.dataset.label}: ${ctx.parsed.y} scores`;
        },
      },
    },
  },
};

const singleScores = [];
const doubleScores = [];
for (const song of props.scores) {
  for (const chart of song.charts) {
    const record = chart.record;
    if (!record) continue;

    const targetArray = chart.chart > 5 ? doubleScores : singleScores;
    targetArray.push({ song, chart });
  }
}

const statsTemplate = {
  total: 0,
  avg: 0,
  median: 0,
  mfc: 0,
  pfc: 0,
  aaa: 0,
  aa: 0,
  other: 0,
  fails: 0,
};
function onRangeUpdate(index, scores, stats) {
  return (value) => {
    const data = new Array(groups.length).fill(0);
    const [min, max] = value;
    const allPoints = [];
    stats.value = { ...statsTemplate };

    for (const { chart } of scores) {
      const record = chart.record;
      const difficulty = chart.data.difficulty;

      if (difficulty >= min && difficulty <= max) {
        let targetIndex = -1;
        for (const [index, minimum] of groups.entries()) {
          if (record.points >= minimum) targetIndex = index;
        }
        data[targetIndex]++;
        allPoints.push(record.points);

        const halo = gameInfo.haloTable[record.data.halo];
        const rank = gameInfo.rankTable[record.data.rank];

        if (halo == "FAILED") stats.value.fails++;
        else if (halo == "MFC") stats.value.mfc++;
        else if (halo == "PFC") stats.value.pfc++;
        else if (rank == "AAA") stats.value.aaa++;
        else if (rank == "AA+") stats.value.aa++;
        else stats.value.other++;
      }
    }

    stats.value.total = allPoints.length;
    stats.value.avg = Math.floor(
      allPoints.reduce((prev, cur) => prev + cur, 0) / (allPoints.length || 1),
    );

    stats.value.median = allPoints[0] ?? 0;
    if (allPoints.length > 1) {
      allPoints.sort();
      const middle = Math.floor(allPoints.length / 2);
      stats.value.median =
        allPoints.length % 2 !== 0
          ? allPoints[middle]
          : (allPoints[middle - 1] + allPoints[middle]) / 2;
    }

    chartData.value.datasets[index].data = data;
    chartData.value.datasets[index].label =
      `${min}${min !== max ? `-${max}` : ""}`;
  };
}

const singlesRange = ref([1, 19]);
const singlesStats = ref({ ...statsTemplate });
watch(singlesRange, onRangeUpdate(0, singleScores, singlesStats), {
  immediate: true,
});

const doublesRange = ref([1, 19]);
const doublesStats = ref({ ...statsTemplate });
watch(doublesRange, onRangeUpdate(1, doubleScores, doublesStats), {
  immediate: true,
});

const items = ref([
  { model: singlesRange, stats: singlesStats, label: "SP" },
  { model: doublesRange, stats: doublesStats, label: "DP" },
]);
</script>

<template>
  <CardBox v-if="chartData.datasets" class="my-6">
    <div class="grid lg:grid-cols-2 gap-4">
      <CardBox
        v-for="[index, item] in items.entries()"
        :key="item.label"
        color-prop="bg-slate-800 dark:bg-slate-800"
        class="min-w-0"
      >
        <PillTag
          color="info"
          :label="`${item.label} Statistics`"
          class="mb-4"
        />
        <FormRangeSlider
          v-model="item.model"
          :name="`${item.label}-level-range`"
          label="Level Range"
          :min="1"
          :max="19"
          :step="1"
        />

        <div
          class="flex flex-col xl:flex-row justify-between gap-y-4 xl:gap-y-0 xl:gap-x-6 items-start w-full min-w-0"
        >
          <div class="w-full xl:w-[40%] flex flex-col text-left">
            <span class="font-medium">
              Displaying {{ item.stats.total.toLocaleString() }} Records
            </span>
            <span class="font-light">
              - with an average score of
              {{ item.stats.avg.toLocaleString() }}
            </span>
            <span class="font-light">
              - with a median score of
              {{ item.stats.median.toLocaleString() }}
            </span>
            <span class="font-light">
              - of which are MFCs - {{ item.stats.mfc }}
            </span>
            <span class="font-light">
              - of which are PFCs - {{ item.stats.pfc }}
            </span>
            <span class="font-light">
              - of which are AAAs - {{ item.stats.aaa }}
            </span>
            <span class="font-light">
              - of which are AA+s - {{ item.stats.aa }}
            </span>
            <span class="font-light">
              - of which are AAs and below - {{ item.stats.other }}
            </span>
            <span class="font-light">
              - of which are fails - {{ item.stats.fails }}
            </span>
          </div>

          <div class="w-full xl:w-[60%] h-60 min-w-0 relative block">
            <Bar
              class="w-full h-full bg-slate-100 p-2 rounded-lg"
              :data="{
                labels: chartData.labels,
                datasets: [chartData.datasets[index]],
              }"
              :options="chartOptions"
            />
          </div>
        </div>
      </CardBox>
    </div>
  </CardBox>
</template>
