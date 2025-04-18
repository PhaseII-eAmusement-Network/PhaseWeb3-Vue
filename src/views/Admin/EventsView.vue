<script setup>
import { ref, onMounted } from "vue";
import { mdiFlagCheckered, mdiCashEdit } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GeneralTable from "@/components/GeneralTable.vue";

import { APIAdminDashboard } from "@/stores/api/admin";
const dashboardData = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await APIAdminDashboard();
    dashboardData.value = data;
    loading.value = false;
  } catch (error) {
    console.log("Failed to fetch admin data:", error);
  }
});

const eventHeaders = [
  {
    text: "Timestamp",
    value: "date",
    width: 120,
  },
  {
    text: "IP Address",
    value: "data.ip",
    width: 120,
  },
  {
    text: "Game",
    value: "data.model",
    width: 120,
  },
  {
    text: "PCBID",
    value: "data.pcbid",
    width: 120,
  },
  {
    text: "Name",
    value: "data.name",
    width: 120,
  },
  {
    text: "Value",
    value: "data.value",
    width: 120,
  },
];

const transactionHeaders = [
  {
    text: "Timestamp",
    value: "date",
    width: 120,
  },
  {
    text: "PCBID",
    value: "data.pcbid",
    width: 120,
  },
  {
    text: "Delta",
    value: "data.delta",
    width: 120,
  },
  {
    text: "Remaining Balance",
    value: "data.balance",
    width: 120,
  },
  {
    text: "Reason",
    value: "data.reason",
    width: 120,
  },
];

function formatTransactions(events) {
  var formattedItems = [];
  for (var item of events) {
    if (item.type == "paseli_transaction") {
      if (item.timestamp) {
        const date = new Date(item.timestamp * 1000);
        item.date = date.toLocaleString();
      }

      formattedItems.push(item);
    }
  }

  return formattedItems;
}

function formatEvents(events) {
  var formattedItems = [];
  for (var item of events) {
    if (item.type == "pcbevent") {
      if (item.timestamp) {
        const date = new Date(item.timestamp * 1000);
        item.date = date.toLocaleString();
      }

      formattedItems.push(item);
    }
  }

  return formattedItems;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading">
        <CardBox class="mb-6 p-1">
          <h1 class="text-3xl">Service Logs</h1>
        </CardBox>

        <SectionTitleLine
          :icon="mdiFlagCheckered"
          title="Recent PCB Events"
          color="text-amber-400"
          main
        />
        <CardBox has-table class="mb-4">
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="eventHeaders"
                :items="formatEvents(dashboardData?.audit)"
              />
            </div>
          </div>
        </CardBox>

        <SectionTitleLine
          :icon="mdiCashEdit"
          title="Recent PASELI Transactions"
          color="text-emerald-400"
          main
        />
        <CardBox has-table>
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="transactionHeaders"
                :items="formatTransactions(dashboardData?.audit)"
              />
            </div>
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
