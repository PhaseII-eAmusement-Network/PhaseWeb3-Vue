<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";
import { PhArrowLineUpRight } from "@phosphor-icons/vue";
import CardBox from "@/components/CardBox.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GeneralTable from "@/components/GeneralTable.vue";
const $router = useRouter();

const hitchartHeaders = [
  { text: "Song", value: "name", width: 140, sortable: true },
  { text: "Artist", value: "artist", width: 140, sortable: true },
  { text: "Plays", value: "plays", width: 100, sortable: true },
];

const props = defineProps({
  hitchartData: {
    type: Object,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
});

const navigateToSong = (item) => {
  const songId = item.songid;
  $router.push(`/games/${props.gameId}/song/${songId}`);
};
</script>

<template>
  <SectionTitleLine
    :icon="PhArrowLineUpRight"
    color="text-yellow-400"
    title="Hitchart"
    main
  />
  <CardBox has-table>
    <GeneralTable
      :headers="hitchartHeaders"
      :items="hitchartData"
      :rows-per-page="5"
      @row-clicked="navigateToSong"
    />
  </CardBox>
</template>
