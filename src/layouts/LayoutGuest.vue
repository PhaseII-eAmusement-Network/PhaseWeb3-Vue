<script setup>
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import { ref, watch } from "vue";
import LoadingModal from "@/components/Modal/LoadingModal.vue";
const mainStore = useMainStore();

const loading = ref(mainStore.isLoading);
const saving = ref(mainStore.isSaving);
const errorCode = ref(mainStore.errorCode);
const styleStore = useStyleStore();

watch(
  () => mainStore.isLoading,
  (newValue) => {
    loading.value = newValue;
  },
);

watch(
  () => mainStore.isSaving,
  (newValue) => {
    saving.value = newValue;
  },
);

watch(
  () => mainStore.errorCode,
  (newValue) => {
    errorCode.value = newValue;
  },
);
</script>

<template>
  <div :class="{ dark: styleStore.darkMode }">
    <LoadingModal
      :active="loading || saving"
      :is-save="saving"
      :error-code="errorCode"
      class="transition-opacity duration-300 ease-out"
      :class="{
        'opacity-100': loading || saving,
        'opacity-0': !loading && !saving,
      }"
    />
    <div class="bg-gray-950 dark:text-slate-100">
      <div class="animated animatedFadeInUp fadeInUp">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
/* Animation */

@keyframes fadeInUp {
  from {
    transform: translate3d(0, 10px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

@-webkit-keyframes fadeInUp {
  from {
    transform: translate3d(0, 10px, 0);
  }

  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
}

/* Define animated class */
.animated {
  animation-duration: 0.7s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.7s;
  -webkit-animation-fill-mode: both;
}

/* Define custom class for fade in animation */
.animatedFadeInUp {
  opacity: 0;
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}

/* Media query for smaller screens */
@media screen and (max-width: 768px) {
  .animatedFadeInUp,
  .fadeInUp {
    opacity: 1;
    animation-name: none !important;
    -webkit-animation-name: none !important;
  }
}

@media screen and (max-width: 768px) {
  #particles-js {
    min-width: 100vw;
    min-height: 100vh;
    position: absolute;
    z-index: -1;
  }
}
</style>
