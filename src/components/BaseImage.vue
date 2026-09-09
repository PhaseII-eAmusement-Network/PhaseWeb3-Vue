<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 200,
  },
  alt: {
    type: String,
    default: "",
  },
});

const imgRef = ref(null);
const loaded = ref(false);
var observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        imgRef.value.src = props.url;
        loaded.value = true;

        observer.disconnect();
      }
    },
    {
      rootMargin: "200px",
      threshold: 0.01,
    },
  );

  observer.observe(imgRef.value);
});

onBeforeUnmount(() => {
  observer?.disconnect();
});
</script>

<template>
  <figure class="image__wrapper">
    <img
      ref="imgRef"
      class="image__item"
      :alt="alt"
      :width="size"
      draggable="false"
      :class="{ loaded }"
    />
  </figure>
</template>
