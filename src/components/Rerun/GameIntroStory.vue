<script setup>
import { ref, onMounted } from "vue";

import { PhJoystick, PhPlus } from "@phosphor-icons/vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import RerunLogo from "@/components/Rerun/RerunLogo.vue";
import StatsBox from "@/components/Rerun/StatsBox.vue";

const props = defineProps({
  data: {
    type: Object,
  },
});

const show = ref(false);
onMounted(() => {
  requestAnimationFrame(() => {
    show.value = true;
  });
});
</script>

<template>
  <div class="relative flex h-full flex-col px-4 py-8 max-w-3xl md:min-w-lg">
    <div class="absolute left-4 top-4">
      <RerunLogo small :year="data.year" />
    </div>

    <Transition
      enter-active-class="transition-all duration-700 delay-50 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="show" class="mt-12 -mb-6">
        <SectionTitleLine
          :icon="PhJoystick"
          color="text-sky-300"
          title="Game Breakdowns"
          main
        />
        <p class="mb-4 text-lg text-slate-300">
          Let's go through what had you hooked.
        </p>
      </div>
    </Transition>

    <div class="mt-6 grid w-full gap-5">
      <Transition
        enter-active-class="transition-all duration-700 delay-[200ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="You played..."
            footer="We're impressed!"
            suffix="unique games"
            :number="props.data.profiles?.length ?? 0"
          />
        </div>
      </Transition>
    </div>

    <Transition
      enter-active-class="transition-all duration-700 delay-[400ms] ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div
        v-if="show"
        class="grid grid-flow-row auto-rows-auto grid-cols-2 md:grid-cols-2 gap-5 my-6"
      >
        <CardBoxGameStat
          v-for="profile of props.data.profiles"
          :key="profile.game"
          :game="profile.game"
          :value="profile.data.total_plays"
          :profile-name="profile?.username"
          disable-local-click
          disable-hover
          type="plays"
        />
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-all duration-700 delay-[500ms] ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="show" class="mt-2 -mb-6">
        <SectionTitleLine
          :icon="PhPlus"
          color="text-red-300"
          title="New Games"
          main
        />
        <p class="mb-4 text-lg text-slate-300">
          These games were new to you this year.
        </p>
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-all duration-700 delay-[700ms] ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div
        v-if="show"
        class="grid grid-flow-row auto-rows-auto grid-cols-2 md:grid-cols-2 gap-5 my-6"
      >
        <template v-for="profile of props.data.profiles" :key="profile.game">
          <CardBoxGameStat
            v-if="profile.data?.new"
            :game="profile.game"
            :value="profile.data.total_plays"
            :profile-name="profile?.username"
            disable-local-click
            disable-hover
            type="plays"
          />
        </template>
      </div>
    </Transition>
  </div>
</template>
