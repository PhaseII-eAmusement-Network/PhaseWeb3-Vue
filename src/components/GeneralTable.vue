<script setup>
import { PhDownload, PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
import { useRoute } from "vue-router";
import { exportJSON } from "@/helpers/contentExport";

const $route = useRoute();

const props = defineProps(["headers", "items", "hasAvatar"]);
const emits = defineEmits(["row-clicked"]);

const handleRowClick = (item) => {
  emits("row-clicked", item);
};

function downloadJSON() {
  exportJSON($route.fullPath, {
    headers: props.headers,
    data: props.items,
  });
}
</script>

<template>
  <EasyDataTable
    :headers="headers"
    :items="items"
    theme-color="#c0c7d2"
    table-class-name="customize-table"
    header-text-direction="left"
    body-text-direction="left"
    :prevent-context-menu-row="false"
    class="pt-2"
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

    <template
      #pagination="{
        prevPage,
        nextPage,
        isFirstPage,
        isLastPage,
        currentPaginationNumber,
      }"
    >
      <div class="flex items-center">
        <BaseButton
          :icon="PhCaretLeft"
          color="info"
          very-small
          :disabled="isFirstPage"
          @click="prevPage"
        />
        <span class="m-1 p-1 bg-slate-800 rounded-md">{{
          currentPaginationNumber
        }}</span>
        <BaseButton
          :icon="PhCaretRight"
          color="info"
          very-small
          small
          :disabled="isLastPage"
          @click="nextPage"
        />
      </div>
    </template>

    <template v-if="props.hasAvatar" #item-username="{ username, data }">
      <div class="username-wrapper flex items-center gap-2">
        <div class="w-6">
          <UserAvatar
            :avatar="
              data?.discord
                ? `https://cdn.discordapp.com/avatars/${data?.discord?.id}/${data?.discord?.avatar}`
                : null
            "
            username=""
          />
        </div>
        <span>{{ username }}</span>
      </div>
    </template>

    <slot />
  </EasyDataTable>
  <div class="p-2 w-full flex md:justify-end">
    <BaseButton
      label="Export Table"
      :icon="PhDownload"
      color="info"
      @click="downloadJSON"
    />
  </div>
</template>

<style>
.customize-table {
  --easy-table-border: 1px solid #1f2937;
  --easy-table-row-border: 1px solid #445269;

  --easy-table-header-font-size: 15px;
  --easy-table-header-height: 50px;
  --easy-table-header-font-color: #c1cad4;
  --easy-table-header-background-color: #0f172a;

  --easy-table-header-item-padding: 10px 15px;

  --easy-table-body-even-row-font-color: #fff;
  --easy-table-body-even-row-background-color: #475569;

  --easy-table-body-row-font-color: #c0c7d2;
  --easy-table-body-row-background-color: #334155;
  --easy-table-body-row-height: 50px;
  --easy-table-body-row-font-size: 15px;

  --easy-table-body-row-hover-font-color: #c0c7d2;
  --easy-table-body-row-hover-background-color: #475569;

  --easy-table-body-item-padding: 10px 15px;

  --easy-table-footer-background-color: #0f172a;
  --easy-table-footer-font-color: #c0c7d2;
  --easy-table-footer-click-button-color: #0062ff;
  --easy-table-footer-font-size: 14px;
  --easy-table-footer-padding: 0px 10px;
  --easy-table-footer-height: 50px;

  --easy-table-rows-per-page-selector-width: 70px;
  --easy-table-rows-per-page-selector-option-padding: 10px;
  --easy-table-rows-per-page-selector-z-index: 1;

  --easy-table-scrollbar-track-color: #2d3a4f;
  --easy-table-scrollbar-color: #2d3a4f;
  --easy-table-scrollbar-thumb-color: #4c5d7a;
  --easy-table-scrollbar-corner-color: #2d3a4f;

  --easy-table-loading-mask-background-color: #2d3a4f;
}
</style>
