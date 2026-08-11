<script setup>
import RerunLogo from "@/components/Rerun/RerunLogo.vue";

defineProps({
  data: {
    type: Object,
  },
});
</script>

<template>
  <RerunLogo />
  <p class="text-lg">Let's run back your {{ data.year }}.</p>
  <hr class="border-t mt-6 w-full" />

  <p class="my-2 font-light tracking-wide italic">
    You can navigate with your arrow keys
  </p>
</template>
