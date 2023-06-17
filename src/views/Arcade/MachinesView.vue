<script setup>
import { useRoute } from "vue-router";
import { mdiGamepad } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import TableMachines from "@/components/Tables/TableMachine.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import ArcadeCard from "@/components/ArcadeCard.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";
import { arcadeList } from "@/constants";

const $route = useRoute();
const arcadeID = parseInt($route.params.id);

const thisArcade = arcadeList.find((x) => x.id === arcadeID);

const machineList = [
  {
    id: 0,
    pcbid: "1A2B3C4D0000",
    name: "Test PCBID",
    ota: false,
    cabinet: false,
  },
  {
    id: 1,
    pcbid: "1E2R3G3F4JJ0",
    name: "Other PCBID",
    ota: true,
    cabinet: true,
  },
];
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <ArcadeCard class="mb-6" :arcade-data="thisArcade" />
      <SectionTitleLine :icon="mdiGamepad" title="Machines" main />

      <CardBox class="mb-6" has-table>
        <TableMachines v-if="machineList.length" :machines="machineList" />
        <CardBoxComponentEmpty v-if="!machineList.length" />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
