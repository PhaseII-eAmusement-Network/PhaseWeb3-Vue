<script setup>
import { mdiCog } from "@mdi/js";
import { dashCode } from "@/constants/userData";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  game: {
    type: String,
    default: null,
  },
  profile: {
    type: Object,
    required: true,
  },
  useSmall: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex content-center justify-center items-center">
    <img v-if="profile.avatar" class="h-40" :src="profile.avatar" />
    <div class="space-y-2 text-center md:text-left lg:mx-12 p-2">
      <h1 class="text-3xl md:text-4xl font-bold">{{ profile.name }}</h1>
      <p class="text-xl font-mono">{{ dashCode(profile.extid) }}</p>
      <p class="text-md md:text-lg">
        Last played at <b>{{ profile.last.arcade }}</b> on
        <b>{{ profile.last.date }}</b>
      </p>
      <BaseButton
        v-if="!useSmall && game"
        :icon="mdiCog"
        :href="`/#/games/${game}/profiles/${profile.id}`"
        color="info"
        label="Edit Profile"
      />
    </div>
  </div>
  <slot />
</template>
