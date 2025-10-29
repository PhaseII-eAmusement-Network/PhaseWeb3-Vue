<script setup>
import { useRouter } from "vue-router";
import CardBox from "@/components/CardBox.vue";
import OverlayLayer from "@/components/OverlayLayer.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useMainStore } from "@/stores/main";
import { PhCloudCheck, PhCloudX, PhShrimp } from "@phosphor-icons/vue";

const $router = useRouter();
const mainStore = useMainStore();

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
        <template v-if="!mainStore.userCustomize.shrimpLinks">
          <img
            class="rounded-full place-self-center"
            src="/icon.gif"
            width="70"
          />
        </template>
        <template v-else>
          <BaseIcon
            :icon="PhShrimp"
            size="70"
            w="w-50"
            color="text-pink-400"
            class="m-5 animate animate-spin place-self-center"
          />
        </template>
        <h1 class="text-xl md:text-2xl">
          <template v-if="!mainStore.userCustomize.shrimpLinks">
            {{ isSave ? `Submitting...` : `Loading...` }}
          </template>
          <template v-else>
            <span class="text-pink-200">
              {{ isSave ? `Shrimping...` : `Krilling...` }}
            </span>
          </template>
        </h1>
        <p class="text-lg md:text-xl">
          <template v-if="!mainStore.userCustomize.shrimpLinks">
            Please wait
          </template>
          <template v-else>
            <span class="text-pink-400">Shrimply wait</span>
          </template>
        </p>
      </div>

      <div
        v-if="isSave && isFinished && !errorCode"
        class="grid text-center justify-center grid-cols-1 gap-3"
      >
        <div class="place-self-center">
          <BaseIcon
            :icon="PhCloudCheck"
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
          <BaseIcon :icon="PhCloudX" class="text-red-500" w="w-20" :size="45" />
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
