<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  PhStorefront,
  PhMagnifyingGlass,
  PhPlusCircle,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";
import PillTag from "@/components/PillTag.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

import { APIAdminArcades, APIAdminMachineFromPCBID } from "@/stores/api/admin";

const $router = useRouter();
const arcadeData = ref([]);
const headers = [
  {
    text: "Name",
    value: "name",
    width: 150,
    sortable: true,
  },
  {
    text: "Description",
    value: "description",
    width: 150,
  },
  {
    text: "Owners",
    value: "owners",
    width: 150,
    sortable: true,
  },
  {
    text: "PASELI Enabled",
    value: "data.paseli_enabled",
    width: 50,
    sortable: true,
  },
  {
    text: "Infinite PASELI",
    value: "data.paseli_infinite",
    width: 50,
    sortable: true,
  },
  {
    text: "Beta Enabled",
    value: "data.is_beta",
    width: 50,
    sortable: true,
  },
];

onMounted(async () => {
  loadData();
});

async function loadData() {
  try {
    const data = await APIAdminArcades();
    var formattedItems = [];
    for (var item of data) {
      if (item.timestamp) {
        const date = new Date(item.timestamp * 1000);
        item.timestamp = date.toLocaleString();
      }

      if (item.owners) {
        item.owners = item.owners.join(", ");
      }

      formattedItems.push(item);
    }

    arcadeData.value = formattedItems;
  } catch (error) {
    console.error("Failed to fetch client data:", error);
  }
}

const openArcade = (item) => {
  const arcadeId = item.id;
  $router.push(`/arcade/${arcadeId}`);
};

const filterForm = reactive({
  filter: null,
});

function filterArcades() {
  if (filterForm.filter) {
    return arcadeData.value.filter(
      (arcade) =>
        arcade.id
          .toString()
          .toLowerCase()
          .includes(filterForm.filter.toLowerCase()) ||
        arcade.name.toLowerCase().includes(filterForm.filter.toLowerCase()) ||
        arcade.description
          .toLowerCase()
          .includes(filterForm.filter.toLowerCase()) ||
        arcade.owners.toLowerCase().includes(filterForm.filter.toLowerCase()),
    );
  }
}

const PCBIDForm = ref(null);

async function findMachine() {
  const machine = await APIAdminMachineFromPCBID(PCBIDForm.value);
  if (!machine) {
    window.alert("Couldn't find machine.");
    return;
  } else {
    openArcade({ id: machine?.arcadeId });
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox class="mb-6 p-1">
        <h1 class="text-3xl">Arcade Management</h1>
        <p class="text-sm text-gray-400">Enter an arcade to manage it</p>
      </CardBox>

      <SectionTitleLine
        :icon="PhMagnifyingGlass"
        title="Search Arcades"
        color="text-amber-600"
        main
      />
      <div class="grid md:grid-cols-2 gap-6">
        <CardBox class="mb-6">
          <PillTag color="info" label="Search" class="mb-2" />
          <FormField
            label="Search"
            help="Search by ID, name, description, or owner."
            class="w-full"
          >
            <FormControl
              v-model="filterForm.filter"
              :model-value="filterForm.filter"
            />
          </FormField>

          <div class="grid gap-4">
            <div
              v-for="arcade of filterArcades()"
              :key="arcade.id"
              class="bg-slate-800 p-4 rounded-xl"
            >
              <div class="md:flex w-full place-content-between">
                <div>
                  <h1 class="text-lg md:text-xl">{{ arcade.name }}</h1>
                  <h2 class="text-md md:text-lg">
                    {{ arcade.description }}
                  </h2>
                  <h2 class="text-md">Managed by {{ arcade.owners }}</h2>
                  <div
                    class="bg-slate-900 p-2 rounded-md mt-2 w-12 max-w-14 text-center"
                  >
                    <h2 class="text-lg font-mono text-pink-700">
                      {{ arcade.id }}
                    </h2>
                  </div>
                </div>

                <div class="flex align-middle mt-2 md:mt-0 max-h-12">
                  <BaseButton
                    label="Open Arcade"
                    color="info"
                    @click="openArcade(arcade)"
                  />
                </div>
              </div>
            </div>
          </div>
        </CardBox>
        <CardBox class="mb-6" is-form @submit.prevent="findMachine">
          <PillTag color="warning" label="From PCBID" class="mb-2" />
          <FormField
            label="PCBID"
            help="20 character ID for a machine."
            class="w-full"
          >
            <FormControl
              v-model="PCBIDForm"
              name="PCBID"
              required
              :model-value="PCBIDForm"
              :minlength="20"
              :maxlength="20"
            />
          </FormField>

          <BaseButton color="success" type="submit" label="Open Arcade" />
        </CardBox>
      </div>

      <SectionTitleLine
        :icon="PhStorefront"
        title="All Arcades"
        color="text-blue-400"
        main
      />
      <CardBox has-table class="mb-6">
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="headers"
              :items="arcadeData"
              @row-clicked="openArcade"
            />
            <h1 class="mx-4 mt-1 mb-2 text-md lg:text-lg">
              Click row to open arcade
            </h1>
          </div>
        </div>
      </CardBox>

      <SectionTitleLine
        :icon="PhPlusCircle"
        title="Create Arcade"
        color="text-emerald-600"
        main
      />
      <CardBox is-form class="row-span-1" @submit.prevent="createClient()">
        <BaseButton
          color="info"
          :small="false"
          label="Arcade Onboarding"
          to="/admin/onboarding"
        />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
