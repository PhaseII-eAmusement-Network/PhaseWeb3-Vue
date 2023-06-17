<script setup>
import { useRoute } from "vue-router";
import { mdiStore, mdiChartTimelineVariant } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import CardBox from "@/components/CardBox.vue";
import FormFilePicker from "@/components/FormFilePicker.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import PillTag from "@/components/PillTag.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import { arcadeList } from "@/constants";

const $route = useRoute();
const arcadeID = parseInt($route.params.id);

const thisArcade = arcadeList.find((x) => x.id === arcadeID);
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <ArcadeCard class="mb-6" :arcade-data="thisArcade" />

      <SectionTitleLine :icon="mdiStore" title="Admin Overview" main />

      <CardBox is-form class="mb-6" @submit.prevent="">
        <PillTag color="info" label="General Settings" class="mb-4" />
        <div class="grid gap-4 grid-cols-2 md:grid-cols-4 mb-4">
          <FormCheckRadio
            :model-value="thisArcade.public"
            type="switch"
            label="Public Arcade"
            class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
          />
          <FormCheckRadio
            :model-value="thisArcade.paseli"
            type="switch"
            label="PASELI Enabled"
            class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
          />
          <FormCheckRadio
            :model-value="thisArcade.paseli_infinite"
            type="switch"
            label="Infinite PASELI"
            class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
          />
          <FormCheckRadio
            :model-value="thisArcade.maintenance"
            type="switch"
            label="Maintenance Mode"
            class="outline outline-gray-400 rounded-xl outline-1 text-sm md:text-md p-2"
          />
        </div>
        <BaseButton color="success" type="submit" label="Save" :small="false" />
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

        <CardBox>
          <h1 class="text-lg md:text-xl">Cover Photo</h1>
          <p class="pb-1 dark:text-white/50">
            NSFW = BAN. Children use this server. 60MB max.
          </p>
          <FormFilePicker label="Upload" accept="image/*" />

          <BaseButton
            :small="false"
            color="success"
            class="mt-4"
            label="Save"
          />
        </CardBox>
      </div>

      <SectionTitleLine
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
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
