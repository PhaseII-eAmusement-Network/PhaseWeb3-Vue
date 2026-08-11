<script setup>
import { ref, onMounted } from "vue";
import NumberDynamic from "@/components/NumberDynamic.vue";
import UserCard from "@/components/UserCard.vue";
import RerunLogo from "@/components/Rerun/RerunLogo.vue";
import StatsBox from "@/components/Rerun/StatsBox.vue";

defineProps({
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
    <Transition
      enter-active-class="transition-all duration-700 ease-out"
      enter-from-class="opacity-0 -translate-y-6"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="show" class="absolute left-4 top-4">
        <RerunLogo small :year="data.year" />
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-all duration-700 delay-150 ease-out"
      enter-from-class="opacity-0 translate-y-8 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
    >
      <UserCard v-if="show" class="mt-10 scale-[90%]" use-small even-smaller />
    </Transition>

    <Transition
      enter-active-class="transition-all duration-700 delay-300 ease-out"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
    >
      <div v-if="show">
        <div class="text-center">
          <div class="mt-4">
            <p class="mb-4 text-lg text-slate-300">
              From the first play on 1/1/2026, this is what your year looked
              like.
            </p>
            <h1 class="text-2xl">You had...</h1>
            <NumberDynamic
              class="text-8xl mb-2 font-black text-emerald-600"
              :value="1000"
            />
            <h1 class="text-3xl font-bold">plays</h1>
          </div>

          <hr class="border-t my-4 w-full" />

          <div class="flex gap-4 w-full justify-center my-4">
            <div>
              <NumberDynamic
                class="text-4xl mb-2 font-black text-pink-300"
                :value="4000"
              />
              <h1 class="text-3xl font-bold">scores</h1>
            </div>
            <div class="md:border-r" />
            <div>
              <NumberDynamic
                class="text-4xl mb-2 font-black text-amber-400"
                :value="1000"
              />
              <h1 class="text-3xl font-bold">records</h1>
            </div>
          </div>
        </div>
      </div>
    </Transition>

    <div class="mt-6 grid w-full gap-5">
      <Transition
        enter-active-class="transition-all duration-700 delay-[500ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="You played..."
            footer="You were quite diverse!"
            suffix="unique games"
            :number="6"
          />
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-700 delay-[700ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="Your favorite was..."
            footer="You just kept coming back for more."
            suffix="(400 plays)"
          >
            DanceDanceRevolution
          </StatsBox>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition-all duration-700 delay-[800ms]"
        enter-from-class="opacity-0 translate-y-6"
        enter-to-class="opacity-100 translate-y-0"
      >
        <div v-if="show">
          <StatsBox
            header="One song to rule them all..."
            footer="It must've been stuck in your head."
            suffix="(100 plays)"
          >
            Din Don Dan
          </StatsBox>
        </div>
      </Transition>
    </div>
  </div>
</template>
