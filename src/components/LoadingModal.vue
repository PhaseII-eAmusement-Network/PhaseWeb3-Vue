<script setup>
import { useRouter } from "vue-router";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import BaseIcon from "./BaseIcon.vue";
import BaseButton from "./BaseButton.vue";
import { mdiCheckOutline, mdiCloseOutline } from "@mdi/js";

const $router = useRouter();

defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  isSave: {
    type: Boolean,
    default: false,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  errorCode: {
    type: String,
    default: null,
  },
});

function hotReload() {
  $router.go();
  return null;
}
</script>

<template>
  <OverlayLayer v-if="active" :transparent="isSave">
    <CardBox
      class="shadow-lg max-h-modal w-11/12 md:w-3/5 lg:w-2/5 xl:w-4/12 z-50 text-white/90"
    >
      <div
        v-if="!isFinished && !errorCode"
        class="grid text-center justify-center grid-cols-1 gap-3"
      >
        <img
          class="rounded-full place-self-center"
          src="/icon.gif"
          width="70"
        />
        <h1 class="text-xl md:text-2xl">
          {{ isSave ? `Submitting...` : `Loading...` }}
        </h1>
        <p class="text-lg md:text-xl">Please wait</p>
      </div>

      <div
        v-if="isSave && isFinished && !errorCode"
        class="grid text-center justify-center grid-cols-1 gap-3"
      >
        <div class="place-self-center">
          <BaseIcon
            :path="mdiCheckOutline"
            class="text-green-700"
            w="w-20"
            :size="45"
          />
        </div>
        <h1 class="text-xl md:text-2xl">Saved!</h1>
      </div>

      <div
        v-if="errorCode"
        class="grid text-center justify-center grid-cols-1 gap-3"
      >
        <div class="place-self-center">
          <BaseIcon
            :path="mdiCloseOutline"
            class="text-red-500"
            w="w-20"
            :size="45"
          />
        </div>
        <h1 class="text-xl md:text-2xl">Uh Oh!</h1>
        <h1 class="text-lg md:text-xl">
          The server had some trouble processing your request at this time.
        </h1>
        <h1 class="text-lg md:text-xl">
          Error: <span class="text-red-500">{{ errorCode }}</span>
        </h1>
        <div>
          <BaseButton
            type="submit"
            color="info"
            label="Reload"
            :small="false"
            @click="hotReload()"
          />
        </div>
      </div>
    </CardBox>
  </OverlayLayer>
</template>
