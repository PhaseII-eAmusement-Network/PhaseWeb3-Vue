<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { mdiCashRegister, mdiAccountCash } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import { useMainStore } from "@/stores/main";

const mainStore = useMainStore();
const arcadeData = ref({});
const paseliData = ref({});
const loading = ref(true);

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

onMounted(async () => {
  try {
    const loadArcadeData = await mainStore.getArcade(arcadeId);
    const loadPaseliData = await mainStore.getPaseliData(arcadeId);
    arcadeData.value = loadArcadeData;
    paseliData.value = loadPaseliData;
    loading.value = false;
  } catch (error) {
    console.log("Failed to fetch arcade data:", error);
  }
});

const transactionHeaders = [
  {
    text: "Timestamp",
    value: "timestamp",
    width: 200,
  },
  {
    text: "Amount",
    value: "data.delta",
    width: 200,
  },
  {
    text: "Remaining Balance",
    value: "data.balance",
    width: 200,
  },
  {
    text: "Reason",
    value: "data.reason",
    width: 200,
  },
];

const balanceHeaders = [
  {
    text: "Player",
    value: "username",
  },
  {
    text: "Balance",
    value: "balance",
  },
];

function filterTransactions(transactions) {
  var filteredTransactions = [];
  for (var transaction of JSON.parse(JSON.stringify(transactions))) {
    if (transaction.timestamp) {
      const date = new Date(transaction.timestamp * 1000);
      transaction.timestamp = date.toLocaleString();
    }

    filteredTransactions.push(transaction);
  }

  return filteredTransactions;
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template
        v-if="!loading && paseliData.balances && paseliData.transactions"
      >
        <ArcadeCard class="mb-6" :arcade="arcadeData" :use-small="true" />
        <SectionTitleLine
          :icon="mdiAccountCash"
          title="Player PASELI Balances"
          main
        />
        <CardBox has-table>
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="balanceHeaders"
                :items="paseliData.balances"
              />
            </div>
          </div>
        </CardBox>

        <SectionTitleLine
          :icon="mdiCashRegister"
          title="PASELI Transaction History"
          main
          class="pt-6"
        />
        <CardBox has-table>
          <div
            class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
          >
            <div class="w-full">
              <GeneralTable
                :headers="transactionHeaders"
                :items="filterTransactions(paseliData.transactions)"
              />
            </div>
          </div>
        </CardBox>
      </template>
    </SectionMain>
  </LayoutAuthenticated>
</template>
