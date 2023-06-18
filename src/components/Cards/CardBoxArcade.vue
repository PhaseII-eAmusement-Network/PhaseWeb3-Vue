<script setup>
import CardBox from "@/components/CardBox.vue";
import { getArea } from "@/constants/area";
import { useRouter } from "vue-router";

const props = defineProps({
  arcadeData: {
    type: Object,
    required: true,
  },
});

// eslint-disable-next-line vue/no-setup-props-destructure
const arcadeData = props.arcadeData;

const router = useRouter();

function getCardStyle() {
  return `
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, .6)),
    url('${arcadeData.image}');
    background-size: cover;
    background-repeat: no-repeat;
    `;
}

function openArcadeView() {
  router.push(`/arcade/${arcadeData.id}`);
}

const areaData = getArea(arcadeData.area);
</script>

<template>
  <button class="text-left h-full" @click="openArcadeView">
    <CardBox class="mb-2 h-full" :style="getCardStyle()" has-table>
      <div
        class="outline outline-slate-800/75 hover:outline hover:outline-blue-500/50 hover:bg-slate-500 hover:dark:bg-slate-950/90 bg-white dark:bg-slate-900/90 rounded-xl p-4 h-full w-full transition-all duration-50"
      >
        <h1 class="text-xl font-bold">{{ arcadeData.name }}</h1>
        <p class="text-lg">
          <span class="lg:hidden text-xl">{{ areaData.flag }}</span>
          {{ areaData.name }}
        </p>
        <p v-if="arcadeData.show_address" class="text-lg">
          {{ arcadeData.address }}
        </p>
        <hr class="pb-1 my-1" />
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
      </div>
    </CardBox>
  </button>
</template>
