<script setup>
import { useMainStore } from "@/stores/main";
import {
  mdiSecurity,
  // mdiTestTube,
  // mdiAccountStar,
  // mdiCodeBraces,
  mdiAccountOff,
  // mdiAccountCheck,
} from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";

defineProps({
  useSmall: {
    type: Boolean,
    required: false,
    default: false,
  },
  evenSmaller: {
    type: Boolean,
    required: false,
    default: false,
  },
});

import { GetRandomMessage } from "@/constants";

const mainStore = useMainStore();

const greeting = GetRandomMessage();

// var last = {
//   game: "beatmaniaIIDX",
//   version: "22 PENDUAL",
//   arcade: "Ho-House",
// };

function getCardStyle(game) {
  if (game !== null) {
    return `
      background-image: url('/assets/card/${game}.png');
      background-size: cover;
      background-repeat: no-repeat;
    `;
  }
}
</script>

<template>
  <CardBox :style="getCardStyle(mainStore.userCardStyle)">
    <BaseLevel
      type="justify-around lg:justify-center md:space-x-4 lg:space-x-0"
      class="bg-white dark:bg-slate-900/90 rounded-2xl p-3"
    >
      <UserAvatarCurrentUser class="w-28 md:w-32 lg:w-44 lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="space-y-2 md:space-y-0">
          <h1 v-if="!useSmall" class="text-2xl md:text-xl lg:text-2xl">
            {{ greeting.header[0] }}
            <b>{{ mainStore.userName }} </b>{{ greeting.header[1] }}
          </h1>
          <h1 v-if="useSmall" class="text-3xl md:text-4xl">
            <b>{{ mainStore.userName }}</b>
          </h1>
          <p v-if="useSmall && !evenSmaller" class="text-md md:text-lg">
            <!-- Last seen playing <b>{{ last.game }} {{ last.version }}</b> at
            <b>{{ last.arcade }}</b> -->
          </p>
        </div>
        <div
          v-if="!evenSmaller"
          class="md:grid md:grid-flow-col md:auto-cols-max md:grid-rows-1 flex flex-wrap gap-4 md:place-content-start place-content-center"
        >
          <PillTag
            v-if="mainStore.userAdmin"
            label="System Admin"
            color="danger"
            :icon="mdiSecurity"
          />
          <!-- <PillTag label="Beta Tester" color="warning" :icon="mdiTestTube" />
          <PillTag label="Veteran" color="success" :icon="mdiAccountStar" />
          <PillTag label="Active Dev" color="info" :icon="mdiCodeBraces" /> -->
          <PillTag label="Private Profile" color="info" :icon="mdiAccountOff" />
          <!-- <PillTag
            label="Public Profile"
            color="success"
            :icon="mdiAccountCheck"
          /> -->
        </div>
      </div>
      <div v-if="!useSmall" class="text-center md:text-right">
        <p class="text-xl md:text-lg lg:text-2lg">{{ greeting.comment }}</p>
        <p class="text-xs italic">Greeting by: {{ greeting.author }}</p>
      </div>
    </BaseLevel>
  </CardBox>
</template>
