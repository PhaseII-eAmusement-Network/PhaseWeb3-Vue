<script setup>
import { containerMaxW } from "@/config.js";
import { mdiCash, mdiGithub } from "@mdi/js";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButton from "@/components/BaseButton.vue";
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <p>
          Made with ❤️ by the PhaseII Team. Based on JustBoil's
          <a
            class="text-blue-400 hover:text-blue-600"
            href="https://github.com/justboil/admin-one-vue-tailwind"
            target="_blank"
            >Admin One</a
          >.
        </p>
      </div>
      <div class="md:py-2 space-x-2">
        <BaseButton
          color="warning"
          href="https://paypal.me/trmazi"
          label="Donate"
          :icon="mdiCash"
          icon-size="24"
        />
        <BaseButton
          color="info"
          href="https://github.com/PhaseII-eAmusement-Network/PhaseWeb3-Vue"
          target="_blank"
          label="View on GitHub"
          :icon="mdiGithub"
          icon-size="24"
        />
      </div>
    </BaseLevel>
  </footer>
</template>
