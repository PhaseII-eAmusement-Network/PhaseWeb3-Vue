<script setup>
import { ref, onMounted } from "vue";
import { PhFlagCheckered, PhCrown } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import { formatSortableDate } from "@/constants/date";

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
        item.date = formatSortableDate(item.timestamp);
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
        item.date = formatSortableDate(item.timestamp);
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
          <h1 class="text-3xl">PhaseII eAmusement Network</h1>
          <p class="text-sm text-gray-400">Welcome to the backend ;)</p>
        </CardBox>

        <SectionTitleLine
          :icon="PhCrown"
          title="Admin Dashboard"
          color="text-red-600"
          main
        />

        <div
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 mb-6"
        >
          <CardBoxWidget
            :number="dashboardData?.statistics?.user"
            label="User Account(s)"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.card"
            label="Registered Cards"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.profile"
            label="Game Profiles"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.link"
            label="Rivals"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.arcade"
            label="Registered Arcades"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.score"
            label="Published Scores"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.score_history"
            label="Score Attempts"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.achievement"
            label="Achievements"
          />
          <CardBoxWidget
            :number="dashboardData?.statistics?.audit"
            label="Recent Event Logs"
          />
        </div>

        <SectionTitleLine
          :icon="PhFlagCheckered"
          main
          title="Recent PCB Events"
        />
        <CardBox has-table class="mb-6">
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
          :icon="PhFlagCheckered"
          main
          title="Recent PASELI Transactions"
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
