<script setup>
import { useRoute } from "vue-router";
import { mdiCashRegister, mdiAccountCash } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TablePaseli from "@/components/Tables/TablePaseli.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { arcadeList } from "../../constants";

const $route = useRoute();
const arcadeID = parseInt($route.params.id);

const thisArcade = arcadeList.find((x) => x.id === arcadeID);

var transactions = [
  {
    id: 0,
    value: -300,
    timestamp: "7/13/2023 1:27 PM",
    machine: "SDVX",
    reason: "/eacoin/nstart",
    user: "Trmazi",
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <ArcadeCard class="mb-6" :arcade-data="thisArcade" />
      <SectionTitleLine
        :icon="mdiAccountCash"
        title="Player PASELI Balances"
        main
      />
      <CardBox class="mb-6" has-table>
        <TablePaseli v-if="transactions.length" :transactions="transactions" />
        <CardBoxComponentEmpty v-if="!transactions.length" />
      </CardBox>

      <SectionTitleLine
        :icon="mdiCashRegister"
        title="PASELI Transaction History"
        main
      />
      <CardBox class="mb-6" has-table>
        <TablePaseli v-if="transactions.length" :transactions="transactions" />
        <CardBoxComponentEmpty v-if="!transactions.length" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
