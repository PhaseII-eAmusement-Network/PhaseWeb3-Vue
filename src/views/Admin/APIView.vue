<script setup>
import { ref, reactive, onMounted } from "vue";
import { PhDatabase, PhKey } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";

import { APIAdminClients, APIAdminCreateClient } from "@/stores/api/admin";

const clientData = ref([]);
const clientHeaders = [
  {
    text: "Create Timestamp",
    value: "timestamp",
    width: 120,
  },
  {
    text: "Name",
    value: "name",
    width: 120,
  },
];

const initClient = {
  name: null,
};

const newClient = reactive({
  ...initClient,
});

onMounted(async () => {
  loadData();
});

async function loadData() {
  try {
    const data = await APIAdminClients();
    var formattedItems = [];
    for (var item of data) {
      if (item.timestamp) {
        const date = new Date(item.timestamp * 1000);
        item.timestamp = date.toLocaleString();
      }

      formattedItems.push(item);
    }

    clientData.value = formattedItems;
  } catch (error) {
    console.error("Failed to fetch client data:", error);
  }
}

async function createClient() {
  try {
    const data = await APIAdminCreateClient(newClient);
    clientData.value = data;
  } catch (error) {
    console.error("Failed to post client:", error);
  }

  loadData();
}

const copyToClipboard = (item) => {
  navigator.clipboard
    .writeText(item.token)
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
      <CardBox class="mb-6 p-1">
        <h1 class="text-3xl">Data API</h1>
        <p class="text-sm text-gray-400">Used for RestfulSleep and BEMAPI</p>
      </CardBox>

      <SectionTitleLine
        :icon="PhDatabase"
        title="All Active Clients"
        color="text-blue-400"
        main
      />

      <CardBox has-table class="mb-6">
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable
              :headers="clientHeaders"
              :items="clientData"
              @row-clicked="copyToClipboard"
            />
            <h1 class="mx-4 mt-1 mb-2 text-md lg:text-lg">
              Click row to copy token
            </h1>
          </div>
        </div>
      </CardBox>

      <SectionTitleLine
        :icon="PhKey"
        title="Create New Client"
        color="text-emerald-600"
        main
      />
      <CardBox is-form class="row-span-1" @submit.prevent="createClient()">
        <FormField
          label="Name"
          help="Name of the client you'd like to onboard."
        >
          <FormControl v-model="newClient.name" required />
        </FormField>

        <div>
          <BaseButton
            type="submit"
            color="success"
            label="Create"
            :small="false"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
