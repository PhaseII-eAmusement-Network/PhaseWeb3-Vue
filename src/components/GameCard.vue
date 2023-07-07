<script setup>
import BaseLevel from "@/components/BaseLevel.vue";
import CardBox from "@/components/CardBox.vue";

const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
});

function getCardStyle() {
  return `
    background-image: url('${props.card}');
    background-size: cover;
    background-repeat: no-repeat;
  `;
}
</script>

<template>
  
</template>
