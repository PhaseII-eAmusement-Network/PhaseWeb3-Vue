<script setup>
import { useStyleStore } from "@/stores/style.js";

const styleStore = useStyleStore();
</script>

<template>
  <div :class="{ dark: styleStore.darkMode }">
    <div
      class="bg-gradient-to-tr dark:from-gray-700 dark:via-gray-900 dark:to-gray-700 dark:text-slate-100"
    >
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

.animated {
  animation-duration: 0.7s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.7s;
  -webkit-animation-fill-mode: both;
}

.animatedFadeInUp {
  opacity: 0;
}

.fadeInUp {
  opacity: 0;
  animation-name: fadeInUp;
  -webkit-animation-name: fadeInUp;
}
</style>
