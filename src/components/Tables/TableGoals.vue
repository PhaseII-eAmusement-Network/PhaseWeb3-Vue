<script setup>
import { computed, ref } from "vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  goals: {
    type: Object,
    required: true,
  },
  isPast: {
    type: Boolean,
    default: false,
  },
});

const perPage = ref(5);

const currentPage = ref(0);

const itemsPaginated = computed(() =>
  props.goals.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);
const numPages = computed(() => Math.ceil(props.goals.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);
const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Game</th>
        <th>Goal</th>
        <th v-if="!isPast">Status</th>
        <th v-else>Result</th>
        <th v-if="!isPast">Time Remaining</th>
        <th v-else>Deadline</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="goal of itemsPaginated" :key="goal.id">
        <td data-label="Game">{{ goal.game }}</td>
        <td data-label="Goal">{{ goal.goal.replace("# of", goal.value) }}</td>
        <td v-if="!isPast" data-label="Status">{{ goal.status }}</td>
        <td v-else data-label="Result">{{ goal.status }}</td>

        <td v-if="!isPast" data-label="Time Remaining">{{ goal.deadline }}</td>
        <td v-else data-label="Deadline">{{ goal.deadline }}</td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
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
</template>
