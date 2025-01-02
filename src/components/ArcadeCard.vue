<script setup>
import {
  mdiTestTube,
  mdiHomeOutline,
  mdiNewspaperVariantMultiple,
  mdiGamepad,
  mdiCashRegister,
  mdiHome,
} from "@mdi/js";
import { ref } from "vue";
// import { getArea } from "@/constants/area";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButton from "@/components/BaseButton.vue";
import PillTag from "@/components/PillTag.vue";
const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

const props = defineProps({
  useSmall: {
    type: Boolean,
    required: false,
    default: false,
  },
  arcade: {
    type: Object,
    required: true,
  },
});

var arcadeData = ref(props.arcade.data);
function getCardStyle(path) {
  if (path !== null) {
    return `
      background-image: url('${path}');
      background-size: cover;
      background-repeat: no-repeat;
    `;
  }
}

// const areaData = getArea(props.arcadeData.area);
</script>

<template>
  <div
    :style="getCardStyle(`${ASSET_PATH}/card/carpet.webp`)"
    class="rounded-2xl mb-6 w-full"
  >
    <BaseLevel
      type="justify-center"
      class="bg-white dark:bg-slate-900/90 rounded-2xl p-6 w-full"
    >
      <div class="space-y-3 text-center w-full">
        <h1 class="text-2xl lg:text-3xl font-bold">{{ arcade.name }}</h1>
        <div class="flex gap-2 justify-center items-center">
          <!-- <h2 class="text-2xl md:text-3xl font-bold lg:hidden">
            {{ areaData.flag }}
          </h2> -->
          <h2 class="text-xl md:text-2xl font-bold">
            {{ arcade.description }}
          </h2>
        </div>
        <div class="flex flex-wrap gap-4 place-content-center">
          <PillTag
            v-if="arcadeData.is_beta"
            label="Beta Enabled"
            color="warning"
            :icon="mdiTestTube"
          />
          <PillTag label="Private Arcade" color="info" :icon="mdiHomeOutline" />
        </div>

        <hr class="border-t border-1 w-full" />
        <p v-if="arcade.owners && arcade.owners.length" class="text-lg">
          Managed by
          <span
            v-for="(owner, index) in arcade.owners"
            :key="owner.username"
            class="font-bold"
          >
            <template v-if="arcade.owners.length === 2 && index === 0">{{
              owner.username
            }}</template>
            <template v-else-if="arcade.owners.length === 2 && index === 1">
              <span class="font-normal"> and</span>
              {{ owner.username }}.</template
            >
            <template v-else-if="index === 0">{{ owner.username }}</template>
            <template v-else-if="index === arcade.owners.length - 1"
              >, <span class="font-normal"> and</span>
              {{ owner.username }}.</template
            >
            <template v-else>, {{ owner.username }}</template>
          </span>
        </p>

        <div class="md:w-full grid grid-cols-1 md:grid-cols-4 gap-3">
          <BaseButton
            :href="`/#/arcade/${arcade.id}`"
            :icon="mdiHome"
            color="info"
            label="Arcade Home"
            class="w-full md:w-[150px]"
          />
          <BaseButton
            :href="`/#/arcade/${arcade.id}/events`"
            :icon="mdiNewspaperVariantMultiple"
            color="info"
            label="Event Settings"
          />
          <BaseButton
            :href="`/#/arcade/${arcade.id}/machines`"
            :icon="mdiGamepad"
            color="info"
            label="Machine List"
          />
          <BaseButton
            :href="`/#/arcade/${arcade.id}/paseli`"
            :icon="mdiCashRegister"
            color="info"
            label="PASELI"
          />
        </div>
      </div>
    </BaseLevel>
  </div>
</template>
