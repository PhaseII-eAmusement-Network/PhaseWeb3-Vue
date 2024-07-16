<script setup>
import { ref, onMounted } from "vue";
import { mdiCardAccountDetailsOutline } from "@mdi/js";
import { dashCode } from "@/constants/userData.js";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
var cardData = ref([]);

onMounted(async () => {
  try {
    const data = await mainStore.getCards();
    cardData.value = data;
  } catch (error) {
    console.error("Failed to fetch card data:", error);
  }
});

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy to clipboard!");
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />
      <SectionTitleLine
        :icon="mdiCardAccountDetailsOutline"
        title="Login Cards"
        main
      />
      <div class="text-xl mb-4">
        <h4>AC = Web Access Code</h4>
        <h4>NFC-ID = Internal ID for card0.txt</h4>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="card of cardData"
          :key="card.id"
          class="grid dark:bg-slate-900/70 rounded-2xl p-5"
        >
          <div class="flex justify-between md:grid md:gap-2 mb-4 items-center">
            <img src="/assets/passes/generic.webp" class="w-24 md:w-auto" />
            <h1 class="text-xl text-center font-mono">
              {{ dashCode(card.encoded) }}
            </h1>
          </div>

          <div class="grid grid-cols-3 md:grid-cols-2 gap-2">
            <BaseButton
              color="info"
              label="Copy AC"
              @click="copyToClipboard(card.encoded)"
            />
            <BaseButton
              color="info"
              label="Copy NFC-ID"
              @click="copyToClipboard(card.id)"
            />
            <BaseButton color="danger" label="Delete" />
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
