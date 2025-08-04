<script setup>
import { useMainStore } from "@/stores/main";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { PhCloud, PhDiscordLogo, PhRanking } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import PillTag from "@/components/PillTag.vue";

import { APIRemoveIntegration, APIIntegrateWith } from "@/stores/api/account";

const $route = useRoute();
const $router = useRouter();
const DISCORD_OAUTH_URL = import.meta.env.VITE_DISCORD_OAUTH_URL;
const TACHI_OAUTH_URL = import.meta.env.VITE_TACHI_OAUTH_URL;
const serviceType = ref($route.params.service);

if (serviceType.value) {
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  urlParams.delete("code");
  if (code !== undefined) {
    integrateWith(serviceType.value, code);
  }
}

const mainStore = useMainStore();

const userData = ref(mainStore.userData);
watch(
  () => mainStore.userData,
  (newValue) => {
    userData.value = newValue;
  },
);

const services = [
  {
    id: "discord",
    name: "Discord",
    icon: PhDiscordLogo,
    oAuth: DISCORD_OAUTH_URL,
    description:
      "Linking your Discord account to PhaseII gives you an avatar, enables push notifications, and more via our Discord bot, BadManiac.\n\nPhaseII *does not* use Discord's API aside from the initial linkage. All data PhaseII uses is sent via our bot.\n\nNo data aside from your avatar, User ID, and name is saved.\n\nWe do not save a token nor a cookie.",
  },
  {
    id: "tachi",
    name: "Kamaitachi",
    icon: PhRanking,
    oAuth: TACHI_OAUTH_URL,
    description:
      "Kamaitachi is an open source score tracker using standardized schemas.\n\nLinking Kamaitachi to PhaseII will enable the uploading of all supported scores to Kamaitachi directly, with no user intervention.\n\nYou must follow all rules of Kamaitachi. Failure to adhere to rules will not only put your Kamaitachi account at risk, but also your PhaseII account.\n\nCurrently supported games:\n- DDR\n- IIDX\n- SDVX\n- pop'n (some versions)\n- jubeat",
  },
];

async function removeService(service) {
  const removal_data = await APIRemoveIntegration(service.id);
  if (removal_data) {
    mainStore.userLoaded = false;
    mainStore.loadUser();
    $router.push({
      name: "profile_integrations",
    });
  }
}

async function integrateWith(service, code) {
  const resp_data = await APIIntegrateWith(service, code);
  if (resp_data) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete("code");
    const newQuery = urlParams.toString();
    const newUrl = `${window.location.pathname}${
      newQuery ? "?" + newQuery : ""
    }`;
    window.history.replaceState(null, "", newUrl);
    mainStore.userLoaded = false;
    mainStore.loadUser();
    $router.push({
      name: "profile_integrations",
    });
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <SectionTitleLine :icon="PhCloud" title="Service Integrations" main />
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CardBox v-for="service of services" :key="service.id">
          <PillTag
            color="info"
            :icon="service.icon"
            :label="service.name"
            class="mb-2"
          />

          <pre class="font-sans text-wrap mb-6">{{
            service.description ?? ""
          }}</pre>

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
            {{ service.name }} isn't linked!
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
