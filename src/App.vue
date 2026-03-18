<script setup>
import { computed, ref, watch } from "vue";
import { RouterView } from "vue-router";
import { useMainStore } from "@/stores/main.js";
import { useStyleStore } from "@/stores/style.js";
import OverlayLayer from "@/components/OverlayLayer.vue";
import LoadingModal from "@/components/Modal/LoadingModal.vue";

const mainStore = useMainStore();
const styleStore = useStyleStore();

const loading = computed(() => mainStore.activeRequests !== 0);
const saving = computed(() => mainStore.activeSavingRequests !== 0);
const errorCode = computed(() => mainStore.errorCode);
const isActive = computed(() => loading.value || saving.value);

const showModal = ref(false);

watch(isActive, (val) => {
  if (val) {
    showModal.value = true;
  } else {
    setTimeout(() => {
      if (!isActive.value) {
        showModal.value = false;
      }
    }, 250);
  }
});
</script>

<template>
  <div :class="{ dark: styleStore.darkMode }">
    <OverlayLayer
      :active="showModal"
      :transparent="saving"
      :z-index="showModal ? 'z-55' : '-z-150'"
    >
      <Transition name="modal-fade">
        <LoadingModal
          v-if="showModal"
          :active="showModal"
          :is-save="saving"
          :error-code="errorCode"
        />
      </Transition>
    </OverlayLayer>

    <RouterView
      :key="$route.path"
      :class="showModal && !saving ? 'hidden' : 'block'"
    />
  </div>
</template>

<style>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.15s ease-in;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  transform: scale(0.9);
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  transform: scale(1);
}
</style>
