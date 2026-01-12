<script setup>
import { ref } from "vue";

defineProps({
  url: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 200,
  },
});

const cardRef = ref(null);
const shineRef = ref(null);

function handleMouseMove(event) {
  const card = cardRef.value;
  const shine = shineRef.value;
  if (!card || !shine) return;

  const rect = card.getBoundingClientRect();

  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const dx = (x - centerX) / centerX;
  const dy = (y - centerY) / centerY;

  const aspect = rect.width / rect.height;
  const maxTilt = 10;

  const rotateX = dy * -maxTilt * Math.min(1, aspect);
  const rotateY = dx * maxTilt * Math.min(1, 1 / aspect);

  card.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1.05)
  `;

  shine.style.opacity = "1";
  shine.style.background = `
    radial-gradient(
      circle at ${x}px ${y}px,
      rgba(255,255,255,0.6),
      rgba(255,255,255,0.2),
      transparent 65%
    )
  `;
}

function resetTransform() {
  if (cardRef.value) {
    cardRef.value.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  }
  if (shineRef.value) {
    shineRef.value.style.opacity = "0";
  }
}
</script>

<template>
  <div
    class="relative inline-block [perspective:900px]"
    @mousemove="handleMouseMove"
    @mouseleave="resetTransform"
  >
    <a :href="url" target="_blank" rel="noopener noreferrer">
      <div
        ref="cardRef"
        class="relative will-change-transform transition-transform duration-200 ease-out [transform-style:preserve-3d]"
      >
        <div
          ref="shineRef"
          class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 mix-blend-overlay rounded-lg"
        />

        <img
          :src="url"
          class="block rounded-lg shadow-xl"
          :style="{
            width: `${size}px`,
            height: 'auto',
          }"
          draggable="false"
        />
      </div>
    </a>
  </div>
</template>
