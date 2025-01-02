<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { mdiGamepad } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import { APIGetArcade } from "@/stores/api/arcade";

const arcadeData = ref({});
const loading = ref(true);

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

async function loadArcade() {
  try {
    arcadeData.value = null;
    const data = await APIGetArcade(arcadeId);
    arcadeData.value = data;
    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

onMounted(() => {
  loadArcade();
});

const headers = [
  {
    text: "PCBID",
    value: "pcbId",
    width: 200,
  },
  {
    text: "Name",
    value: "description",
    width: 200,
  },
  {
    text: "Port",
    value: "port",
    sortable: true,
    width: 120,
  },
  {
    text: "OTA",
    value: "ota",
    sortable: true,
    width: 120,
  },
];

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text.pcbId)
    .then(() => {
      alert("Copied to clipboard!");
    })
    .catch(() => {
      alert("Failed to copy to clipboard!");
    });
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading">
        <ArcadeCard class="mb-6" :arcade="arcadeData" :use-small="true" />
        <SectionTitleLine :icon="mdiGamepad" title="Machines" main />

        <CardBox has-table>
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="headers"
                :items="arcadeData.machines"
                @row-clicked="copyToClipboard"
              />
            </div>
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
