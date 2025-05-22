<script setup>
import { reactive } from "vue";
import {
  mdiPlaylistMusic,
  mdiFormatListBulleted,
  mdiFormatListNumbered,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLine from "@/components/SectionTitleLine.vue";
import CardBox from "@/components/CardBox.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import GeneralTable from "@/components/GeneralTable.vue";
import FormControl from "@/components/FormControl.vue";
import PillTag from "@/components/PillTag.vue";
import GameHeader from "@/components/Cards/GameHeader.vue";
import { customStyle } from "@/constants/sources";

import { getGameInfo } from "@/constants";
const game = getGameInfo("ddromni");

const headers = [];
headers.push({
  text: "Player",
  value: "username",
  sortable: true,
  width: 120,
});

const versionForm = reactive({
  currentVersion: 0,
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <GameHeader :game="game" />
      <SectionTitleLine :icon="mdiPlaylistMusic" title="Song Overview" main />
      <CardBox
        class="mb-6"
        has-table
        :style="
          customStyle(
            `https://i.ytimg.com/vi/Y57dcTj_5RE/hqdefault.jpg?sqp=-oaymwEmCOADEOgC8quKqQMa8AEB-AH-BIAC4AOKAgwIABABGF0gZSgxMA8=&rs=AOn4CLAWbVnmUyvvmgKiVTF2OnqIdF_2Lg`
          )
        "
      >
        <div class="grid gap-4 bg-slate-900/90 card-content">
          <div>
            <h1 class="text-3xl font-bold">MY BABY MAMA</h1>
            <h2 class="text-2xl">ANQUETTE</h2>
          </div>

          <div class="grid grid-cols-3 sm:flex gap-2">
            <PillTag color="success" label="SP Beginner - 5" />
            <PillTag color="info" label="SP Difficult - 6" />
            <PillTag color="warning" label="SP Expert - 9" />
          </div>
        </div>
      </CardBox>

      <SectionTitleLine
        :icon="mdiFormatListNumbered"
        title="Top Records"
        main
      />
      <div class="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <CardBoxWidget label="SP Beginner" small-content
          >Unclaimed</CardBoxWidget
        >
        <CardBoxWidget label="SP Difficult" small-content
          >SIRO - 877,010</CardBoxWidget
        >
        <CardBoxWidget label="SP Expert" small-content
          >CHRS4LFE - 1,000,000 MFC</CardBoxWidget
        >
      </div>

      <div class="flex place-content-between mb-2">
        <SectionTitleLine
          :icon="mdiFormatListBulleted"
          title="All Scores"
          main
        />
        <div class="md:w-1/3 md:text-right">
          <h2 class="text-md sm:text-lg md:text-xl font-bold p-2">
            Select Chart
          </h2>
          <FormControl
            v-model="versionForm.currentVersion"
            :options="[{ id: 0, label: 'SP Beginner - 5' }]"
          />
        </div>
      </div>

      <CardBox has-table>
        <div
          class="bg-white dark:bg-slate-900/95 rounded-2xl lg:flex lg:justify-between"
        >
          <div class="w-full">
            <GeneralTable :headers="headers" :items="[]" />
          </div>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
