<script setup>
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";
import { mdiStore } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import CardBox from "@/components/CardBox.vue";
// import FormField from "@/components/FormField.vue";
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
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading">
        <ArcadeCard class="mb-6" :arcade="arcadeData" />

        <SectionTitleLine :icon="mdiStore" title="Admin Overview" main />

        <CardBox is-form class="mb-6" @submit.prevent="">
          <PillTag color="info" label="General Settings" class="mb-4" />
          <div class="grid gap-4 grid-cols-2 md:grid-cols-4 mb-4">
            <!-- <FormCheckRadio
            :model-value="arcadeData.public"
            :input-value="arcadeData.public"
            name="public"
            type="switch"
            label="Public Arcade"
            class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
          /> -->
            <FormCheckRadio
              :model-value="arcadeData.data.paseli_enabled"
              :input-value="arcadeData.data.paseli_enabled"
              name="paseli_enabled"
              type="switch"
              label="PASELI"
              class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
            />
            <FormCheckRadio
              :model-value="arcadeData.data.paseli_infinite"
              :input-value="arcadeData.data.paseli_infinite"
              name="paseli_infinite"
              type="switch"
              label="Infinite PASELI"
              class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
            />
            <FormCheckRadio
              :model-value="arcadeData.data.maint"
              :input-value="arcadeData.data.maint"
              name="maint"
              type="switch"
              label="Maintenance Mode"
              class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
            />
          </div>
          <BaseButton
            color="success"
            type="submit"
            label="Save"
            :small="false"
          />
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
