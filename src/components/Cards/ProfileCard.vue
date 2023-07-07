<script setup>
import { mdiCog } from "@mdi/js";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  useQpro: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
    default: null,
  },
  useSmall: {
    type: Boolean,
    default: false,
  },
});

var last = {
  arcade: "Ho-House",
};
</script>

<template>
  <div class="flex justify-center items-center">
    <img v-if="avatar" class="h-40" :src="avatar" />
    <div class="space-y-2 text-left lg:mx-12 p-2">
      <h1 class="text-3xl md:text-4xl font-bold">TRMAZI</h1>
      <p class="text-xl ordinal slashed-zero">1234-5678</p>
      <p class="text-md md:text-lg">
        Last played at <b>{{ last.arcade }}</b> on <b>10/22/2022</b>
      </p>
      <BaseButton
        v-if="!useSmall"
        :icon="mdiCog"
        href="/#/games/ddr/profiles/1"
        color="info"
        label="Edit Profile"
      />
    </div>
  </div>
  <div v-if="!useSmall" class="grid grid-cols-1 gap-6 lg:grid-cols-4 pt-6">
    <CardBoxWidget :number="3733" label="Scores (All Versions)" />
    <CardBoxWidget :number="1244" label="Plays (All Versions)" />
    <CardBoxWidget
      prefix="#"
      :number="43"
      suffix=" / 300"
      label="Ranking (All Versions)"
    />
    <CardBoxWidget :number="2" label="Rivals" />
  </div>
</template>
