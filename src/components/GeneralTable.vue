<script setup>
// eslint-disable-next-line vue/require-prop-types
defineProps(["headers", "items"]);
const emits = defineEmits(["row-clicked"]);

const handleRowClick = (item) => {
  emits("row-clicked", item);
};
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :items="items"
    theme-color="#c0c7d2"
    table-class-name="customize-table"
    header-text-direction="left"
    body-text-direction="left"
    @click-row="handleRowClick"
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
