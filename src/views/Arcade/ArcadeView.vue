<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { mdiStore, mdiStoreCog, mdiCogOutline } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import PillTag from "@/components/PillTag.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import { getNestedValue, setNestedValue } from "@/constants/values";
import {
  APIGetArcade,
  APIUpdateArcade,
  APIGetArcadeVPN,
} from "@/stores/api/arcade";

const optionForm = ref(null);
const bareForm = ref(null);
const arcadeData = ref(null);
const loading = ref(true);

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

var arcadeOptions = [
  {
    id: "paseli_enabled",
    name: "PASELI Services",
    help: "Enable PASELI for this arcade.",
    type: "Boolean",
  },
  {
    id: "paseli_infinite",
    name: "Infinite PASELI",
    help: "Enable infinite PASELI for this arcade.",
    type: "Boolean",
  },
  {
    id: "maint",
    name: "Maintenance Mode",
    help: "Place this arcade under maintenance.",
    type: "Boolean",
  },
  {
    id: "hide_network",
    name: "Incognito Mode",
    help: "Hide the network and all ranking data.",
    type: "Boolean",
  },
];

async function loadArcade() {
  try {
    arcadeData.value = {};
    optionForm.value = {};
    bareForm.value = {};
    const data = await APIGetArcade(arcadeId);
    arcadeData.value = data;

    for (const setting of arcadeOptions) {
      const value = getNestedValue(arcadeData.value.data, setting.id);
      setNestedValue(optionForm.value, setting.id, value);
      setNestedValue(bareForm.value, setting.id, value);
    }
    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

async function updateArcade() {
  const response = await APIUpdateArcade(arcadeId, optionForm.value);

  if (response.status != "error") {
    await loadArcade();
  }
}

onMounted(() => {
  loadArcade();
});

function formatName(inputString, replaceWith = "NA_") {
  var asciiFriendly = [...inputString]
    .map((c) => {
      return c.charCodeAt(0) < 128 ? c : replaceWith;
    })
    .join("");

  asciiFriendly = asciiFriendly.replace(
    /[!"#$%&'()*+,-./:;<=>?@[\\\]^_`{|}~]/g,
    ""
  );

  asciiFriendly = asciiFriendly.replace(/\s+/g, "_");
  return asciiFriendly;
}

async function exportVPN() {
  try {
    const data = await APIGetArcadeVPN(arcadeId);
    const blob = new Blob([data], { type: "application/ovpn" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `gradius-${formatName(
      arcadeData.value.name
    )}-phaseii-config.ovpn`;
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  } catch (error) {
    console.log("Failed to fetch arcade data:", error);
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading">
        <ArcadeCard class="mb-6" :arcade="arcadeData" />

        <SectionTitleLine
          :icon="mdiStoreCog"
          title="Arcade Administration"
          main
        />

        <CardBox is-form class="mb-6" @submit.prevent="updateArcade">
          <PillTag
            color="info"
            label="Settings"
            :icon="mdiCogOutline"
            class="mb-2"
          />
          <div
            class="grid grid-cols-1 w-full gap-2 md:gap-6 md:flex md:place-content-stretch"
          >
            <FormField
              v-for="setting of arcadeOptions"
              :key="setting.id"
              :label="setting.name"
              :help="setting.help"
            >
              <FormCheckRadio
                v-if="setting.type == 'Boolean'"
                :name="setting.id"
                :model-value="
                  Boolean(getNestedValue(optionForm, setting.id) ?? 0)
                "
                :input-value="true"
                type="switch"
                @update:model-value="
                  (value) =>
                    setNestedValue(optionForm, setting.id, Number(value) ?? 0)
                "
              />
            </FormField>
          </div>
          <div
            v-if="JSON.stringify(optionForm) !== JSON.stringify(bareForm)"
            class="space-x-2 mt-6"
          >
            <BaseButton color="success" label="Save" type="submit" />
            <BaseButton color="danger" label="Revert" @click="loadArcade()" />
          </div>
        </CardBox>

        <CardBox class="w-full md:w-1/2 mb-6">
          <h1 class="text-lg md:text-xl">OpenVPN Configuration</h1>
          <p class="pb-1 dark:text-white/50">
            Use this to download your VPN config.
          </p>
          <BaseButton
            :small="false"
            color="success"
            class="my-2"
            label="Export"
            @click="exportVPN()"
          />
        </CardBox>

        <SectionTitleLine :icon="mdiStore" title="Arcade Overview" main />

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
          <CardBoxWidget
            :number="arcadeData?.machines?.length"
            label="Active Machines"
          />
        </div>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
