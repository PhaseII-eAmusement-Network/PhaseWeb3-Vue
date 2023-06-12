<script setup>
import {
  mdiAccount,
  mdiAccountPlusOutline,
  mdiAccountMinusOutline,
  mdiGamepad,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxGameStat from "@/components/CardBoxGameStat.vue";
import UserCard from "@/components/UserCard.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import BaseButton from "@/components/BaseButton.vue";
import { GameConstants } from "@/constants";
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLine :icon="mdiAccount" title="Trmazi's Profile" main />
      <UserCard class="mb-6" use-small />

      <CardBox is-form class="mb-6">
        <div class="flex gap-4">
          <BaseButton
            color="success"
            label="Add Friend"
            :icon="mdiAccountPlusOutline"
          />
          <BaseButton
            color="danger"
            label="Remove Friend"
            :icon="mdiAccountMinusOutline"
          />
        </div>
      </CardBox>

      <SectionTitleLine :icon="mdiGamepad" title="Game Stats" main />
      <div
        class="grid grid-flow-row auto-rows-auto grid-cols-1 md:grid-cols-2 gap-5 mb-5"
      >
        <CardBoxGameStat
          :game="GameConstants.DDR"
          value="#10 out of 132"
          profile-name="DJ. TRMAZI"
          type="ranking"
        />
        <CardBoxGameStat
          :game="GameConstants.POPN_MUSIC"
          :value="300"
          profile-name="TRMAZI"
          type="plays"
        />
        <CardBoxGameStat
          :game="GameConstants.JUBEAT"
          :value="392"
          profile-name="TRMAZI"
          type="scores"
        />
        <CardBoxGameStat
          :game="GameConstants.SDVX"
          value="#15 out of 200"
          profile-name="TRMAZI"
          type="ranking"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
