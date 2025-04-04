<script setup>
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import GameIcon from "@/components/GameIcon.vue";
import BaseButton from "@/components/BaseButton.vue";
import { getGameInfo } from "@/constants";

defineProps({
  settings: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["saveMerge", "closeModal"]);

function saveSettings() {
  emit("saveMerge");
}
</script>

<template>
  <OverlayLayer transparent @overlay-click="emit('closeModal')">
    <CardBox
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90"
    >
      <div class="grid grid-cols-1 gap-3">
        <h1 class="text-2xl font-bold">Merge Overview</h1>

        <template v-for="setting of Object.keys(settings)" :key="setting">
          <div v-if="setting !== 'card'" class="flex gap-4 items-center">
            <GameIcon :path="getGameInfo(setting)?.icon" />
            <div>
              <h1 class="text-2xl">
                {{ getGameInfo(setting)?.name }}
              </h1>
              <h2 class="text-lg">
                {{ settings[setting]?.scores ? "✅" : "❌" }} Transfer Scores
              </h2>
            </div>
          </div>
        </template>

        <div>
          <span>{{ settings?.card ? "✅" : "❌" }} Transfer Card</span>
        </div>

        <div class="space-x-2 mt-6">
          <BaseButton color="success" label="Save" @click="saveSettings" />
        </div>
      </div>
    </CardBox>
  </OverlayLayer>
</template>
