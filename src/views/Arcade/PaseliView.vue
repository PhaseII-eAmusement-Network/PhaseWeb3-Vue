<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import {
  PhCashRegister,
  PhCreditCard,
  PhCurrencyJpy,
  PhPlusCircle,
} from "@phosphor-icons/vue";
import SectionMain from "@/components/SectionMain.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import PillTag from "@/components/PillTag.vue";
import FormControl from "@/components/FormControl.vue";
import FormField from "@/components/FormField.vue";
import {
  APIGetArcade,
  APIGetArcadePASELI,
  APICreditUserPASELI,
} from "@/stores/api/arcade";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import { formatSortableDate } from "@/constants/date";

const arcadeData = ref({});
const paseliData = ref({});
const loading = ref(true);

const newBalance = ref({});

const $route = useRoute();
const arcadeId = parseInt($route.params.id);

async function loadArcade() {
  try {
    arcadeData.value = null;
    const data = await APIGetArcade(arcadeId);
    arcadeData.value = data;
  } catch (error) {
    console.error("Failed to fetch arcade data:", error);
  }
}

async function loadPASELI() {
  try {
    paseliData.value = null;
    const data = await APIGetArcadePASELI(arcadeId);
    paseliData.value = data;
    paseliData.value.transactions?.reverse();
    loading.value = false;
  } catch (error) {
    console.error("Failed to fetch arcade PASELI:", error);
  }
}

onMounted(() => {
  loading.value = true;
  loadArcade();
  loadPASELI();
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
      transaction.timestamp = formatSortableDate(transaction.timestamp);
    }

    filteredTransactions.push(transaction);
  }

  return filteredTransactions;
}

function cardInput(event) {
  var input = event.target.value;
  input = input.replace(/[^A-Za-z0-9]/g, "");

  // Format the input to XXXX-XXXX-XXXX-XXXX
  input = input
    .toUpperCase()
    .replace(/(.{4})/g, "$1-")
    .replace(/-$/, "");

  newBalance.value.cardId = input;
}

function numInput(event) {
  var input = event.target.value;
  input = input.replace(/[^0-9]/g, "");

  newBalance.value.credit = input;
}

const paseliNetWorth = computed(() => {
  if (!paseliData.value?.balances) return 0;
  return paseliData.value.balances.reduce(
    (sum, entry) => sum + (entry.balance || 0),
    0,
  );
});

const paseliStats = computed(() => {
  if (!paseliData.value?.balances?.length) return {};

  const balances = paseliData.value.balances.filter((b) => b.balance > 0);
  const total = balances.reduce((sum, b) => sum + b.balance, 0);
  const avg = total / balances.length;
  const top = balances.reduce(
    (a, b) => (b.balance > a.balance ? b : a),
    balances[0],
  );

  return {
    total: total,
    avg: avg,
    count: balances.length,
    topPlayer: top.username || "(anonymous)",
    topBalance: top.balance,
  };
});

const paseliTransactions = computed(() => {
  if (!paseliData.value?.transactions)
    return { totalDelta: 0, count: 0, avgDelta: 0, last: null };

  const tx = paseliData.value.transactions;
  const totalDelta = tx.reduce((sum, t) => sum + (t.data?.delta || 0), 0);
  const avgDelta = totalDelta / (tx.length || 1);
  const lastTx = tx[tx.length - 1] || null;

  return {
    totalDelta,
    count: tx.length,
    avgDelta,
    last: lastTx,
  };
});

const existingBalances = computed(() => {
  var balances = [];
  for (const player of paseliData.value.balances) {
    balances.push({
      id: player.userId,
      label: player.username == "" ? "Unclaimed Account" : player.username,
    });
  }
  return balances;
});

async function creditCard() {
  if (!newBalance.value.cardId && !newBalance.value.userId) {
    return;
  }

  if (!newBalance.value.credit) {
    return;
  }

  loading.value = true;

  await APICreditUserPASELI(
    arcadeId,
    newBalance.value.userId,
    newBalance.value.cardId,
    newBalance.value.credit,
  );

  newBalance.value.userId = null;
  newBalance.value.cardId = null;
  newBalance.value.credit = null;
  await loadPASELI();
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <template v-if="!loading && arcadeData">
        <ArcadeCard class="mb-6" :arcade="arcadeData" :use-small="true" />

        <SectionTitleLine :icon="PhCurrencyJpy" title="PASELI Stats" main />
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 mb-6">
          <CardBoxWidget
            v-if="paseliNetWorth"
            :number="paseliNetWorth"
            label="Total PASELI Net Worth"
            :icon="PhCurrencyJpy"
          />
          <CardBoxWidget
            v-if="paseliTransactions.count"
            :number="paseliTransactions.count"
            label="Recent Transactions"
            :icon="PhCashRegister"
          />
          <CardBoxWidget
            v-if="paseliTransactions.totalDelta"
            :number="paseliTransactions.totalDelta"
            label="Recent Net Flow"
            :icon="PhCurrencyJpy"
          />
          <CardBoxWidget
            v-if="paseliStats.avg"
            :number="paseliStats.avg"
            label="Average Player Balance"
            :icon="PhCurrencyJpy"
          />
          <CardBoxWidget
            v-if="paseliStats.topBalance"
            :number="paseliStats.topBalance"
            :label="`Top Player: ${paseliStats.topPlayer}`"
            :icon="PhCurrencyJpy"
          />
        </div>

        <SectionTitleLine
          :icon="PhCurrencyJpy"
          title="Player PASELI Balances"
          main
        />
        <div class="grid md:grid-cols-2 gap-6 mb-6">
          <div class="grid gap-6">
            <CardBox is-form>
              <PillTag
                label="Update balance"
                color="success"
                class="mb-4"
                :icon="PhPlusCircle"
              />

              <FormField
                label="Card ID"
                help="The ACCESS CODE provided by the game."
              >
                <FormControl
                  v-model="newBalance.cardId"
                  :icon="PhCreditCard"
                  name="cardId"
                  type="card"
                  placeholder="XXXX-XXXX-XXXX-XXXX"
                  :minlength="19"
                  :maxlength="19"
                  required
                  @input="cardInput"
                />
              </FormField>

              <FormField label="Credit Amount">
                <FormControl
                  v-model="newBalance.credit"
                  :icon="PhCurrencyJpy"
                  name="credit"
                  required
                  :maxlength="7"
                  inputmode="numeric"
                  @input="numInput"
                />
              </FormField>

              <BaseButton
                label="Credit Account"
                color="success"
                @click="creditCard"
              />
            </CardBox>

            <CardBox is-form>
              <PillTag
                label="Credit existing account"
                color="info"
                class="mb-4"
                :icon="PhPlusCircle"
              />

              <FormField label="Select Player">
                <FormControl
                  v-model="newBalance.userId"
                  :options="existingBalances"
                  required
                />
              </FormField>

              <FormField label="Credit Amount">
                <FormControl
                  v-model="newBalance.credit"
                  :icon="PhCurrencyJpy"
                  name="credit"
                  required
                  :maxlength="7"
                  inputmode="numeric"
                  @input="numInput"
                />
              </FormField>

              <BaseButton
                label="Credit Selected Player"
                color="info"
                @click="creditCard"
              />
            </CardBox>
          </div>

          <div>
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
          </div>
        </div>
        <SectionTitleLine
          :icon="PhCashRegister"
          title="PASELI Transaction History"
          main
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
