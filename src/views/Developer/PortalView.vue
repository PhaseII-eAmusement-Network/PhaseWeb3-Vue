<script setup>
import { ref, onMounted, reactive } from "vue";
import { PhCloud, PhCode } from "@phosphor-icons/vue";
import { dashCode } from "@/constants/userData.js";
import SectionMain from "@/components/SectionMain.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import UserCard from "@/components/UserCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
const DOCS_URL = import.meta.env.VITE_DOCS_URL;

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy to clipboard!");
    });
};

const appInfo = {
  name: "Edi",
  image: "/edi512x512_2.png",
  manager: "Lumen",
  about:
    "Edi is a DDR score tracking app that offers a direct connection to your PhaseII account.",
  intents: ["user", "account", "webhook_scores"],
  webhooks: ["scores"],
  useOAuth: true,
  internal: false,
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <UserCard class="mb-6" use-small even-smaller />

      <SectionTitleLine :icon="PhCode" title="Developer Portal" main />
      <CardBox class="row-span-2 mb-6">
        <h1 class="text-xl md:text-2xl">
          Welcome to the <samp>PhaseII</samp> Developer Portal!
        </h1>
        <h2 class="text-lg">You're gonna do great 😄</h2>

        <p>
          If you're just now getting started, please read the
          <a
            class="text-blue-400 hover:text-blue-600"
            :href="`${DOCS_URL}/developer`"
            target="_blank"
          >
            developer docs
          </a>
        </p>
        <hr class="border-r my-2 w-full" />
        <p>Create or manage your applications below</p>
      </CardBox>

      <SectionTitleLine :icon="PhCloud" title="My Applications" main>
        <BaseButton
          label="Add Application"
          color="success"
          to="/developer/register"
        />
      </SectionTitleLine>
      <CardBox class="row-span-2 mb-6">
        <div class="flex">
          <div
            class="flex flex-col justify-center p-4 rounded-xl bg-slate-700 hover:drop-shadow-xl transition-all"
          >
            <div class="w-full flex justify-center">
              <img
                :src="appInfo.image"
                width="75"
                class="rounded-full shadow-lg mb-2"
              />
            </div>
            <div class="mb-2 text-center">
              <h1 class="text-lg md:text-xl font-bold">
                {{ appInfo.name }}
              </h1>
              <h2 v-if="appInfo.useOAuth">OAuth Enabled</h2>
              <h2>{{ appInfo.webhooks?.length || 0 }} Webhook(s)</h2>
            </div>
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
