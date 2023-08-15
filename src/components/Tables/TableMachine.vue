<script setup>
import { computed, ref } from "vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  machines: {
    type: Object,
    required: true,
  },
});

const perPage = ref(8);

const currentPage = ref(0);

const itemsPaginated = computed(() =>
  props.machines.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);
const numPages = computed(() =>
  Math.ceil(props.machines.length / perPage.value)
);

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
        <th>Name</th>
        <th>PCBID</th>
        <th>Cabinet?</th>
        <th>Updates?</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="machine of itemsPaginated"
        :key="machine.id"
        class="border-b-[12px] lg:border-b-0"
      >
        <td data-label="Name">{{ machine.name }}</td>
        <td data-label="PCBID">{{ machine.pcbid }}</td>
        <td data-label="Cabinet?">{{ machine.cabinet ? "Yes" : "No" }}</td>
        <td data-label="Updates?">{{ machine.ota ? "Yes" : "No" }}</td>
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
