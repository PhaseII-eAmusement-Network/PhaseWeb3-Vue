<script setup>
import { reactive } from "vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "../CardBoxComponentEmpty.vue";

defineProps({
  game: {
    type: String,
    required: true,
  },
  isPersonal: {
    type: Boolean,
    default: false,
  },
  entries: {
    type: Array,
    required: true,
  },
});

const currentPage = reactive(0);
</script>

<template>
  <table v-if="entries && entries.length">
    <thead>
      <tr>
        <th v-if="!isPersonal">Player</th>
        <th>Timestamp</th>
        <th>Song</th>
        <th>Chart</th>
        <th>Score</th>
        <th>Arcade</th>
      </tr>
    </thead>
    <tbody class="space-y">
      <tr
        v-for="score of entries"
        :key="score.id"
        class="border-b-[12px] lg:border-b-0"
      >
        <td v-if="!isPersonal" data-label="Player">{{ score.player }}</td>

        <td data-label="Timestamp">{{ score.timestamp }}</td>

        <td v-if="score.song" data-label="Song">
          <a
            class="grid grid-cols-1 hover:underline decoration-blue-700"
            :href="`/#/songs/${game}/${score.song.id}`"
          >
            <h2 class="italic">{{ score.song.name }}</h2>
            <h2>{{ score.song.artist }}</h2>
          </a>
        </td>

        <td v-if="score.song" data-label="Chart">
          <div class="grid grid-cols-1">
            <h2>{{ score.song.chart }}</h2>
            <h2>Difficulty: {{ score.song.difficulty }}</h2>
          </div>
        </td>

        <td data-label="Score">
          <div class="grid grid-cols-1">
            <h2>Grade: {{ score.grade }}</h2>
            <h2>Points: {{ score.points }}</h2>
            <h2>Max Combo: {{ score.combo }}</h2>
          </div>
        </td>

        <td v-if="score.location" data-label="Arcade">
          <div class="grid grid-cols-1">
            <h2>{{ score.location.arcade }}</h2>
            <h2>Played on: {{ score.location.type }}</h2>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <div
    v-if="entries && entries.length"
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in 0"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
  <CardBoxComponentEmpty v-else />
</template>
