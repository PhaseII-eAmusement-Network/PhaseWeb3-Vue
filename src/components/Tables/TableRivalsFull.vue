<script setup>
import { computed, ref } from "vue";
import { useMainStore } from "@/stores/main";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";

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

function getCardStyle(game) {
  if (game !== null) {
    return `
      background-image: url('/assets/card/${game}.png');
      background-size: cover;
      background-repeat: no-repeat;
    `;
  }
}
</script>

<template>
  <table>
    <thead>
      <tr>
        <th />
        <th>User</th>
        <th>Profile</th>
        <th>Game</th>
        <th>Type</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="client in itemsPaginated" :key="client.id">
        <td
          class="border-b-0 lg:w-6 before:hidden"
          :style="getCardStyle('pride')"
        >
          <UserAvatar username="" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td>
        <td data-label="User">Trmazi</td>
        <td data-label="Profile">TRMAZI</td>
        <td data-label="Game">SOUND VOLTEX</td>
        <td data-label="Type" class="lg:w-32">You Rival</td>
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
