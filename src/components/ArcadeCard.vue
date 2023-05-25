<script setup>
import { mdiTestTube, mdiStoreOutline, mdiHomeOutline } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";

function getCardStyle(game) {
  if (game !== null) {
    return `
      background-image: url('${game}');
      background-size: cover;
      background-repeat: no-repeat;
    `;
  }
}

const arcadeData = {
  id: 0,
  name: "Test Arcade",
  beta: true,
  public: true,
  cover:
    "https://nianticlabs.com/img/posts/smb-spotlight-boss-battle-games.jpg",
};
</script>

<template>
  <CardBox :style="getCardStyle(arcadeData.cover)">
    <BaseLevel
      type="justify-center"
      class="bg-white dark:bg-slate-900/90 rounded-2xl p-3"
    >
      <div class="space-y-3 text-center">
        <h1 class="text-2xl lg:text-3xl">{{ arcadeData.name }}</h1>
        <div class="flex flex-wrap gap-4 place-content-center">
          <PillTag
            v-if="arcadeData.beta"
            label="Beta Enabled"
            color="warning"
            :icon="mdiTestTube"
          />
          <PillTag
            v-if="arcadeData.public"
            label="Public Arcade"
            color="success"
            :icon="mdiStoreOutline"
          />
          <PillTag
            v-if="!arcadeData.public"
            label="Private Arcade"
            color="info"
            :icon="mdiHomeOutline"
          />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
