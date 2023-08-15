<script setup>
import { computed, ref } from "vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";

const props = defineProps({
  transactions: {
    type: Object,
    required: true,
  },
});

const perPage = ref(8);

const currentPage = ref(0);

const itemsPaginated = computed(() =>
  props.transactions.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);
const numPages = computed(() =>
  Math.ceil(props.transactions.length / perPage.value)
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
        <th>User</th>
        <th>Value</th>
        <th>Machine</th>
        <th>Reason</th>
        <th>Timestamp</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="transaction of itemsPaginated"
        :key="transaction.id"
        class="border-b-[12px] lg:border-b-0"
      >
        <td data-label="User">{{ transaction.user }}</td>
        <td data-label="Value">{{ transaction.value }}</td>
        <td data-label="Machine">{{ transaction.machine }}</td>
        <td data-label="Reason">{{ transaction.reason }}</td>
        <td data-label="Timestamp">{{ transaction.timestamp }}</td>
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
