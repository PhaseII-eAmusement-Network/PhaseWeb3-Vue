<script setup>
import { ref } from "vue";

// Define props
// eslint-disable-next-line vue/require-prop-types
const props = defineProps(["headers", "items"]);

// Create a loading state
const isLoading = ref(true);

var setItems = [];

// Simulate loading data (for example, you might fetch data from an API)
setTimeout(() => {
  isLoading.value = false;
  setItems = props.items;
  // You can set props.items here if you are fetching data dynamically
  // For demonstration, we leave it as an empty array to show the empty message slot
}, 500);
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :items="setItems"
    :loading="isLoading"
    theme-color="#1d90ff"
    table-class-name="customize-table"
    header-text-direction="left"
    body-text-direction="left"
  >
    <template #loading>
      <div class="text-center align-center grid">
        <img
          class="rounded-full place-self-center"
          src="/icon.gif"
          width="60"
        />
        <h1 class="text-lg text-gray-100">Loading</h1>
      </div>
    </template>

    <template #empty-message>
      <h1 class="text-xl text-gray-100">No data to show... 😔</h1>
    </template>
  </EasyDataTable>
</template>
