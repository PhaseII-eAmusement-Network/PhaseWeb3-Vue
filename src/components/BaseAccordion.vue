<script setup>
import AccordionItem from "@/components/AccordionItem.vue";
import ReactiveImage from "@/components/ReactiveImage.vue";
const ASSET_PATH = import.meta.env.VITE_ASSET_PATH;

defineProps({
  items: {
    type: Array,
    required: true,
  },
  imagePath: {
    type: String,
    required: false,
    default: "onboarding",
  },
});
</script>

<template>
  <div class="space-y-2">
    <AccordionItem
      v-for="(item, index) in items"
      :key="index"
      :title="item.label"
      class="grid"
    >
      <p v-for="p of item.body">{{ p }}</p>
      <ReactiveImage
        :url="`${ASSET_PATH}/${imagePath}/${item.image}.webp`"
        class="mt-2"
      />
    </AccordionItem>
  </div>
</template>
