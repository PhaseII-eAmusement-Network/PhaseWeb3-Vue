<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { PhSparkle } from "@phosphor-icons/vue";
import { APIUserAppUpdate, APIUserCustomize } from "@/stores/api/account";

import { useMainStore } from "@/stores/main.js";

const changelog = ref(null);
const appVersion = import.meta.env.VITE_APP_VERSION;
const activeState = ref(true);

async function loadChangelogs() {
  try {
    const response = await axios.get(`/data-sources/changelog.json`);
    if (response.data) {
      changelog.value = response.data;
    }
  } catch (error) {
    console.error("Error loading changelog:", error.message);
  }
}

onMounted(async () => {
  await loadChangelogs();
});

function isActive() {
  const mainStore = useMainStore();

  if (mainStore.userData.webVersions) {
    if (mainStore.userData.webVersions.includes(appVersion)) {
      activeState.value = false;
    }
  }

  if (mainStore.userCustomize.disableUpdatePopup) {
    activeState.value = false;
  }

  return activeState.value;
}

async function updateUserData(disable = false) {
  const mainStore = useMainStore();
  var data = null;

  try {
    data = await APIUserAppUpdate(appVersion, false);
  } catch (error) {
    console.error("Failed to update user:", error);
  }

  if (disable) {
    try {
      await APIUserCustomize({ disableUpdatePopup: true });
    } catch (error) {
      console.error("Failed to update customize:", error);
    }
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
        class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90"
      >
        <div class="grid text-center justify-center grid-cols-1 gap-3">
          <div class="place-self-center">
            <BaseIcon
              :icon="PhSparkle"
              class="text-emerald-600"
              w="w-20"
              :size="45"
            />
            <h1 class="text-xl xl:text-2xl font-bold">
              While you were away...
            </h1>
            <h1 class="text-lg xl:text-xl">
              We've updated the site! These updates include feature updates and
              bugfixes.
            </h1>
          </div>

          <hr class="border-t border mt-3 w-full" />

          <div
            v-if="changelog"
            class="text-sm md:text-md space-y-2 text-left text-pink-500 bg-slate-950 p-2 max-h-[120px] overflow-scroll"
          >
            <h1>Changelog:</h1>
            <h2
              v-for="change of changelog[appVersion] ?? ['No changes!']"
              :key="change"
              class="font-mono"
            >
              {{ change }}
            </h2>
          </div>
          <h2 class="font-mono text-pink-500">Version: {{ appVersion }}</h2>

          <div class="flex gap-2">
            <BaseButton
              label="Close"
              color="success"
              @click="updateUserData(false)"
            />
            <BaseButton
              label="Never Show Again"
              color="danger"
              @click="updateUserData(true)"
            />
          </div>
        </div>
      </CardBox>
    </OverlayLayer>
  </template>
</template>
