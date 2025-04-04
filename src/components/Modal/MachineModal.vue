<script setup>
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  machine: {
    type: Object,
    default: null,
  },
});
</script>

<template>
  <OverlayLayer v-if="active && machine" transparent>
    <CardBox
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90"
    >
      <div class="grid text-center justify-center grid-cols-1 gap-3">
        <h1 class="text-xl md:text-2xl">
          {{ machine?.name }}
        </h1>
        <p class="text-lg md:text-xl">{{ machine?.PCBID }}</p>
      </div>
    </CardBox>
  </OverlayLayer>
</template>
