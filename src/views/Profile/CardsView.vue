<script setup>
import { mdiCardAccountDetailsOutline } from "@mdi/js";
import { dashCode } from "@/constants/userData.js";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";

const myCards = [
  "YRZ2FGHW24JJTU2E",
  "Z1Y0WWAMXGRMZY26",
  "1RJKZLBFKSK2AB2F",
  "R1Y4H1J7GSUZSR2P",
  "7JNC815MHXU33222",
];
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
          v-for="card of myCards"
          :key="card"
          class="grid dark:bg-slate-900/70 rounded-2xl p-5"
        >
          <div class="flex justify-between md:grid md:gap-2 mb-4 items-center">
            <img src="/assets/passes/generic.png" class="w-24 md:w-auto" />
            <h1 class="text-xl text-center font-mono">{{ dashCode(card) }}</h1>
          </div>

          <div class="grid grid-cols-3 md:grid-cols-2 gap-2">
            <BaseButton type="submit" color="info" label="Copy AC" />
            <BaseButton type="submit" color="info" label="Copy NFC-ID" />
            <BaseButton type="submit" color="danger" label="Delete" />
          </div>
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
