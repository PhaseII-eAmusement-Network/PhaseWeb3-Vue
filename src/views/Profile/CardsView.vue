<script setup>
import { mdiCardAccountDetailsOutline } from "@mdi/js";
import { dashCode } from "@/constants/userData.js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
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
        <CardBox v-for="card of myCards" :key="card">
          <img src="/assets/passes/generic.png" class="rounded-3xl mb-4" />
          <h1 class="text-xl text-center font-mono">{{ dashCode(card) }}</h1>

          <template #footer>
            <div class="grid grid-cols-2 gap-3">
              <BaseButton type="submit" color="info" label="Copy AC" />
              <BaseButton type="submit" color="info" label="Copy NFC-ID" />
              <BaseButton type="submit" color="danger" label="Delete" />
            </div>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
