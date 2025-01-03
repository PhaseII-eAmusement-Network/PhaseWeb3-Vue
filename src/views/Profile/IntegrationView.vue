<script setup>
import { useMainStore } from "@/stores/main";
import { ref, watch } from "vue";
import { mdiServerNetwork, mdiMessage, mdiScoreboard } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";
const DISCORD_OAUTH_URL = import.meta.env.VITE_DISCORD_OAUTH_URL;
const TACHI_OAUTH_URL = import.meta.env.VITE_TACHI_OAUTH_URL;

const mainStore = useMainStore();

const userData = ref(mainStore.userData);
watch(
  () => mainStore.userData,
  (newValue) => {
    userData.value = newValue;
  }
);

const services = [
  {
    id: "discord",
    name: "Discord",
    icon: mdiMessage,
    oAuth: DISCORD_OAUTH_URL,
  },
  {
    id: "tachi",
    name: "Kamaitachi",
    icon: mdiScoreboard,
    oAuth: TACHI_OAUTH_URL,
  },
];

function removeService(service) {
  const confirmed = window.confirm("Are you really?");
  if (confirmed) {
    console.log(`get fucked, ${service.id}`);
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />
      <SectionTitleLine
        :icon="mdiServerNetwork"
        title="Server Integrations"
        main
      />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardBox v-for="service of services" :key="service.id">
          <PillTag
            color="info"
            :icon="service.icon"
            :label="service.name"
            class="mb-2"
          />

          <h1
            v-if="userData[service.id] && userData[service.id]?.linked"
            class="text-lg"
          >
            {{ service.name }} is linked to
            <b>{{ userData[service.id]?.username }}</b>
          </h1>
          <h1
            v-if="!userData[service.id] || !userData[service.id]?.linked"
            class="text-lg"
          >
            Discord isn't linked!
          </h1>

          <template #footer>
            <div class="space-x-2">
              <BaseButton
                v-if="!userData[service.id] || !userData[service.id]?.linked"
                color="success"
                label="Link Now"
                :href="service.oAuth"
                target="_blank"
              />
              <BaseButton
                v-if="userData[service.id] && userData[service.id]?.linked"
                color="info"
                label="Relink"
                :href="service.oAuth"
                target="_blank"
              />
              <BaseButton
                v-if="userData[service.id] && userData[service.id]?.linked"
                color="danger"
                label="Unlink"
                @click="removeService(service)"
              />
            </div>
          </template>
        </CardBox>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
