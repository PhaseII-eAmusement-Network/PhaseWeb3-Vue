<script setup>
import { useRoute } from "vue-router";
import { mdiNewspaperVariantMultiple } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import { arcadeList } from "@/constants";

const $route = useRoute();
const arcadeID = parseInt($route.params.id);

const thisArcade = arcadeList.find((x) => x.id === arcadeID);

function multiSelectOptions(Options) {
  var filtered = [];
  for (const option of Options) {
    filtered.push(option.name);
  }

  return filtered;
}

const eventSettings = [
  {
    game: "iidx",
    version: 22,
    settings: [
      {
        id: 0,
        keyId: "coke",
        type: "bool",
        name: "Enable Coke-X-BEMANI",
        tooltip: "Enables the long forgotten Coca-Cola event.",
        value: true,
      },
      {
        id: 1,
        keyId: "phase",
        type: "select",
        name: "Current BOSS Phase",
        tooltip: "Set the main game event.",
        options: [
          {
            id: 0,
            name: "No Event",
          },
          {
            id: 1,
            name: "Chrono Seeker",
          },
          {
            id: 2,
            name: "QPronicle Chord",
          },
        ],
        value: 1,
      },
    ],
  },
  {
    game: "dm",
    version: 19,
    settings: [
      {
        id: 0,
        keyId: "banner",
        type: "string",
        name: "Title Screen Banner",
        tooltip: "Set the text for the banner.",
        value: "",
      },
    ],
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <ArcadeCard class="mb-6" :arcade-data="thisArcade" />
      <SectionTitleLine
        :icon="mdiNewspaperVariantMultiple"
        title="Game Event Settings"
        main
      />

      <CardBox class="mb-6">
        <div v-for="entry in eventSettings" :key="entry.id">
          <h2 class="text-xl font-bold mb-2">
            Settings for {{ entry.game }} {{ entry.version }}
          </h2>
          <hr class="pb-1 my-1" />

          <FormField
            v-for="setting in entry.settings"
            :key="setting.id"
            :label="setting.name"
            :help="setting.tooltip"
          >
            <FormControl
              v-if="setting.type == 'string'"
              v-model="setting.value"
              :model-value="setting.value"
              :name="setting.keyId"
              placeholder="Not Set"
            />
            <FormCheckRadio
              v-else-if="setting.type == 'bool'"
              v-model="setting.value"
              :input-value="setting.value"
              type="switch"
              :name="setting.keyId"
            />
            <FormControl
              v-if="setting.type == 'select'"
              v-model="multiSelectOptions(setting.options)[setting.value]"
              :name="setting.keyId"
              :options="multiSelectOptions(setting.options)"
              placeholder="Select..."
            />
          </FormField>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
