<script setup>
import { mdiTestTube, mdiStoreOutline, mdiHomeOutline } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";

defineProps({
  useSmall: {
    type: Boolean,
    required: false,
    default: true,
  },
  arcadeData: {
    type: Object,
    required: true,
  },
});

function getCardStyle(game) {
  if (game !== null) {
    return `
      background-image: url('${game}');
      background-size: cover;
      background-repeat: no-repeat;
    `;
  }
}
</script>

<template>
  <CardBox :style="getCardStyle(arcadeData.image)">
    <BaseLevel
      type="justify-center"
      class="bg-white dark:bg-slate-900/90 rounded-2xl p-3"
    >
      <div class="space-y-3 text-center">
        <h1 class="text-2xl lg:text-3xl font-bold">{{ arcadeData.name }}</h1>
        <h2 class="text-xl md:text-2xl font-bold">{{ arcadeData.area }}</h2>
        <hr class="border-t border-1 w-full" />
        <p class="text-lg">
          Managed by
          <span
            v-for="(user, index) in arcadeData.admins"
            :key="index"
            class="font-bold"
          >
            <span v-if="index === 0">{{ user }}</span>
            <span v-else-if="index >= arcadeData.admins.length - 1"
              >, <span class="font-normal">and</span> {{ user }}.</span
            >
            <span v-else>, {{ user }}</span>
          </span>
        </p>
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
