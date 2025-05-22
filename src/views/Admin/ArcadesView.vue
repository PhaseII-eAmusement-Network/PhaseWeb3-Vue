<script setup>
import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  mdiStoreOutline,
  mdiStoreEditOutline,
  mdiStorePlusOutline,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

import { APIAdminArcades } from "@/stores/api/admin";

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
  },
  {
    text: "PASELI Enabled",
    value: "data.paseli_enabled",
    width: 50,
  },
  {
    text: "Infinite PASELI",
    value: "data.paseli_infinite",
    width: 50,
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
        arcade.name.toLowerCase().includes(filterForm.filter.toLowerCase()) ||
        arcade.description
          .toLowerCase()
          .includes(filterForm.filter.toLowerCase()) ||
        arcade.owners.toLowerCase().includes(filterForm.filter.toLowerCase())
    );
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
        :icon="mdiStoreOutline"
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
        :icon="mdiStoreEditOutline"
        title="Search Arcades"
        color="text-amber-600"
        main
      />
      <CardBox class="mb-6">
        <FormField
          label="Search"
          help="Search by name, description, or owner."
          class="w-full md:w-1/3"
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
              </div>

              <div class="flex align-middle mt-2 md:mt-0">
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

      <SectionTitleLine
        :icon="mdiStorePlusOutline"
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
