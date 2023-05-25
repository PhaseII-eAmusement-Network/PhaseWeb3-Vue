<script setup>
import CardBox from "@/components/CardBox.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default: null,
  },
  date: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <CardBox class="mb-2" is-hoverable has-table>
    <img :src="props.cover" class="w-auto rounded-t-xl" />
    <div class="p-3">
      <h2 class="text-xl pb-2">{{ props.title }}</h2>

      <hr class="pb-2" />
      <p class="pb-2">{{ props.content }}</p>

      <footer>
        <hr class="pb-2" />
        <p>{{ props.date }}</p>
      </footer>
    </div>
  </CardBox>
</template>
