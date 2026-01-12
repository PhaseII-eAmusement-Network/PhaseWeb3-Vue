<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseAccordion from "@/components/BaseAccordion.vue";
import { PhHandWaving } from "@phosphor-icons/vue";
import { APIUserOnboard } from "@/stores/api/account";

import { useMainStore } from "@/stores/main.js";

const mainStore = useMainStore();
const onboardingData = ref(null);
const appVersion = import.meta.env.VITE_APP_VERSION;
const activeState = ref(true);

async function loadOnboarding() {
  try {
    const response = await axios.get(`/data-sources/onboarding.json`);
    if (response.data) {
      onboardingData.value = response.data;
    }
  } catch (error) {
    console.error("Error loading onboardingData:", error.message);
  }
}

onMounted(async () => {
  await loadOnboarding();
});

function isActive() {
  if (mainStore.userData.onboardingComplete ?? false) {
    activeState.value = false;
  }

  return activeState.value;
}

async function updateUserData() {
  const mainStore = useMainStore();
  var data = null;

  try {
    data = await APIUserOnboard(appVersion);
  } catch (error) {
    console.error("Failed to update user:", error);
  }

  if (data?.status === "success") {
    activeState.value = false;
    mainStore.userLoaded = false;
    await mainStore.loadUser();
  }
}
</script>

<template>
  <template v-if="isActive()">
    <OverlayLayer v-if="activeState" :transparent="true">
      <CardBox
        class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90 max-h-screen overflow-scroll"
      >
        <div class="grid text-center justify-center grid-cols-1 gap-3">
          <div class="place-self-center">
            <BaseIcon
              :icon="PhHandWaving"
              class="text-emerald-600 waving-hand"
              w="w-20"
              :size="45"
            />
            <h1 class="text-xl xl:text-2xl font-bold">
              Welcome to PhaseII WebUI V3!
            </h1>
            <h1 class="text-lg xl:text-xl">
              This is the next generation web interface. Let's get started!
            </h1>
          </div>

          <div v-if="mainStore.userData.webVersions" class="space-y-2">
            <hr class="border-t border my-4 w-full" />
            <h2 class="text-lg xl:text-xl text-left">
              Thanks for participating in the beta! People like you make this
              software better.
            </h2>
          </div>

          <hr class="border-t border mt-3 w-full" />

          <div v-if="onboardingData">
            <BaseAccordion :items="onboardingData" />
          </div>

          <BaseButtons>
            <BaseButton
              label="Close"
              color="success"
              @click="updateUserData()"
            />
          </BaseButtons>
        </div>
      </CardBox>
    </OverlayLayer>
  </template>
  <template v-else>
    <slot />
  </template>
</template>

<style scoped>
.waving-hand {
  animation-name: wave-animation;
  animation-duration: 2.5s;
  animation-iteration-count: infinite;
  transform-origin: 70% 70%;
}

@keyframes wave-animation {
  0% {
    transform: rotate(0deg);
  }
  15% {
    transform: rotate(14deg);
  } /* The following five values can be played with to make the waving more or less extreme */
  30% {
    transform: rotate(-8deg);
  }
  40% {
    transform: rotate(14deg);
  }
  50% {
    transform: rotate(-4deg);
  }
  60% {
    transform: rotate(10deg);
  }
  70% {
    transform: rotate(0deg);
  } /* Reset for the last half to pause */
  100% {
    transform: rotate(0deg);
  }
}
</style>
