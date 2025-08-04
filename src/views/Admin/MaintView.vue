<script setup>
import { ref, reactive, onMounted } from "vue";
import { PhWrench, PhClockCountdown } from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";

import {
  APIAdminMaintenancePeriods,
  APIAdminCreateMaintenancePeriod,
} from "@/stores/api/admin";

const maintData = ref([]);
const maintHeaders = [
  {
    text: "Start Timestamp",
    value: "timestamp",
    width: 120,
  },
  {
    text: "End Timestamp",
    value: "data.endTimestamp",
    width: 120,
  },
  {
    text: "Reason",
    value: "data.reason",
    width: 120,
  },
];

const initMaint = {
  endTimestamp: Date.now(),
};

const newMaint = reactive({
  ...initMaint,
});

onMounted(async () => {
  loadMaintenance();
});

async function loadMaintenance() {
  try {
    const data = await APIAdminMaintenancePeriods();
    var formattedItems = [];
    for (var item of data) {
      if (item.timestamp) {
        const date = new Date(item.timestamp * 1000);
        item.timestamp = date.toLocaleString();
      }

      if (item.data.endTimestamp) {
        const date = new Date(item.data.endTimestamp * 1000);
        item.data.endTimestamp = date.toLocaleString();
      }

      formattedItems.push(item);
    }

    maintData.value = formattedItems;
  } catch (error) {
    console.error("Failed to fetch maint data:", error);
  }
}

async function enterMaintenance() {
  const confirmed = window.confirm("Are you really?");
  if (confirmed) {
    try {
      const data = await APIAdminCreateMaintenancePeriod(newMaint);
      maintData.value = data;
      loadMaintenance();
    } catch (error) {
      console.error("Failed to post maint:", error);
    }
  }
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <CardBox class="mb-6 p-1">
        <h1 class="text-3xl">Network Maintenance</h1>
      </CardBox>

      <SectionTitleLine
        :icon="PhWrench"
        title="Recent Maintenance Periods"
        color="text-blue-400"
        main
      />

      <CardBox has-table class="mb-6">
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable :headers="maintHeaders" :items="maintData" />
          </div>
        </div>
      </CardBox>

      <SectionTitleLine
        :icon="PhClockCountdown"
        title="Create Maintenance Period"
        color="text-yellow-600"
        main
      />
      <CardBox is-form class="row-span-1" @submit.prevent="enterMaintenance()">
        <FormField label="Reason" help="Why are we going under maintenance?">
          <FormControl v-model="newMaint.reason" required />
        </FormField>

        <FormField
          label="Period End"
          help="When the network will release the maintenance window."
        >
          <VueDatePicker
            v-model="newMaint.endTimestamp"
            dark
            @update:model-value="
              (val) => (newMaint.endTimestamp = new Date(val).getTime())
            "
          />
        </FormField>

        <div>
          <BaseButton
            type="submit"
            color="warning"
            label="Enter Maintenance"
            :small="false"
          />
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
