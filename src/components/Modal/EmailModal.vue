<script setup>
import { computed, ref } from "vue";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import { mdiEmailAlertOutline } from "@mdi/js";

import { useMainStore } from "@/stores/main.js";
import { loadCookie, saveCookie } from "@/stores/cookies";

const mainStore = useMainStore();

const killBox = ref(false);

const isActive = computed(() => {
  if (mainStore.userData?.never_verify_email ?? false) {
    return false;
  }

  if (
    !(mainStore.userData?.email_verified ?? false) &&
    !loadCookie("email_reminder")
  ) {
    return true;
  }

  return false;
});

function verifyLater() {
  if (saveCookie("email_reminder", true)) {
    killBox.value = true;
    return true;
  } else {
    return false;
  }
}
</script>

<template>
  <template v-if="isActive && !killBox">
    <OverlayLayer :transparent="true">
      <CardBox
        class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90"
      >
        <div class="grid text-center justify-center grid-cols-1 gap-3">
          <div class="place-self-center">
            <BaseIcon
              :path="mdiEmailAlertOutline"
              class="text-yellow-600"
              w="w-20"
              :size="45"
            />
          </div>
          <h1 class="text-lg md:text-xl">
            Please verify your email address to ensure that your password can be
            reset in the future.
          </h1>
          <hr class="border-t border mt-3 w-full" />
          <div class="flex gap-2">
            <BaseButton label="Verify" color="success" />
            <BaseButton
              label="Verify Later"
              color="warning"
              @click="verifyLater()"
            />
            <BaseButton label="Never Verify" color="danger" />
          </div>
        </div>
      </CardBox>
    </OverlayLayer>
  </template>
</template>
