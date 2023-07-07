<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

const mainStore = useMainStore();

const items = computed(() => mainStore.clients);

const perPage = ref(5);

const currentPage = ref(0);

const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

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
        <th>Username</th>
        <th>Rival ID</th>
        <th>Creation Date</th>
        <th>Last Played</th>
        <th>Last Arcade</th>
        <th>Play Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <td data-label="Username">TRMAZI</td>
        <td data-label="Rival ID">1234-5678</td>
        <td data-label="Creation Date">10/22/2022</td>
        <td data-label="Last Played">10/22/2022</td>
        <td data-label="Last Arcade">Ho-House</td>
        <td data-label="Play Count" class="lg:w-32">466</td>
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
