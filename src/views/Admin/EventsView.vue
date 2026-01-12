<script setup>
import { ref, onMounted } from "vue";
import {
  PhFlagCheckered,
  PhCashRegister,
  PhSiren,
  PhGlobeX,
  PhExclamationMark,
  PhCloudArrowDown,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import { formatSortableDate } from "@/constants/date";

import { APIAdminAudit } from "@/stores/api/admin";
const auditData = ref({});
const loading = ref(true);

onMounted(async () => {
  try {
    const data = await APIAdminAudit();
    auditData.value = data;
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
    text: "Model",
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

const updaterHeaders = [
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
    text: "Name",
    value: "data.name",
    width: 120,
  },
  {
    text: "Value",
    value: "data.value",
    width: 120,
  },
  {
    text: "Model",
    value: "data.model",
    width: 120,
  },
];

const exceptionHeaders = [
  {
    text: "Timestamp",
    value: "date",
    width: 120,
  },
  {
    text: "Service",
    value: "data.service",
    width: 120,
  },
  {
    text: "PCBID",
    value: "data.pcbid",
    width: 120,
  },
  {
    text: "Model",
    value: "data.model",
    width: 120,
  },
  {
    text: "Request",
    value: "data.requestName",
    width: 120,
  },
  {
    text: "Method",
    value: "data.method",
    width: 120,
  },
  {
    text: "Traceback",
    value: "data.traceback",
    width: 120,
  },
];

const unhandledHeaders = [
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
    text: "Model",
    value: "data.model",
    width: 120,
  },
  {
    text: "Request",
    value: "data.requestName",
    width: 120,
  },
  {
    text: "Method",
    value: "data.method",
    width: 120,
  },
];

const unauthorizedHeaders = [
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
    text: "Model",
    value: "data.model",
    width: 120,
  },
];

function formatData(events) {
  if (events === undefined) {
    return [];
  }
  return events.map((item) => {
    if (item.timestamp) {
      item.date = formatSortableDate(item.timestamp);
    }

    if (item?.data?.request) {
      const extracted = extractExceptionData(item.data.request);
      item.data.pcbid = extracted.pcbid;
      item.data.model = extracted.model;
      item.data.requestName = extracted.requestName;
      item.data.method = extracted.method;
    }

    return item;
  });
}

function extractExceptionData(xmlString) {
  const modelMatch = xmlString.match(/<call[^>]*model="([^"]+)"/);
  const pcbidMatch = xmlString.match(/<call[^>]*srcid="([^"]+)"/);
  const methodMatch = xmlString.match(/<([^ >]+)[^>]*method="([^"]+)"/);
  const requestNameMatch = xmlString.match(/<call[^>]*>\s*<([^ >]+)/);

  return {
    model: modelMatch?.[1] || null,
    pcbid: pcbidMatch?.[1] || null,
    requestName: requestNameMatch?.[1] || null,
    method: methodMatch?.[2] || null,
  };
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
          :icon="PhSiren"
          title="Recent Tracebacks"
          color="text-red-400"
          main
        />
        <CardBox has-table class="mb-4">
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="exceptionHeaders"
                :items="formatData(auditData?.exception)"
                :rows-per-page="2"
              />
            </div>
          </div>
        </CardBox>

        <SectionTitleLine
          :icon="PhGlobeX"
          title="Recent Unhandled Packets"
          color="text-amber-300"
          main
        />
        <CardBox has-table class="mb-4">
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="unhandledHeaders"
                :items="formatData(auditData?.unhandled_packet)"
                :rows-per-page="10"
              />
            </div>
          </div>
        </CardBox>

        <SectionTitleLine
          :icon="PhExclamationMark"
          title="Recent Unauthorized PCBIDs"
          color="text-yellow-400"
          main
        />
        <CardBox has-table class="mb-4">
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="unauthorizedHeaders"
                :items="formatData(auditData?.unauthorized_pcbid)"
                :rows-per-page="10"
              />
            </div>
          </div>
        </CardBox>

        <SectionTitleLine
          :icon="PhFlagCheckered"
          title="Recent PCB Events"
          color="text-emerald-400"
          main
        />
        <CardBox has-table class="mb-4">
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="eventHeaders"
                :items="formatData(auditData?.pcbevent)"
                :rows-per-page="10"
              />
            </div>
          </div>
        </CardBox>

        <SectionTitleLine
          :icon="PhCloudArrowDown"
          title="Recent Updater Statuses"
          color="text-sky-400"
          main
        />
        <CardBox has-table class="mb-4">
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="updaterHeaders"
                :items="formatData(auditData?.avs_updater)"
                :rows-per-page="10"
              />
            </div>
          </div>
        </CardBox>

        <SectionTitleLine
          :icon="PhCashRegister"
          title="Recent PASELI Transactions"
          color="text-green-400"
          main
        />
        <CardBox has-table>
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="transactionHeaders"
                :items="formatData(auditData?.paseli_transaction)"
                :rows-per-page="10"
              />
            </div>
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
