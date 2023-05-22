<script setup>
import { useMainStore } from "@/stores/main";
import {
  mdiSecurity,
  mdiTestTube,
  mdiAccountStar,
  mdiCodeBraces,
} from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import UserAvatarCurrentUser from "@/components/UserAvatarCurrentUser.vue";
import CardBox from "@/components/CardBox.vue";
import PillTag from "@/components/PillTag.vue";

import { GetRandomMessage } from "@/constants";

const mainStore = useMainStore();

const greeting = GetRandomMessage();

const cardStyle = `
  background-image: linear-gradient(to left, transparent, rgba(0, 0, 0, 1)),
    url('/assets/card/ddr.png');
  background-size: cover;
  background-repeat: no-repeat;
`;
</script>

<template>
  <CardBox :style="cardStyle">
    <BaseLevel
      type="justify-around lg:justify-center md:space-x-4 lg:space-x-0"
      class="bg-white dark:bg-slate-900/90 rounded-2xl p-3"
    >
      <UserAvatarCurrentUser class="w-28 md:w-32 lg:w-44 lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="space-y-2 md:space-y-0">
          <h1 class="text-2xl md:text-xl lg:text-2xl">
            {{ greeting.header[0] }}
            <b>{{ mainStore.userName }} </b>{{ greeting.header[1] }}
          </h1>
        </div>
        <div
          class="md:grid md:grid-flow-col md:auto-cols-max md:grid-rows-2 flex flex-wrap gap-4 md:place-content-start place-content-center"
        >
          <PillTag label="System Admin" color="danger" :icon="mdiSecurity" />
          <PillTag label="Beta Tester" color="warning" :icon="mdiTestTube" />
          <PillTag label="Veteran" color="success" :icon="mdiAccountStar" />
          <PillTag label="Active Dev" color="info" :icon="mdiCodeBraces" />
        </div>
      </div>
      <div>
        <p class="text-xl md:text-lg lg:text-2lg">{{ greeting.comment }}</p>
        <p class="text-xs italic">Greeting by: {{ greeting.author }}</p>
      </div>
    </BaseLevel>
  </CardBox>
</template>
