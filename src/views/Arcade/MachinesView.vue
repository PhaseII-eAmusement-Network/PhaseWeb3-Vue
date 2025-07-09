<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import { mdiGamepad, mdiDatabasePlus } from "@mdi/js";
import { useMainStore } from "@/stores/main";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import FormCheckRadio from "@/components/FormCheckRadio.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import { generatePCBID } from "@/constants/pcbid.js";
import { APIGetArcade } from "@/stores/api/arcade";
import { checkPCBID, APIAdminCreateMachine } from "@/stores/api/admin";

const mainStore = useMainStore();
const arcadeData = ref({});
const loading = ref(true);

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

async function loadArcade() {
  try {
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
    sortable: true,
    width: 200,
  },
  {
    text: "Name",
    value: "description",
    sortable: true,
    width: 200,
  },
  {
    text: "Port",
    value: "port",
    sortable: true,
    width: 120,
  },
  {
    text: "Arcade Machine",
    value: "data.cabinet",
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

const initMachine = {
  name: "",
  cabinet: false,
  ota: false,
  generatePCBID: true,
  PCBID: "",
};

const newMachine = reactive({
  ...initMachine,
});

async function addMachine() {
  if (newMachine.generatePCBID) {
    newMachine.PCBID = generatePCBID();
  }

  while (!(await checkPCBID(newMachine.PCBID))) {
    if (newMachine.generatePCBID) {
      newMachine.PCBID = generatePCBID();
    } else {
      window.alert("PCBID already in use!");
      return;
    }
  }

  APIAdminCreateMachine(arcadeData.value.id, {
    name: newMachine.name,
    cabinet: newMachine.cabinet,
    ota: newMachine.ota,
    PCBID: newMachine.PCBID.toUpperCase(),
  });
  Object.assign(newMachine, initMachine);
  loadArcade();
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading">
        <ArcadeCard class="mb-6" :arcade="arcadeData" :use-small="true" />

        <template v-if="mainStore.userAdmin">
          <SectionTitleLine :icon="mdiDatabasePlus" title="Add Machine" main />
          <CardBox is-form class="mb-6">
            <form class="h-full" @submit.prevent="addMachine()">
              <FormField
                label="Generate PCBID"
                help="Generate a PCBID rather than supply one."
              >
                <FormCheckRadio
                  v-model="newMachine.generatePCBID"
                  :input-value="newMachine.generatePCBID"
                  name="generatePCBID"
                  type="switch"
                />
              </FormField>
              <FormField v-if="!newMachine.generatePCBID" label="PCBID">
                <FormControl
                  v-model="newMachine.PCBID"
                  name="pcbid"
                  required
                  minlength="20"
                  maxlength="20"
                />
              </FormField>
              <FormField label="Name">
                <FormControl v-model="newMachine.name" name="name" required />
              </FormField>

              <div
                class="grid grid-cols-1 w-full gap-2 md:gap-6 md:flex md:place-content-stretch pb-4 md:pb-0"
              >
                <FormField
                  label="Arcade Cabinet"
                  help="If this is a real cabinet, enable this."
                >
                  <FormCheckRadio
                    v-model="newMachine.cabinet"
                    :input-value="newMachine.cabinet"
                    name="cabinet"
                    type="switch"
                  />
                </FormField>
                <FormField
                  label="Enable Updates"
                  help="Enables or disables OTA updates."
                >
                  <FormCheckRadio
                    v-model="newMachine.ota"
                    :input-value="newMachine.ota"
                    name="ota"
                    type="switch"
                  />
                </FormField>
              </div>

              <BaseButton color="success" type="submit" label="Add Machine" />
            </form>
          </CardBox>
        </template>

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
