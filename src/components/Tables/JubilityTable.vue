<script setup>
import { ref, onMounted } from "vue";
import CardBox from "@/components/CardBox.vue";
import { useMainStore } from "@/stores/main";
import PillTag from "@/components/PillTag.vue";

const mainStore = useMainStore();
const songData = ref(null);

const props = defineProps({
  jubilityData: {
    type: Array,
    required: true,
  },
  version: {
    type: Number,
    required: true,
  },
});

const difficultyTable = {
  0: {
    label: "Basic",
    color: "info",
  },
  1: {
    label: "Advanced",
    color: "warning",
  },
  2: {
    label: "Extreme",
    color: "danger",
  },
};

onMounted(async () => {
  try {
    songData.value = null;
    const songIds = props.jubilityData.map((item) => item.song_id);
    const fetchedData = await mainStore.getMusicData(
      "jubeat",
      props.version,
      songIds
    );

    // Combine the fetched data with jubilityData
    const combinedData = props.jubilityData.map((jubilityItem) => {
      const matchingSong = fetchedData.find(
        (song) =>
          song.id === jubilityItem.song_id && song.chart === jubilityItem.chart
      );
      return {
        ...jubilityItem,
        ...(matchingSong ? { songData: matchingSong } : {}),
      };
    });

    combinedData.sort((a, b) => b.rate - a.rate);
    songData.value = combinedData;
  } catch (error) {
    console.error("Failed to fetch music data:", error);
  }
});
</script>

<template>
  <template v-if="songData">
    <CardBox
      v-for="song of songData"
      :key="song.id"
      color-prop="bg-slate-800 dark:bg-slate-800"
      class="my-3 p-5"
      has-table
    >
      <div class="flex space-x-2 mb-2">
        <PillTag
          :label="difficultyTable[song.chart].label"
          :color="difficultyTable[song.chart].color"
        />
        <PillTag v-if="song.hard" label="Hard Mode" color="danger" />
      </div>
      <div class="flex justify-between items-center">
        <div class="grid">
          <h1 class="text-lg font-bold">{{ song.songData.name }}</h1>
          <h2 class="text-md">{{ song.songData.artist }}</h2>
        </div>
        <div>
          <h2 class="text-lg">Rate: {{ song.rate / 10 }}</h2>
        </div>
      </div>
    </CardBox>
  </template>
</template>
