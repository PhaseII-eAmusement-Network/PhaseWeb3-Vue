<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { mdiStore, mdiCogOutline } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormField from "@/components/FormField.vue";
// import FormFilePicker from "@/components/FormFilePicker.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
// import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import BaseButton from "@/components/BaseButton.vue";
// import CardBoxWidget from "@/components/CardBoxWidget.vue";
// import { listCodes } from "@/constants/area";

import { useMainStore } from "@/stores/main";
const mainStore = useMainStore();
const arcadeData = ref({});
const loading = ref(true);

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

onMounted(async () => {
  try {
    const data = await mainStore.getArcade(arcadeId);
    arcadeData.value = data;
    loading.value = false;
  } catch (error) {
    console.log("Failed to fetch arcade data:", error);
  }
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
    const data = await mainStore.getArcadeVPN(arcadeId);
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

        <SectionTitleLine :icon="mdiStore" title="Arcade Overview" main />

        <CardBox is-form class="mb-6" @submit.prevent="">
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
              label="PASELI Enabled"
              help="Enable or disable PASELI services."
            >
              <FormCheckRadio
                v-model="arcadeData.data.paseli_enabled"
                :input-value="arcadeData.data.paseli_enabled"
                name="paseli"
                type="switch"
              />
            </FormField>
            <FormField
              label="Infinite PASELI"
              help="Enable or disable infinite PASELI."
            >
              <FormCheckRadio
                v-model="arcadeData.data.paseli_infinite"
                :input-value="arcadeData.data.paseli_infinite"
                name="infinitePaseli"
                type="switch"
              />
            </FormField>
            <FormField
              label="Maintenance Mode"
              help="Place this arcade under Maintenance."
            >
              <FormCheckRadio
                v-model="arcadeData.data.maint"
                :input-value="arcadeData.data.maint"
                name="maintenance"
                type="switch"
              />
            </FormField>
            <FormField
              label="Incognito Mode"
              help="Hide the eAmusement network and ranking data."
            >
              <FormCheckRadio
                v-model="arcadeData.data.hide_network"
                :input-value="arcadeData.data.hide_network"
                name="incognito"
                type="switch"
              />
            </FormField>
          </div>
          <BaseButton color="success" type="submit" label="Save" />
        </CardBox>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 mb-6">
          <CardBox>
            <h1 class="text-lg md:text-xl">OpenVPN Configuration</h1>
            <p class="pb-1 dark:text-white/50">
              Use this to export your VPN config.
            </p>
            <BaseButton
              :small="false"
              color="success"
              class="my-2"
              label="Export"
              @click="exportVPN()"
            />
          </CardBox>

          <!-- <CardBox>
            <h1 class="text-lg md:text-xl">Cover Photo</h1>
            <p class="pb-1 dark:text-white/50">
              NSFW = BAN. Children use this server. 60MB max.
            </p>
            <FormFilePicker label="Upload" name="upload" accept="image/*" />

            <BaseButton
              :small="false"
              color="success"
              class="mt-4"
              label="Save"
            />
          </CardBox> -->

          <!-- <CardBox>
          <h1 class="text-lg md:text-xl mb-2">Location Settings</h1>

          <FormField label="Area" help="Set your arcade's area.">
            <FormControl
              v-model="thisArcade.area"
              name="area"
              :options="listCodes()"
            />
          </FormField>

          <FormField label="Address" help="Set your arcade's address.">
            <FormControl
              v-model="thisArcade.address"
              name="address"
              placeholder="No address"
            />
          </FormField>

          <FormField
            label="Show Address"
            help="Allow your arcade's address to be seen publicly."
          >
            <FormCheckRadio
              :model-value="thisArcade.show_address"
              :input-value="thisArcade.show_address"
              name="show_address"
              type="switch"
            />
          </FormField>

          <BaseButton
            :small="false"
            color="success"
            class="mt-4"
            label="Save"
          />
        </CardBox> -->
        </div>

        <!-- <SectionTitleLine
          :icon="mdiChartTimelineVariant"
          title="Arcade Overview"
          main
        />

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
          <CardBoxWidget
            trend="12% (from last week)"
            trend-type="up"
            :number="37"
            label="Arcade Scores (This Week)"
          />
          <CardBoxWidget
            trend="40% (from last month)"
            trend-type="up"
            :number="3"
            label="Unique Games (All Time)"
          />
          <CardBoxWidget
            trend="No new players this week"
            :number="2"
            label="Unique Players (All Time)"
          />
          <CardBoxWidget
            trend="40% (from last month)"
            trend-type="up"
            :number="123456789"
            :prefix="'¥'"
            label="PASELI Spent (This Month)"
          />
        </div> -->
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
